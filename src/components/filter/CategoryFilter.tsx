'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import {
  Description as PaperIcon,
  Science as ExperimentsIcon,
  RocketLaunch as MissionsIcon,
  Person as AuthorIcon,
  AccountBalance as JournalIcon,
  Topic as TopicIcon,
  Storage as DatasetIcon,
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
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

const categoryConfigs: CategoryConfig[] = [
  {
    key: Categories.Publications,
    label: 'Paper',
    icon: <PaperIcon />,
    color: 'success',
  },
  {
    key: Categories.Experiments,
    label: 'Experiments',
    icon: <ExperimentsIcon />,
    color: 'info',
  },
  {
    key: Categories.Missions,
    label: 'Misiones',
    icon: <MissionsIcon />,
    color: 'primary',
  },
  {
    key: Categories.Authors,
    label: 'Author',
    icon: <AuthorIcon />,
    color: 'secondary',
  },
  {
    key: Categories.PublicationVenue,
    label: 'Journal',
    icon: <JournalIcon />,
    color: 'warning',
  },
  {
    key: Categories.Topic,
    label: 'Topic',
    icon: <TopicIcon />,
    color: 'error',
  },
  {
    key: Categories.Dataset,
    label: 'Dataset',
    icon: <DatasetIcon />,
    color: 'info',
  },
];

export default function CategoryFilter({ onFilterChange, loading = false }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<Categories[]>(
    Object.values(Categories)
  );

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

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 600,
            color: '#495057',
            mb: 1,
            textTransform: 'uppercase',
            fontSize: '0.875rem',
            letterSpacing: '0.5px'
          }}
        >
          Relationship Type
        </Typography>
        <Box sx={{ height: '2px', backgroundColor: '#495057', width: '60px' }} />
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
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
                py: 1.5,
                px: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: isSelected ? 600 : 500,
                backgroundColor: isSelected ? '#48bb78' : 'transparent',
                borderColor: isSelected ? '#48bb78' : '#d1d5db',
                color: isSelected ? 'white' : '#374151',
                '&:hover': {
                  backgroundColor: isSelected ? '#38a169' : '#f3f4f6',
                  borderColor: isSelected ? '#38a169' : '#9ca3af',
                },
                '&:disabled': {
                  opacity: 0.6,
                },
                '& .MuiButton-startIcon': {
                  color: isSelected ? 'white' : '#48bb78',
                  marginRight: 2,
                },
              }}
            >
              {config.label}
            </Button>
          );
        })}
      </Stack>

      {/* Control buttons */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          size="small"
          variant="text"
          onClick={handleSelectAll}
          disabled={loading || selectedCategories.length === categoryConfigs.length}
          sx={{
            color: '#48bb78',
            fontSize: '0.75rem',
            '&:hover': {
              backgroundColor: 'rgba(72, 187, 120, 0.1)',
            },
          }}
        >
          Seleccionar Todo
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={handleClearAll}
          disabled={loading || selectedCategories.length === 0}
          sx={{
            color: '#e53e3e',
            fontSize: '0.75rem',
            '&:hover': {
              backgroundColor: 'rgba(229, 62, 62, 0.1)',
            },
          }}
        >
          Limpiar Todo
        </Button>
      </Stack>

      {/* Selected count indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          label={`${selectedCategories.length} seleccionadas`}
          size="small"
          sx={{
            backgroundColor: '#48bb78',
            color: 'white',
            fontSize: '0.75rem',
          }}
        />
        {loading && (
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            Actualizando...
          </Typography>
        )}
      </Box>
    </Paper>
  );
}