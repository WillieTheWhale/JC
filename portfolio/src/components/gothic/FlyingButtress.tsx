'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// FLYING BUTTRESS - Visual Connections Between Related Content
// Creates Gothic architectural connections showing relationships between
// content elements, mimicking the structural support of cathedral buttresses
// ═══════════════════════════════════════════════════════════════════════════════

interface Connection {
  fromId: string;
  toId: string;
  label?: string;
  strength?: 'weak' | 'medium' | 'strong';
}

interface FlyingButtressProps {
  connections: Connection[];
  color?: string;
  highlightColor?: string;
  animate?: boolean;
  showOnHover?: boolean;
  className?: string;
}

export default function FlyingButtress({
  connections,
  color = '#5A6B5A',
  highlightColor = '#C9A227',
  animate = true,
  showOnHover = true,
  className = '',
}: FlyingButtressProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeConnection, setActiveConnection] = useState<string | null>(null);
  const [paths, setPaths] = useState<Array<{
    id: string;
    d: string;
    midPoint: { x: number; y: number };
    label?: string;
    strength: string;
  }>>([]);

  // Calculate buttress paths between elements
  useEffect(() => {
    const calculatePaths = () => {
      const newPaths: typeof paths = [];

      connections.forEach((conn) => {
        const fromEl = document.getElementById(conn.fromId);
        const toEl = document.getElementById(conn.toId);

        if (fromEl && toEl) {
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();
          const svgRect = svgRef.current?.getBoundingClientRect();

          if (svgRect) {
            // Calculate positions relative to SVG
            const fromX = fromRect.right - svgRect.left;
            const fromY = fromRect.top + fromRect.height / 2 - svgRect.top;
            const toX = toRect.left - svgRect.left;
            const toY = toRect.top + toRect.height / 2 - svgRect.top;

            // Create double-arc Gothic buttress path
            const midX = (fromX + toX) / 2;
            const midY = Math.min(fromY, toY) - 40; // Arc upward

            // First arc (from source to peak)
            // Second arc (from peak to target)
            const path = `
              M ${fromX} ${fromY}
              Q ${fromX + 30} ${fromY - 20} ${midX} ${midY}
              Q ${toX - 30} ${toY - 20} ${toX} ${toY}
            `;

            newPaths.push({
              id: `${conn.fromId}-${conn.toId}`,
              d: path,
              midPoint: { x: midX, y: midY },
              label: conn.label,
              strength: conn.strength || 'medium',
            });
          }
        }
      });

      setPaths(newPaths);
    };

    calculatePaths();
    window.addEventListener('resize', calculatePaths);
    window.addEventListener('scroll', calculatePaths);

    return () => {
      window.removeEventListener('resize', calculatePaths);
      window.removeEventListener('scroll', calculatePaths);
    };
  }, [connections]);

  // Animate paths on render
  useEffect(() => {
    if (svgRef.current && animate) {
      const pathElements = svgRef.current.querySelectorAll('.buttress-path');
      pathElements.forEach((path, i) => {
        if (path instanceof SVGPathElement) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;

          setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 0.8s ease-out';
            path.style.strokeDashoffset = '0';
          }, i * 150);
        }
      });
    }
  }, [paths, animate]);

  const strengthWidth = {
    weak: 1,
    medium: 1.5,
    strong: 2.5,
  };

  const strengthOpacity = {
    weak: 0.3,
    medium: 0.5,
    strong: 0.7,
  };

  return (
    <svg
      ref={svgRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-20 ${className}`}
      style={{ mixBlendMode: 'multiply' }}
    >
      <defs>
        {/* Gradient for buttress */}
        <linearGradient id="buttressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>

        {/* Highlight gradient */}
        <linearGradient id="buttressHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.7" />
          <stop offset="50%" stopColor={highlightColor} stopOpacity="1" />
          <stop offset="100%" stopColor={highlightColor} stopOpacity="0.7" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="buttressGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path) => {
        const isActive = activeConnection === path.id;
        const opacity = isActive ? 1 : strengthOpacity[path.strength as keyof typeof strengthOpacity];
        const width = strengthWidth[path.strength as keyof typeof strengthWidth];

        return (
          <g key={path.id}>
            {/* Shadow/depth line */}
            <path
              d={path.d}
              stroke={color}
              strokeWidth={width + 2}
              fill="none"
              opacity={opacity * 0.2}
              transform="translate(2, 2)"
            />

            {/* Main buttress path */}
            <path
              className="buttress-path"
              d={path.d}
              stroke={isActive ? 'url(#buttressHighlight)' : 'url(#buttressGradient)'}
              strokeWidth={width}
              fill="none"
              opacity={showOnHover ? opacity : 0.6}
              strokeLinecap="round"
              filter={isActive ? 'url(#buttressGlow)' : undefined}
              style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
              onMouseEnter={() => setActiveConnection(path.id)}
              onMouseLeave={() => setActiveConnection(null)}
            />

            {/* Decorative elements at connection points */}
            <circle
              cx={path.midPoint.x}
              cy={path.midPoint.y}
              r={isActive ? 6 : 4}
              fill={isActive ? highlightColor : color}
              opacity={opacity}
              style={{ transition: 'r 0.2s ease-out' }}
            />

            {/* Label at midpoint */}
            {path.label && isActive && (
              <g>
                <rect
                  x={path.midPoint.x - 30}
                  y={path.midPoint.y - 25}
                  width="60"
                  height="18"
                  fill="rgba(26,42,26,0.9)"
                  rx="2"
                />
                <text
                  x={path.midPoint.x}
                  y={path.midPoint.y - 13}
                  textAnchor="middle"
                  fill="#E8DCC4"
                  fontSize="10"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                >
                  {path.label}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUTTRESS ANCHOR - Marks an element as a connection point
// ═══════════════════════════════════════════════════════════════════════════════

interface ButtressAnchorProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function ButtressAnchor({ id, children, className = '' }: ButtressAnchorProps) {
  return (
    <div id={id} className={`buttress-anchor relative ${className}`}>
      {children}
      {/* Visual anchor point indicator */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0 hover:opacity-50 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, #5A6B5A 0%, #3A4A3A 100%)',
          boxShadow: '0 0 4px rgba(90, 107, 90, 0.5)',
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE GRAPH - Simplified relationship visualization
// ═══════════════════════════════════════════════════════════════════════════════

interface KnowledgeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: 'primary' | 'secondary' | 'tertiary';
}

interface KnowledgeEdge {
  from: string;
  to: string;
  label?: string;
}

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function KnowledgeGraph({
  nodes,
  edges,
  width = 400,
  height = 300,
  color = '#5A6B5A',
  className = '',
}: KnowledgeGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeRadius = {
    primary: 24,
    secondary: 18,
    tertiary: 12,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <defs>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((edge, i) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

        // Gothic double-arc path
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = Math.min(fromNode.y, toNode.y) - 30;

        return (
          <g key={i}>
            <path
              d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
              stroke={color}
              strokeWidth={isHighlighted ? 2 : 1}
              fill="none"
              opacity={isHighlighted ? 0.8 : 0.4}
              style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
            />
            {/* Edge label */}
            {edge.label && isHighlighted && (
              <text
                x={midX}
                y={midY - 5}
                textAnchor="middle"
                fill={color}
                fontSize="9"
                fontStyle="italic"
                opacity="0.8"
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const radius = nodeRadius[node.type || 'secondary'];

        return (
          <g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={radius}
              fill="rgba(26,42,26,0.9)"
              stroke={color}
              strokeWidth={isHovered ? 2 : 1}
              filter={isHovered ? 'url(#nodeGlow)' : undefined}
              style={{ transition: 'stroke-width 0.2s' }}
            />

            {/* Node label */}
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill="#E8DCC4"
              fontSize={node.type === 'primary' ? 12 : 10}
              fontFamily="Georgia, serif"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
