import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

const [stats, setStats] = useState({});
const [employees, setEmployees] = useState([]);

const user =
JSON.parse(
localStorage.getItem("user")
);

useEffect(() => {


getStats();
getEmployees();


}, []);

const getStats = async () => {


try {

  const token =
    localStorage.getItem("token");

  const response = await api.get(
    "/dashboard/stats",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  setStats(response.data);

} catch (error) {

  console.log(error);

}


};

const getEmployees = async () => {


try {

  const token =
    localStorage.getItem("token");

  const response = await api.get(
    "/employees",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  setEmployees(response.data);

} catch (error) {

  console.log(error);

}


};

const activeEmployees =
employees.filter(
employee =>
employee.status === "Active"
).length;

const remoteEmployees =
employees.filter(
employee =>
employee.work_mode === "Remote"
).length;

const totalDepartments =
new Set(
employees.map(
employee =>
employee.department
)
).size;

return (
<> <Navbar />


  <div className="container">

    <div className="welcome-card">

      <div className="welcome-content">

        <span className="welcome-badge">
          Employee Management System
        </span>

        <h1>
          Welcome back,
          {" "}
          {user?.username}
          {" "}
          👋
        </h1>

        <p>
          Manage employees,
          departments, users and
          company operations from
          a single dashboard.
        </p>

      </div>

    </div>

    <div className="dashboard-grid">

      <div className="dashboard-card">

        <div className="card-top">

          <div className="card-icon employees-icon">
            👥
          </div>

        </div>

        <h2>
          {employees.length}
        </h2>

        <span>
          Total Employees
        </span>

      </div>

      <div className="dashboard-card">

        <div className="card-top">

          <div className="card-icon admins-icon">
            ✅
          </div>

        </div>

        <h2>
          {activeEmployees}
        </h2>

        <span>
          Active Employees
        </span>

      </div>

      <div className="dashboard-card">

        <div className="card-top">

          <div className="card-icon users-icon">
            🏢
          </div>

        </div>

        <h2>
          {totalDepartments}
        </h2>

        <span>
          Departments
        </span>

      </div>

      <div className="dashboard-card">

        <div className="card-top">

          <div className="card-icon departments-icon">
            💻
          </div>

        </div>

        <h2>
          {remoteEmployees}
        </h2>

        <span>
          Remote Employees
        </span>

      </div>

    </div>

    <div className="dashboard-section">

      <h2>
        Recent Employees
      </h2>

      <div className="recent-employees">

        {employees
          .slice(-5)
          .reverse()
          .map(employee => (

          <div
            key={employee.id}
            className="recent-employee-card"
          >

            <div className="employee-avatar">

              {employee.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h4>
                {employee.name}
              </h4>

              <small>
                {employee.designation}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
    <div className="dashboard-section">

      <h2>Quick Actions</h2>

      <div className="quick-actions">

        <Link
          to="/add-employee"
          className="quick-action-card"
        >
          <span>➕</span>
          <h4>Add Employee</h4>
        </Link>

        <Link
          to="/employees"
          className="quick-action-card"
        >
          <span>👥</span>
          <h4>View Employees</h4>
        </Link>

        <Link
          to="/profile"
          className="quick-action-card"
        >
          <span>👤</span>
          <h4>My Profile</h4>
        </Link>

      </div>

    </div>

  </div>
</>


);
}

export default Dashboard;
