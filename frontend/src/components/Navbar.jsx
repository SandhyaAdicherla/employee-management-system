import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../Context/ToastContext";
import { useContext, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiBell,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

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

      <div className="logo">

        <div className="logo-icon">
          EM
        </div>

        <div className="logo-text">

          <h2>EMS Pro</h2>

          <span>
            Employee Management
          </span>

        </div>

      </div>

    </div>

    <div className="nav-center">

      <Link
        to="/dashboard"
        className="nav-link"
      >
        <FiHome />
        Dashboard
      </Link>

      <Link
        to="/employees"
        className="nav-link"
      >
        <FiUsers />
        Employees
      </Link>

    </div>

    <div className="nav-right">

      <button className="icon-btn">
        <FiBell />
      </button>

      <button className="icon-btn">
        <FiSettings />
      </button>

      <div className="profile-wrapper">

        <button
          className="profile-trigger"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >

          <div className="profile-avatar">

            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

        </button>

        {showMenu && (

          <div className="profile-dropdown">

            <div className="dropdown-header">

              <div className="dropdown-avatar">

                {user?.username
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div>

                <h4>
                  {user?.username}
                </h4>

                <p>
                  {user?.role}
                </p>

              </div>

            </div>
            <Link
              to="/profile"
              className="profile-menu-link"
              onClick={() =>
                setShowMenu(false)
              }
            >
              My Profile
            </Link>

            <button
              className="logout-dropdown-btn"
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