
'use client';

import { useEffect, useState } from 'react';
import { useGraph } from '@/hooks/useGraph';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';
import CategoryFilter from '@/components/CategoryFilter';
import { Categories } from '@/models/GraphModels';

export default function Home() {
  const { data, loading, error, fetchData } = useGraph();
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);

  useEffect(() => {
    fetchData({ selectedCategories });
  }, [fetchData, selectedCategories]);

  const handleFilterChange = (categories: string[]) => {
    // Convertir strings a Categories enum
    const categoryEnums = categories
      .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
      .filter(Boolean) as Categories[];
    
    setSelectedCategories(categoryEnums);
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>

      {/* Filtro de categorías */}
      <CategoryFilter
        onFilterChange={handleFilterChange}
        loading={loading}
      />

      {data && (
        <>
          {/* Mensaje cuando no hay resultados */}
          {data.nodes.length === 0 && selectedCategories.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Sin resultados</h3>
              <p className="text-yellow-700">
                No se encontraron nodos para las categorías seleccionadas.
                Intenta seleccionar diferentes categorías o limpiar los filtros.
              </p>
            </div>
          )}

          {/* Estadísticas */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
            <p className="text-gray-700">
              Total de Nodos: {data.metadata.totalNodes} | Total de Conexiones: {data.metadata.totalEdges}
            </p>
            {selectedCategories.length > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                Mostrando resultados filtrados por {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Lista de Nodos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Nodos ({data.nodes.length})</h2>
            <div className="space-y-3">
              {data.nodes.map(node => {
                const displayName = extractDisplayName(node.label);

                return (
                  <div key={node.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {node.category}
                      </span>
                      <span className="font-semibold">{displayName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      ID: {node.id}
                    </div>
                    {Object.keys(node.data).length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        {Object.entries(node.data).map(([key, value]) => (
                          <span key={key} className="mr-3">
                            <strong>{key}:</strong> {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de Relaciones */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Relaciones ({data.edges.length})</h2>
            <div className="space-y-2">
              {data.edges.map(edge => {
                const displayLabel = formatRelationship(edge.label);

                return (
                  <div key={edge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-800">{edge.source}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-blue-600 font-medium">{displayLabel}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-gray-800">{edge.target}</span>
                    </div>
                    <span className="text-xs text-gray-500">ID: {edge.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
