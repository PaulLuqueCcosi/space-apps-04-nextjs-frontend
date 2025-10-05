'use client';

import { useState, useRef, useCallback } from 'react';

interface ResizableSplitPanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
  className?: string;
}

export default function ResizableSplitPanel({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 300,
  minLeftWidth = 200,
  maxLeftWidth = 600,
  className = '',
}: ResizableSplitPanelProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = e.clientX - containerRect.left;
    
    // Aplicar límites
    const clampedWidth = Math.max(
      minLeftWidth,
      Math.min(maxLeftWidth, newLeftWidth)
    );
    
    setLeftWidth(clampedWidth);
  }, [isDragging, minLeftWidth, maxLeftWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Agregar event listeners globales
  useState(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  return (
    <div 
      ref={containerRef}
      className={`flex h-full w-full ${className}`}
      style={{ userSelect: isDragging ? 'none' : 'auto' }}
    >
      {/* Panel Izquierdo */}
      <div 
        className="flex-shrink-0 overflow-auto bg-white border-r border-gray-200"
        style={{ width: `${leftWidth}px` }}
      >
        {leftPanel}
      </div>

      {/* Divisor Redimensionable */}
      <div
        className={`w-1 bg-gray-300 cursor-col-resize hover:bg-blue-400 transition-colors ${
          isDragging ? 'bg-blue-500' : ''
        }`}
        onMouseDown={handleMouseDown}
        title="Arrastra para redimensionar"
      />

      {/* Panel Derecho */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {rightPanel}
      </div>
    </div>
  );
}