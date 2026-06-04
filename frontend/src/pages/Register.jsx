import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (
      formData.password &&
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setApiError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      setSuccess(
        response.data.message ||
        "Registration Successful!"
      );

      setFormData({
        username: "",
        email: "",
        password: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setApiError(
        error.response?.data?.message ||
        "Registration Failed"
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
      <div className="auth-layout">

        <div className="auth-info">

          <span className="auth-badge">
            Employee Management System
          </span>

          <h1>
            EMS Pro
          </h1>

          <p>
            Create an account and start
            managing employees with ease.
          </p>

        </div>

        <div className="auth-card">

          <h3 className="text-center mb-20">
            Register
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

              <label>Username</label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />

              {errors.username && (
                <small className="field-error">
                  {errors.username}
                </small>
              )}

            </div>

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
              {
                loading
                  ? "Registering..."
                  : "Register"
              }
            </button>

          </form>

          <p className="mt-20 text-center">

            Already have an account?{" "}

            <Link
              to="/login"
              className="link"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;