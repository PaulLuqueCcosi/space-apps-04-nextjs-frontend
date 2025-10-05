'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
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
}

export const GraphLayout = ({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  className = 'h-full w-full',
  labelType = 'all',
  children
}: GraphLayoutProps) => {
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
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
      />
      {children}
    </div>
  );
};