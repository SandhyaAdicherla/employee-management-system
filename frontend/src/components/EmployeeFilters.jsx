function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  departments
}) {

  return (
    <div className="filters">

      <input
        type="text"
        placeholder="Search Employee..."
        className="search-input"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <select
        className="department-select"
        value={departmentFilter}
        onChange={(e) =>
          setDepartmentFilter(e.target.value)
        }
      >

        <option value="">
          All Departments
        </option>

        {departments.map((department) => (

          <option
            key={department}
            value={department}
          >
            {department}
          </option>

        ))}

      </select>

    </div>
  );
}

export default EmployeeFilters;