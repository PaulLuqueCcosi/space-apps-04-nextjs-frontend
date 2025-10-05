// Enums y tipos base del API
export enum Categories {
  Publications = "publications",
  Missions = "missions", 
  Experiments = "experiments",
  Authors = "authors",
  Topic = "topic",
  Dataset = "dataset",
  PublicationVenue = "publicationvenue"
}

// Request types
export interface GraphQueryRequest {
  categories: Categories[];
  search?: string;
}

// Response types del API
export interface GraphNode {
  id: string;
  label: string;
  category: Categories;
  data: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface GraphQueryResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    totalNodes: number;
    totalEdges: number;
    categoriesQueried: Categories[];
  };
}