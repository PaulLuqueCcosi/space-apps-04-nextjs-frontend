import { GraphData, GraphFilters } from '@/models/GraphModels';

// Abstracción del servicio para permitir diferentes implementaciones
export interface IGraphService {
  queryGraph(filters: GraphFilters): Promise<GraphData>;
}

// Resultado de operaciones del servicio
export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export abstract class BaseGraphService implements IGraphService {
  abstract queryGraph(filters: GraphFilters): Promise<GraphData>;
  
  protected handleError(error: unknown): never {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Graph Service Error: ${message}`);
  }
}