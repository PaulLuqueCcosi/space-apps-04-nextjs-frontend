'use client';

import React from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Categories } from '@/services/types/graph';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getAllCategoryConfigs, getCategoryHeroIcon, CATEGORY_COLORS } from '@/utils/categoryUtils';

// Usar configuraciones centralizadas
const categoryConfigs = getAllCategoryConfigs();

export default function GraphSidebar() {
  const {
    selectedCategories,
    handleCategoryToggle,
    handleSelectAllCategories,
    handleClearAllCategories,
    searchQuery,
    setSearchQuery,
    sidebarCollapsed,
    setSidebarCollapsed,
    loading,
    isAllCategoriesSelected,
  } = useFilter();

  // Function to handle search
  const handleSearch = () => {
    // Create object with all filters and search
    const searchData = {
      searchQuery: searchQuery.trim(),
      selectedCategories: selectedCategories,
      timestamp: new Date().toISOString(),
      totalFilters: selectedCategories.length
    };

    // Log for debugging
    console.log('Search performed with filters:', searchData);

    // Here you can add additional logic:
    // - Send to analytics
    // - Call specific APIs
    // - Save to localStorage
    // - Send custom events

    // Custom event example
    // if (typeof window !== 'undefined') {
    //   window.dispatchEvent(new CustomEvent('graphSearch', {
    //     detail: searchData
    //   }));
    // }

    // You can also call context functions if you need to
    // perform specific actions with the combined data
  };

  // Handle Enter key in search input
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  if (sidebarCollapsed) {
    return (
      <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        {/* Header compacto */}
        <div className="p-2 bg-gray-700 text-white flex flex-col items-center justify-center">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Expand filters"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Compact search - with same spacing as categories */}
        <div className="p-1">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className={'w-full h-10 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-black border border-gray-300'}
            title={searchQuery ? `Search: ${searchQuery}` : "Open search"}
          >
            <MagnifyingGlassIcon className="w-5 h-5 stroke-1 mx-auto" />
          </button>
        </div>

        {/* Subtle separator line */}
        <div className="mx-2 my-2 border-t border-gray-300"></div>

        {/* Clickable category icons */}
        <div className="flex-1 p-1 space-y-1">
          {categoryConfigs.map((config) => {
            const isSelected = selectedCategories.includes(config.key);

            return (
              <button
                key={config.key}
                onClick={() => handleCategoryToggle(config.key)}
                disabled={loading}
                className={`w-full h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${isSelected
                  ? 'border-opacity-100 shadow-sm'
                  : 'border-gray-300 hover:border-opacity-100'
                  } ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  backgroundColor: isSelected ? config.color : 'transparent',
                  borderColor: isSelected ? config.color : '#e0e0e0',
                  color: isSelected ? 'white' : config.color,
                }}
                title={config.label}
              >
                {getCategoryHeroIcon(config.key, "w-5 h-5")}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="p-2 bg-gray-700 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">Filters</h2>
          </div>
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Section - Separated */}
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search button */}
          {searchQuery && (
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              title="Search"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Section Title */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
            Relationship Type
          </h3>
          <div className="h-0.5 bg-gray-700 w-10"></div>
        </div>

        {/* Category Buttons */}
        <div className="space-y-2 mb-4">
          {categoryConfigs.map((config) => {
            const isSelected = selectedCategories.includes(config.key);

            return (
              <button
                key={config.key}
                onClick={() => handleCategoryToggle(config.key)}
                disabled={loading}
                className={`w-full flex items-center justify-start gap-3 py-2 px-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium min-h-8 ${isSelected
                  ? 'text-white shadow-sm'
                  : 'text-gray-700 hover:border-opacity-100'
                  } ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  backgroundColor: isSelected ? config.color : 'transparent',
                  borderColor: isSelected ? config.color : '#d1d5db',
                }}
              >
                <span style={{ color: isSelected ? 'white' : config.color }}>
                  {getCategoryHeroIcon(config.key, "w-4 h-4")}
                </span>
                <span className="text-left">{config.displayName}</span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-gray-300 my-2"></div>

        {/* Control buttons */}
        <div className="flex gap-1 mb-4">
          <button
            onClick={handleSelectAllCategories}
            disabled={loading || isAllCategoriesSelected}
            className="p-2 rounded text-green-600 hover:bg-green-50 disabled:opacity-60 transition-colors"
            title="Select all"
          >
            <CheckIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearAllCategories}
            disabled={loading || selectedCategories.length === 0}
            className="p-2 rounded text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
            title="Clear all"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Selected count indicator */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center justify-center px-3 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: CATEGORY_COLORS[Categories.Publications] }}
          >
            {selectedCategories.length}/{categoryConfigs.length} active
          </div>
        </div>

        {loading && (
          <div className="text-center mt-2">
            <div className="text-xs text-gray-600">
              Updating...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}