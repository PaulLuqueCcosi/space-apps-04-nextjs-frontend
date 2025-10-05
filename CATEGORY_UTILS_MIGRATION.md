# Migración a Utilidades Centralizadas de Categorías

## ✅ Archivos Creados

### `src/utils/categoryUtils.tsx`
- **CATEGORY_COLORS**: Colores centralizados por categoría
- **CATEGORY_DISPLAY_NAMES**: Nombres de display centralizados
- **getCategoryColor()**: Función para obtener color de categoría
- **getCategoryDisplayName()**: Función para obtener nombre de display
- **getCategoryHeroIcon()**: Función para obtener iconos de Heroicons
- **getCategoryIcon()**: Función para iconos con Material-UI
- **getCategoryConfig()**: Configuración completa de categoría
- **getAllCategoryConfigs()**: Array de todas las configuraciones
- **getCategoryStyles()**: Estilos CSS consistentes

## ✅ Archivos Actualizados

### `src/components/layout/GraphSidebar.tsx`
- ❌ Eliminado: `categoryConfigs` local
- ❌ Eliminado: Importaciones de iconos individuales
- ✅ Agregado: `getAllCategoryConfigs()`
- ✅ Agregado: `getCategoryHeroIcon()`
- ✅ Agregado: `CATEGORY_COLORS`

### `src/components/drawer/NodeDetailDrawer.tsx`
- ❌ Eliminado: `getCategoryColor()` local
- ✅ Agregado: Importación de `getCategoryColor` centralizada
- ✅ Mejorado: `getCategoryIcon()` usa color centralizado

### `src/components/drawer/EdgeDetailDrawer.tsx`
- ❌ Eliminado: `getCategoryColor()` local
- ✅ Agregado: Importación de utilidades centralizadas

### `src/contexts/FilterContext.tsx`
- ❌ Eliminado: `getCategoryDisplayName()` local
- ✅ Agregado: Uso de utilidad centralizada

### `src/components/NodeTypeSelector.tsx`
- ❌ Eliminado: `getCategoryDisplayName()` local
- ✅ Agregado: Importación de utilidad centralizada

### `src/components/FilterSummary.tsx`
- ❌ Eliminado: `getCategoryDisplayName()` local
- ✅ Agregado: Importación de utilidad centralizada

### `src/components/CategoryFilter.tsx`
- ❌ Eliminado: `getCategoryDisplayName()` local
- ✅ Agregado: Importación de utilidad centralizada

## 🎯 Beneficios Logrados

### **Consistencia Total**
- ✅ Colores unificados en toda la aplicación
- ✅ Nombres de display consistentes
- ✅ Iconos centralizados (Heroicons + Material-UI)

### **Mantenibilidad**
- ✅ Un solo lugar para cambiar colores
- ✅ Un solo lugar para cambiar nombres
- ✅ Un solo lugar para cambiar iconos

### **Escalabilidad**
- ✅ Fácil agregar nuevas categorías
- ✅ Fácil cambiar esquemas de colores
- ✅ Soporte para múltiples librerías de iconos

### **Reutilización**
- ✅ Funciones disponibles en toda la app
- ✅ Configuraciones completas exportables
- ✅ Estilos CSS generados automáticamente

## 🔧 Uso de las Utilidades

```typescript
// Obtener color
const color = getCategoryColor(Categories.Publications); // '#48bb78'

// Obtener nombre de display
const name = getCategoryDisplayName(Categories.Publications); // 'Publicaciones'

// Obtener icono de Heroicons
const icon = getCategoryHeroIcon(Categories.Publications, "w-6 h-6");

// Obtener configuración completa
const config = getCategoryConfig(Categories.Publications);
// { key, label, color, heroIcon, displayName }

// Obtener todas las configuraciones
const allConfigs = getAllCategoryConfigs();

// Obtener estilos CSS
const styles = getCategoryStyles(Categories.Publications, true);
// { backgroundColor, borderColor, color, iconColor }

// Obtener configuración para reagraph
const reagraphConfig = getReagraphCategoryConfig(Categories.Publications);
// { fill: '#48bb78', size: 12, icon?: string }
```

## 🎨 Colores Centralizados

- **Publications**: `#48bb78` (Verde)
- **Experiments**: `#3182ce` (Azul)
- **Missions**: `#805ad5` (Púrpura)
- **Authors**: `#ed8936` (Naranja)
- **PublicationVenue**: `#d69e2e` (Amarillo)
- **Topic**: `#e53e3e` (Rojo)
- **Dataset**: `#38b2ac` (Teal)
- **Default**: `#718096` (Gris)

## 🔄 Sincronización con Reagraph

### `src/components/graph/utils.ts`
- ❌ Eliminado: `CATEGORY_CONFIGS` local con colores inconsistentes
- ✅ Agregado: `getReagraphCategoryConfig()` de utilidades centralizadas
- ✅ Sincronizado: Todos los nodos del grafo usan colores consistentes

### Colores Anteriores vs Nuevos:
- Publications: `#4F46E5` → `#48bb78` ✅
- Experiments: `#059669` → `#3182ce` ✅  
- Missions: `#DC2626` → `#805ad5` ✅
- Authors: `#7C3AED` → `#ed8936` ✅
- PublicationVenue: `#EC4899` → `#d69e2e` ✅
- Topic: `#F59E0B` → `#e53e3e` ✅
- Dataset: `#0EA5E9` → `#38b2ac` ✅

## 🚀 Próximos Pasos

1. **Verificar funcionamiento** en todos los componentes
2. **Agregar tests** para las utilidades
3. **Documentar** patrones de uso
4. **Considerar** temas dinámicos en el futuro