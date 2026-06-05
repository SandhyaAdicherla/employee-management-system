import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { ToastContext } from "../Context/ToastContext";
import EmployeeForm from "../components/EmployeeForm";
import { AuthContext } from "../Context/Authcontext";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const {user,employeeId} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });


  useEffect(() => {
    getEmployee();
   const isAdmin = user?.role === "admin";

  const isOwnProfile = user?.role === "employee" &&
    Number(id) === Number(employeeId);

  if (!isAdmin && !isOwnProfile) {
    navigate("/dashboard");
  }
  }, []);

  const getEmployee = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        `/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const employee = response.data[0];

      setFormData({
        ...employee,
        joining_date: employee.joining_date
          ? employee.joining_date.split("T")[0]
          : ""
      });

    } catch (error) {

      console.log(error);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.put(
        `/employees/${id}`,
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
      window.dispatchEvent( new Event("notificationUpdate"));
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

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">

          <div className="form-header mb-20">

            <div>

              <h2>Edit Employee</h2>

              <p>
                Update employee information and organizational details.
              </p>

            </div>

          </div>
          <EmployeeForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            buttonText="Update Employee"
          />

        </div>

      </div>
    </>
  );
}

export default EditEmployee;