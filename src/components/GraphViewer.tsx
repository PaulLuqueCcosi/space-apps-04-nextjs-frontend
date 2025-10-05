'use client';

import { useEffect, useState } from 'react';
import { useGraphService } from '@/services';
import { Categories } from '@/services/types/graph';
import { GraphAdapter } from '@/services/adapters/GraphAdapter';

export default function GraphViewer() {
  const { data, loading, error, queryGraph, clearError } = useGraphService();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      await queryGraph({
        selectedCategories,
        searchTerm: searchTerm.trim() || undefined
      });
    } catch (err) {
      console.error('Error querying graph:', err);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    // Cargar datos iniciales
    queryGraph({ selectedCategories: [] });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Graph Viewer</h1>
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        {/* Categorías */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Categories:</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(Categories).map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Búsqueda */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search nodes..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

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
            <h2 className="text-lg font-semibold">Results</h2>
            <div className="text-sm text-gray-600">
              {data.metadata.totalNodes} nodes, {data.metadata.totalEdges} edges
            </div>
          </div>

          {/* Nodos */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Nodes ({data.nodes.length})</h3>
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
            <h3 className="font-medium mb-2">Relationships ({data.edges.length})</h3>
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