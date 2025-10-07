import { Categories } from '@/services/types/graph';

// Modelos del frontend - por ahora iguales al API, pero separados para futura flexibilidad
export interface GraphNode {
  id: string;
  label: string;
  category: Categories;
  data: Record<string, any>;
  /**
   * Indica si el nodo debe mostrarse normalmente (true) o con estilo opaco/gris (false).
   * Los nodos con highlighted: false aparecen más pequeños, grises y semi-transparentes,
   * pero siguen siendo interactivos (se puede hacer click en ellos).
   */
  highlighted: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    totalNodes: number;
    totalEdges: number;
    categoriesQueried: Categories[];
  };
  ai_response: string;
}

export interface GraphFilters {
  selectedCategories: Categories[];
  searchTerm?: string;
}

// Tipos para el estado de la aplicación
export interface GraphState {
  data: GraphData | null;
  loading: boolean;
  error: string | null;
  filters: GraphFilters;
}

// Re-exportamos los tipos del API como alias para mantener compatibilidad
export { Categories } from '@/services/types/graph';