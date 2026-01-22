interface DepartmentFilterProps {
  value: string;
  onChange: (value: string) => void;
  departments: string[];
}

export default function DepartmentFilter({ value, onChange, departments }: DepartmentFilterProps) {
  return (
    <div className="relative">
      <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
        Department
      </label>
      <select
        id="department-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white text-gray-900"
        aria-label="Filter by department"
      >
        <option value="All Departments">All Departments</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}
