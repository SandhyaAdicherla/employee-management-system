import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeForm({
formData,
setFormData,
handleSubmit,
buttonText
}) {
const navigate = useNavigate();
const [errors, setErrors] = useState({});
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

  if (!formData.employee_code?.trim()) {
    newErrors.employee_code =
      "Employee code is required";
  }

  if (!formData.name?.trim()) {
    newErrors.name =
      "Name is required";
  }

  if (!formData.email?.trim()) {
    newErrors.email =
      "Email is required";
  }

  if (!formData.designation?.trim()) {
    newErrors.designation =
      "Designation is required";
  }

  if (!formData.department?.trim()) {
    newErrors.department =
      "Department is required";
  }

  if (!formData.salary) {
    newErrors.salary =
      "Salary is required";
  }

  if (!formData.joining_date) {
    newErrors.joining_date =
      "Joining date is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;

};
const onFormSubmit = (e) => {

  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  handleSubmit();

};
return (


<form onSubmit={onFormSubmit}>

  <div className="employee-form-grid">

    <div className="form-group">
      <label>Employee Code <span className="required">*</span></label>
      <input
        type="text"
        name="employee_code"
        value={formData.employee_code || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.employee_code && (
        <small className="field-error">
            {errors.employee_code}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Name <span className="required">*</span></label>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.name && (
        <small className="field-error">
            {errors.name}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Email <span className="required">*</span></label>
      <input
        type="email"
        name="email"
        value={formData.email || ""}
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
      <label>Designation <span className="required">*</span></label>
      <input
        type="text"
        name="designation"
        value={formData.designation || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.designation && (
        <small className="field-error">
            {errors.designation}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Department <span className="required">*</span></label>
      <input
        type="text"
        name="department"
        value={formData.department || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.department && (
        <small className="field-error">
            {errors.department}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Manager <span className="required">*</span></label>
      <input
        type="text"
        name="manager"
        value={formData.manager || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.manager && (
        <small className="field-error">
            {errors.manager}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Salary <span className="required">*</span></label>
      <input
        type="number"
        name="salary"
        value={formData.salary || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.salary && (
        <small className="field-error">
            {errors.salary}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Joining Date <span className="required">*</span></label>
      <input
        type="date"
        name="joining_date"
        value={formData.joining_date || ""}
        onChange={handleChange}
        className="form-control"
      />
      {errors.joining_date && (
        <small className="field-error">
            {errors.joining_date}
        </small>
        )}
    </div>

    <div className="form-group">
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Work Mode</label>

      <select
        name="work_mode"
        value={formData.work_mode || ""}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">
          Select Work Mode
        </option>

        <option value="Onsite">
          Onsite
        </option>

        <option value="Hybrid">
          Hybrid
        </option>

        <option value="Remote">
          Remote
        </option>

      </select>

    </div>

    <div className="form-group">
      <label>Status</label>

      <select
        name="status"
        value={formData.status || ""}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">
          Select Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Resigned">
          Resigned
        </option>

      </select>
    </div>

  </div>

    <div className="form-actions">

    <button
        type="button"
        className="btn-cancel"
        onClick={() => navigate("/employees")}
    >
        Cancel
    </button>

    <button
        type="submit"
        className="btn-save"
    >
        {buttonText}
    </button>

    </div>

</form>


);
}

export default EmployeeForm;
