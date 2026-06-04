import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { ToastContext } from "../Context/ToastContext";
import EmployeeForm from "../components/EmployeeForm";
import { AuthContext } from "../Context/Authcontext";

function AddEmployee() {

  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const {user,employeeId} = useContext(AuthContext);
  const [formData, setFormData] = useState({
  employee_code: "",
  name: "",
  email: "",
  designation: "",
  department: "",
  manager: "",
  salary: "",
  joining_date: "",
  location: "",
  work_mode: "",
  status: ""
});


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/employees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

       showToast(
         response.data.message,
          "success"
        );
      setTimeout(() => {
        navigate("/employees");
      }, 1500);

    } catch (error) {

      showToast(
        error.response?.data?.message ||
        "Failed to add employee",
        "error"
      );

    }
  };
  useEffect(() => {

    if (user?.role !== "admin") {
      navigate("/dashboard");
    }

  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">

          <div className="form-header">

            <div>

              <h2>
                Add Employee
              </h2>

              <p>
                Create a new employee profile
              </p>

            </div>

          </div>

           <EmployeeForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              buttonText="Add Employee"
            />

        </div>

      </div>
    </>
  );
}

export default AddEmployee;