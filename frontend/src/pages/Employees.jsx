import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeTable from "../components/EmployeeTable";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import {
getEmployees,
deleteEmployee
} from "../services/employeeService";
import { ToastContext } from "../Context/ToastContext";
import CommonModal from "../components/CommonModal";
import { AuthContext } from "../Context/Authcontext";

function Employees() {

const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const { showToast } =useContext(ToastContext);

const [searchTerm, setSearchTerm] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

const {user,employeeId} = useContext(AuthContext);
const navigate = useNavigate();

useEffect(() => {
fetchEmployees();
if (
    user?.role !== "admin" &&
    user?.role !== "employee"
  ) {
    navigate("/dashboard");
  }

}, []);
const fetchEmployees = async () => {


try {

  const response = await getEmployees();
  const filter = response?.data?.filter(
      employee =>
      Number(employee.id) !== Number(employeeId)
    );
  setEmployees(filter);

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


const totalPages = Math.ceil(
filteredEmployees.length / employeesPerPage);

const currentEmployees = filteredEmployees.slice(
  (currentPage - 1) * employeesPerPage,
  currentPage * employeesPerPage
);


return (
<> <Navbar />


  <div className="container">

    <div className="employees-header">

      <div>

        <h1>Employees</h1>

        <p>
          Manage employee records,
          departments and salaries.
        </p>

      </div>

      {user?.role === "admin" && (

        <Link
          to="/add-employee"
          className="add-employee-btn"
        >

          + Add Employee

        </Link>

      )}

    </div>

     <div className="filters-card">

        <EmployeeFilters
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          departmentFilter={departmentFilter}
          setDepartmentFilter={handleDepartmentChange}
          departments={departments}
        />

      </div>

    {loading ? (

      <Loader />

    ) : filteredEmployees.length === 0 ? (

      <EmptyState />

    ) : (

      <>
        <div className="table-card">

          <EmployeeTable
            employees={currentEmployees}
            user={user}
            onDelete={handleDeleteClick}
          />

        </div>

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

  {showDeleteModal && <CommonModal
      title="Delete Employee"
      onClose={() =>
      setShowDeleteModal(false)}
      onSubmit = {handleDeleteConfirm}
      btnText = "Delete"
      btnClass = "btn-danger"
    >
       <p>
          Are you sure you want to delete this employee?
        </p>
  </CommonModal>
  }

</>


);
}

export default Employees;
