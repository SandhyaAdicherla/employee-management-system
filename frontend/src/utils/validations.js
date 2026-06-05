export const validateField = (
  name,
  value,
  formData = {}
) => {

  switch (name) {

    case "username":

      if (!value.trim()) {
        return "Username is required";
      }

      return "";

    case "email":

      if (!value.trim()) {
        return "Email is required";
      }

      if (
        !/\S+@\S+\.\S+/.test(value)
      ) {
        return "Invalid email address";
      }

      return "";

    case "password":

      if (!value.trim()) {
        return "Password is required";
      }

      if (
        value.length < 8
      ) {
        return "Password must be at least 8 characters";
      }

      return "";

    case "currentPassword":

      if (!value.trim()) {
        return "Current password is required";
      }

      return "";

    case "newPassword":

      if (!value.trim()) {
        return "New password is required";
      }

      if (
        value.length < 8
      ) {
        return "Password must be at least 8 characters";
      }

      return "";

    case "confirmPassword":

      if (!value.trim()) {
        return "Confirm password is required";
      }

      if (
        value !== formData.newPassword
      ) {
        return "Passwords do not match";
      }

      return "";
    case "name":

    if (!value.trim()) {
        return "Name is required";
    }

    return "";

    case "department":

    if (!value.trim()) {
        return "Department is required";
    }

    return "";

    case "designation":

    if (!value.trim()) {
        return "Designation is required";
    }

    return "";
    case "employee_code":

    if (!value.trim()) {
        return "Employee Code is required";
    }

    return "";

    case "salary":

    if (!value) {
        return "Salary is required";
    }

    if (Number(value) <= 0) {
        return "Salary must be greater than 0";
    }

    return "";

    case "joining_date":

    if (!value) {
        return "Joining date is required";
    }

    return "";
    case "manager":

    if (!value) {
        return "Manager is required";
    }

    return "";

    default:
      return "";

  }

};

export const validateForm = (
  formData,
  fields
) => {

  const errors = {};

  fields.forEach(field => {

    const error =
      validateField(
        field,
        formData[field],
        formData
      );

    if (error) {
      errors[field] = error;
    }

  });

  return errors;

};