import { GraphQueryResponse, Categories } from '@/types/graph';
import { GraphData, GraphFilters } from '@/models/GraphModels';

export class GraphAdapter {
  // Convierte filtros del frontend a parámetros de query del API
  static filtersToQueryParams(filters: GraphFilters): URLSearchParams {
    const params = new URLSearchParams();
    
    if (filters.selectedCategories.length > 0) {
      params.append('categories', filters.selectedCategories.join(','));
    }
    
    if (filters.searchTerm) {
      params.append('search', filters.searchTerm);
    }
    
    return params;
  }

  // Convierte categorías string a enum
  static stringToCategories(categories: string[]): Categories[] {
    return categories
      .map(cat => {
        const enumValue = Object.values(Categories).find(
          value => value === cat.toLowerCase()
        );
        return enumValue;
      })
      .filter(Boolean) as Categories[];
  }

  // Por ahora es una conversión directa, pero mantiene la abstracción para futuros cambios
  static apiResponseToFrontendData(response: GraphQueryResponse): GraphData {
    return {
      nodes: response.nodes,
      edges: response.edges,
      metadata: response.metadata
    };
  }

  // Métodos utilitarios para extraer información de los datos
  static extractCategoryFromLabel(label: string): string {
    const colonIndex = label.indexOf(':');
    if (colonIndex > 0) {
      return label.substring(0, colonIndex).toLowerCase().trim();
    }
    return 'unknown';
  }

  static extractDisplayName(label: string): string {
    const colonIndex = label.indexOf(':');
    if (colonIndex > 0 && colonIndex < label.length - 1) {
      return label.substring(colonIndex + 1).trim();
    }
    return label;
  }

  static formatRelationshipLabel(relationshipType: string): string {
    return relationshipType
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .trim();
  }
}