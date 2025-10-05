import { Categories, GraphDataResponse, GraphFiltersRequest } from '@/services/types/graph';

// Datos mock usando tipos del API
const mockApiResponse: GraphDataResponse = {
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

// Servicio que siempre usa tipos del API
export const graphService = {
    async queryGraph(request: GraphFiltersRequest): Promise<GraphDataResponse> {
        const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== 'api';

        if (isMock) {
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Filtrar datos mock según el request
            let filteredResponse = { ...mockApiResponse };

            if (request.categories.length > 0) {
                filteredResponse.nodes = mockApiResponse.nodes.filter(node =>
                    request.categories.includes(node.category)
                );

                const nodeIds = new Set(filteredResponse.nodes.map(n => n.id));
                filteredResponse.edges = mockApiResponse.edges.filter(edge =>
                    nodeIds.has(edge.source) && nodeIds.has(edge.target)
                );

                filteredResponse.metadata = {
                    totalNodes: filteredResponse.nodes.length,
                    totalEdges: filteredResponse.edges.length,
                    categoriesQueried: request.categories
                };
            }

            if (request.search) {
                const searchLower = request.search.toLowerCase();
                filteredResponse.nodes = filteredResponse.nodes.filter(node =>
                    node.label.toLowerCase().includes(searchLower) ||
                    Object.values(node.data).some(value =>
                        String(value).toLowerCase().includes(searchLower)
                    )
                );

                const nodeIds = new Set(filteredResponse.nodes.map(n => n.id));
                filteredResponse.edges = filteredResponse.edges.filter(edge =>
                    nodeIds.has(edge.source) && nodeIds.has(edge.target)
                );

                filteredResponse.metadata.totalNodes = filteredResponse.nodes.length;
                filteredResponse.metadata.totalEdges = filteredResponse.edges.length;
            }

            return filteredResponse;
        }

        // Llamada real al API
        const params = new URLSearchParams();
        if (request.categories.length > 0) {
            params.append('categories', request.categories.join(','));
        }
        if (request.search) {
            params.append('search', request.search);
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/graph/query?${params}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }
};