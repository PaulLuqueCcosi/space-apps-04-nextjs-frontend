
'use client';

import { useEffect } from 'react';
import { useGraphService, GraphServiceFactory } from '@/services';
import { GraphAdapter } from '@/services/adapters/GraphAdapter';

export default function Home() {
  const { data, loading, error, queryGraph } = useGraphService();

  useEffect(() => {
    // Configurar el modo del servicio desde variables de entorno
    const serviceMode = process.env.NEXT_PUBLIC_SERVICE_MODE === 'api' ? 'api' : 'mock';
    GraphServiceFactory.setMode(serviceMode);

    // Cargar datos iniciales
    queryGraph({ selectedCategories: [] });
  }, [queryGraph]);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Graph Data</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Graph Data</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Graph Data</h1>

      {data && (
        <>
          {/* Estadísticas */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Statistics</h2>
            <p className="text-gray-700">
              Total Nodes: {data.metadata.totalNodes} | Total Edges: {data.metadata.totalEdges}
            </p>
          </div>

          {/* Lista de Nodos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Nodes ({data.nodes.length})</h2>
            <div className="space-y-3">
              {data.nodes.map(node => {
                const category = GraphAdapter.extractCategoryFromLabel(node.label);
                const displayName = GraphAdapter.extractDisplayName(node.label);

                return (
                  <div key={node.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {category}
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
            <h2 className="text-2xl font-semibold mb-4">Relationships ({data.edges.length})</h2>
            <div className="space-y-2">
              {data.edges.map(edge => {
                const displayLabel = GraphAdapter.formatRelationshipLabel(edge.label);

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
