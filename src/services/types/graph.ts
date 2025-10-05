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
}