import { GraphData, GraphFilters } from '@/models/GraphModels';
import { GraphDataResponse } from '@/services/types/graph';
import { GraphAdapter } from './adapters/GraphAdapter';

export async function fetchGraphData(filters: GraphFilters): Promise<GraphData> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const queryParams = GraphAdapter.filtersToQueryParams(filters);
    const url = `${baseUrl}/graph/query?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse: GraphDataResponse = await response.json();
    return GraphAdapter.apiResponseToFrontendData(apiResponse);
  } catch (error) {
    console.error('Error al obtener los datos del grafo:', error);
    throw error;
  }
}
