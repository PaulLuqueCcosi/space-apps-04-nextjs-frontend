import React, { useState, useRef, useEffect } from 'react';

interface ResizableSplitPanelProps {
  children: [React.ReactNode, React.ReactNode];
  defaultSplit?: number; // porcentaje inicial (0-100)
  minSize?: number; // tamaño mínimo en porcentaje
  orientation?: 'horizontal' | 'vertical';
}

export default function ResizableSplitPanel({
  children,
  defaultSplit = 50,
  minSize = 10,
  orientation = 'horizontal'
}: ResizableSplitPanelProps) {
  const [split, setSplit] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      let newSplit: number;

      if (orientation === 'horizontal') {
        const mouseX = e.clientX - rect.left;
        newSplit = (mouseX / rect.width) * 100;
      } else {
        const mouseY = e.clientY - rect.top;
        newSplit = (mouseY / rect.height) * 100;
      }

      // Aplicar límites
      newSplit = Math.max(minSize, Math.min(100 - minSize, newSplit));
      setSplit(newSplit);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, orientation, minSize]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'
        }`}
    >
      {/* Primera sección */}
      <div
        style={{
          [orientation === 'horizontal' ? 'width' : 'height']: `${split}%`
        }}
        className="overflow-auto"
      >
        {children[0]}
      </div>

      {/* Divisor arrastrable */}
      <div
        onMouseDown={handleMouseDown}
        className={`group relative flex-shrink-0 bg-gray-300 hover:bg-blue-500 transition-colors ${orientation === 'horizontal'
          ? 'w-1 cursor-col-resize hover:w-1.5'
          : 'h-1 cursor-row-resize hover:h-1.5'
          } ${isDragging ? 'bg-blue-600' : ''}`}
      >
        {/* Área de agarre visual */}
        <div
          className={`absolute inset-0 ${orientation === 'horizontal'
            ? '-left-1 -right-1'
            : '-top-1 -bottom-1'
            }`}
        />
      </div>

      {/* Segunda sección */}
      <div
        style={{
          [orientation === 'horizontal' ? 'width' : 'height']: `${100 - split}%`
        }}
        className="overflow-auto"
      >
        {children[1]}
      </div>
    </div>
  );
}

