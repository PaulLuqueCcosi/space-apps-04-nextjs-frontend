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
    CircularProgress,
    Alert,
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
    Psychology as AnalysisIcon,
} from '@mui/icons-material';
import { Categories } from '@/models/GraphModels';
import { extractDisplayName, formatRelationship } from '@/utils/graphUtils';
import { graphService } from '@/services/graphService';
import ReactMarkdown from 'react-markdown';

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
        // case Categories.Experiments:
        // return <ExperimentsIcon sx={{ fontSize: '1rem' }} />;
        // case Categories.Missions:
        // return <MissionsIcon sx={{ fontSize: '1rem' }} />;
        case Categories.Authors:
            return <AuthorIcon sx={{ fontSize: '1rem' }} />;
        case Categories.PublicationVenue:
            return <JournalIcon sx={{ fontSize: '1rem' }} />;
        // case Categories.Topic:
        // return <TopicIcon sx={{ fontSize: '1rem' }} />;
        // case Categories.Dataset:
        // return <DatasetIcon sx={{ fontSize: '1rem' }} />;
        default:
            return <InfoIcon sx={{ fontSize: '1rem' }} />;
    }
};

import { getCategoryColor, getCategoryDisplayName } from '@/utils/categoryUtils';

export default function EdgeDetailDrawer({
    open,
    onClose,
    edge,
    nodes,
    onCompare
}: EdgeDetailDrawerProps) {
    const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [analysisError, setAnalysisError] = React.useState<string | null>(null);

    // Limpiar el análisis cuando cambie el edge
    React.useEffect(() => {
        setAnalysisResult(null);
        setAnalysisError(null);
        setIsAnalyzing(false);
    }, [edge?.id]);

    if (!edge && !open) return null;

    // Encontrar los nodos source y target
    const sourceNode = nodes?.find(node => node.id === edge?.source);
    const targetNode = nodes?.find(node => node.id === edge?.target);

    const relationshipLabel = edge ? formatRelationship(edge.label || '') : '';

    const handleCompare = async () => {
        if (!sourceNode || !targetNode) return;

        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResult(null);

        try {
            const result = await graphService.analyzeNodes({
                first_node_id: sourceNode.id,
                second_node_id: targetNode.id
            });
            setAnalysisResult(result.response);
        } catch (error) {
            console.error('Error analyzing nodes:', error);
            setAnalysisError('Failed to analyze the relationship between nodes. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }

        if (onCompare) {
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
                        Node not found
                    </Typography>
                </Paper>
            );
        }

        const displayName = extractDisplayName(node.label);
        const categoryColor = getCategoryColor(node.data?.category || node.category);

        return (
            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    height: 'fit-content',
                    minHeight: '350px',
                    backgroundColor: '#fafafa',
                }}
            >
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: categoryColor, mb: 1 }}>
                        {title}
                    </Typography>
                </Box>

                {/* Node Title */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, wordBreak: 'break-word', lineHeight: 1.3 }}>
                        {displayName}
                    </Typography>

                    <Chip
                        icon={getCategoryIcon(node.data?.category || node.category)}
                        label={getCategoryDisplayName(node.data?.category || node.category)}
                        sx={{
                            backgroundColor: `${categoryColor}20`,
                            color: categoryColor,
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 28,
                        }}
                    />
                </Box>

                {/* Basic Information */}
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ minHeight: 'auto', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Basic Information
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                        <List dense>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary="Category"
                                    secondary={
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: categoryColor }}>
                                            {getCategoryDisplayName(node.data?.category || node.category)}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary="Full Name"
                                    secondary={
                                        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ minHeight: 'auto', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Data ({Object.keys(node.data).length})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0 }}>
                            <Stack spacing={1}>
                                {Object.entries(node.data).map(([key, value]) => (
                                    <Box
                                        key={key}
                                        sx={{ p: 1, backgroundColor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}
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
                                    </Box>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* Statistics */}
                <Box sx={{ mt: 2, p: 1, backgroundColor: 'white', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        {node.data ? Object.keys(node.data).length : 0} additional properties
                    </Typography>
                </Box>
            </Paper>
        );
    };

    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    width: 900,
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
                                    Connection Details
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
                        <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                            {/* Relationship Title - Centered */}
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#6366f1', mb: 1 }}>
                                    {relationshipLabel}
                                </Typography>

                            </Box>

                            {/* Connected Nodes - Side by Side */}
                            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 3 }}>
                                {/* Source Node */}
                                <Box sx={{ flex: 1, maxWidth: '400px' }}>
                                    <DetailedNodeCard node={sourceNode} title="Source Node" />
                                </Box>

                                {/* Target Node */}
                                <Box sx={{ flex: 1, maxWidth: '400px' }}>
                                    <DetailedNodeCard node={targetNode} title="Target Node" />
                                </Box>
                            </Box>

                            {/* Analysis Result Section */}
                            {(isAnalyzing || analysisResult || analysisError) && (
                                <Box sx={{ px: 2 }}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: '#f8f9fa',
                                            border: '2px solid #6366f1',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <AnalysisIcon sx={{ color: '#6366f1', fontSize: '1.5rem' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#6366f1' }}>
                                                AI Analysis
                                            </Typography>
                                        </Box>

                                        {isAnalyzing && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
                                                <CircularProgress size={24} sx={{ color: '#6366f1' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Analyzing the relationship between nodes...
                                                </Typography>
                                            </Box>
                                        )}

                                        {analysisError && (
                                            <Alert severity="error" sx={{ mb: 0 }}>
                                                {analysisError}
                                            </Alert>
                                        )}

                                        {analysisResult && !isAnalyzing && (
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: 'white',
                                                    borderRadius: 1,
                                                    border: '1px solid #e0e0e0',
                                                    '& h1': {
                                                        fontSize: '1.5rem',
                                                        fontWeight: 600,
                                                        marginTop: '1rem',
                                                        marginBottom: '0.5rem',
                                                        color: '#1a1a1a',
                                                    },
                                                    '& h2': {
                                                        fontSize: '1.25rem',
                                                        fontWeight: 600,
                                                        marginTop: '1rem',
                                                        marginBottom: '0.5rem',
                                                        color: '#1a1a1a',
                                                    },
                                                    '& h3': {
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
                                                        marginTop: '0.75rem',
                                                        marginBottom: '0.5rem',
                                                        color: '#1a1a1a',
                                                    },
                                                    '& p': {
                                                        lineHeight: 1.7,
                                                        marginBottom: '0.75rem',
                                                        color: '#333',
                                                    },
                                                    '& ul, & ol': {
                                                        paddingLeft: '1.5rem',
                                                        marginBottom: '0.75rem',
                                                    },
                                                    '& li': {
                                                        marginBottom: '0.25rem',
                                                        lineHeight: 1.6,
                                                    },
                                                    '& code': {
                                                        backgroundColor: '#f5f5f5',
                                                        padding: '0.125rem 0.25rem',
                                                        borderRadius: '0.25rem',
                                                        fontSize: '0.875rem',
                                                        fontFamily: 'monospace',
                                                    },
                                                    '& pre': {
                                                        backgroundColor: '#f5f5f5',
                                                        padding: '1rem',
                                                        borderRadius: '0.5rem',
                                                        overflow: 'auto',
                                                        marginBottom: '0.75rem',
                                                    },
                                                    '& pre code': {
                                                        backgroundColor: 'transparent',
                                                        padding: 0,
                                                    },
                                                    '& blockquote': {
                                                        borderLeft: '4px solid #6366f1',
                                                        paddingLeft: '1rem',
                                                        marginLeft: 0,
                                                        marginBottom: '0.75rem',
                                                        color: '#555',
                                                        fontStyle: 'italic',
                                                    },
                                                    '& strong': {
                                                        fontWeight: 600,
                                                        color: '#1a1a1a',
                                                    },
                                                    '& em': {
                                                        fontStyle: 'italic',
                                                    },
                                                    '& a': {
                                                        color: '#6366f1',
                                                        textDecoration: 'none',
                                                        '&:hover': {
                                                            textDecoration: 'underline',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ReactMarkdown>
                                                    {analysisResult}
                                                </ReactMarkdown>
                                            </Paper>
                                        )}
                                    </Paper>
                                </Box>
                            )}
                        </Box>

                        {/* Footer with Compare Button */}
                        <Divider />
                        <Box sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
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
                                    py: 2,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                }}
                            >
                                Compare Nodes in Detail
                            </Button>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textAlign: 'center', display: 'block', mt: 2 }}
                            >
                                Analyze the differences and similarities between nodes connected by this relationship
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Slide>
    );
}