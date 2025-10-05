// Exportaciones principales del módulo de servicios
export { GraphServiceFactory, type ServiceMode } from './GraphServiceFactory';
export { type IGraphService } from './abstractions/IGraphService';
export { MockGraphService } from './MockGraphService';
export { ApiGraphService } from './ApiGraphService';
export { GraphAdapter } from './adapters/GraphAdapter';

// Hook personalizado para usar el servicio
export { useGraphService } from './hooks/useGraphService';