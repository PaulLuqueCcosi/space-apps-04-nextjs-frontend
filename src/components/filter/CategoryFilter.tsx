'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Paper,
  Chip,
  Tooltip,
  Divider,
  Button,
} from '@mui/material';
import {
  Description as PaperIcon,
  Science as ExperimentsIcon,
  RocketLaunch as MissionsIcon,
  Person as AuthorIcon,
  AccountBalance as JournalIcon,
  Topic as TopicIcon,
  Storage as DatasetIcon,
  ChevronRight as ExpandIcon,
  ChevronLeft as CollapseIcon,
  FilterList as FilterIcon,
  SelectAll as SelectAllIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { Categories } from '@/models/GraphModels';

interface CategoryFilterProps {
  onFilterChange: (categories: string[]) => void;
  loading?: boolean;
}

interface CategoryConfig {
  key: Categories;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categoryConfigs: CategoryConfig[] = [
  {
    key: Categories.Publications,
    label: 'Paper',
    icon: <PaperIcon />,
    color: '#48bb78',
  },
  {
    key: Categories.Experiments,
    label: 'Experiments',
    icon: <ExperimentsIcon />,
    color: '#3182ce',
  },
  {
    key: Categories.Missions,
    label: 'Misiones',
    icon: <MissionsIcon />,
    color: '#805ad5',
  },
  {
    key: Categories.Authors,
    label: 'Author',
    icon: <AuthorIcon />,
    color: '#ed8936',
  },
  {
    key: Categories.PublicationVenue,
    label: 'Journal',
    icon: <JournalIcon />,
    color: '#d69e2e',
  },
  {
    key: Categories.Topic,
    label: 'Topic',
    icon: <TopicIcon />,
    color: '#e53e3e',
  },
  {
    key: Categories.Dataset,
    label: 'Dataset',
    icon: <DatasetIcon />,
    color: '#38b2ac',
  },
];

export default function CategoryFilter({ onFilterChange, loading = false }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<Categories[]>(
    Object.values(Categories)
  );
  const [expanded, setExpanded] = React.useState(false);

  const handleCategoryToggle = (category: Categories) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelected);
    onFilterChange(newSelected);
  };

  const handleSelectAll = () => {
    const allCategories = Object.values(Categories);
    setSelectedCategories(allCategories);
    onFilterChange(allCategories);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    onFilterChange([]);
  };

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: expanded ? 280 : 60,
        height: 'fit-content',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'width 0.3s ease-in-out',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          backgroundColor: '#495057',
          color: 'white',
        }}
      >
        {expanded && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon sx={{ fontSize: '1rem' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
              FILTROS
            </Typography>
          </Box>
        )}

        <Tooltip title={expanded ? 'Contraer' : 'Expandir filtros'}>
          <IconButton
            onClick={handleToggleExpanded}
            size="small"
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {expanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Compact View - Only Icons */}
      {!expanded && (
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {categoryConfigs.map((config) => {
            const isSelected = selectedCategories.includes(config.key);

            return (
              <Tooltip key={config.key} title={config.label} placement="right">
                <IconButton
                  onClick={() => handleCategoryToggle(config.key)}
                  disabled={loading}
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: isSelected ? config.color : 'transparent',
                    color: isSelected ? 'white' : config.color,
                    border: `2px solid ${isSelected ? config.color : '#e0e0e0'}`,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: isSelected ? config.color : `${config.color}20`,
                      borderColor: config.color,
                    },
                    '&:disabled': {
                      opacity: 0.6,
                    },
                  }}
                >
                  {config.icon}
                </IconButton>
              </Tooltip>
            );
          })}

          {/* Compact indicator */}
          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Chip
              label={selectedCategories.length}
              size="small"
              sx={{
                backgroundColor: '#48bb78',
                color: 'white',
                fontSize: '0.7rem',
                height: '20px',
                width: '30px',
              }}
            />
          </Box>
        </Stack>
      )}

      {/* Expanded View */}
      {expanded && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#495057',
                mb: 1,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }}
            >
              Relationship Type
            </Typography>
            <Box sx={{ height: '2px', backgroundColor: '#495057', width: '40px' }} />
          </Box>

          <Stack spacing={1} sx={{ mb: 2 }}>
            {categoryConfigs.map((config) => {
              const isSelected = selectedCategories.includes(config.key);

              return (
                <Button
                  key={config.key}
                  variant={isSelected ? 'contained' : 'outlined'}
                  onClick={() => handleCategoryToggle(config.key)}
                  disabled={loading}
                  startIcon={config.icon}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    py: 0.8,
                    px: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 600 : 500,
                    backgroundColor: isSelected ? config.color : 'transparent',
                    borderColor: isSelected ? config.color : '#d1d5db',
                    color: isSelected ? 'white' : '#374151',
                    minHeight: '32px',
                    '&:hover': {
                      backgroundColor: isSelected ? config.color : `${config.color}20`,
                      borderColor: config.color,
                    },
                    '&:disabled': {
                      opacity: 0.6,
                    },
                    '& .MuiButton-startIcon': {
                      color: isSelected ? 'white' : config.color,
                      marginRight: 1,
                      fontSize: '1rem',
                    },
                  }}
                >
                  {config.label}
                </Button>
              );
            })}
          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* Control buttons */}
          <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
            <Tooltip title="Seleccionar todo">
              <IconButton
                onClick={handleSelectAll}
                disabled={loading || selectedCategories.length === categoryConfigs.length}
                size="small"
                sx={{
                  color: '#48bb78',
                  '&:hover': {
                    backgroundColor: 'rgba(72, 187, 120, 0.1)',
                  },
                }}
              >
                <SelectAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Limpiar todo">
              <IconButton
                onClick={handleClearAll}
                disabled={loading || selectedCategories.length === 0}
                size="small"
                sx={{
                  color: '#e53e3e',
                  '&:hover': {
                    backgroundColor: 'rgba(229, 62, 62, 0.1)',
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Selected count indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Chip
              label={`${selectedCategories.length}/${categoryConfigs.length} activas`}
              size="small"
              sx={{
                backgroundColor: '#48bb78',
                color: 'white',
                fontSize: '0.7rem',
              }}
            />
          </Box>

          {loading && (
            <Typography
              variant="caption"
              sx={{
                color: '#6b7280',
                textAlign: 'center',
                display: 'block',
                mt: 1,
                fontSize: '0.7rem'
              }}
            >
              Actualizando...
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
}