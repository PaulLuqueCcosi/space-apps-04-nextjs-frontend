import { GraphData, GraphFilters, Categories } from '@/models/GraphModels';
import { GraphAdapter } from './adapters/GraphAdapter';

// Datos mock simples
const mockData: GraphData = {
    nodes: [
        {
            id: "1",
            label: "Publication: AI and Education",
            category: Categories.Publications,
            data: { author: "John Perez", year: 2023 }
        },
        {
            id: "2",
            label: "Mission: Alpha",
            category: Categories.Missions,
            data: { location: "Peru", status: "Ongoing" }
        },
        {
            id: "3",
            label: "Author: Ana Lopez",
            category: Categories.Authors,
            data: { affiliation: "UNSA", hIndex: 12 }
        },
        {
            id: "4",
            label: "Publication Venue: AI Journal",
            category: Categories.PublicationVenue,
            data: { impactFactor: 3.5 }
        }
    ],
    edges: [
        {
            id: "e1",
            source: "3",
            target: "1",
            label: "is_author_of"
        },
        {
            id: "e2",
            source: "1",
            target: "4",
            label: "published_in"
        },
        {
            id: "e3",
            source: "1",
            target: "2",
            label: "supports"
        }
    ],
    metadata: {
        totalNodes: 4,
        totalEdges: 3,
        categoriesQueried: []
    }
};

// Servicio simple que puede ser mock o API
export const graphService = {
    async queryGraph(filters: GraphFilters = { selectedCategories: [] }): Promise<GraphData> {
        const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== 'api';

        if (isMock) {
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData;
        }

        // Llamada real al API
        const params = GraphAdapter.filtersToQueryParams(filters);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/graph/query?${params}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const apiResponse = await response.json();
        return GraphAdapter.apiResponseToFrontendData(apiResponse);
    }
};