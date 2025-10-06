'use client';

import { useEffect, useCallback } from 'react';
import { useGraph } from './useGraph';
import { useFilter } from '@/contexts/FilterContext';
import { Categories } from '@/models/GraphModels';

export function useGraphWithFilters() {
  const { data, loading, error, fetchData } = useGraph();
  const { selectedCategories, searchQuery, setLoading } = useFilter();

  // Función para aplicar filtros de búsqueda a los datos
  const getFilteredData = useCallback(() => {
    if (!data) return null;

    if (!searchQuery.trim()) {
      // Agregar size por defecto a todos los edges cuando no hay filtros
      return {
        ...data,
        edges: data.edges.map(edge => ({
          ...edge,
          size: edge.size || 2
        }))
      };
    }

    const query = searchQuery.toLowerCase().trim();

    // Filtrar nodos que coincidan con la búsqueda
    const filteredNodes = data.nodes.filter(node => {
      const label = node.label?.toLowerCase() || '';
      const id = node.id?.toLowerCase() || '';
      return label.includes(query) || id.includes(query);
    });

    // Obtener IDs de nodos filtrados
    const filteredNodeIds = new Set(filteredNodes.map(node => node.id));

    // Filtrar edges que conecten nodos filtrados y agregar size por defecto
    const filteredEdges = data.edges
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
  }, [data, searchQuery]);

  // Función para refrescar datos con filtros actuales
  const refreshData = useCallback(async () => {
    const categoryEnums = selectedCategories
      .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
      .filter(Boolean) as Categories[];

    await fetchData({ selectedCategories: categoryEnums });
  }, [selectedCategories, fetchData]);

  // Efecto para cargar datos cuando cambien las categorías
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sincronizar estado de loading con el contexto
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return {
    data: getFilteredData(),
    rawData: data,
    loading,
    error,
    refreshData,
    hasActiveFilters: selectedCategories.length > 0 || searchQuery.trim().length > 0,
    searchQuery,
    selectedCategories
  };
}