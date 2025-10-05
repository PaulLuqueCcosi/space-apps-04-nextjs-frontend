'use client';

import { Categories } from '@/services/types/graph';

interface FilterSummaryProps {
  selectedCategories: string[];
  searchTerm: string;
  onClearFilters: () => void;
}

export default function FilterSummary({ 
  selectedCategories, 
  searchTerm, 
  onClearFilters 
}: FilterSummaryProps) {
  
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

  const hasFilters = selectedCategories.length > 0 || searchTerm.trim().length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Filtros aplicados:</h4>
          
          <div className="space-y-1">
            {selectedCategories.length > 0 && (
              <div className="text-sm text-blue-700">
                <span className="font-medium">Tipos de nodos:</span>{' '}
                {selectedCategories.map(cat => getCategoryDisplayName(cat)).join(', ')}
              </div>
            )}
            
            {searchTerm.trim() && (
              <div className="text-sm text-blue-700">
                <span className="font-medium">Búsqueda:</span> "{searchTerm.trim()}"
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={onClearFilters}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}