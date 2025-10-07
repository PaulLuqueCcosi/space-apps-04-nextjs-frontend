'use client';

import { Bot } from 'lucide-react';

interface AIFloatingButtonProps {
  onClick: () => void;
}

export const AIFloatingButton = ({ onClick }: AIFloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
      aria-label="Open AI Assistant"
    >
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <span className="text-sm font-medium whitespace-nowrap">
          AI Assistant
        </span>
      </div>
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20" />
    </button>
  );
};