'use client';

import { useEffect, useState } from 'react';
import { useGraphService } from '@/services';
import { GraphAdapter } from '@/services/adapters/GraphAdapter';
import { Categories } from '@/services/types/graph';
import NodeTypeSelector from './NodeTypeSelector';
import FilterSummary from './FilterSummary';

export default function GraphViewer() {
  const { data, loading, error, queryGraph, clearError } = useGraphService();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      // Convertir strings a Categories enum
      const categoriesEnum = selectedCategories
        .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
        .filter(Boolean) as Categories[];

      await queryGraph({
        selectedCategories: categoriesEnum,
        searchTerm: searchTerm.trim() || undefined
      });
    } catch (err) {
      console.error('Error querying graph:', err);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    queryGraph({ selectedCategories: [] });
  };

  useEffect(() => {
    // Cargar datos iniciales
    queryGraph({ selectedCategories: [] });
  }, [queryGraph]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Visualizador de Grafos</h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>

        {/* Selector de tipos de nodos */}
        <div className="mb-4">
          <NodeTypeSelector
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            disabled={loading}
          />
        </div>

        {/* Búsqueda */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Búsqueda:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar nodos..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Cargando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {/* Botón para aplicar filtros */}
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Aplicando filtros...' : 'Aplicar filtros'}
          </button>
        </div>
      </div>

      {/* Botones de acción rápida */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Acciones rápidas:</span> Usa estos botones para operaciones comunes
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => queryGraph({ selectedCategories: [] })}
              disabled={loading}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Ver todos
            </button>
            <button
              onClick={handleClearFilters}
              disabled={loading}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
            >
              Limpiar todo
            </button>
          </div>
        </div>
      </div>

      {/* Resumen de filtros */}
      <FilterSummary
        selectedCategories={selectedCategories}
        searchTerm={searchTerm}
        onClearFilters={handleClearFilters}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Resultados */}
      {data && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Resultados</h2>
            <div className="text-sm text-gray-600">
              {data.metadata.totalNodes} nodos, {data.metadata.totalEdges} conexiones
            </div>
          </div>

          {/* Nodos */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Nodos ({data.nodes.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.nodes.map(node => {
                const category = GraphAdapter.extractCategoryFromLabel(node.label);
                const displayName = GraphAdapter.extractDisplayName(node.label);

                return (
                  <div key={node.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="font-medium text-sm text-blue-600 mb-1">{category}</div>
                    <div className="font-semibold mb-2">{displayName}</div>
                    <div className="text-xs text-gray-600">
                      {Object.entries(node.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Edges */}
          <div>
            <h3 className="font-medium mb-2">Relaciones ({data.edges.length})</h3>
            <div className="space-y-2">
              {data.edges.map(edge => {
                const displayLabel = GraphAdapter.formatRelationshipLabel(edge.label);

                return (
                  <div key={edge.id} className="flex items-center text-sm bg-gray-50 p-2 rounded">
                    <span className="font-medium">{edge.source}</span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="text-blue-600">{displayLabel}</span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="font-medium">{edge.target}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}