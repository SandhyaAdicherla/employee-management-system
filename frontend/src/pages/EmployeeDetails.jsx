import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../services/api";

function EmployeeDetails() {

const { id } = useParams();

const [employee, setEmployee] =
useState(null);

const [loading, setLoading] =
useState(true);

useEffect(() => {


fetchEmployee();


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
<> <Navbar />


  <div className="container">

    <div className="card">

      <div className="page-header">

        <h2>
          Employee Details
        </h2>

        <Link
          to="/employees"
          className="btn"
        >
          Back
        </Link>

      </div>

      <div className="details-grid">

        <div className="detail-item">
          <strong>ID:</strong>
          <span>{employee.id}</span>
        </div>

        <div className="detail-item">
          <strong>Name:</strong>
          <span>{employee.name}</span>
        </div>

        <div className="detail-item">
          <strong>Email:</strong>
          <span>{employee.email}</span>
        </div>

        <div className="detail-item">
          <strong>Department:</strong>
          <span>
            {employee.department}
          </span>
        </div>

        <div className="detail-item">
          <strong>Salary:</strong>
          <span>
            ₹{employee.salary}
          </span>
        </div>

      </div>

      <Link
        to={`/edit-employee/${employee.id}`}
        className="btn btn-primary"
      >
        Edit Employee
      </Link>

    </div>

  </div>
</>


);
}

export default EmployeeDetails;
