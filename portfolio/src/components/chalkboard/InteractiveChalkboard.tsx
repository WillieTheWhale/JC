'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, Trash2, Grid, Download } from 'lucide-react';

interface ChalkColor {
  name: string;
  color: string;
  rgba: string;
}

const CHALK_COLORS: ChalkColor[] = [
  { name: 'White', color: '#F5F5F0', rgba: '245, 245, 240' },
  { name: 'Yellow', color: '#F5E6A3', rgba: '245, 230, 163' },
  { name: 'Pink', color: '#E8B4B8', rgba: '232, 180, 184' },
  { name: 'Blue', color: '#A8C5D8', rgba: '168, 197, 216' },
];

const BRUSH_SIZES = [
  { name: 'Fine', size: 3 },
  { name: 'Medium', size: 6 },
  { name: 'Thick', size: 12 },
  { name: 'Bold', size: 20 },
];

export default function InteractiveChalkboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'chalk' | 'eraser'>('chalk');
  const [currentColor, setCurrentColor] = useState(CHALK_COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1].size);
  const [showGrid, setShowGrid] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        // Fill with slate color
        ctx.fillStyle = '#141F20';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Realistic chalk brush with bristle effect
  const drawChalk = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rgba: string,
    size: number
  ) => {
    const bristleCount = Math.ceil(size * 2);
    const spread = size * 0.8;

    for (let i = 0; i < bristleCount; i++) {
      const angle = (i / bristleCount) * Math.PI * 2;
      const distance = Math.random() * spread;
      const offsetX = Math.cos(angle) * distance + (Math.random() - 0.5) * spread * 0.5;
      const offsetY = Math.sin(angle) * distance + (Math.random() - 0.5) * spread * 0.5;
      const particleSize = (0.5 + Math.random() * 1.5) * (size / 6);
      const opacity = (0.25 + Math.random() * 0.45);

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgba}, ${opacity})`;
      ctx.fill();
    }
  }, []);

  // Eraser effect (smudge)
  const drawEraser = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    // Gradual smudge effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(20, 31, 32, 0.4)');
    gradient.addColorStop(0.5, 'rgba(20, 31, 32, 0.2)');
    gradient.addColorStop(1, 'rgba(20, 31, 32, 0)');

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  // Draw line between two points
  const drawLine = useCallback((
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(Math.ceil(dist / 2), 1);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;

      if (tool === 'chalk') {
        drawChalk(ctx, x, y, currentColor.rgba, brushSize);
      } else {
        drawEraser(ctx, x, y, brushSize * 3);
      }
    }
  }, [tool, currentColor.rgba, brushSize, drawChalk, drawEraser]);

  // Event handlers
  const getPos = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getPos(e);
    lastPosRef.current = pos;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      if (tool === 'chalk') {
        drawChalk(ctx, pos.x, pos.y, currentColor.rgba, brushSize);
      } else {
        drawEraser(ctx, pos.x, pos.y, brushSize * 3);
      }
    }
  }, [getPos, tool, currentColor.rgba, brushSize, drawChalk, drawEraser]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    drawLine(ctx, lastPosRef.current.x, lastPosRef.current.y, pos.x, pos.y);
    lastPosRef.current = pos;
  }, [isDrawing, getPos, drawLine]);

  const handlePointerUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#141F20';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  // Download as image
  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'chalkboard-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-4 mb-4 p-4 rounded-t"
        style={{
          background: 'linear-gradient(180deg, #5C4033 0%, #4A3728 100%)',
        }}
      >
        {/* Tool selection */}
        <div className="flex gap-2">
          <button
            onClick={() => setTool('chalk')}
            className={`px-4 py-2 rounded text-sm font-heading tracking-wide transition-all duration-200 ${
              tool === 'chalk'
                ? 'bg-gold text-walnut-deep'
                : 'bg-walnut/50 text-parchment hover:bg-walnut'
            }`}
          >
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: currentColor.color }}
            />
            Chalk
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`px-4 py-2 rounded text-sm font-heading tracking-wide transition-all duration-200 flex items-center gap-2 ${
              tool === 'eraser'
                ? 'bg-gold text-walnut-deep'
                : 'bg-walnut/50 text-parchment hover:bg-walnut'
            }`}
          >
            <Eraser size={14} />
            Eraser
          </button>
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2">
          <span className="text-parchment/60 text-xs">Color:</span>
          {CHALK_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setCurrentColor(color)}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${
                currentColor.name === color.name
                  ? 'ring-2 ring-gold ring-offset-2 ring-offset-oak scale-110'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>

        {/* Brush size */}
        <div className="flex items-center gap-2">
          <span className="text-parchment/60 text-xs">Size:</span>
          {BRUSH_SIZES.map((size) => (
            <button
              key={size.name}
              onClick={() => setBrushSize(size.size)}
              className={`p-1.5 rounded transition-all duration-200 ${
                brushSize === size.size ? 'bg-brass/30' : 'hover:bg-walnut/50'
              }`}
              title={size.name}
            >
              <span
                className="block rounded-full bg-parchment"
                style={{ width: size.size / 2 + 4, height: size.size / 2 + 4 }}
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded transition-all duration-200 ${
              showGrid ? 'bg-brass/30 text-gold' : 'text-parchment/60 hover:text-parchment'
            }`}
            title="Toggle Grid"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 rounded text-parchment/60 hover:text-parchment transition-colors duration-200"
            title="Clear"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={downloadImage}
            className="p-2 rounded text-parchment/60 hover:text-parchment transition-colors duration-200"
            title="Download"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden"
        style={{
          boxShadow: `
            inset 0 0 80px rgba(0, 0, 0, 0.4),
            0 0 0 8px #5C4033,
            0 0 0 10px #8B7355,
            0 15px 40px rgba(0, 0, 0, 0.4)
          `,
        }}
      >
        {/* Chalkboard background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, #1E2D2F 0%, #141F20 50%, #0F1718 100%)',
          }}
        >
          {/* Slate texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Grid overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245,245,240,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,245,240,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        )}

        {/* Drawing canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        {/* Chalk ledge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #5C4033 0%, #4A3728 40%, #3D2B1F 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 6px rgba(0,0,0,0.3)',
          }}
        >
          {/* Chalk dust */}
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: 'linear-gradient(180deg, rgba(245,245,240,0.15) 0%, transparent 100%)',
            }}
          />
          {/* Scattered chalk pieces */}
          <div className="absolute bottom-2 left-8 w-2 h-5 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 rotate-12 opacity-70" />
          <div className="absolute bottom-2 left-16 w-1.5 h-4 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-200 -rotate-6 opacity-60" />
          <div className="absolute bottom-2 right-12 w-2 h-6 rounded-full bg-gradient-to-b from-pink-100 to-pink-200 rotate-6 opacity-60" />
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-brass-tarnished text-sm mt-6 font-decorative italic">
        Draw with your mouse or touch to create chalk art
      </p>
    </div>
  );
}
