interface ActiveFiltersProps {
  searchQuery: string;
  selectedDepartment: string;
  onClearSearch: () => void;
  onClearDepartment: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  searchQuery,
  selectedDepartment,
  onClearSearch,
  onClearDepartment,
  onClearAll,
}: ActiveFiltersProps) {
  // Only render when filters are active
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasDepartmentFilter = selectedDepartment !== 'All Departments';
  const hasActiveFilters = hasSearchQuery || hasDepartmentFilter;

  if (!hasActiveFilters) {
    return null;
  }

  // Count active filters
  const activeFilterCount = (hasSearchQuery ? 1 : 0) + (hasDepartmentFilter ? 1 : 0);

  return (
    <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">
            Active Filters ({activeFilterCount}):
          </span>

          {/* Search Query Chip */}
          {hasSearchQuery && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-indigo-300 rounded-full text-sm">
              <span className="text-gray-700">
                Search: <span className="font-medium text-gray-900 truncate max-w-xs">{searchQuery}</span>
              </span>
              <button
                type="button"
                onClick={onClearSearch}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
                aria-label="Clear search filter"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Department Filter Chip */}
          {hasDepartmentFilter && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-indigo-300 rounded-full text-sm">
              <span className="text-gray-700">
                Department: <span className="font-medium text-gray-900">{selectedDepartment}</span>
              </span>
              <button
                type="button"
                onClick={onClearDepartment}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
                aria-label="Clear department filter"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Clear All Button */}
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors whitespace-nowrap"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
