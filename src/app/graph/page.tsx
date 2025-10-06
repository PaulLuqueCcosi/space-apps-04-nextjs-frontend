'use client';

import { useState, useCallback } from 'react';
import { useGraphWithFilters } from '@/hooks/useGraphWithFilters';
import { useFilter } from '@/contexts/FilterContext';
import { extractDisplayName } from '@/utils/graphUtils';
import GraphSidebar from '@/components/layout/GraphSidebar';
import NodeDetailDrawer from '@/components/drawer/NodeDetailDrawer';
import EdgeDetailDrawer from '@/components/drawer/EdgeDetailDrawer';
import { GraphLayout, convertModelNodesToReagraph } from '@/components';
import { AIAssistantDrawer, AIFloatingButton } from '@/components/ai';

export default function GraphPage() {
  const { data, loading, error, hasActiveFilters, selectedCategories } = useGraphWithFilters();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedEdge, setSelectedEdge] = useState<any>(null);
  const [nodeDrawerOpen, setNodeDrawerOpen] = useState(false);
  const [edgeDrawerOpen, setEdgeDrawerOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const handleNodeClick = useCallback((node: any) => {
    console.log('Node clicked:', node);

    // If the same node is already selected, close it
    if (selectedNode && selectedNode.id === node.id && nodeDrawerOpen) {
      setNodeDrawerOpen(false);
      setSelectedNode(null);
      return;
    }

    // Close edge drawer if it's open
    if (edgeDrawerOpen) {
      setEdgeDrawerOpen(false);
      setSelectedEdge(null);
    }

    // Open/change node drawer
    setSelectedNode(node);
    setNodeDrawerOpen(true);
  }, [selectedNode, nodeDrawerOpen, edgeDrawerOpen]);

  const handleEdgeClick = useCallback((edge: any) => {
    console.log('Edge clicked:', edge);

    // If the same edge is already selected, close it
    if (selectedEdge && selectedEdge.id === edge.id && edgeDrawerOpen) {
      setEdgeDrawerOpen(false);
      setSelectedEdge(null);
      return;
    }

    // Close node drawer if it's open
    if (nodeDrawerOpen) {
      setNodeDrawerOpen(false);
      setSelectedNode(null);
    }

    // Open/change edge drawer
    setSelectedEdge(edge);
    setEdgeDrawerOpen(true);
  }, [selectedEdge, edgeDrawerOpen, nodeDrawerOpen]);

  const handleCloseNodeDrawer = useCallback(() => {
    setNodeDrawerOpen(false);
    setSelectedNode(null); // Clear selection on close
  }, []);

  const handleCloseEdgeDrawer = useCallback(() => {
    setEdgeDrawerOpen(false);
    setSelectedEdge(null); // Clear selection on close
  }, []);

  const handleCompareNodes = useCallback((sourceNode: any, targetNode: any) => {
    // console.log('Comparing nodes:', sourceNode, targetNode);
    // alert(`Comparing:\n${extractDisplayName(sourceNode.label)}\nvs\n${extractDisplayName(targetNode.label)}`);
  }, []);

  const handleOpenAIAssistant = useCallback(() => {
    // Close other drawers when opening AI Assistant
    if (nodeDrawerOpen) {
      setNodeDrawerOpen(false);
      setSelectedNode(null);
    }
    if (edgeDrawerOpen) {
      setEdgeDrawerOpen(false);
      setSelectedEdge(null);
    }
    setAiDrawerOpen(true);
  }, [nodeDrawerOpen, edgeDrawerOpen]);

  const handleCloseAIDrawer = useCallback(() => {
    setAiDrawerOpen(false);
  }, []);

  // Only show full loading on initial load
  if (loading && !data) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg text-gray-600">Loading graph data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-row overflow-hidden">
      {/* Sidebar - Always visible */}
      <div className="flex-shrink-0">
        <GraphSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-2 sm:p-4 h-full flex flex-col">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Graph Visualization</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-2 sm:mb-4 text-sm sm:text-base">
              Error: {error}
            </div>
          )}

          {data && (
            <>
              {/* Message when no results */}
              {data.nodes.length === 0 && selectedCategories.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-yellow-800 mb-1 sm:mb-2">No results</h3>
                  <p className="text-sm sm:text-base text-yellow-700">
                    No nodes found for the selected categories.
                    Try selecting different categories or clearing the filters.
                  </p>
                </div>
              )}

              {/* Interactive Graph */}
              {data.nodes.length > 0 && (
                <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
                  <div className="flex-1 p-2 sm:p-4 min-h-0">
                    <div className="h-full w-full border rounded-lg overflow-hidden">
                      <GraphLayout
                        nodes={convertModelNodesToReagraph(data.nodes)}
                        edges={data.edges}
                        onNodeClick={handleNodeClick}
                        onEdgeClick={handleEdgeClick}
                        labelType="all"
                        selectedNodeId={selectedNode?.id || null}
                        selectedEdgeId={selectedEdge?.id || null}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Node Detail Drawer */}
      {nodeDrawerOpen && (
        <NodeDetailDrawer
          open={nodeDrawerOpen}
          onClose={handleCloseNodeDrawer}
          node={selectedNode}
        />
      )}

      {/* Edge Detail Drawer */}
      {edgeDrawerOpen && (
        <EdgeDetailDrawer
          open={edgeDrawerOpen}
          onClose={handleCloseEdgeDrawer}
          edge={selectedEdge}
          nodes={data?.nodes || null}
          onCompare={handleCompareNodes}
        />
      )}

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={handleCloseAIDrawer}
      />

      {/* AI Floating Button */}
      {!aiDrawerOpen && (
        <AIFloatingButton onClick={handleOpenAIAssistant} />
      )}
    </div>
  );
}