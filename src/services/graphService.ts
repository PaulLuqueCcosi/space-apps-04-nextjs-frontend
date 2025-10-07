import { GraphDataResponse, GraphFiltersRequest, AnalyzeNodesRequest, AnalyzeNodesResponse } from '@/services/types/graph';
import { mockApiResponse } from './graphMockData';
import axios from 'axios';

export const graphService = {
    async queryGraph(request: GraphFiltersRequest): Promise<GraphDataResponse> {
        console.log("ingresa aqui en el servicio")
        const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== 'api';

        if (isMock) {
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Si no hay categorías seleccionadas, retornar vacío
            if (request.categories.length === 0) {
                return {
                    nodes: [],
                    edges: [],
                    metadata: {
                        totalNodes: 0,
                        totalEdges: 0,
                        categoriesQueried: []
                    },
                    ai_response: ""
                };
            }

            // Filtrar datos mock según el request
            let filteredResponse = { ...mockApiResponse };

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
            params.append('query', request.search);
        }
        // console.log("aquiii")
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const fullUrl = `${apiUrl}/graph/query?${params.toString()}`;
        // console.log("🌍 Axios GET:", fullUrl);

        // ✅ Llamada con axios
        const response = await axios.get<GraphDataResponse>(fullUrl, {
            headers: { 'Content-Type': 'application/json' },
        });

        // console.log("✅ API response:", response.data);
        return response.data;

    },

    async analyzeNodes(request: AnalyzeNodesRequest): Promise<AnalyzeNodesResponse> {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const params = new URLSearchParams({
            first_node_id: request.first_node_id.toString(),
            second_node_id: request.second_node_id.toString()
        });

        const fullUrl = `${apiUrl}/graph/analyze?${params.toString()}`;
        // console.log("🔍 Analyzing nodes:", fullUrl);

        const response = await axios.get<AnalyzeNodesResponse>(fullUrl, {
            headers: { 'Content-Type': 'application/json' },
        });

        // console.log("✅ Analyze response:", response.data);
        return response.data;
    }
};