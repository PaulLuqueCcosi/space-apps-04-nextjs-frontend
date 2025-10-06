import React from 'react';
import { Categories } from '@/services/types/graph';
import {
  DocumentTextIcon,
  BeakerIcon,
  RocketLaunchIcon,
  UserIcon,
  BuildingLibraryIcon,
  ChatBubbleBottomCenterTextIcon,
  CircleStackIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// Configuración centralizada de colores por categoría
export const CATEGORY_COLORS = {
  [Categories.Publications]: '#48bb78',
  // [Categories.Experiments]: '#3182ce',
  // [Categories.Missions]: '#805ad5',
  [Categories.Authors]: '#ed8936',
  [Categories.PublicationVenue]: '#d69e2e',
  // [Categories.Topic]: '#e53e3e',
  // [Categories.Dataset]: '#38b2ac',
  default: '#718096'
} as const;

// Configuración centralizada de nombres de display
export const CATEGORY_DISPLAY_NAMES = {
  [Categories.Publications]: 'Publications',
  // [Categories.Experiments]: 'Experimentos',
  // [Categories.Missions]: 'Misiones',
  [Categories.Authors]: 'Authors',
  [Categories.PublicationVenue]: 'Publication Venues',
  // [Categories.Topic]: 'Temas',
  // [Categories.Dataset]: 'Datasets'
} as const;

// Función para obtener el color de una categoría
export const getCategoryColor = (category: Categories): string => {
  // console.log("Ingresa para pedir color", category)
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

};

// Función para obtener el nombre de display de una categoría
export const getCategoryDisplayName = (category: Categories): string => {
  return CATEGORY_DISPLAY_NAMES[category] || category;
};

// Función para obtener el icono de Heroicons (outline)
export const getCategoryHeroIcon = (category: Categories, className: string = "w-5 h-5"): React.ReactElement => {
  switch (category) {
    case Categories.Publications:
      return <DocumentTextIcon className={className} />;
    // case Categories.Experiments:
    // return <BeakerIcon className={className} />;
    // case Categories.Missions:
    // return <RocketLaunchIcon className={className} />;
    case Categories.Authors:
      return <UserIcon className={className} />;
    case Categories.PublicationVenue:
      return <BuildingLibraryIcon className={className} />;
    // case Categories.Topic:
    // return <ChatBubbleBottomCenterTextIcon className={className} />;
    // case Categories.Dataset:
    // return <CircleStackIcon className={className} />;
    default:
      return <InformationCircleIcon className={className} />;
  }
};


// Configuración completa para componentes que necesitan todo junto
export interface CategoryConfig {
  key: Categories;
  label: string;
  color: string;
  heroIcon: React.ReactElement;
  displayName: string;
}

export const getCategoryConfig = (category: Categories): CategoryConfig => {
  return {
    key: category,
    label: category,
    color: getCategoryColor(category),
    heroIcon: getCategoryHeroIcon(category),
    displayName: getCategoryDisplayName(category)
  };
};

// Array de todas las configuraciones de categorías
export const getAllCategoryConfigs = (): CategoryConfig[] => {
  return Object.values(Categories).map(category => getCategoryConfig(category));
};

// Función para obtener estilos CSS consistentes
export const getCategoryStyles = (category: Categories, isSelected: boolean = false) => {
  const color = getCategoryColor(category);

  return {
    backgroundColor: isSelected ? color : 'transparent',
    borderColor: isSelected ? color : '#d1d5db',
    color: isSelected ? 'white' : '#374151',
    iconColor: isSelected ? 'white' : color
  };
};

// Configuración específica para reagraph
export interface ReagraphCategoryConfig {
  fill: string;
  size: number;
  icon?: string;
}

export const getReagraphCategoryConfig = (category: Categories): ReagraphCategoryConfig => {
  return {
    fill: getCategoryColor(category),
    size: 12,
    // Los iconos se pueden agregar aquí si se necesitan para reagraph
  };
};
