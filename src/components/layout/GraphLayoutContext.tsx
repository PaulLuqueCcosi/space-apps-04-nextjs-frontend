'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

interface EducationLayoutContextType {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const EducationLayoutContext = createContext<EducationLayoutContextType>({
  isSidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  currentSection: 'Dashboard',
  setCurrentSection: () => {},
});

export const useEducationLayout = () => useContext(EducationLayoutContext);

export function EducationLayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('Dashboard');
  const pathname = usePathname();

  const getCurrentSection = () => {
    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/profile')) return 'Institution Profile';
    if (pathname.includes('/credentials')) return 'Credentials Management';
    if (pathname.includes('/analytics')) return 'Analytics & Reports';
    return 'Dashboard';
  };

  return (
    <EducationLayoutContext.Provider value={{ isSidebarCollapsed, setSidebarCollapsed, currentSection, setCurrentSection }}>
      {children}
    </EducationLayoutContext.Provider>
  );
}