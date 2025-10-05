'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Paper,
    Stack,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Slide,
    Button,
    Grid,
} from '@mui/material';
import {
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
    Description as PaperIcon,
    Science as ExperimentsIcon,
    RocketLaunch as MissionsIcon,
    Person as AuthorIcon,
    AccountBalance as JournalIcon,
    Topic as TopicIcon,
    Storage as DatasetIcon,
    Info as InfoIcon,
    CompareArrows as CompareIcon,
    TrendingFlat as ArrowIcon,
    SwapHoriz as CompareArrows,
} from '@mui/icons-material';
import { Categories } from '@/models/GraphModels';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';

interface EdgeDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    edge: any | null;
    nodes: any[] | null;
    onCompare?: (sourceNode: any, targetNode: any) => void;
}

const getCategoryIcon = (category: Categories) => {
    switch (category) {
        case Categories.Publications:
            return <PaperIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Experiments:
            return <ExperimentsIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Missions:
            return <MissionsIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Authors:
            return <AuthorIcon sx={{ fontSize: '1rem' }} />;
        case Categories.PublicationVenue:
            return <JournalIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Topic:
            return <TopicIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Dataset:
            return <DatasetIcon sx={{ fontSize: '1rem' }} />;
        default:
            return <InfoIcon sx={{ fontSize: '1rem' }} />;
    }
};

const getCategoryColor = (category: Categories) => {
    switch (category) {
        case Categories.Publications:
            return '#48bb78';
        case Categories.Experiments:
            return '#3182ce';
        case Categories.Missions:
            return '#805ad5';
        case Categories.Authors:
            return '#ed8936';
        case Categories.PublicationVenue:
            return '#d69e2e';
        case Categories.Topic:
            return '#e53e3e';
        case Categories.Dataset:
            return '#38b2ac';
        default:
            return '#718096';
    }
};

export default function EdgeDetailDrawer({
    open,
    onClose,
    edge,
    nodes,
    onCompare
}: EdgeDetailDrawerProps) {
    if (!edge && !open) return null;

    // Encontrar los nodos source y target
    const sourceNode = nodes?.find(node => node.id === edge?.source);
    const targetNode = nodes?.find(node => node.id === edge?.target);

    const relationshipLabel = edge ? formatRelationship(edge.label || '') : '';

    const handleCompare = () => {
        if (sourceNode && targetNode && onCompare) {
            onCompare(sourceNode, targetNode);
        }
    };

    const DetailedNodeCard = ({ node, title }: { node: any; title: string }) => {
        if (!node) {
            return (
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        textAlign: 'center',
                        color: '#999'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        Nodo no encontrado
                    </Typography>
                </Paper>
            );
        }

        const displayName = extractDisplayName(node.label);
        const categoryColor = getCategoryColor(node.data?.category || node.category);

        return (
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    border: `2px solid ${categoryColor}`,
                    borderRadius: 2,
                    height: 'fit-content',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 1,
                        backgroundColor: categoryColor,
                        color: 'white',
                        borderRadius: 1,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {getCategoryIcon(node.data?.category || node.category)}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                </Box>

                {/* Node Title */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, wordBreak: 'break-word' }}>
                    {displayName}
                </Typography>

                <Chip
                    icon={getCategoryIcon(node.data?.category || node.category)}
                    label={node.data?.category || node.category}
                    sx={{
                        backgroundColor: `${categoryColor}20`,
                        color: categoryColor,
                        fontWeight: 500,
                        mb: 2,
                    }}
                />

                {/* Basic Information */}
                <Accordion size="small" defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ minHeight: 'auto', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Información Básica
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                        <List dense>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary="ID del Nodo"
                                    secondary={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontFamily: 'monospace',
                                                backgroundColor: '#f5f5f5',
                                                p: 0.5,
                                                borderRadius: 1,
                                                display: 'block',
                                                wordBreak: 'break-all',
                                            }}
                                        >
                                            {node.id}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary="Etiqueta Original"
                                    secondary={
                                        <Typography variant="caption" sx={{ wordBreak: 'break-word' }}>
                                            {node.label}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Additional Data */}
                {node.data && Object.keys(node.data).length > 0 && (
                    <Accordion size="small">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ minHeight: 'auto', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Datos ({Object.keys(node.data).length})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0 }}>
                            <Stack spacing={1}>
                                {Object.entries(node.data).map(([key, value]) => (
                                    <Paper
                                        key={key}
                                        variant="outlined"
                                        sx={{ p: 1, backgroundColor: '#fafafa' }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ fontWeight: 600, color: categoryColor, display: 'block', mb: 0.5 }}
                                        >
                                            {key}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                wordBreak: 'break-word',
                                                fontFamily: typeof value === 'string' && value.length > 30 ? 'monospace' : 'inherit',
                                                fontSize: typeof value === 'string' && value.length > 30 ? '0.65rem' : 'inherit',
                                            }}
                                        >
                                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* Statistics */}
                <Box sx={{ mt: 2, p: 1, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                        {node.data ? Object.keys(node.data).length : 0} propiedades • {node.label ? node.label.length : 0} caracteres
                    </Typography>
                </Box>
            </Paper>
        );
    };

    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    width: 600,
                    height: '100%',
                    backgroundColor: 'white',
                    borderLeft: '1px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
                }}
            >
                {edge && (
                    <>
                        {/* Header */}
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: '#6366f1',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                                <CompareArrows />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Detalle de Conexión
                                </Typography>
                            </Box>
                            <IconButton
                                onClick={onClose}
                                sx={{ color: 'white' }}
                                size="small"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                            {/* Relationship Info */}
                            <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: '#f8f9ff' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <ArrowIcon sx={{ color: '#6366f1' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#6366f1' }}>
                                        Relación
                                    </Typography>
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                    {relationshipLabel}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontFamily: 'monospace',
                                        backgroundColor: '#e5e7eb',
                                        p: 0.5,
                                        borderRadius: 1,
                                        display: 'block',
                                    }}
                                >
                                    ID: {edge.id}
                                </Typography>
                            </Paper>

                            {/* Connected Nodes - Side by Side */}
                            <Grid container spacing={2}>
                                {/* Source Node */}
                                <Grid item xs={6}>
                                    <DetailedNodeCard node={sourceNode} title="Nodo Origen" />
                                </Grid>

                                {/* Target Node */}
                                <Grid item xs={6}>
                                    <DetailedNodeCard node={targetNode} title="Nodo Destino" />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Footer with Compare Button */}
                        <Divider />
                        <Box sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<CompareIcon />}
                                onClick={handleCompare}
                                disabled={!sourceNode || !targetNode}
                                sx={{
                                    backgroundColor: '#6366f1',
                                    '&:hover': {
                                        backgroundColor: '#4f46e5',
                                    },
                                    py: 1.5,
                                    fontWeight: 600,
                                }}
                            >
                                Comparar Nodos
                            </Button>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: 'center', display: 'block', mt: 1 }}
                            >
                                Analiza las diferencias y similitudes entre los nodos conectados
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Slide>
    );
}