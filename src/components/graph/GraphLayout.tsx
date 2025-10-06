'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useMemo } from 'react';
import type { 
  GraphNode as ReagraphNode, 
  GraphEdge as ReagraphEdge,
  InternalGraphNode,
  InternalGraphEdge,
  CollapseProps,
  ThreeEvent
} from 'reagraph';

// Importación dinámica para evitar problemas de SSR
const GraphCanvas = dynamic(
  () => import('reagraph').then((mod) => mod.GraphCanvas),
  { ssr: false }
);

// Re-exportamos los tipos de reagraph para uso externo
export type { ReagraphNode as GraphNode, ReagraphEdge as GraphEdge };

// Props del componente
interface GraphLayoutProps {
  nodes: ReagraphNode[];
  edges: ReagraphEdge[];
  onNodeClick?: (node: ReagraphNode) => void;
  onEdgeClick?: (edge: ReagraphEdge) => void;
  className?: string;
  labelType?: 'all' | 'nodes' | 'edges' | 'none';
  children?: ReactNode;
  selectedNodeId?: string | null;
  selectedEdgeId?: string | null;
}

export const GraphLayout = ({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  className = 'h-full w-full',
  labelType = 'all',
  children,
  selectedNodeId,
  selectedEdgeId
}: GraphLayoutProps) => {
  // Modificamos los nodos para resaltar el seleccionado con un borde brillante
  const processedNodes = useMemo(() => {
    return nodes.map(node => {
      if (selectedNodeId && node.id === selectedNodeId) {
        return {
          ...node,
          fill: '#1eedaf', // Color azul para nodo seleccionado
          size: node.size!! * 1.2, // Aumentar tamaño 50%
        };
      }
      return node;
    });
  }, [nodes, selectedNodeId]);

  // Modificamos los edges para resaltar el seleccionado
  const processedEdges = useMemo(() => {
    return edges.map(edge => {
      if (selectedEdgeId && edge.id === selectedEdgeId) {
        return {
          ...edge,
          // size: (edge.size || 1) * 2, // Aumentar grosor
        };
      }
      return edge;
    });
  }, [edges, selectedEdgeId]);

  // Handlers que convierten los tipos internos de reagraph a los tipos públicos
  const handleNodeClick = onNodeClick 
    ? (node: InternalGraphNode, props?: CollapseProps, event?: ThreeEvent<MouseEvent>) => {
        // Convertimos el nodo interno al formato público
        const publicNode: ReagraphNode = {
          id: node.id,
          label: node.label,
          fill: node.fill,
          size: node.size,
          icon: node.icon,
          data: node.data,
          labelVisible: node.labelVisible
        };
        onNodeClick(publicNode);
      }
    : undefined;

  const handleEdgeClick = onEdgeClick
    ? (edge: InternalGraphEdge, props?: CollapseProps, event?: ThreeEvent<MouseEvent>) => {
        // Convertimos el edge interno al formato público
        const publicEdge: ReagraphEdge = {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          size: edge.size,
          data: edge.data,
          labelVisible: edge.labelVisible
        };
        onEdgeClick(publicEdge);
      }
    : undefined;

  return (
    <div className={`relative ${className}`}>
      <GraphCanvas
        labelType={labelType}
        nodes={processedNodes}
        edges={processedEdges}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
      />
      {children}
    </div>
  );
};