import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateField,
  validateForm
} from "../utils/validations";

function EmployeeForm({
formData,
setFormData,
handleSubmit,
buttonText
}) {
const navigate = useNavigate();
const [errors, setErrors] = useState({});
const handleChange = (e) => {

  const {
    name,
    value
  } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  setErrors(prev => ({
    ...prev,
    [name]:
      validateField(
        name,
        value,
        {
          ...formData,
          [name]: value
        }
      )
  }));

};

const onFormSubmit = (e) => {

  e.preventDefault();

  const validationErrors =
    validateForm(
      formData,
      [
        "name",
        "employee_code",
        "email",
        "department",
        "designation",
        "salary",
        "joining_date",
        "manager"
      ]
    );

  if (
    Object.keys(
      validationErrors
    ).length > 0
  ) {

    setErrors(
      validationErrors
    );

    return;

  }

  handleSubmit(e);

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
        className={`form-control ${errors.employee_code? "input-error": ""}`}
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
        className={`form-control ${errors.name? "input-error": ""}`}
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
        className={`form-control ${errors.email? "input-error": ""}`}
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
        className={`form-control ${errors.designation? "input-error": ""}`}
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
        className={`form-control ${errors.department? "input-error": ""}`}
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
        className={`form-control ${errors.manager? "input-error": ""}`}
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
        className={`form-control ${errors.salary? "input-error": ""}`}
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
        className={`form-control ${errors.joining_date? "input-error": ""}`}
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
