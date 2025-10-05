// Ejemplo de uso del GraphAdapter mejorado

import { GraphAdapter } from '@/services/adapters/GraphAdapter';
import { GraphFilters } from '@/models/GraphModels';
import { Categories } from '@/services/types/graph';

// Ejemplo 1: Convertir filtros del frontend a request del API
const frontendFilters: GraphFilters = {
  selectedCategories: ['publications', 'authors'],
  searchTerm: 'AI research'
};

// Convierte a request tipado del API
const apiRequest = GraphAdapter.filtersToApiRequest(frontendFilters);
console.log('API Request:', apiRequest);
// Output: { categories: [Categories.Publications, Categories.Authors], search: 'AI research' }

// Ejemplo 2: Convertir a query params para URL
const queryParams = GraphAdapter.filtersToQueryParams(frontendFilters);
console.log('Query Params:', queryParams.toString());
// Output: "categories=publications,authors&search=AI+research"

// Ejemplo 3: Convertir categorías enum a string
const enumCategories = [Categories.Publications, Categories.Missions];
const stringCategories = GraphAdapter.categoriesToString(enumCategories);
console.log('String Categories:', stringCategories);
// Output: ['publications', 'missions']

// Ejemplo 4: Convertir string a enum
const backToEnum = GraphAdapter.stringToCategories(stringCategories);
console.log('Back to Enum:', backToEnum);
// Output: [Categories.Publications, Categories.Missions]