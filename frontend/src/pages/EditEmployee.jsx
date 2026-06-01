import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { ToastContext } from "../Context/ToastContext";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } =
  useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });


  useEffect(() => {
    getEmployee();
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
      setFormData(response.data[0]);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

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

          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-primary"
            >
              Update Employee
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditEmployee;