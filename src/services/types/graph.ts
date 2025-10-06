// Enums y tipos base del API
export enum Categories {
  Publications = "Article",
  Authors = "Author",
  PublicationVenue = "Journal",
  // no se tiene
  // Missions = "missions", 
  // Experiments = "experiments",
  // Topic = "topic",
  // Dataset = "dataset"
}

// ---------------Request types------------
export interface GraphFiltersRequest {
  categories: Categories[];
  search?: string;
}

// ------------ Response types del API --------
export interface GraphNodeResponse {
  id: string;
  label: string;
  category: Categories;
  data: Record<string, any>;
  type: string;
  related: boolean
}

export interface GraphEdgeResponse {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface GraphDataResponse {
  nodes: GraphNodeResponse[];
  edges: GraphEdgeResponse[];
  metadata: {
    totalNodes: number;
    totalEdges: number;
    categoriesQueried: Categories[];
  };
  ai_response: string;
}