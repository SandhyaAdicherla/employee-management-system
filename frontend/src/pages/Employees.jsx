import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeTable from "../components/EmployeeTable";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import {
getEmployees,
deleteEmployee
} from "../services/employeeService";
import { ToastContext } from "../Context/ToastContext";

function Employees() {

const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const { showToast } =
  useContext(ToastContext);

const [searchTerm, setSearchTerm] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

const user =
JSON.parse(localStorage.getItem("user"));

useEffect(() => {
fetchEmployees();
}, []);

const fetchEmployees = async () => {


try {

  const response =
    await getEmployees();

  setEmployees(response.data);

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

const handleDeleteClick = (id) => {


setSelectedEmployeeId(id);
setShowDeleteModal(true);


};

const handleDeleteConfirm = async () => {


try {

  await deleteEmployee(selectedEmployeeId);

  setShowDeleteModal(false);
   showToast(
    "Employee Deleted Successfully",
    "success"
  );
  fetchEmployees();

} catch (error) {

  console.log(error);

}


};

const handleSearchChange = (value) => {


setSearchTerm(value);
setCurrentPage(1);


};

const handleDepartmentChange = (value) => {


setDepartmentFilter(value);
setCurrentPage(1);


};

const departments = [


...new Set(

  employees.map(
    employee => employee.department
  )

)


];

const filteredEmployees =
employees.filter((employee) => {


  const matchesSearch =

    employee.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )

    ||

    employee.email
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  const matchesDepartment =

    departmentFilter === ""

    ||

    employee.department ===
    departmentFilter;

  return (
    matchesSearch &&
    matchesDepartment
  );

});


const employeesPerPage = 5;

const totalPages =
Math.ceil(
filteredEmployees.length /
employeesPerPage
);

const currentEmployees =
filteredEmployees.slice(
(currentPage - 1) *
employeesPerPage,


  currentPage *
  employeesPerPage
);


return (
<> <Navbar />


  <div className="container">

    <div className="page-header">

      <h1>Employees</h1>

      {user?.role === "admin" && (

        <Link
          to="/add-employee"
          className="btn btn-primary"
        >
          + Add Employee
        </Link>

      )}

    </div>

    <EmployeeFilters
      searchTerm={searchTerm}
      setSearchTerm={
        handleSearchChange
      }
      departmentFilter={
        departmentFilter
      }
      setDepartmentFilter={
        handleDepartmentChange
      }
      departments={departments}
    />

    {loading ? (

      <Loader />

    ) : filteredEmployees.length === 0 ? (

      <EmptyState />

    ) : (

      <>
        <EmployeeTable
          employees={currentEmployees}
          user={user}
          onDelete={
            handleDeleteClick
          }
        />

        {totalPages > 1 && (

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={
              setCurrentPage
            }
          />

        )}

      </>

    )}

  </div>

  <ConfirmModal
    show={showDeleteModal}
    onClose={() =>
      setShowDeleteModal(false)
    }
    onConfirm={
      handleDeleteConfirm
    }
  />

</>


);
}

export default Employees;
