'use client';

import { useEffect, useState, useCallback } from 'react';
import { useGraph } from '@/hooks/useGraph';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';
import CategoryFilter from '@/components/filter/CategoryFilter';
import NodeDetailDrawer from '@/components/drawer/NodeDetailDrawer';
import EdgeDetailDrawer from '@/components/drawer/EdgeDetailDrawer';
import { Categories } from '@/models/GraphModels';
import { GraphLayout, convertModelNodesToReagraph } from '@/components';
// import ResizableSplitPanel from '@/components/ResizableSplitPanel';
import ResizableSplitPanel from '@/components/layout/EducationMainContent';

export default function GraphPage() {
  const { data, loading, error, fetchData } = useGraph();
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>(Object.values(Categories));
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedEdge, setSelectedEdge] = useState<any>(null);
  const [nodeDrawerOpen, setNodeDrawerOpen] = useState(false);
  const [edgeDrawerOpen, setEdgeDrawerOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState(350);
  const [isResizable, setIsResizable] = useState(false);
  // Cargar datos solo una vez al montar y cuando cambien las categorías
  useEffect(() => {
    fetchData({ selectedCategories });
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [selectedCategories, fetchData]);

  const handleFilterChange = useCallback((categories: string[]) => {
    // Convertir strings a Categories enum
    const categoryEnums = categories
      .map(cat => Object.values(Categories).find(enumValue => enumValue === cat))
      .filter(Boolean) as Categories[];

    setSelectedCategories(categoryEnums);
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    console.log('Nodo clickeado:', node);

    // Si el mismo nodo ya está seleccionado, cerrarlo
    if (selectedNode && selectedNode.id === node.id && nodeDrawerOpen) {
      setNodeDrawerOpen(false);
      setSelectedNode(null);
      return;
    }

    // Cerrar edge drawer si está abierto
    if (edgeDrawerOpen) {
      setEdgeDrawerOpen(false);
      setSelectedEdge(null);
    }

    // Abrir/cambiar node drawer
    setSelectedNode(node);
    setNodeDrawerOpen(true);
  }, [selectedNode, nodeDrawerOpen, edgeDrawerOpen]);

  const handleEdgeClick = useCallback((edge: any) => {
    console.log('Edge clickeado:', edge);

    // Si el mismo edge ya está seleccionado, cerrarlo
    if (selectedEdge && selectedEdge.id === edge.id && edgeDrawerOpen) {
      setEdgeDrawerOpen(false);
      setSelectedEdge(null);
      return;
    }

    // Cerrar node drawer si está abierto
    if (nodeDrawerOpen) {
      setNodeDrawerOpen(false);
      setSelectedNode(null);
    }

    // Abrir/cambiar edge drawer
    setSelectedEdge(edge);
    setEdgeDrawerOpen(true);
  }, [selectedEdge, edgeDrawerOpen, nodeDrawerOpen]);

  const handleCloseNodeDrawer = useCallback(() => {
    setNodeDrawerOpen(false);
  }, []);

  const handleCloseEdgeDrawer = useCallback(() => {
    setEdgeDrawerOpen(false);
  }, []);

  const handleCompareNodes = useCallback((sourceNode: any, targetNode: any) => {
    console.log('Comparando nodos:', sourceNode, targetNode);
    // Aquí puedes implementar la lógica de comparación
    // Por ejemplo, abrir un modal de comparación o navegar a una página de comparación
    alert(`Comparando:\n${extractDisplayName(sourceNode.label)}\nvs\n${extractDisplayName(targetNode.label)}`);
  }, []);



  // Solo mostrar loading completo en la carga inicial
  if (loading && initialLoad) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Datos del Grafo</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  // Panel izquierdo - Filtros y controles
  const leftPanel = (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>

        {/* Filtro de categorías con indicador de carga sutil */}
        <div className="relative">
          <CategoryFilter
            onFilterChange={handleFilterChange}
            loading={loading}
          />
          {loading && !initialLoad && (
            <div className="mt-2 text-sm text-blue-600 animate-pulse">
              Actualizando...
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Panel derecho - Visualización del grafo
  const rightPanel = (
    <div className="p-4 h-full">
      <h1 className="text-3xl font-bold mb-4">Visualización del Grafo</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {data && (
        <>
          {/* Mensaje cuando no hay resultados */}
          {data.nodes.length === 0 && selectedCategories.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Sin resultados</h3>
              <p className="text-yellow-700">
                No se encontraron nodos para las categorías seleccionadas.
                Intenta seleccionar diferentes categorías o limpiar los filtros.
              </p>
            </div>
          )}

          {/* Grafo Interactivo */}
          {data.nodes.length > 0 && (
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Grafo Interactivo</h2>
              </div>
              <div className="flex-1 p-4">
                <div className="h-full w-full border rounded-lg">
                  <GraphLayout
                    nodes={convertModelNodesToReagraph(data.nodes)}
                    edges={data.edges}
                    onNodeClick={handleNodeClick}
                    onEdgeClick={handleEdgeClick}
                    labelType="all"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen flex flex-col mt-20">
      <div className="flex-1 flex">
        <ResizableSplitPanel
          leftPanel={leftPanel}
          rightPanel={rightPanel}
          defaultLeftWidth={350}
          minLeftWidth={250}
          maxLeftWidth={500}
          className="flex-1"
          onResize={setCurrentSize}
          resizable={isResizable}
        />

        {/* Node Detail Drawer - Fixed width panel */}
        {nodeDrawerOpen && (
          <NodeDetailDrawer
            open={nodeDrawerOpen}
            onClose={handleCloseNodeDrawer}
            node={selectedNode}
          />
        )}

        {/* Edge Detail Drawer - Fixed width panel */}
        {edgeDrawerOpen && (
          <EdgeDetailDrawer
            open={edgeDrawerOpen}
            onClose={handleCloseEdgeDrawer}
            edge={selectedEdge}
            nodes={data?.nodes || null}
            onCompare={handleCompareNodes}
          />
        )}
      </div>
    </div>
  );
}