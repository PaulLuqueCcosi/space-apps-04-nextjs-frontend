import { GraphDataResponse, GraphFiltersRequest, Categories } from '@/services/types/graph';
import { GraphData, GraphFilters } from '@/models/GraphModels';

export class GraphAdapter {
  // Convert frontend filters to API request
  static filtersToApiRequest(filters: GraphFilters): GraphFiltersRequest {
    return {
      categories: filters.selectedCategories, // Already Categories[], no conversion needed
      search: filters.searchTerm
    };
  }

  // Convert frontend filters to API query parameters
  static filtersToQueryParams(filters: GraphFilters): URLSearchParams {
    const params = new URLSearchParams();

    if (filters.selectedCategories.length > 0) {
      // Convert Categories[] to string for URL
      params.append('categories', filters.selectedCategories.map(cat => cat.toString()).join(','));
    }

    if (filters.searchTerm) {
      params.append('search', filters.searchTerm);
    }

    return params;
  }

  // Convert string categories to enum
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

  // Convert enum to string for frontend
  static categoriesToString(categories: Categories[]): string[] {
    return categories.map(cat => cat.toString());
  }

  // Convert API response to frontend data format
  static apiResponseToFrontendData(response: GraphDataResponse): GraphData {
    return {
      nodes: response.nodes.map(node => ({
        id: node.id.toString(),
        label: node.label,
        category: stringToCategory(node.type || ''),
        data: node.data
      })),
      edges: response.edges.map(edge => ({
        id: edge.id.toString(),
        source: edge.source.toString(),
        target: edge.target.toString(),
        label: edge.label
      })),
      metadata: response.metadata
    };
  }

  // Utility methods to extract information from data
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
function stringToCategory(value: string): Categories {
  console.log("stringToCategory")
  console.log(value)
  const match = Object.values(Categories).find(v => v === value);
  return (match as Categories) ?? Categories.Publications;
}