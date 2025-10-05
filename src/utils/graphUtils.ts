// Utilidades simples para extraer información de los nodos
export function extractCategory(label: string): string {
  const colonIndex = label.indexOf(':');
  return colonIndex > 0 ? label.substring(0, colonIndex).toLowerCase() : 'unknown';
}

export function extractDisplayName(label: string): string {
  const colonIndex = label.indexOf(':');
  return colonIndex > 0 ? label.substring(colonIndex + 1).trim() : label;
}

export function formatRelationship(label: string): string {
  return label.replace(/_/g, ' ').toLowerCase();
}