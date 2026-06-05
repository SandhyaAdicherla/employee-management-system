import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        👥
      </div>

      <h3>No Employees Found</h3>

      <p>
        Add your first employee to get started.
      </p>

      <Link
        to="/add-employee"
        className="btn btn-primary btn-save"
      >
        Add Employee
      </Link>

    </div>
  );
}

export default EmptyState;