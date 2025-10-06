'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useMemo } from 'react';
import type {
  GraphNode as ReagraphNode,
  GraphEdge as ReagraphEdge,
  InternalGraphNode,
  InternalGraphEdge,
  CollapseProps,
  // ThreeEvent
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
  cameraMode?: 'pan' | 'rotate'
  draggable?: boolean
}

export const GraphLayout = ({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  className = 'h-full w-full',
  labelType = 'all',
  children,
  cameraMode = "pan",
  selectedNodeId,
  selectedEdgeId,
  draggable = true
}: GraphLayoutProps) => {
  // Modificamos los nodos para resaltar el seleccionado con un borde brillante
  const processedNodes = useMemo(() => {
    // Encontrar el edge seleccionado para resaltar sus nodos conectados
    const selectedEdge = selectedEdgeId ? edges.find(edge => edge.id === selectedEdgeId) : null;

    return nodes.map(node => {
      // Resaltar nodo seleccionado directamente
      if (selectedNodeId && node.id === selectedNodeId) {
        return {
          ...node,
          fill: '#1eedaf', // Color verde para nodo seleccionado
          // size: (node.size || 10) * 1.5, // Aumentar tamaño 50%
        };
      }

      // Resaltar nodos conectados al edge seleccionado
      if (selectedEdge && (node.id === selectedEdge.source || node.id === selectedEdge.target)) {
        return {
          ...node,
          fill: '#1eedaf', // Color rojo para nodos conectados al edge seleccionado
          // size: (node.size || 10) * 1.3, // Aumentar tamaño 30%
        };
      }

      return node;
    });
  }, [nodes, selectedNodeId, selectedEdgeId, edges]);

  // Modificamos los edges para resaltar el seleccionado
  const processedEdges = useMemo(() => {
    return edges.map(edge => {
      if (selectedEdgeId && edge.id === selectedEdgeId) {
        return {
          ...edge,
          fill: '#1eedaf', // Color rojo para nodos conectados al edge seleccionado
          size: (edge.size || 1) * 2, // Aumentar grosor del edge seleccionado
        };
      }
      return edge;
    });
  }, [edges, selectedEdgeId]);

  // Handlers que convierten los tipos internos de reagraph a los tipos públicos
  const handleNodeClick = onNodeClick
    // ? (node: InternalGraphNode, props?: CollapseProps, event?: ThreeEvent<MouseEvent>) => {
    ? (node: InternalGraphNode, props?: CollapseProps, event?: any) => {
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
    // ? (edge: InternalGraphEdge, event?: ThreeEvent<MouseEvent>) => {
    ? (edge: InternalGraphEdge, event?: any) => {
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
        cameraMode={cameraMode}
        draggable={draggable}
      />
      {children}
    </div>
  );
};