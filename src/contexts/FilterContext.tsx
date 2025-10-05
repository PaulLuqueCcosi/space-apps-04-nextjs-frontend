'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Categories } from '@/services/types/graph';

interface FilterContextType {
  // Filtros de categorías
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  handleCategoryToggle: (category: string) => void;
  handleSelectAllCategories: () => void;
  handleClearAllCategories: () => void;
  
  // Búsqueda
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Estado del sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Estado de carga
  loading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Utilidades
  getCategoryDisplayName: (category: string) => string;
  isAllCategoriesSelected: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.values(Categories));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategoryDisplayName = useCallback((category: string): string => {
    const displayNames: Record<string, string> = {
      [Categories.Publications]: 'Publicaciones',
      [Categories.Missions]: 'Misiones',
      [Categories.Experiments]: 'Experimentos',
      [Categories.Authors]: 'Autores',
      [Categories.Topic]: 'Temas',
      [Categories.Dataset]: 'Datasets',
      [Categories.PublicationVenue]: 'Venues de Publicación'
    };
    return displayNames[category] || category;
  }, []);

  const handleCategoryToggle = useCallback((category: string) => {
    if (loading) return;
    
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelection);
  }, [selectedCategories, loading]);

  const handleSelectAllCategories = useCallback(() => {
    if (loading) return;
    
    const allCategories = Object.values(Categories);
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(allCategories);
    }
  }, [selectedCategories, loading]);

  const handleClearAllCategories = useCallback(() => {
    if (loading) return;
    setSelectedCategories([]);
  }, [loading]);

  const isAllCategoriesSelected = selectedCategories.length === Object.values(Categories).length;

  const value: FilterContextType = {
    selectedCategories,
    setSelectedCategories,
    handleCategoryToggle,
    handleSelectAllCategories,
    handleClearAllCategories,
    searchQuery,
    setSearchQuery,
    sidebarCollapsed,
    setSidebarCollapsed,
    loading,
    setLoading,
    getCategoryDisplayName,
    isAllCategoriesSelected,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}