'use client';

import { useEffect, useCallback } from 'react';
import { useGraph } from './useGraph';
import { useFilter } from '@/contexts/FilterContext';
import { useGraphContext } from '@/contexts/GraphContext';
import { Categories } from '@/models/GraphModels';

export function useGraphWithFilters() {
  const { data, loading, error, fetchData } = useGraph();
  const { selectedCategories, searchQuery, setLoading } = useFilter();
  const { graphData, forceUpdateGraphData } = useGraphContext();

  // Función para aplicar filtros de búsqueda a los datos
  const getFilteredData = useCallback(() => {
    // Usar datos del contexto global que siempre están actualizados
    const sourceData = graphData;
    if (!sourceData) return null;

    if (!searchQuery.trim()) {
      // Agregar size por defecto a todos los edges cuando no hay filtros
      return {
        ...sourceData,
        edges: sourceData.edges.map(edge => ({
          ...edge,
          size: 2
        }))
      };
    }

    const query = searchQuery.toLowerCase().trim();

    // Filtrar nodos que coincidan con la búsqueda
    const filteredNodes = sourceData.nodes.filter(node => {
      const label = node.label?.toLowerCase() || '';
      const id = node.id?.toLowerCase() || '';
      return label.includes(query) || id.includes(query);
    });

    // Obtener IDs de nodos filtrados
    const filteredNodeIds = new Set(filteredNodes.map(node => node.id));

    // Filtrar edges que conecten nodos filtrados y agregar size por defecto
    const filteredEdges = sourceData.edges
      .filter(edge =>
        filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
      )
      .map(edge => ({
        ...edge,
        size: 2 // Agregar grosor por defecto de 2
      }));

    return {
      nodes: filteredNodes,
      edges: filteredEdges
    };
  }, [graphData, searchQuery]);

  // Función para refrescar datos con filtros actuales
  const refreshData = useCallback(async () => {
    const categoryEnums = selectedCategories
      .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
      .filter(Boolean) as Categories[];

    console.log('🔄 Refreshing data with categories:', categoryEnums);
    const newData = await fetchData({ selectedCategories: categoryEnums });
    
    // Forzar actualización del contexto global (sobrescribe datos del AI)
    if (newData) {
      console.log('📊 Force updating context with filter data:', newData);
      forceUpdateGraphData(newData);
    }
  }, [selectedCategories, fetchData, forceUpdateGraphData]);

  // Efecto para cargar datos cuando cambien las categorías
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sincronizar estado de loading con el contexto
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  // Nota: La sincronización se maneja ahora directamente en refreshData
  // para evitar actualizaciones duplicadas del contexto

  return {
    data: getFilteredData(),
    rawData: graphData, // Usar datos del contexto global
    loading,
    error,
    refreshData,
    hasActiveFilters: selectedCategories.length > 0 || searchQuery.trim().length > 0,
    searchQuery,
    selectedCategories
  };
}