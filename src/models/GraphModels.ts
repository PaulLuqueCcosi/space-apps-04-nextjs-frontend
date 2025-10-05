// Modelos del frontend - por ahora iguales al API, pero separados para futura flexibilidad
export interface GraphNode {
  id: string;
  label: string;
  data: Record<string, any>;
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
    categoriesQueried: string[];
  };
}

export interface GraphFilters {
  selectedCategories: string[];
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
export type { Categories } from '@/types/graph';