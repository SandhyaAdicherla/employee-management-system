import { Link } from "react-router-dom";

function EmployeeTable({
  employees,
  user,
  onDelete
}) {

  return (
    <table className="table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>

          {user?.role === "admin" &&
            <th>Actions</th>}
        </tr>
      </thead>

      <tbody>

        {employees.map((employee) => (

          <tr key={employee.id}>

            <td>{employee.id}</td>
            <td>
            <Link
              to={`/employees/${employee.id}`}
              className="employee-link"
            >
              {employee.name}
            </Link>
          </td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>₹ {employee.salary}</td>

            {user?.role === "admin" && (

              <td>

                <Link
                  to={`/edit-employee/${employee.id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    onDelete(employee.id)
                  }
                >
                  Delete
                </button>

              </td>

            )}

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default EmployeeTable;