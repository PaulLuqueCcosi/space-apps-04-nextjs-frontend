'use client';

import { useState, useCallback } from 'react';
import { GraphData, GraphFilters } from '@/models/GraphModels';
import { graphService } from '@/services/graphService';

export function useGraph() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (filters?: GraphFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await graphService.queryGraph(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchData
  };
}