import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../services/api";
import { AuthContext } from "../Context/Authcontext";
import { getInitials } from "../utils/Avatar.util";

function EmployeeDetails() {

const { id } = useParams();
const nagivate = useNavigate();

const [employee, setEmployee] = useState(null);
const {user,employeeId} = useContext(AuthContext);
const [loading, setLoading] = useState(true);

useEffect(() => {

fetchEmployee();
if (
    user?.role !== "admin" &&
    user?.role !== "employee"
  ) {
    navigate("/dashboard");
    return;
  }

}, []);

const fetchEmployee = async () => {

try {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      `/employees/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  setEmployee(
    response.data[0]
  );

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

if (loading) {
return <Loader />;
}

if (!employee) {
return (
<> <Navbar />


    <div className="container">

      <div className="card">

        <h2>
          Employee Not Found
        </h2>

      </div>

    </div>
  </>
);


}

return (
<>
  <Navbar />

  <div className="employee-details-container">

    <div className="employee-details-card">

      <Link
        to="/employees"
        className="back-link"
      >
        ← Back to Employees
      </Link>

      <div className="employee-profile-header">

        <div className="employee-avatar-large">
          {getInitials(employee.name)}
        </div>

        <h1>{employee.name}</h1>

        <p>{employee.email}</p>

        <div className="employee-badges">

          <span className="department-badge">
            {employee.department}
          </span>

        </div>

      </div>

      <div className="employee-info-grid">

        <div className="info-card">
          <span>Employee Code</span>
          <h3>{employee.employee_code}</h3>
        </div>

        <div className="info-card">
          <span>Designation</span>
          <h3>{employee.designation}</h3>
        </div>

        <div className="info-card">
          <span>Manager</span>
          <h3>{employee.manager || "-"}</h3>
        </div>

        <div className="info-card">
          <span>Salary</span>
          <h3>
            ₹{Number(employee.salary).toLocaleString("en-IN")}
          </h3>
        </div>

        <div className="info-card">
          <span>Joining Date</span>
          <h3>
            {
              employee.joining_date
              ? new Date(
                  employee.joining_date
                ).toLocaleDateString("en-IN")
              : "-"
            }
          </h3>
        </div>

        <div className="info-card">
          <span>Location</span>
          <h3>{employee.location || "-"}</h3>
        </div>

        <div className="info-card">
          <span>Work Mode</span>
          <h3>{employee.work_mode || "-"}</h3>
        </div>

        <div className="info-card">
          <span>Status</span>

          <div
            className={`status-badge ${
              employee.status === "Active"
                ? "status-active"
                : "status-resigned"
            }`}
          >
            {employee.status}
          </div>

        </div>

      </div>

      <div className="profile-actions">

        {(
          user?.role === "admin" ||
          (
            user?.role === "employee" &&
            Number(employee?.id) === Number(employeeId)
          )
        ) && (

          <Link
            to={`/edit-employee/${employee.id}`}
            className="btn-save"
          >
            Edit Profile
          </Link>

        )}

        <Link
          to="/employees"
          className="btn-cancel"
        >
          Back
        </Link>

      </div>

    </div>

  </div>
</>


);
}

export default EmployeeDetails;
