import { Categories, GraphDataResponse } from '@/services/types/graph';

export const mockApiResponse: GraphDataResponse = {
    "nodes": [
        {
            "id": 0,
            "category": Categories.Publications,
            "label": "Mice in Bion-M 1 Space Mission: Training and Selection",
            "data": {
                "title": "Mice in Bion-M 1 Space Mission: Training and Selection",
                "pmid": "25133741",
                "pages": "e104830",
                "issue": "8",
                "volume": "9",
                "publishDate": "2014 Aug 18",
                "pmcId": "4136787",
                "doi": "10.1371/journal.pone.0104830"
            },
            "related": true
        },
        {
            "id": 15,
            "category": Categories.Publications,
            "label": "Microgravity Induces Pelvic Bone Loss through Osteoclastic Activity, Osteocytic Osteolysis, and Osteoblastic Cell Cycle Inhibition by CDKN1a/p21",
            "data": {
                "title": "Microgravity Induces Pelvic Bone Loss through Osteoclastic Activity, Osteocytic Osteolysis, and Osteoblastic Cell Cycle Inhibition by CDKN1a/p21",
                "pmid": "23637819",
                "pages": "e61372",
                "issue": "4",
                "volume": "8",
                "publishDate": "2013 Apr 18",
                "pmcId": "3630201",
                "doi": "10.1371/journal.pone.0061372"
            },
            "related": true
        },
        {
            "id": 25,
            "category": Categories.Publications,
            "label": "Microgravity and Cellular Biology: Insights into Cellular Responses and Implications for Human Health",
            "data": {
                "title": "Microgravity and Cellular Biology: Insights into Cellular Responses and Implications for Human Health",
                "pmid": "40243850",
                "pages": "3058",
                "issue": "7",
                "volume": "26",
                "publishDate": "2025 Mar 27",
                "pmcId": "11988870",
                "doi": "10.3390/ijms26073058"
            },
            "related": true
        },
        {
            "id": 2,
            "category": Categories.Authors,
            "label": "Alberts J",
            "data": {
                "name": "Alberts J",
                "authType": "Author"
            },
            "related": true
        },
        {
            "id": 3,
            "category": Categories.Authors,
            "label": "Nemirovskaya T",
            "data": {
                "name": "Nemirovskaya T",
                "authType": "Author"
            },
            "related": true
        },
        {
            "id": 4,
            "category": Categories.Authors,
            "label": "Vinogradova O",
            "data": {
                "name": "Vinogradova O",
                "authType": "Author"
            },
            "related": true
        },
        {
            "id": 1,
            "category": Categories.PublicationVenue,
            "label": "PLoS ONE",
            "data": {
                "name": "PLoS ONE",
                "shortName": "PLoS One"
            },
            "related": true
        },
        {
            "id": 26,
            "category": Categories.PublicationVenue,
            "label": "International Journal of Molecular Sciences",
            "data": {
                "name": "International Journal of Molecular Sciences",
                "shortName": "Int J Mol Sci"
            },
            "related": true
        },
        {
            "id": 35,
            "category": Categories.PublicationVenue,
            "label": "Cells",
            "data": {
                "name": "Cells",
                "shortName": "Cells"
            },
            "related": true
        }
    ],
    "edges": [
        {
            "id": 1,
            "source": 0,
            "target": 2,
            "label": "AUTHORED_BY"
        },
        {
            "id": 2,
            "source": 0,
            "target": 3,
            "label": "AUTHORED_BY"
        },
        {
            "id": 3,
            "source": 0,
            "target": 4,
            "label": "AUTHORED_BY"
        },
        {
            "id": 14,
            "source": 15,
            "target": 1,
            "label": "PUBLISHED_IN"
        },
        {
            "id": 0,
            "source": 0,
            "target": 1,
            "label": "PUBLISHED_IN"
        },
        {
            "id": 24,
            "source": 25,
            "target": 26,
            "label": "PUBLISHED_IN"
        }
    ],
    "metadata": {
        "totalNodes": 9,
        "totalEdges": 6,
        "categoriesQueried": [
            Categories.Publications,
            Categories.Authors,
            Categories.Publicat
        ]
    },
    "ai_response": ""
};