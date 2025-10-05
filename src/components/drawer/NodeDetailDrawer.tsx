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
} from '@mui/icons-material';
import { Categories } from '@/models/GraphModels';
import { extractDisplayName } from '@/utils/graphUtils';

interface NodeDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  node: any | null;
}

const getCategoryIcon = (category: Categories) => {
  switch (category) {
    case Categories.Publications:
      return <PaperIcon sx={{ color: '#48bb78' }} />;
    case Categories.Experiments:
      return <ExperimentsIcon sx={{ color: '#3182ce' }} />;
    case Categories.Missions:
      return <MissionsIcon sx={{ color: '#805ad5' }} />;
    case Categories.Authors:
      return <AuthorIcon sx={{ color: '#ed8936' }} />;
    case Categories.PublicationVenue:
      return <JournalIcon sx={{ color: '#d69e2e' }} />;
    case Categories.Topic:
      return <TopicIcon sx={{ color: '#e53e3e' }} />;
    case Categories.Dataset:
      return <DatasetIcon sx={{ color: '#38b2ac' }} />;
    default:
      return <InfoIcon sx={{ color: '#718096' }} />;
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

export default function NodeDetailDrawer({ open, onClose, node }: NodeDetailDrawerProps) {
  if (!node && !open) return null;

  const displayName = node ? extractDisplayName(node.label) : '';
  const categoryColor = node ? getCategoryColor(node.data?.category || node.category) : '#718096';

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 400,
          height: '100%',
          backgroundColor: 'white',
          borderLeft: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        {node && (
          <>
            {/* Header */}
            <Box
              sx={{
                p: 2,
                backgroundColor: categoryColor,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                {getCategoryIcon(node.data?.category || node.category)}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Detalle del Nodo
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
              {/* Node Title */}
              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, wordBreak: 'break-word' }}>
                  {displayName}
                </Typography>
                <Chip
                  icon={getCategoryIcon(node.data?.category || node.category)}
                  label={node.data?.category || node.category}
                  sx={{
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                    fontWeight: 500,
                  }}
                />
              </Paper>

              {/* Basic Information */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Información Básica
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="ID del Nodo"
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              backgroundColor: '#f5f5f5',
                              p: 0.5,
                              borderRadius: 1,
                              fontSize: '0.75rem',
                              wordBreak: 'break-all',
                            }}
                          >
                            {node.id}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Etiqueta Original"
                        secondary={
                          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                            {node.label}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Categoría"
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            {getCategoryIcon(node.data?.category || node.category)}
                            <Typography variant="body2">
                              {node.data?.category || node.category}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Additional Data */}
              {node.data && Object.keys(node.data).length > 0 && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Datos Adicionales ({Object.keys(node.data).length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {Object.entries(node.data).map(([key, value]) => (
                        <Paper
                          key={key}
                          variant="outlined"
                          sx={{ p: 1.5, backgroundColor: '#fafafa' }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: categoryColor, mb: 0.5 }}
                          >
                            {key}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              wordBreak: 'break-word',
                              fontFamily: typeof value === 'string' && value.length > 50 ? 'monospace' : 'inherit',
                              fontSize: typeof value === 'string' && value.length > 50 ? '0.75rem' : 'inherit',
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

              {/* Node Statistics */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: categoryColor, fontWeight: 700 }}>
                        {node.data ? Object.keys(node.data).length : 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Propiedades de datos
                      </Typography>
                    </Paper>
                    
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: categoryColor, fontWeight: 700 }}>
                        {node.label ? node.label.length : 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Caracteres en etiqueta
                      </Typography>
                    </Paper>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* Footer */}
            <Divider />
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
                Haz clic en otro nodo para ver sus detalles
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Slide>
  );
}