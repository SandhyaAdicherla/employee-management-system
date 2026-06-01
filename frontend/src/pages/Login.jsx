import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

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
    const token =
        localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

    }, []);

  return (
    <div className="auth-container">

      <div
        className="card"
        style={{ width: "400px" }}
      >

        <h2 className="page-title text-center">
          Employee Management
        </h2>

        <h3 className="text-center mb-20">
          Login
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

          <div className="form-group">

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

          <div className="form-group">

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
            className="btn btn-primary full-width"
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        <div className="demo-card">

        <h4>Demo Accounts</h4>

        <div className="demo-account">

          <div className="demo-badge admin">
            Admin
          </div>

          <p>
            Email: admin@gmail.com
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
            Email: employee@gmail.com
          </p>

          <p>
            Password: employee123
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
  );
}

export default Login;