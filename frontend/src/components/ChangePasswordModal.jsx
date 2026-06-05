import { useContext, useState }
from "react";

import CommonModal
from "./CommonModal";
import { changePassword } from "../services/employeeService";
import { ToastContext } from "../Context/ToastContext";
import {
  validateField,
  validateForm
} from "../utils/validations";

function ChangePasswordModal({
  onClose
}) {

  const [formData,setFormData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  const [errors, setErrors] = useState({});
  const { showToast } = useContext(ToastContext);
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
  const handleSubmit = async () => {
      const validationErrors =
        validateForm(
          formData,
          [
            "currentPassword",
            "newPassword",
            "confirmPassword"
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

      try {

        await changePassword({
          currentPassword:
            formData.currentPassword,
          newPassword:
            formData.newPassword
        });

        showToast(
          "Password updated successfully",
          "success"
        );

        onClose();

      } catch (error) {

        showToast(
          error.response?.data?.message ||
          "Failed to update password",
          "error"
        );

      }

    };
  return (

    <CommonModal
      title="Change Password"
      onClose={onClose}
      onSubmit = {handleSubmit}
      btnText = "Update Password"
      btnClass = "btn-save"
    >
      <p className="modal-note">Choose a strong password containing letters, numbers and special characters.</p>
      <div className="form-group mb-15">

        <label>
          Current Password
        </label>

        <input
          type="password"
          className={`form-control ${
            errors.currentPassword
              ? "input-error"
              : ""
          }`}
          value={formData.currentPassword}
          name="currentPassword"
          onChange={handleChange}
        />

        {errors.currentPassword && (
          <small className="field-error">
            {errors.currentPassword}
          </small>
        )}

      </div>

      <div className="form-group mb-15">

        <label>
          New Password
        </label>

        <input
          type="password"
          className={`form-control ${
            errors.newPassword
              ? "input-error"
              : ""
          }`}
          value={formData.newPassword}
          name="newPassword"
          onChange={handleChange}
        />

        {errors.newPassword && (
          <small className="field-error">
            {errors.newPassword}
          </small>
        )}

      </div>

      <div className="form-group mb-15">

        <label>
          Confirm Password
        </label>

        <input
          type="password"
          className={`form-control ${
            errors.confirmPassword
              ? "input-error"
              : ""
          }`}
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <small className="field-error">
            {errors.confirmPassword}
          </small>
        )}

      </div>

    </CommonModal>

  );

}

export default ChangePasswordModal;