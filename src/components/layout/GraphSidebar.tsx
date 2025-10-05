'use client';

import React from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Categories } from '@/services/types/graph';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function GraphSidebar() {
  const {
    selectedCategories,
    handleCategoryToggle,
    handleSelectAllCategories,
    handleClearAllCategories,
    searchQuery,
    setSearchQuery,
    sidebarCollapsed,
    setSidebarCollapsed,
    loading,
    getCategoryDisplayName,
    isAllCategoriesSelected,
  } = useFilter();

  if (sidebarCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        {/* Toggle button */}
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors mb-4"
          title="Expandir sidebar"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Compact indicators */}
        <div className="flex flex-col items-center space-y-3">
          {/* Search indicator */}
          {searchQuery && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" title={`Búsqueda: ${searchQuery}`} />
          )}
          
          {/* Category filter indicator */}
          {selectedCategories.length > 0 && selectedCategories.length < Object.values(Categories).length && (
            <div className="w-2 h-2 bg-green-500 rounded-full" title={`${selectedCategories.length} categorías seleccionadas`} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Contraer sidebar"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Category Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-gray-700">Categorías</h3>
            {loading && (
              <div className="text-xs text-blue-600 animate-pulse">
                Actualizando...
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSelectAllCategories}
              disabled={loading}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 transition-colors"
            >
              {isAllCategoriesSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </button>
            <button
              onClick={handleClearAllCategories}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>

          {/* Category checkboxes */}
          <div className="space-y-2">
            {Object.values(Categories).map(category => (
              <label
                key={category}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  disabled={loading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 select-none flex-1">
                  {getCategoryDisplayName(category)}
                </span>
              </label>
            ))}
          </div>

          {/* Selection summary */}
          {selectedCategories.length > 0 && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <span className="font-medium">Filtros activos:</span> {selectedCategories.length} de {Object.values(Categories).length} categorías seleccionadas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}