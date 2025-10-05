'use client';

import { GraphLayout } from './GraphLayout';
import { createGraphNodes, NodeData } from './utils';
import { Categories } from '@/models/GraphModels';

export const GraphExample = () => {
    // Datos de ejemplo usando las categorías reales
    const nodesData: NodeData[] = [
        {
            id: 'mars-mission-2024',
            label: 'Mars Mission 2024',
            category: Categories.Missions,
            data: {
                status: 'active',
                launchDate: '2024-03-15',
                agency: 'NASA'
            }
        },
        {
            id: 'soil-analysis-exp',
            label: 'Soil Analysis Experiment',
            category: Categories.Experiments,
            data: {
                type: 'geological',
                duration: '6 months',
                samples: 150
            }
        },
        {
            id: 'dr-jane-smith',
            label: 'Dr. Jane Smith',
            category: Categories.Authors,
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
            data: {
                journal: 'Nature Astronomy',
                citations: 23,
                year: 2024
            }
        },
        {
            id: 'astrobiology-topic',
            label: 'Astrobiology',
            category: Categories.Topic,
            data: {
                relatedPapers: 156,
                trending: true
            }
        }
    ];

    // Crear nodos con estilos
    const nodes = createGraphNodes(nodesData);

    // Edges de ejemplo
    const edges = [
        {
            id: 'mission-experiment',
            source: 'mars-mission-2024',
            target: 'soil-analysis-exp',
            label: 'includes'
        },
        {
            id: 'author-publication',
            source: 'dr-jane-smith',
            target: 'mars-geology-paper',
            label: 'authored'
        },
        {
            id: 'experiment-publication',
            source: 'soil-analysis-exp',
            target: 'mars-geology-paper',
            label: 'results in'
        },
        {
            id: 'publication-topic',
            source: 'mars-geology-paper',
            target: 'astrobiology-topic',
            label: 'relates to'
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