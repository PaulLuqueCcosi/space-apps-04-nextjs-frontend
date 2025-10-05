'use client';

import { useEffect, useState, useCallback } from 'react';
import { useGraph } from '@/hooks/useGraph';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';
import CategoryFilter from '@/components/CategoryFilter';
import { Categories } from '@/models/GraphModels';
import { GraphLayout, convertModelNodesToReagraph } from '@/components';
import { GraphCanvas } from 'reagraph';

export default function Home() {
  const { data, loading, error, fetchData } = useGraph();
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>(Object.values(Categories));
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Cargar datos solo una vez al montar y cuando cambien las categorías
  useEffect(() => {
    fetchData({ selectedCategories });
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [selectedCategories, fetchData]);

  const handleFilterChange = useCallback((categories: string[]) => {
    // Convertir strings a Categories enum
    const categoryEnums = categories
      .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
      .filter(Boolean) as Categories[];

    setSelectedCategories(categoryEnums);
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    console.log('Nodo clickeado:', node);
    setSelectedNode(node);
  }, []);

  const handleEdgeClick = useCallback((edge: any) => {
    console.log('Edge clickeado:', edge);
    const displayLabel = formatRelationship(edge.label || '');
    alert(`Conexión: ${edge.source} → ${displayLabel} → ${edge.target}`);
  }, []);

  // Solo mostrar loading completo en la carga inicial
  if (loading && initialLoad) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>

      {/* Filtro de categorías con indicador de carga sutil */}
      <div className="relative">
        <CategoryFilter
          onFilterChange={handleFilterChange}
          loading={loading}
        />
        {loading && !initialLoad && (
          <div className="absolute top-2 right-2 text-sm text-blue-600 animate-pulse">
            Actualizando...
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

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

          {/* Grafo Interactivo */}
          {data.nodes.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Visualización del Grafo</h2>
              <div className="h-[600px] w-full border rounded-lg">
                <GraphLayout
                  nodes={convertModelNodesToReagraph(data.nodes)}
                  edges={data.edges}
                  onNodeClick={handleNodeClick}
                  onEdgeClick={handleEdgeClick}
                  labelType="nodes"
                  // className="h-full w-full"
                  // cameraMode='rotate'
                  // draggable={true}
                  
                />
              </div>
            </div>
          )}

          {/* Panel de información del nodo seleccionado */}
          {selectedNode && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Información del Nodo</h2>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {selectedNode.data?.category}
                  </span>
                  <span className="font-semibold text-lg">{extractDisplayName(selectedNode.label)}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  ID: {selectedNode.id}
                </div>
                {selectedNode.data && Object.keys(selectedNode.data).length > 0 && (
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-800">Datos adicionales:</h4>
                    {Object.entries(selectedNode.data).map(([key, value]) => (
                      <div key={key} className="text-sm text-gray-600">
                        <strong>{key}:</strong> {String(value)}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setSelectedNode(null)}
                  className="mt-3 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* Lista compacta de conexiones */}
          {data.edges.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Conexiones ({data.edges.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.edges.map(edge => {
                  const displayLabel = formatRelationship(edge.label);
                  return (
                    <div key={edge.id} className="p-3 bg-gray-50 rounded text-sm">
                      <div className="font-medium text-gray-800 truncate">{edge.source}</div>
                      <div className="text-blue-600 text-center my-1">↓ {displayLabel} ↓</div>
                      <div className="font-medium text-gray-800 truncate">{edge.target}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}