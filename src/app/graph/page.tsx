'use client';

import { useEffect, useState, useCallback } from 'react';
import { useGraph } from '@/hooks/useGraph';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';
import CategoryFilter from '@/components/CategoryFilter';
import { Categories } from '@/models/GraphModels';
import { GraphLayout, convertModelNodesToReagraph } from '@/components';
import ResizableSplitPanel from '@/components/ResizableSplitPanel';

export default function GraphPage() {
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

  // Panel izquierdo - Filtros y controles
  const leftPanel = (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        
        {/* Filtro de categorías con indicador de carga sutil */}
        <div className="relative">
          <CategoryFilter
            onFilterChange={handleFilterChange}
            loading={loading}
          />
          {loading && !initialLoad && (
            <div className="mt-2 text-sm text-blue-600 animate-pulse">
              Actualizando...
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      {data && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
          <p className="text-sm text-gray-700">
            Nodos: {data.metadata.totalNodes}
          </p>
          <p className="text-sm text-gray-700">
            Conexiones: {data.metadata.totalEdges}
          </p>
          {selectedCategories.length > 0 && (
            <p className="text-xs text-blue-600 mt-2">
              Filtrado por {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      {/* Panel de información del nodo seleccionado */}
      {selectedNode && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Nodo Seleccionado</h3>
          <div className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {selectedNode.data?.category}
              </span>
            </div>
            <div className="font-semibold text-sm mb-1">
              {extractDisplayName(selectedNode.label)}
            </div>
            <div className="text-xs text-gray-600 mb-2">
              ID: {selectedNode.id}
            </div>
            {selectedNode.data && Object.keys(selectedNode.data).length > 0 && (
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800 text-sm">Datos:</h4>
                {Object.entries(selectedNode.data).map(([key, value]) => (
                  <div key={key} className="text-xs text-gray-600">
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="mt-3 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Lista compacta de conexiones */}
      {/* {data && data.edges.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Conexiones ({data.edges.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {data.edges.slice(0, 10).map(edge => {
              const displayLabel = formatRelationship(edge.label);
              return (
                <div key={edge.id} className="p-2 bg-gray-50 rounded text-xs">
                  <div className="font-medium text-gray-800 truncate">{edge.source}</div>
                  <div className="text-blue-600 text-center my-1">↓ {displayLabel} ↓</div>
                  <div className="font-medium text-gray-800 truncate">{edge.target}</div>
                </div>
              );
            })}
            {data.edges.length > 10 && (
              <div className="text-xs text-gray-500 text-center py-2">
                ... y {data.edges.length - 10} conexiones más
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );

  // Panel derecho - Visualización del grafo
  const rightPanel = (
    <div className="p-4 h-full">
      <h1 className="text-3xl font-bold mb-4">Visualización del Grafo</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {data && (
        <>
          {/* Mensaje cuando no hay resultados */}
          {data.nodes.length === 0 && selectedCategories.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Sin resultados</h3>
              <p className="text-yellow-700">
                No se encontraron nodos para las categorías seleccionadas.
                Intenta seleccionar diferentes categorías o limpiar los filtros.
              </p>
            </div>
          )}

          {/* Grafo Interactivo */}
          {data.nodes.length > 0 && (
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Grafo Interactivo</h2>
              </div>
              <div className="flex-1 p-4">
                <div className="h-full w-full border rounded-lg">
                  <GraphLayout
                    nodes={convertModelNodesToReagraph(data.nodes)}
                    edges={data.edges}
                    onNodeClick={handleNodeClick}
                    onEdgeClick={handleEdgeClick}
                    labelType="all"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      <ResizableSplitPanel
        leftPanel={leftPanel}
        rightPanel={rightPanel}
        defaultLeftWidth={350}
        minLeftWidth={250}
        // maxLeftWidth={500}
        className="flex-1"
      />
    </div>
  );
}