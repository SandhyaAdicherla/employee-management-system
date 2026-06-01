import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../Context/ToastContext";
import { useContext, useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const { showToast } =
  useContext(ToastContext);
  const [showMenu, setShowMenu] =useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast(
      "Logged Out Successfully",
      "success"
    );
    navigate("/login");

  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <h2>EMS</h2>
      </div>

      <div className="nav-center">

        <Link
          to="/dashboard"
          className="nav-link"
        >
          Dashboard
        </Link>

      </div>
      <Link
        to="/employees"
        className="nav-link"
        >
        Employees
        </Link>

      <div className="nav-right">

        <div className="profile-wrapper">

        <div
          className="avatar"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >


      {user?.username
        ?.charAt(0)
        ?.toUpperCase()}


        </div>

      {showMenu && (


      <div className="profile-menu">

        <div className="profile-header">

          <div className="profile-avatar">

            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h4>
              {user?.name}
            </h4>

            <p>
              {user?.email}
            </p>

          </div>

        </div>

        <div className="role-chip">

          {user?.role === "admin"
            ? "Administrator"
            : "Employee"}

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>


      )}

      </div>


      </div>

    </nav>
  );
}

export default Navbar;