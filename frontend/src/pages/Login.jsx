import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../Context/Authcontext";
import { getEmployees } from "../services/employeeService";

function Login() {

  const navigate = useNavigate();
  const {setUser,setEmployeeId} = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "",password: ""});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setApiError("");
    setSuccess("");

    if (!validateForm()) return;

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      const loggedUser = response.data.user;
        localStorage.setItem( "user",
          JSON.stringify(loggedUser)
        );

        setUser(loggedUser);
      console.log("loged in user",loggedUser);
      const employeeResponse = await getEmployees();
      const employee = employeeResponse.data.find(emp =>
        emp.email ===loggedUser.email);
      console.log("employees",employeeResponse)
      if (employee) {
        console.log("itemset",employee.id)
        localStorage.setItem("employeeId",employee.id);

        setEmployeeId(employee.id);
      }

      setSuccess(
        "Login Successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {

      setApiError(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

    }, []);

  return (
  <div className="auth-container">

    <div className="auth-layout">

      <div className="auth-info">

        <span className="auth-badge">
          Employee Management System
        </span>

        <h1>
          EMS Pro
        </h1>

        <p>
          Manage employees,
          departments and analytics
          from a single dashboard.
        </p>

      </div>

      <div className="auth-card">

        <h3 className="text-center mb-20">
          Sign in
        </h3>

        {apiError && (
          <div className="error-box">
            {apiError}
          </div>
        )}

        {success && (
          <div className="success-box">
            <div className="success-icon">
              ✓
            </div>
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group mb-15">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />

            {errors.email && (
              <small className="field-error">
                {errors.email}
              </small>
            )}

          </div>

          <div className="form-group mb-15">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />

            {errors.password && (
              <small className="field-error">
                {errors.password}
              </small>
            )}

          </div>

          <button
            type="submit"
            className="btn-save full-width"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="demo-card">

        <h4>Demo Accounts</h4>

        <div className="demo-account">

          <div className="demo-badge admin">
            Admin
          </div>

          <p>
            Email: sarah.johnson@gmail.com
          </p>

          <p>
            Password: admin123
          </p>

        </div>

        <div className="demo-account">

          <div className="demo-badge employee">
            Employee
          </div>

          <p>
            Email: sneha.reddy@gmail.com
          </p>

          <p>
            Password: sarah@987
          </p>

        </div>

      </div>

        <p className="mt-20 text-center">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="link"
          >
            Register
          </Link>

        </p>

      </div>
      </div>

    </div>
  );
}

export default Login;