'use client';

import { Categories } from '@/services/types/graph';
import { getCategoryDisplayName } from '@/utils/categoryUtils';

interface NodeTypeSelectorProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  disabled?: boolean;
}

export default function NodeTypeSelector({ 
  selectedCategories, 
  onCategoryChange, 
  disabled = false 
}: NodeTypeSelectorProps) {
  
  const handleCategoryToggle = (category: string) => {
    if (disabled) return;
    
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    onCategoryChange(newSelection);
  };

  const handleSelectAll = () => {
    if (disabled) return;
    
    if (selectedCategories.length === Object.values(Categories).length) {
      onCategoryChange([]);
    } else {
      onCategoryChange(Object.values(Categories));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, category: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCategoryToggle(category);
    }
  };

  const isAllSelected = selectedCategories.length === Object.values(Categories).length;
  const isPartiallySelected = selectedCategories.length > 0 && selectedCategories.length < Object.values(Categories).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Tipos de Nodos:
        </label>
        <button
          onClick={handleSelectAll}
          disabled={disabled}
          className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
        >
          {isAllSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.values(Categories).map(category => (
          <label
            key={category}
            className={`flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${
              selectedCategories.includes(category)
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onKeyDown={(e) => handleKeyDown(e, category)}
            tabIndex={disabled ? -1 : 0}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              tabIndex={-1}
            />
            <span className="text-sm text-gray-700 select-none">
              {getCategoryDisplayName(category)}
            </span>
          </label>
        ))}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="text-xs text-gray-500">
          {selectedCategories.length} de {Object.values(Categories).length} tipos seleccionados
        </div>
      )}
    </div>
  );
}