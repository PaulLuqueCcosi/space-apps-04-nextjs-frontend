'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResizableSplitPanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  
  // Configuración de tamaños
  defaultLeftWidth?: number; // ancho por defecto en px (horizontal) o % si es porcentaje
  minLeftWidth?: number; // ancho mínimo en px
  maxLeftWidth?: number; // ancho máximo en px
  minRightWidth?: number; // ancho mínimo del panel derecho en px
  
  // Configuración
  resizable?: boolean; // si se puede redimensionar o no
  orientation?: 'horizontal' | 'vertical';
  usePorcentage?: boolean; // usar porcentajes en lugar de px
  
  // Estilos
  className?: string;
  dividerClassName?: string;
  leftPanelClassName?: string;
  rightPanelClassName?: string;
  
  // Callbacks
  onResize?: (size: number) => void;
}

export default function ResizableSplitPanel({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 350,
  minLeftWidth = 200,
  maxLeftWidth = 600,
  minRightWidth = 200,
  resizable = true,
  orientation = 'horizontal',
  usePorcentage = false,
  className = '',
  dividerClassName = '',
  leftPanelClassName = '',
  rightPanelClassName = '',
  onResize
}: ResizableSplitPanelProps) {
  const [leftSize, setLeftSize] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular límites dinámicamente basados en el tamaño del contenedor
  const getConstraints = useCallback(() => {
    if (!containerRef.current) return { min: minLeftWidth, max: maxLeftWidth };
    
    const containerSize = orientation === 'horizontal' 
      ? containerRef.current.offsetWidth 
      : containerRef.current.offsetHeight;
    
    const maxAllowed = Math.min(maxLeftWidth, containerSize - minRightWidth);
    
    return {
      min: minLeftWidth,
      max: maxAllowed
    };
  }, [minLeftWidth, maxLeftWidth, minRightWidth, orientation]);

  useEffect(() => {
    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const { min, max } = getConstraints();

      let newSize: number;
      
      if (orientation === 'horizontal') {
        newSize = e.clientX - rect.left;
      } else {
        newSize = e.clientY - rect.top;
      }

      // Aplicar límites
      newSize = Math.max(min, Math.min(max, newSize));
      
      setLeftSize(newSize);
      onResize?.(newSize);
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
  }, [isDragging, orientation, resizable, getConstraints, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    setIsDragging(true);
  };

  // Calcular el tamaño a usar (px o %)
  const leftSizeStyle = usePorcentage 
    ? `${leftSize}%` 
    : `${leftSize}px`;

  const rightSizeStyle = usePorcentage
    ? `${100 - leftSize}%`
    : `calc(100% - ${leftSize}px)`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex ${
        orientation === 'horizontal' ? 'flex-row' : 'flex-col'
      } ${className}`}
    >
      {/* Panel izquierdo/superior */}
      <div
        style={{
          [orientation === 'horizontal' ? 'width' : 'height']: leftSizeStyle,
          flexShrink: 0
        }}
        className={`overflow-auto ${leftPanelClassName}`}
      >
        {leftPanel}
      </div>

      {/* Divisor arrastrable */}
      {resizable ? (
        <div
          onMouseDown={handleMouseDown}
          className={`group relative flex-shrink-0 transition-colors ${
            orientation === 'horizontal'
              ? 'w-1 cursor-col-resize hover:w-1.5'
              : 'h-1 cursor-row-resize hover:h-1.5'
          } ${
            isDragging 
              ? 'bg-lime-600' 
              : 'bg-gray-300 hover:bg-lime-500'
          } ${dividerClassName}`}
        >
          {/* Área de agarre ampliada */}
          <div
            className={`absolute ${
              orientation === 'horizontal'
                ? 'inset-y-0 -left-2 -right-2 w-5'
                : 'inset-x-0 -top-2 -bottom-2 h-5'
            }`}
          />
          
          {/* Indicador visual central */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              orientation === 'horizontal'
                ? 'w-1 h-8'
                : 'w-8 h-1'
            } bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
          />
        </div>
      ) : (
        <div className={`flex-shrink-0 ${orientation === 'horizontal' ? 'w-px' : 'h-px'} bg-gray-200`} />
      )}

      {/* Panel derecho/inferior */}
      <div
        style={{
          [orientation === 'horizontal' ? 'width' : 'height']: rightSizeStyle
        }}
        className={`overflow-auto flex-1 ${rightPanelClassName}`}
      >
        {rightPanel}
      </div>
    </div>
  );
}
