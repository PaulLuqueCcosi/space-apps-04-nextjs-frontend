import { IGraphService } from './abstractions/IGraphService';
import { MockGraphService } from './MockGraphService';
import { ApiGraphService } from './ApiGraphService';

export type ServiceMode = 'mock' | 'api';

export class GraphServiceFactory {
  private static instance: IGraphService | null = null;
  private static currentMode: ServiceMode = 'mock';

  static getService(mode?: ServiceMode): IGraphService {
    const serviceMode = mode || this.currentMode;
    
    // Crear nueva instancia si el modo cambió
    if (!this.instance || serviceMode !== this.currentMode) {
      this.currentMode = serviceMode;
      this.instance = this.createService(serviceMode);
    }
    
    return this.instance;
  }

  static setMode(mode: ServiceMode): void {
    if (mode !== this.currentMode) {
      this.currentMode = mode;
      this.instance = null; // Forzar recreación en próxima llamada
    }
  }

  static getCurrentMode(): ServiceMode {
    return this.currentMode;
  }

  private static createService(mode: ServiceMode): IGraphService {
    switch (mode) {
      case 'mock':
        return new MockGraphService();
      case 'api':
        return new ApiGraphService();
      default:
        throw new Error(`Unknown service mode: ${mode}`);
    }
  }

  // Método para desarrollo - cambiar fácilmente entre modos
  static useMock(): IGraphService {
    return this.getService('mock');
  }

  static useApi(): IGraphService {
    return this.getService('api');
  }
}