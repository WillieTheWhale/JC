'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, Trash2, Grid, Download, Palette } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ChalkColor {
  name: string;
  color: string;
}

const CHALK_COLORS: ChalkColor[] = [
  { name: 'White', color: '#F5F5F0' },
  { name: 'Yellow', color: '#F5E6A3' },
  { name: 'Pink', color: '#F5A3B5' },
  { name: 'Blue', color: '#A3C5F5' },
];

const BRUSH_SIZES = [
  { name: 'Fine', size: 2 },
  { name: 'Medium', size: 5 },
  { name: 'Thick', size: 10 },
  { name: 'Bold', size: 18 },
];

export default function InteractiveChalkboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'chalk' | 'eraser'>('chalk');
  const [currentColor, setCurrentColor] = useState(CHALK_COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1].size);
  const [showGrid, setShowGrid] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
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
        // Fill with blackboard color
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Chalk brush effect
  const drawChalk = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    size: number
  ) => {
    const bristles = Math.ceil(size * 1.5);

    for (let i = 0; i < bristles; i++) {
      const offsetX = (Math.random() - 0.5) * size;
      const offsetY = (Math.random() - 0.5) * size;
      const particleSize = Math.random() * (size / 4) + 1;
      const opacity = Math.random() * 0.5 + 0.3;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2);

      // Parse color and add opacity
      const colorMatch = color.match(/^#([A-Fa-f0-9]{6})$/);
      if (colorMatch) {
        const r = parseInt(colorMatch[1].slice(0, 2), 16);
        const g = parseInt(colorMatch[1].slice(2, 4), 16);
        const b = parseInt(colorMatch[1].slice(4, 6), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      } else {
        ctx.fillStyle = color;
      }
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
    // Semi-transparent blackboard color for smudge effect
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(26, 26, 26, 0.3)';
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
        drawChalk(ctx, x, y, currentColor.color, brushSize);
      } else {
        drawEraser(ctx, x, y, brushSize * 4);
      }
    }
  }, [tool, currentColor.color, brushSize, drawChalk, drawEraser]);

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
        drawChalk(ctx, pos.x, pos.y, currentColor.color, brushSize);
      } else {
        drawEraser(ctx, pos.x, pos.y, brushSize * 4);
      }
    }
  }, [getPos, tool, currentColor.color, brushSize, drawChalk, drawEraser]);

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
    ctx.fillStyle = '#1A1A1A';
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

  // Draw grid overlay
  useEffect(() => {
    // Grid is handled via CSS for performance
  }, [showGrid]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-sage-100 rounded-lg">
        {/* Tool selection */}
        <div className="flex gap-2">
          <Button
            variant={tool === 'chalk' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setTool('chalk')}
            className="gap-2"
          >
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: currentColor.color, border: '1px solid #ccc' }} />
            Chalk
          </Button>
          <Button
            variant={tool === 'eraser' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setTool('eraser')}
            className="gap-2"
          >
            <Eraser size={16} />
            Eraser
          </Button>
        </div>

        {/* Color picker */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="gap-2"
          >
            <Palette size={16} />
            Color
          </Button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-lg shadow-elevated z-10 flex gap-2">
              {CHALK_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setCurrentColor(color);
                    setShowColorPicker(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    currentColor.name === color.name ? 'border-sage-600 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Brush size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-sage-600">Size:</span>
          {BRUSH_SIZES.map((size) => (
            <button
              key={size.name}
              onClick={() => setBrushSize(size.size)}
              className={`p-1 rounded ${brushSize === size.size ? 'bg-sage-300' : 'hover:bg-sage-200'}`}
              title={size.name}
            >
              <span
                className="block rounded-full bg-charcoal"
                style={{ width: size.size + 4, height: size.size + 4 }}
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className={showGrid ? 'bg-sage-200' : ''}
          >
            <Grid size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={clearCanvas}>
            <Trash2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={downloadImage}>
            <Download size={16} />
          </Button>
        </div>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-elevated"
      >
        {/* Chalkboard background */}
        <div className="absolute inset-0 bg-blackboard">
          {/* Texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Grid overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245,245,240,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,245,240,0.1) 1px, transparent 1px)
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
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-900 to-amber-950 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-gray-200/20 to-transparent" />
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-sage-500 text-sm mt-4">
        Draw with your mouse or touch. Double-click for a chalk dust effect!
      </p>
    </div>
  );
}
