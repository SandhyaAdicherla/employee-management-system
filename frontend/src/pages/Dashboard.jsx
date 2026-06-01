import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats();
  }, []);
   const user =JSON.parse(localStorage.getItem("user"));
  const getStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="welcome-card">

       <div>

        <h1>
          Welcome back,
          {user?.username}
          👋
        </h1>

        <p>
          Manage employees,
          users and company data
          from your dashboard.
        </p>

          </div>

        </div>


        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>Total Employees</h3>
            <p>{stats.totalEmployees}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Admins</h3>
            <p>{stats.totalAdmins}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="dashboard-card">
            <h3>Departments</h3>
            <p>{stats.totalDepartments}</p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;