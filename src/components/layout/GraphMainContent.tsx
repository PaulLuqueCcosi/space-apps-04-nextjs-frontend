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

  // Nuevo: soporte para sidebar compacto
  compactMode?: boolean; // si está en modo compacto (sidebar angosto)
}

export default function ResizableSplitPanel({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 350,
  minLeftWidth = 80, // Reducido para acomodar sidebar compacto
  maxLeftWidth = 600,
  minRightWidth = 200,
  resizable = true,
  orientation = 'horizontal',
  usePorcentage = false,
  className = '',
  dividerClassName = '',
  leftPanelClassName = '',
  rightPanelClassName = '',
  onResize,
  compactMode = false
}: ResizableSplitPanelProps) {
  // Ajustar el tamaño inicial basado en el modo compacto
  const getInitialWidth = () => {
    if (compactMode) {
      return Math.max(80, minLeftWidth); // Ancho mínimo para sidebar compacto
    }
    return defaultLeftWidth;
  };

  const [leftSize, setLeftSize] = useState(getInitialWidth());
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Actualizar el tamaño cuando cambie el modo compacto
  useEffect(() => {
    const newWidth = getInitialWidth();
    setLeftSize(newWidth);
    onResize?.(newWidth);
  }, [compactMode]);

  // Calcular límites dinámicamente basados en el tamaño del contenedor y modo compacto
  const getConstraints = useCallback(() => {
    if (!containerRef.current) return { min: minLeftWidth, max: maxLeftWidth };

    const containerSize = orientation === 'horizontal'
      ? containerRef.current.offsetWidth
      : containerRef.current.offsetHeight;

    // Ajustar límites basados en el modo compacto
    const effectiveMinWidth = compactMode ? 60 : minLeftWidth; // 60px para sidebar compacto
    const effectiveMaxWidth = compactMode ? 350 : maxLeftWidth; // Máximo reducido en modo compacto

    const maxAllowed = Math.min(effectiveMaxWidth, containerSize - minRightWidth);

    return {
      min: effectiveMinWidth,
      max: maxAllowed
    };
  }, [minLeftWidth, maxLeftWidth, minRightWidth, orientation, compactMode]);

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
      className={`relative w-full h-full flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'
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
          className={`group relative flex-shrink-0 transition-all duration-200 ${orientation === 'horizontal'
            ? 'w-1 cursor-col-resize hover:w-1.5'
            : 'h-1 cursor-row-resize hover:h-1.5'
            } ${isDragging
              ? 'bg-green-600 shadow-lg'
              : compactMode
                ? 'bg-gray-200 hover:bg-green-400'
                : 'bg-gray-300 hover:bg-green-500'
            } ${dividerClassName}`}
        >
          {/* Área de agarre ampliada */}
          <div
            className={`absolute ${orientation === 'horizontal'
              ? 'inset-y-0 -left-2 -right-2 w-5'
              : 'inset-x-0 -top-2 -bottom-2 h-5'
              }`}
          />

          {/* Indicador visual central - más sutil en modo compacto */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${orientation === 'horizontal'
              ? 'w-0.5 h-6'
              : 'w-6 h-0.5'
              } ${compactMode ? 'bg-white/30' : 'bg-white/50'
              } rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
          />

          {/* Indicador de modo compacto */}
          {compactMode && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${orientation === 'horizontal'
                ? 'w-1 h-3'
                : 'w-3 h-1'
                } bg-green-400 rounded-full opacity-60`}
            />
          )}
        </div>
      ) : (
        <div className={`flex-shrink-0 ${orientation === 'horizontal' ? 'w-px' : 'h-px'} ${compactMode ? 'bg-gray-100' : 'bg-gray-200'
          }`} />
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
