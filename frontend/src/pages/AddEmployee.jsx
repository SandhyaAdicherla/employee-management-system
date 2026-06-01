import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { ToastContext } from "../Context/ToastContext";

function AddEmployee() {

  const navigate = useNavigate();
  const { showToast } =
  useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

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

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">

          <h2>Add Employee</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary"
            >
              Add Employee
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddEmployee;