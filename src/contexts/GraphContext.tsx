'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GraphData } from '@/models/GraphModels';

interface GraphContextType {
  // Estado del grafo
  graphData: GraphData | null;
  setGraphData: (data: GraphData | null) => void;
  
  // Estado de carga
  loading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Error
  error: string | null;
  setError: (error: string | null) => void;
  
  // Función para actualizar el grafo desde cualquier componente
  updateGraphData: (data: GraphData, fromAI?: boolean) => void;
  
  // Función para limpiar el grafo
  clearGraphData: () => void;
  
  // Función para forzar actualización (sobrescribe datos del AI)
  forceUpdateGraphData: (data: GraphData) => void;
  
  // Indicador de si los datos vienen del chat de IA
  isFromAI: boolean;
  setIsFromAI: (isFromAI: boolean) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

interface GraphProviderProps {
  children: ReactNode;
}

export function GraphProvider({ children }: GraphProviderProps) {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromAI, setIsFromAI] = useState<boolean>(false);

  const updateGraphData = useCallback((data: GraphData, fromAI: boolean = false) => {
    console.log('🔄 Updating graph data from context:', data, fromAI ? '(from AI)' : '(from filters)');
    setGraphData(data);
    setError(null);
    setIsFromAI(fromAI);
  }, []);

  const clearGraphData = useCallback(() => {
    setGraphData(null);
    setError(null);
    setIsFromAI(false);
  }, []);

  const forceUpdateGraphData = useCallback((data: GraphData) => {
    console.log('🔄 Force updating graph data (overriding AI data):', data);
    setGraphData(data);
    setError(null);
    setIsFromAI(false); // Marcar como no-AI cuando se fuerza la actualización
  }, []);

  const value: GraphContextType = {
    graphData,
    setGraphData,
    loading,
    setLoading,
    error,
    setError,
    updateGraphData,
    clearGraphData,
    forceUpdateGraphData,
    isFromAI,
    setIsFromAI,
  };

  return (
    <GraphContext.Provider value={value}>
      {children}
    </GraphContext.Provider>
  );
}

export function useGraphContext() {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraphContext must be used within a GraphProvider');
  }
  return context;
}