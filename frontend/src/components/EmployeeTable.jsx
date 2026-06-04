import { Link } from "react-router-dom";
import {
  FiEdit,
  FiTrash2
} from "react-icons/fi";
import { getInitials } from "../utils/Avatar.util";
function EmployeeTable({
  employees,
  user,
  onDelete
}) {

  return (
    <table className="table">

      <thead>
        <tr>
          <th>Code</th>
          <th>Employee</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Status</th>

          {user?.role === "admin" &&
            <th>Actions</th>}
        </tr>
      </thead>

      <tbody>

        {employees.map((employee) => (

          <tr key={employee.id}>

            <td>
              {employee.employee_code}
            </td>

            <td>

              <div className="employee-info">

                <div className="employee-avatar">
                  {getInitials(employee.name)}
                </div>

                <div className="employee-meta">

                  <Link
                    to={`/employees/${employee.id}`}
                    className="employee-link"
                  >
                    {employee.name}
                  </Link>

                  <small>
                    {employee.email}
                  </small>

                </div>

              </div>

            </td>

            <td>
              {employee.designation}
            </td>

            <td>

              <span className="department-badge">
                {employee.department}
              </span>

            </td>

            <td>

              <span
                className={`status-badge ${
                  employee.status === "Active"
                    ? "status-active"
                    : "status-resigned"
                }`}
              >
                {employee.status}
              </span>

            </td>

            {user?.role === "admin" && (

              <td>

                <div className="action-buttons">

                  <Link
                    to={`/edit-employee/${employee.id}`}
                    className="action-icon edit-icon"
                    title="Edit Employee"
                  >
                    <FiEdit />
                  </Link>

                  <button
                    className="action-icon delete-icon"
                    onClick={() =>
                      onDelete(employee.id)
                    }
                    title="Delete Employee"
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </td>

            )}

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default EmployeeTable;