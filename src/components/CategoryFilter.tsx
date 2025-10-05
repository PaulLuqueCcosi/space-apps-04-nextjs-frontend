'use client';

import { useState } from 'react';
import { Categories } from '@/services/types/graph';

interface CategoryFilterProps {
  onFilterChange: (selectedCategories: string[]) => void;
  loading?: boolean;
}

export default function CategoryFilter({ onFilterChange, loading = false }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryDisplayName = (category: string): string => {
    const displayNames: Record<string, string> = {
      [Categories.Publications]: 'Publicaciones',
      [Categories.Missions]: 'Misiones',
      [Categories.Experiments]: 'Experimentos',
      [Categories.Authors]: 'Autores',
      [Categories.Topic]: 'Temas',
      [Categories.Dataset]: 'Datasets',
      [Categories.PublicationVenue]: 'Venues de Publicación'
    };
    return displayNames[category] || category;
  };

  const handleCategoryToggle = (category: string) => {
    if (loading) return;
    
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelection);
    onFilterChange(newSelection);
  };

  const handleSelectAll = () => {
    if (loading) return;
    
    const allCategories = Object.values(Categories);
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
      onFilterChange([]);
    } else {
      setSelectedCategories(allCategories);
      onFilterChange(allCategories);
    }
  };

  const handleClearAll = () => {
    if (loading) return;
    setSelectedCategories([]);
    onFilterChange([]);
  };

  const isAllSelected = selectedCategories.length === Object.values(Categories).length;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Filtrar por Categorías</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar'} filtros
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Botones de acción */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSelectAll}
              disabled={loading}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
            >
              {isAllSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </button>
            <button
              onClick={handleClearAll}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Limpiar filtros
            </button>
          </div>

          {/* Checkboxes de categorías */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.values(Categories).map(category => (
              <label
                key={category}
                className={`flex items-center space-x-2 p-2 rounded border cursor-pointer transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-50 border-blue-200'
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
                <span className="text-sm text-gray-700 select-none">
                  {getCategoryDisplayName(category)}
                </span>
              </label>
            ))}
          </div>

          {/* Resumen de selección */}
          {selectedCategories.length > 0 && (
            <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
              <span className="font-medium">Filtros activos:</span> {selectedCategories.length} de {Object.values(Categories).length} categorías seleccionadas
            </div>
          )}
        </div>
      )}

      {/* Indicador compacto cuando está colapsado */}
      {!isExpanded && selectedCategories.length > 0 && (
        <div className="text-sm text-blue-600">
          {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''} seleccionada{selectedCategories.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}