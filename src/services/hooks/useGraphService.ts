'use client';

import { useState, useCallback, useEffect } from 'react';
import { GraphServiceFactory } from '../GraphServiceFactory';
import { GraphData, GraphFilters, GraphState } from '@/models/GraphModels';

export function useGraphService() {
  const [state, setState] = useState<GraphState>({
    data: null,
    loading: false,
    error: null,
    filters: {
      selectedCategories: [],
      searchTerm: undefined
    }
  });

  const queryGraph = useCallback(async (filters: GraphFilters) => {
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null,
      filters 
    }));

    try {
      const service = GraphServiceFactory.getService();
      const data = await service.queryGraph(filters);
      
      setState(prev => ({
        ...prev,
        data,
        loading: false,
        error: null
      }));
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        data: null
      }));
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      filters: {
        selectedCategories: [],
        searchTerm: undefined
      }
    });
  }, []);

  return {
    ...state,
    queryGraph,
    clearError,
    reset,
    isReady: !state.loading && !state.error
  };
}