import { Categories, GraphDataResponse } from '@/services/types/graph';

export const mockApiResponse: GraphDataResponse = {
    nodes: [
        // Publications
        {
            id: "p1",
            label: "AI and Education: A Comprehensive Review",
            category: Categories.Publications,
            data: { year: 2023, citations: 45, doi: "10.1234/ai.edu.2023" }
        },
        {
            id: "p2",
            label: "Machine Learning in Healthcare",
            category: Categories.Publications,
            data: { year: 2022, citations: 78, doi: "10.1234/ml.health.2022" }
        },
        {
            id: "p3",
            label: "Deep Learning for Climate Prediction",
            category: Categories.Publications,
            data: { year: 2024, citations: 23, doi: "10.1234/dl.climate.2024" }
        },
        {
            id: "p4",
            label: "Natural Language Processing Applications",
            category: Categories.Publications,
            data: { year: 2023, citations: 156, doi: "10.1234/nlp.apps.2023" }
        },
        {
            id: "p5",
            label: "Computer Vision in Agriculture",
            category: Categories.Publications,
            data: { year: 2022, citations: 89, doi: "10.1234/cv.agr.2022" }
        },
        {
            id: "p6",
            label: "Robotics for Disaster Response",
            category: Categories.Publications,
            data: { year: 2024, citations: 34, doi: "10.1234/robot.disaster.2024" }
        },
        {
            id: "p7",
            label: "Quantum Computing Algorithms",
            category: Categories.Publications,
            data: { year: 2023, citations: 201, doi: "10.1234/quantum.algo.2023" }
        },
        {
            id: "p8",
            label: "Blockchain in Supply Chain",
            category: Categories.Publications,
            data: { year: 2022, citations: 67, doi: "10.1234/blockchain.supply.2022" }
        },
        {
            id: "p9",
            label: "Federated Learning for Privacy",
            category: Categories.Publications,
            data: { year: 2023, citations: 92, doi: "10.1234/federated.privacy.2023" }
        },
        {
            id: "p10",
            label: "Edge Computing in IoT Systems",
            category: Categories.Publications,
            data: { year: 2024, citations: 54, doi: "10.1234/edge.iot.2024" }
        },

        // Authors
        {
            id: "a1",
            label: "Ana Lopez",
            category: Categories.Authors,
            data: { affiliation: "UNSA", hIndex: 12, email: "ana.lopez@unsa.edu.pe" }
        },
        {
            id: "a2",
            label: "Carlos Martinez",
            category: Categories.Authors,
            data: { affiliation: "PUCP", hIndex: 18, email: "carlos.martinez@pucp.edu.pe" }
        },
        {
            id: "a3",
            label: "Maria Rodriguez",
            category: Categories.Authors,
            data: { affiliation: "UNMSM", hIndex: 24, email: "maria.rodriguez@unmsm.edu.pe" }
        },
        {
            id: "a4",
            label: "Juan Perez",
            category: Categories.Authors,
            data: { affiliation: "UNI", hIndex: 15, email: "juan.perez@uni.edu.pe" }
        },
        {
            id: "a5",
            label: "Sofia Chen",
            category: Categories.Authors,
            data: { affiliation: "Stanford University", hIndex: 32, email: "sofia.chen@stanford.edu" }
        },
        {
            id: "a6",
            label: "Robert Johnson",
            category: Categories.Authors,
            data: { affiliation: "MIT", hIndex: 45, email: "robert.j@mit.edu" }
        },
        {
            id: "a7",
            label: "Elena Vargas",
            category: Categories.Authors,
            data: { affiliation: "UTEC", hIndex: 9, email: "elena.vargas@utec.edu.pe" }
        },
        {
            id: "a8",
            label: "Diego Sanchez",
            category: Categories.Authors,
            data: { affiliation: "UPC", hIndex: 14, email: "diego.sanchez@upc.edu.pe" }
        },
        {
            id: "a9",
            label: "Patricia Wong",
            category: Categories.Authors,
            data: { affiliation: "Berkeley", hIndex: 38, email: "patricia.wong@berkeley.edu" }
        },
        {
            id: "a10",
            label: "Fernando Diaz",
            category: Categories.Authors,
            data: { affiliation: "UNSA", hIndex: 11, email: "fernando.diaz@unsa.edu.pe" }
        },
        {
            id: "a11",
            label: "Laura Torres",
            category: Categories.Authors,
            data: { affiliation: "Oxford", hIndex: 29, email: "laura.torres@ox.ac.uk" }
        },
        {
            id: "a12",
            label: "Miguel Ramos",
            category: Categories.Authors,
            data: { affiliation: "UNSA", hIndex: 16, email: "miguel.ramos@unsa.edu.pe" }
        },

        // Publication Venues
        {
            id: "v1",
            label: "AI Journal",
            category: Categories.PublicationVenue,
            data: { impactFactor: 3.5, publisher: "Springer", type: "Journal" }
        },
        {
            id: "v2",
            label: "IEEE Transactions on AI",
            category: Categories.PublicationVenue,
            data: { impactFactor: 5.2, publisher: "IEEE", type: "Journal" }
        },
        {
            id: "v3",
            label: "Nature Machine Intelligence",
            category: Categories.PublicationVenue,
            data: { impactFactor: 8.7, publisher: "Nature", type: "Journal" }
        },
        {
            id: "v4",
            label: "Conference on Computer Vision (CVPR)",
            category: Categories.PublicationVenue,
            data: { impactFactor: 6.1, publisher: "ACM", type: "Conference" }
        },
        {
            id: "v5",
            label: "International Conference on Robotics",
            category: Categories.PublicationVenue,
            data: { impactFactor: 4.3, publisher: "IEEE", type: "Conference" }
        },
        {
            id: "v6",
            label: "Journal of Climate Science",
            category: Categories.PublicationVenue,
            data: { impactFactor: 7.2, publisher: "Elsevier", type: "Journal" }
        },
        {
            id: "v7",
            label: "ACM Computing Surveys",
            category: Categories.PublicationVenue,
            data: { impactFactor: 6.8, publisher: "ACM", type: "Journal" }
        },
        {
            id: "v8",
            label: "NeurIPS Conference",
            category: Categories.PublicationVenue,
            data: { impactFactor: 7.5, publisher: "NeurIPS", type: "Conference" }
        },

        // Missions
        {
            id: "m1",
            label: "Alpha",
            category: Categories.Missions,
            data: { location: "Lima, Peru", status: "Ongoing", budget: "$500K", startDate: "2023-01" }
        },
        {
            id: "m2",
            label: "Beta",
            category: Categories.Missions,
            data: { location: "Arequipa, Peru", status: "Completed", budget: "$300K", startDate: "2022-06" }
        },
        {
            id: "m3",
            label: "Gamma",
            category: Categories.Missions,
            data: { location: "Cusco, Peru", status: "Planning", budget: "$450K", startDate: "2024-03" }
        },
        {
            id: "m4",
            label: "Delta",
            category: Categories.Missions,
            data: { location: "Trujillo, Peru", status: "Ongoing", budget: "$600K", startDate: "2023-09" }
        },
        {
            id: "m5",
            label: "Epsilon",
            category: Categories.Missions,
            data: { location: "Iquitos, Peru", status: "Completed", budget: "$350K", startDate: "2022-01" }
        },
        {
            id: "m6",
            label: "Zeta",
            category: Categories.Missions,
            data: { location: "Piura, Peru", status: "Ongoing", budget: "$520K", startDate: "2023-05" }
        },
        {
            id: "m7",
            label: "Eta",
            category: Categories.Missions,
            data: { location: "Tacna, Peru", status: "Planning", budget: "$400K", startDate: "2024-06" }
        },
        {
            id: "m8",
            label: "Theta",
            category: Categories.Missions,
            data: { location: "Huancayo, Peru", status: "Ongoing", budget: "$480K", startDate: "2023-11" }
        },

        // Experiments
        {
            id: "exp1",
            label: "Neural Network Training - Experiment A",
            category: Categories.Experiments,
            data: { duration: "6 months", status: "Completed", accuracy: "94.5%" }
        },
        {
            id: "exp2",
            label: "Climate Model Validation Study",
            category: Categories.Experiments,
            data: { duration: "12 months", status: "Ongoing", accuracy: "89.2%" }
        },
        {
            id: "exp3",
            label: "Medical Imaging Analysis Trial",
            category: Categories.Experiments,
            data: { duration: "8 months", status: "Completed", accuracy: "96.7%" }
        },
        {
            id: "exp4",
            label: "Crop Disease Detection Test",
            category: Categories.Experiments,
            data: { duration: "4 months", status: "Ongoing", accuracy: "91.3%" }
        },
        {
            id: "exp5",
            label: "Robotics Navigation Experiment",
            category: Categories.Experiments,
            data: { duration: "10 months", status: "Completed", accuracy: "87.9%" }
        },
        {
            id: "exp6",
            label: "NLP Model Benchmark",
            category: Categories.Experiments,
            data: { duration: "5 months", status: "Ongoing", accuracy: "93.1%" }
        },
        {
            id: "exp7",
            label: "Quantum Algorithm Testing",
            category: Categories.Experiments,
            data: { duration: "15 months", status: "Planning", accuracy: "N/A" }
        },
        {
            id: "exp8",
            label: "Federated Learning Trial",
            category: Categories.Experiments,
            data: { duration: "7 months", status: "Completed", accuracy: "90.5%" }
        },

        // Topics
        {
            id: "t1",
            label: "Artificial Intelligence",
            category: Categories.Topic,
            data: { domain: "Computer Science", popularity: 9500 }
        },
        {
            id: "t2",
            label: "Machine Learning",
            category: Categories.Topic,
            data: { domain: "Computer Science", popularity: 8700 }
        },
        {
            id: "t3",
            label: "Computer Vision",
            category: Categories.Topic,
            data: { domain: "Computer Science", popularity: 6200 }
        },
        {
            id: "t4",
            label: "Natural Language Processing",
            category: Categories.Topic,
            data: { domain: "Computer Science", popularity: 7100 }
        },
        {
            id: "t5",
            label: "Robotics",
            category: Categories.Topic,
            data: { domain: "Engineering", popularity: 5400 }
        },
        {
            id: "t6",
            label: "Climate Science",
            category: Categories.Topic,
            data: { domain: "Environmental Science", popularity: 4800 }
        },
        {
            id: "t7",
            label: "Healthcare AI",
            category: Categories.Topic,
            data: { domain: "Medicine", popularity: 6900 }
        },
        {
            id: "t8",
            label: "Agricultural Technology",
            category: Categories.Topic,
            data: { domain: "Agriculture", popularity: 3600 }
        },
        {
            id: "t9",
            label: "Quantum Computing",
            category: Categories.Topic,
            data: { domain: "Physics", popularity: 4200 }
        },
        {
            id: "t10",
            label: "Blockchain Technology",
            category: Categories.Topic,
            data: { domain: "Computer Science", popularity: 5800 }
        },

        // Datasets
        {
            id: "d1",
            label: "ImageNet-22K",
            category: Categories.Dataset,
            data: { size: "14.2M images", type: "Image Classification", license: "Open" }
        },
        {
            id: "d2",
            label: "MIMIC-III Clinical Database",
            category: Categories.Dataset,
            data: { size: "58K patients", type: "Medical Records", license: "Restricted" }
        },
        {
            id: "d3",
            label: "Climate Data Store",
            category: Categories.Dataset,
            data: { size: "10TB", type: "Climate Time Series", license: "Open" }
        },
        {
            id: "d4",
            label: "PlantVillage Dataset",
            category: Categories.Dataset,
            data: { size: "54K images", type: "Plant Disease", license: "Open" }
        },
        {
            id: "d5",
            label: "Common Crawl",
            category: Categories.Dataset,
            data: { size: "250TB", type: "Web Text", license: "Open" }
        },
        {
            id: "d6",
            label: "KITTI Vision Benchmark",
            category: Categories.Dataset,
            data: { size: "15GB", type: "Autonomous Driving", license: "Open" }
        },
        {
            id: "d7",
            label: "MS COCO",
            category: Categories.Dataset,
            data: { size: "330K images", type: "Object Detection", license: "Open" }
        },
        {
            id: "d8",
            label: "SQuAD 2.0",
            category: Categories.Dataset,
            data: { size: "150K questions", type: "Question Answering", license: "Open" }
        },
        {
            id: "d9",
            label: "Peruvian Agricultural Dataset",
            category: Categories.Dataset,
            data: { size: "25K samples", type: "Crop Analysis", license: "Restricted" }
        },
        {
            id: "d10",
            label: "Robotics Simulation Dataset",
            category: Categories.Dataset,
            data: { size: "5GB", type: "Robot Navigation", license: "Open" }
        }
    ],
    edges: [
        // Authors -> Publications
        { id: "e1", source: "a1", target: "p1", label: "is_author_of" },
        { id: "e2", source: "a2", target: "p1", label: "is_author_of" },
        { id: "e3", source: "a3", target: "p2", label: "is_author_of" },
        { id: "e4", source: "a5", target: "p2", label: "is_author_of" },
        { id: "e5", source: "a4", target: "p3", label: "is_author_of" },
        { id: "e6", source: "a6", target: "p3", label: "is_author_of" },
        { id: "e7", source: "a7", target: "p4", label: "is_author_of" },
        { id: "e8", source: "a9", target: "p4", label: "is_author_of" },
        { id: "e9", source: "a8", target: "p5", label: "is_author_of" },
        { id: "e10", source: "a10", target: "p5", label: "is_author_of" },
        { id: "e11", source: "a1", target: "p6", label: "is_author_of" },
        { id: "e12", source: "a6", target: "p7", label: "is_author_of" },
        { id: "e13", source: "a2", target: "p8", label: "is_author_of" },
        { id: "e14", source: "a3", target: "p8", label: "is_author_of" },
        { id: "e15", source: "a11", target: "p9", label: "is_author_of" },
        { id: "e16", source: "a12", target: "p10", label: "is_author_of" },
        { id: "e17", source: "a5", target: "p9", label: "is_author_of" },
        { id: "e18", source: "a4", target: "p10", label: "is_author_of" },

        // Publications -> Publication Venues
        { id: "e19", source: "p1", target: "v1", label: "published_in" },
        { id: "e20", source: "p2", target: "v2", label: "published_in" },
        { id: "e21", source: "p3", target: "v6", label: "published_in" },
        { id: "e22", source: "p4", target: "v3", label: "published_in" },
        { id: "e23", source: "p5", target: "v4", label: "published_in" },
        { id: "e24", source: "p6", target: "v5", label: "published_in" },
        { id: "e25", source: "p7", target: "v3", label: "published_in" },
        { id: "e26", source: "p8", target: "v2", label: "published_in" },
        { id: "e27", source: "p9", target: "v7", label: "published_in" },
        { id: "e28", source: "p10", target: "v8", label: "published_in" },

        // Publications -> Missions
        { id: "e29", source: "p1", target: "m1", label: "supports" },
        { id: "e30", source: "p2", target: "m2", label: "supports" },
        { id: "e31", source: "p3", target: "m3", label: "supports" },
        { id: "e32", source: "p4", target: "m1", label: "supports" },
        { id: "e33", source: "p5", target: "m4", label: "supports" },
        { id: "e34", source: "p6", target: "m5", label: "supports" },
        { id: "e35", source: "p7", target: "m6", label: "supports" },
        { id: "e36", source: "p8", target: "m4", label: "supports" },
        { id: "e37", source: "p9", target: "m7", label: "supports" },
        { id: "e38", source: "p10", target: "m8", label: "supports" },

        // Missions -> Experiments
        { id: "e39", source: "m1", target: "exp1", label: "includes_experiment" },
        { id: "e40", source: "m2", target: "exp3", label: "includes_experiment" },
        { id: "e41", source: "m3", target: "exp2", label: "includes_experiment" },
        { id: "e42", source: "m4", target: "exp4", label: "includes_experiment" },
        { id: "e43", source: "m5", target: "exp5", label: "includes_experiment" },
        { id: "e44", source: "m6", target: "exp7", label: "includes_experiment" },
        { id: "e45", source: "m7", target: "exp8", label: "includes_experiment" },
        { id: "e46", source: "m8", target: "exp6", label: "includes_experiment" },
        { id: "e47", source: "m1", target: "exp6", label: "includes_experiment" },

        // Experiments -> Publications
        { id: "e48", source: "exp1", target: "p1", label: "resulted_in" },
        { id: "e49", source: "exp3", target: "p2", label: "resulted_in" },
        { id: "e50", source: "exp2", target: "p3", label: "resulted_in" },
        { id: "e51", source: "exp4", target: "p5", label: "resulted_in" },
        { id: "e52", source: "exp5", target: "p6", label: "resulted_in" },
        { id: "e53", source: "exp8", target: "p9", label: "resulted_in" },

        // Publications -> Topics
        { id: "e54", source: "p1", target: "t1", label: "related_to" },
        { id: "e55", source: "p1", target: "t2", label: "related_to" },
        { id: "e56", source: "p2", target: "t2", label: "related_to" },
        { id: "e57", source: "p2", target: "t7", label: "related_to" },
        { id: "e58", source: "p3", target: "t2", label: "related_to" },
        { id: "e59", source: "p3", target: "t6", label: "related_to" },
        { id: "e60", source: "p4", target: "t4", label: "related_to" },
        { id: "e61", source: "p5", target: "t3", label: "related_to" },
        { id: "e62", source: "p5", target: "t8", label: "related_to" },
        { id: "e63", source: "p6", target: "t5", label: "related_to" },
        { id: "e64", source: "p7", target: "t9", label: "related_to" },
        { id: "e65", source: "p8", target: "t10", label: "related_to" },
        { id: "e66", source: "p9", target: "t1", label: "related_to" },
        { id: "e67", source: "p10", target: "t1", label: "related_to" },

        // Experiments -> Datasets
        { id: "e68", source: "exp1", target: "d1", label: "uses_dataset" },
        { id: "e69", source: "exp3", target: "d2", label: "uses_dataset" },
        { id: "e70", source: "exp2", target: "d3", label: "uses_dataset" },
        { id: "e71", source: "exp4", target: "d4", label: "uses_dataset" },
        { id: "e72", source: "exp4", target: "d9", label: "uses_dataset" },
        { id: "e73", source: "exp5", target: "d6", label: "uses_dataset" },
        { id: "e74", source: "exp5", target: "d10", label: "uses_dataset" },
        { id: "e75", source: "exp6", target: "d5", label: "uses_dataset" },
        { id: "e76", source: "exp6", target: "d8", label: "uses_dataset" },
        { id: "e77", source: "exp8", target: "d1", label: "uses_dataset" },
        { id: "e78", source: "exp1", target: "d7", label: "uses_dataset" },

        // Publications -> Datasets
        { id: "e79", source: "p1", target: "d1", label: "uses_dataset" },
        { id: "e80", source: "p2", target: "d2", label: "uses_dataset" },
        { id: "e81", source: "p3", target: "d3", label: "uses_dataset" },
        { id: "e82", source: "p5", target: "d4", label: "uses_dataset" },
        { id: "e83", source: "p4", target: "d5", label: "uses_dataset" },
        { id: "e84", source: "p6", target: "d6", label: "uses_dataset" },

        // Authors collaborations
        { id: "e85", source: "a1", target: "a2", label: "collaborates_with" },
        { id: "e86", source: "a3", target: "a5", label: "collaborates_with" },
        { id: "e87", source: "a4", target: "a6", label: "collaborates_with" },
        { id: "e88", source: "a7", target: "a9", label: "collaborates_with" },
        { id: "e89", source: "a8", target: "a10", label: "collaborates_with" },
        { id: "e90", source: "a2", target: "a3", label: "collaborates_with" },
        { id: "e91", source: "a11", target: "a5", label: "collaborates_with" },
        { id: "e92", source: "a12", target: "a4", label: "collaborates_with" },

        // Publications citations
        { id: "e93", source: "p4", target: "p1", label: "cites" },
        { id: "e94", source: "p5", target: "p3", label: "cites" },
        { id: "e95", source: "p7", target: "p4", label: "cites" },
        { id: "e96", source: "p8", target: "p2", label: "cites" },
        { id: "e97", source: "p6", target: "p5", label: "cites" },
        { id: "e98", source: "p9", target: "p1", label: "cites" },
        { id: "e99", source: "p9", target: "p4", label: "cites" },
        { id: "e100", source: "p10", target: "p9", label: "cites" }
    ],
    metadata: {
        totalNodes: 68,
        totalEdges: 100,
        categoriesQueried: []
    }
};