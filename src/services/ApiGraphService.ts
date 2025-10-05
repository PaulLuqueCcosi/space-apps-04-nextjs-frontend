import { BaseGraphService } from './abstractions/IGraphService';
import { GraphData, GraphFilters } from '@/models/GraphModels';
import { GraphQueryResponse } from '@/types/graph';
import { GraphAdapter } from './adapters/GraphAdapter';

export class ApiGraphService extends BaseGraphService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') {
    super();
    this.baseUrl = baseUrl;
  }

  async queryGraph(filters: GraphFilters): Promise<GraphData> {
    try {
      const queryParams = GraphAdapter.filtersToQueryParams(filters);
      const url = `${this.baseUrl}/graph/query?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: GraphQueryResponse = await response.json();
      return GraphAdapter.apiResponseToFrontendData(apiResponse);

    } catch (error) {
      this.handleError(error);
    }
  }
}