'use client';

import { GraphLayout } from './GraphLayout';
import { convertModelNodesToReagraph } from './utils';
import { Categories, GraphNode } from '@/models/GraphModels';

export const GraphExample = () => {
    // Datos de ejemplo usando GraphNode del modelo con propiedad highlighted
    const modelNodes: GraphNode[] = [
        {
            id: 'dr-jane-smith',
            label: 'Dr. Jane Smith',
            category: Categories.Authors,
            highlighted: true, // Nodo activo - se muestra normal
            data: {
                affiliation: 'MIT',
                specialization: 'Astrobiology',
                publications: 45
            }
        },
        {
            id: 'mars-geology-paper',
            label: 'Mars Geological Survey 2024',
            category: Categories.Publications,
            highlighted: true, // Nodo activo - se muestra normal
            data: {
                journal: 'Nature Astronomy',
                citations: 23,
                year: 2024
            }
        },
        {
            id: 'nature-astronomy',
            label: 'Nature Astronomy',
            category: Categories.PublicationVenue,
            highlighted: false, // Nodo filtrado - se muestra opaco y gris
            data: {
                type: 'journal',
                impactFactor: 14.1,
                publisher: 'Nature Publishing Group'
            }
        },
        {
            id: 'dr-john-doe',
            label: 'Dr. John Doe',
            category: Categories.Authors,
            highlighted: false, // Nodo filtrado - se muestra opaco y gris
            data: {
                affiliation: 'Stanford',
                specialization: 'Planetary Science',
                publications: 32
            }
        }
    ];

    // Convertir nodos del modelo a nodos de reagraph (aplicará estilos según highlighted)
    const nodes = convertModelNodesToReagraph(modelNodes);

    // Edges de ejemplo
    const edges = [
        {
            id: 'author-publication',
            source: 'dr-jane-smith',
            target: 'mars-geology-paper',
            label: 'authored'
        },
        {
            id: 'publication-venue',
            source: 'mars-geology-paper',
            target: 'nature-astronomy',
            label: 'published in'
        },
        {
            id: 'author-venue',
            source: 'dr-john-doe',
            target: 'nature-astronomy',
            label: 'published in'
        }
    ];

    const handleNodeClick = (node: any) => {
        console.log('Nodo clickeado:', node);
        alert(`Clickeaste: ${node.label}\nCategoría: ${node.data?.category}`);
    };

    const handleEdgeClick = (edge: any) => {
        console.log('Edge clickeado:', edge);
        alert(`Conexión: ${edge.label}`);
    };

    return (
        <div className="h-[500px] w-full border rounded-lg">
            <GraphLayout
                nodes={nodes}
                edges={edges}
                onNodeClick={handleNodeClick}
                onEdgeClick={handleEdgeClick}
                labelType="all"
            />
        </div>
    );
};