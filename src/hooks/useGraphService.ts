'use client';

import { useState, useCallback } from 'react';
import { GraphData, GraphFilters } from '@/models/GraphModels';
import { graphService } from '@/services/graphService';
import { GraphAdapter } from '@/services/adapters/GraphAdapter';

export function useGraphService() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryGraph = useCallback(async (filters: GraphFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      // Convertir filtros del frontend a request del API
      const apiRequest = GraphAdapter.filtersToApiRequest(filters);
      // console.log("apiRequest", apiRequest )
      // Llamar al servicio con tipos del API
      const apiResponse = await graphService.queryGraph(apiRequest);
      
      // Convertir respuesta del API a modelo del frontend
      const frontendData = GraphAdapter.apiResponseToFrontendData(apiResponse);
      // console.log("data:")
      // console.log(frontendData)

      setData(frontendData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error gaaa');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    queryGraph,
    clearError
  };
}