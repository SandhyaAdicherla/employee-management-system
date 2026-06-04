import { useState }
from "react";

import CommonModal
from "./CommonModal";
import { changePassword } from "../services/employeeService";

function ChangePasswordModal({
  onClose
}) {

  const [formData,
    setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
   const handleSubmit = async () => {
        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
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

      <div className="form-group">

        <label>
          Current Password
        </label>

        <input
          type="password"
          className="form-control"
          value={
            formData.currentPassword
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              currentPassword:
              e.target.value
            })
          }
        />

      </div>

      <div className="form-group">

        <label>
          New Password
        </label>

        <input
          type="password"
          className="form-control"
          value={
            formData.newPassword
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              newPassword:
              e.target.value
            })
          }
        />

      </div>

      <div className="form-group">

        <label>
          Confirm Password
        </label>

        <input
          type="password"
          className="form-control"
          value={
            formData.confirmPassword
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword:
              e.target.value
            })
          }
        />

      </div>

    </CommonModal>

  );

}

export default ChangePasswordModal;