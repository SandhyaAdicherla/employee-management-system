import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../Context/ToastContext";
import { useContext, useRef, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiBell,
  FiSettings,
  FiLogOut,
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiLock,
  FiUser
} from "react-icons/fi";
import api from "../services/api";
import { useEffect } from "react";
import { AuthContext } from "../Context/Authcontext";
import { getInitials } from "../utils/Avatar.util";
import ChangePasswordModal from "./ChangePasswordModal";
import UserProfileModal from "./UserProfileModal";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [showMenu, setShowMenu] =useState(false);
  const [showNotifications,setShowNotifications] = useState(false);
  const [unreadCount,setUnreadCount] = useState(0);
  const [notifications,setNotifications] = useState([]);
  const [showProfileModal,setShowProfileModal] = useState(false);
  const [showPasswordModal,setShowPasswordModal] = useState(false);
  const {user,employeeId,setEmployeeId,setUser} = useContext(AuthContext);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("employeeId");
    setEmployeeId(null);
    setUser(null)
    showToast(
      "Logged Out Successfully",
      "success"
    );
    navigate("/login");

  };

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(
          "/activity-logs",
          {
            headers: {
              Authorization:
              `Bearer ${token}`
            }
          }
        );

      setNotifications(
        response.data
      );
      const lastSeenId =
      Number(
        localStorage.getItem(
          "lastSeenNotificationId"
        )
      ) || 0;

    const unread = response.data.filter(
        item => item.id > lastSeenId).length;

    setUnreadCount(unread);

    } catch (error) {

      console.log(error);

    }

  };
  const handleNotificationClick = () => {

  setShowNotifications(!showNotifications );
  setShowMenu(false);

  if (
    notifications.length > 0
  ) {

    localStorage.setItem("lastSeenNotificationId",notifications[0].id);
  
    setUnreadCount(0);

  }

};
const handleMyProfile = () => {

  if (employeeId) {
    navigate(
      `/employees/${employeeId}`
    );
    return;
  }
    setShowMenu(false);
    setShowNotifications(false );
    setShowProfileModal(true);

};
useEffect(() => {

  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(
        event.target
      )
    ) {
      setShowMenu(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(
        event.target
      )
    ) {
      setShowNotifications(false);
    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);
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

     {(
        user?.role === "admin" ||
        user?.role === "employee"
      ) && (
        <Link
          to="/employees"
          className="nav-link"
        >
          <FiUsers />
          Employees
        </Link>
      )}

    </div>

    <div className="nav-right">

      <div className="nav-dropdown-wrapper">

      <button
        className="icon-btn notification-btn"
        onClick={handleNotificationClick}
      >

        <FiBell />

        {unreadCount > 0 && (

          <span
            className="notification-count"
          >
            {unreadCount}
          </span>

        )}

      </button>

      {showNotifications && (

        <div className="notification-dropdown" ref={notificationRef }>

          <div className="dropdown-title">
            Notifications
          </div>

          {notifications.length > 0 ? (

            notifications.map(item => (

              <div
                key={item.id}
                className="notification-item"
              >

                <div
                  className="notification-icon"
                >

                  {item.action ===
                    "CREATE" ? (
                    <FiUserPlus />
                  ) : item.action ===
                    "UPDATE" ? (
                    <FiEdit />
                  ) : (
                    <FiTrash2 />
                  )}

                </div>

                <div>

                  <h5>
                    {item.description}
                  </h5>

                  <small>

                    {new Date(
                      item.created_at
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </small>

                </div>

              </div>

            ))

          ) : (

            <div
              className="empty-notifications"
            >
              No notifications found
            </div>

          )}

        </div>

      )}

    </div>

      <div className="profile-wrapper">

        <button
          className="profile-trigger"
          onClick={() => {
            setShowNotifications(false)
            setShowMenu(!showMenu)
          }
          }
        >

          <div className="profile-avatar">
            {getInitials(user?.username)}

          </div>

        </button>

        {showMenu && (

          <div className="profile-dropdown" ref={profileRef}>

            <div className="dropdown-header">

              <div className="dropdown-avatar">
                {getInitials(user?.username)}

              </div>

              <div>

                <h4>
                  {user?.username}
                </h4>

                <p>
                    {user?.role === "admin" ? "System Administrator"
                      : user?.role === "employee" ? "Employee" : "Registered User"}
                </p>

              </div>

            </div>
            <button
              className="dropdown-item"
              onClick={handleMyProfile}
            >
              <FiUser />
              My Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                setShowMenu(false)
                setShowPasswordModal(true)
              }
            }
            >
              <FiLock />
              Change Password
            </button>

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
     {
        showProfileModal && (

        <UserProfileModal
          user={user}
          onClose={() =>
            setShowProfileModal(false)
          }
        />

        )
        }

        {
        showPasswordModal && (

        <ChangePasswordModal
          onClose={() =>
            setShowPasswordModal(false)
          }
        />

        )
        }

    </nav>
  );
}

export default Navbar;