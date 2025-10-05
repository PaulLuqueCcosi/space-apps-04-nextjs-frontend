import { BaseGraphService } from './abstractions/IGraphService';
import { GraphData, GraphFilters, GraphNode, GraphEdge } from '@/models/GraphModels';
import { GraphAdapter } from './adapters/GraphAdapter';

export class MockGraphService extends BaseGraphService {
  private mockData: GraphData = {
    nodes: [
      {
        id: "1",
        label: "Publication: AI and Education",
        data: { author: "John Perez", year: 2023, citations: 45 }
      },
      {
        id: "2", 
        label: "Mission: Alpha",
        data: { location: "Peru", status: "Ongoing", budget: 50000 }
      },
      {
        id: "3",
        label: "Author: Ana Lopez", 
        data: { affiliation: "UNSA", hIndex: 12, publications: 25 }
      },
      {
        id: "4",
        label: "Publication Venue: AI Journal",
        data: { impactFactor: 3.5, publisher: "Tech Press" }
      },
      {
        id: "5",
        label: "Experiment: Neural Networks Study",
        data: { duration: "6 months", participants: 100, status: "Completed" }
      }
    ],
    edges: [
      {
        id: "e1",
        source: "1", 
        target: "2",
        label: "participates_in"
      },
      {
        id: "e2",
        source: "3",
        target: "1", 
        label: "is_author_of"
      },
      {
        id: "e3",
        source: "1",
        target: "4",
        label: "published_in"
      },
      {
        id: "e4",
        source: "5",
        target: "1",
        label: "supports"
      }
    ],
    metadata: {
      totalNodes: 5,
      totalEdges: 4,
      categoriesQueried: ["publications", "missions", "authors", "publicationvenue", "experiments"]
    }
  };

  async queryGraph(filters: GraphFilters): Promise<GraphData> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      let filteredNodes = this.mockData.nodes;
      let filteredEdges = this.mockData.edges;

      // Filtrar por categorías
      if (filters.selectedCategories.length > 0) {
        filteredNodes = filteredNodes.filter(node => {
          const category = GraphAdapter.extractCategoryFromLabel(node.label);
          return filters.selectedCategories.includes(category);
        });
        
        const nodeIds = new Set(filteredNodes.map(n => n.id));
        filteredEdges = filteredEdges.filter(edge => 
          nodeIds.has(edge.source) && nodeIds.has(edge.target)
        );
      }

      // Filtrar por búsqueda
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredNodes = filteredNodes.filter(node => {
          const displayName = GraphAdapter.extractDisplayName(node.label);
          return displayName.toLowerCase().includes(searchLower) ||
            Object.values(node.data).some(value => 
              String(value).toLowerCase().includes(searchLower)
            );
        });
        
        const nodeIds = new Set(filteredNodes.map(n => n.id));
        filteredEdges = filteredEdges.filter(edge => 
          nodeIds.has(edge.source) && nodeIds.has(edge.target)
        );
      }

      return {
        nodes: filteredNodes,
        edges: filteredEdges,
        metadata: {
          totalNodes: filteredNodes.length,
          totalEdges: filteredEdges.length,
          categoriesQueried: filters.selectedCategories
        }
      };
    } catch (error) {
      this.handleError(error);
    }
  }
}