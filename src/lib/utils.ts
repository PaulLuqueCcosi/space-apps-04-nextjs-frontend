import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  if (!name) return '';

  // Elimina espacios extra y separa por espacios
  const words = name.trim().split(/\s+/);

  // Toma la primera letra de cada palabra
  const initials = words.map(word => word.charAt(0).toUpperCase());

  // Une las iniciales
  return initials.join('');
}