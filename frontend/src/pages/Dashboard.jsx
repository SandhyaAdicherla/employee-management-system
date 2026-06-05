import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import AnalyticsCharts from "../components/AnalyticsCharts";
import api from "../services/api";
import { FiUserPlus } from "react-icons/fi";
import { AuthContext } from "../Context/Authcontext";
import { getInitials } from "../utils/Avatar.util";
import "./Dashboard.css";

function Dashboard() {

  const [employees, setEmployees] = useState([]);

  const {user,employeeId} = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  useEffect(() => {

    getEmployees();

  }, []);

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
  const recentEmployees = [...employees].filter(
      employee =>
        employee.email !== user?.email
    )
    .sort((a, b) =>
        new Date(b.joining_date) -new Date(a.joining_date)
    );
  const displayedEmployees = recentEmployees .length <= 3
    ? recentEmployees : recentEmployees.slice(0, 4);

    const roleMessages = {
    admin: {
      badge: "Administrator Access",
      description:
        "You have full access to manage employees, update records, monitor departments, and maintain company information."
    },

    employee: {
      badge: "Employee Access",
      description:
        "View your employee profile, track personal information, and keep your records up to date."
    },

    user: {
      badge: "User Access",
      description:
        "Manage your account information and access available system features."
    }
  };
 return (
  <>
    <Navbar />

    <div className="container">

      <div className="welcome-card">

        <div className="welcome-content">

          <span className="welcome-badge">
            {roleMessages[user?.role]?.badge}
          </span>

          <h1>
            Welcome back,
            {" "}
            {user?.username}
            {" "}
            👋
          </h1>

          <p>
            {roleMessages[user?.role]?.description}
          </p>

        </div>

      </div>

      {employees.length > 0 && (

        <AnalyticsCharts
          employees={employees}
        />

      )}

      <div className="dashboard-bottom">

        <div className="dashboard-section">

          <div className="section-header">

            <h2>
              Recently Joined Employees
            </h2>
            {employees.length > 1 &&
            <Link
              to="/employees"
              className="view-all-link"
            >
              View All
            </Link>}

          </div>

          {employees.length > 0 ? (

            <>
              <div className="recent-employees">

                {displayedEmployees.map(
                  employee => (

                    <div
                      key={employee.id}
                      className="recent-employee-card"
                    >

                      <div className="employee-avatar">
                        {getInitials(employee.name)}
                      </div>

                      <div className="employee-content">

                        <h4>
                          {employee.name}
                        </h4>

                        <small>
                          {employee.designation}
                        </small>

                      </div>

                      <Link
                        to={`/employees/${employee.id}`}
                        className="employee-view-btn"
                      >
                        View
                      </Link>

                    </div>

                  )
                )}

              </div>

            </>

          ) : (

            <div className="empty-state">

              <h3>
                No Employees Found
              </h3>

              <p>
                Start by adding your
                first employee.
              </p>

              <Link
                to="/add-employee"
                className="btn-save"
              >
                Add Employee
              </Link>

            </div>

          )}

        </div>
        {user?.role === "admin" && (

          <div className="dashboard-section">

            <h2>
              Quick Actions
            </h2>

            <div className="quick-action-card">

              <Link
                to="/add-employee"
                className="action-card"
              >
                <FiUserPlus />

                <h4>Add Employee</h4>

                <p>
                  Create employee records
                </p>
              </Link>

            </div>

          </div>

        )}

      </div>

    </div>

  </>
);
}

export default Dashboard;