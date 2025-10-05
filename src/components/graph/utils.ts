import { GraphNode as ReagraphNode } from 'reagraph';
import { Categories } from '@/models/GraphModels';
import { getReagraphCategoryConfig } from '@/utils/categoryUtils';

// Configuración de estilos por categoría (ahora usa utilidades centralizadas)
interface CategoryConfig {
  fill: string;
  size: number;
  icon?: string;
}

// Interfaz para los datos del nodo (compatible con GraphNode del modelo)
export interface NodeData {
  id: string;
  label: string;
  category: Categories;
  data?: Record<string, any>; // Datos adicionales específicos del dominio
}

/**
 * Crea un nodo de grafo con estilos basados en la categoría
 */
export function createGraphNode(nodeData: NodeData): ReagraphNode {
  const config = getReagraphCategoryConfig(nodeData.category);

  return {
    id: nodeData.id,
    label: nodeData.label,
    fill: config.fill,
    size: config.size,
    icon: config.icon,
    data: {
      category: nodeData.category,
      ...nodeData.data
    }
  };
}

/**
 * Crea múltiples nodos de grafo
 */
export function createGraphNodes(nodesData: NodeData[]): ReagraphNode[] {
  return nodesData.map(createGraphNode);
}

/**
 * Obtiene la configuración de una categoría específica
 */
export function getCategoryConfig(category: Categories): CategoryConfig {
  return getReagraphCategoryConfig(category);
}

/**
 * Obtiene todas las categorías disponibles
 */
export function getAvailableCategories(): Categories[] {
  return Object.values(Categories);
}

/**
 * Convierte un GraphNode del modelo a un nodo de reagraph
 */
export function convertModelNodeToReagraph(modelNode: import('@/models/GraphModels').GraphNode): ReagraphNode {
  return createGraphNode({
    id: modelNode.id,
    label: modelNode.label,
    category: modelNode.category,
    data: modelNode.data
  });
}

/**
 * Convierte múltiples GraphNodes del modelo a nodos de reagraph
 */
export function convertModelNodesToReagraph(modelNodes: import('@/models/GraphModels').GraphNode[]): ReagraphNode[] {
  return modelNodes.map(convertModelNodeToReagraph);
}