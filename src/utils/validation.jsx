export const validation = (data, formName) => {
  const { name, dob, mobile, email, password, confirm_password } = data;
  const errors = {};
  const dobRegex =
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19[0-9]{2}|20[0-2][0-9])$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^.{6,}$/; // At least 6 characters

  if (activeForm("name", formName)) {
    if (!name) {
      errors.name = "Name is required";
    }
  }
  if (activeForm("dob", formName)) {
    if (!dob) {
      errors.dob = "Date of Birth is required";
    } else if (!dob.match(dobRegex)) {
      errors.dob = "Invalid Date of Birth format (DD-MM-YYYY)";
    }
  }
  if (activeForm("mobile", formName)) {
    if (!mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!mobile.match(mobileRegex)) {
      errors.dob = "Invalid mobile number (must be 10 digits, start with 6-9)";
    }
  }
  if (activeForm("email", formName)) {
    if (!email) {
      errors.email = "Email is required";
    } else if (!email.match(emailRegex)) {
      errors.email = "Invalid email format";
    }
  }
  if (activeForm("password", formName)) {
    if (!password) {
      errors.password = "Password is required";
    } else if (!password.match(passwordRegex)) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  if (activeForm("confirm_password", formName)) {
    if (!confirm_password) {
      errors.confirm_password = "Confirm Password is required";
    } else if (password !== confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
  }
  return errors;
};

const activeForm = (field, formName) => {
  const fields = {
    name: ["register"],
    dob: ["register"],
    mobile: ["register"],
    email: ["register", "login","reset"],
    password: ["register", "login"],
    confirm_password: ["register"],
  };
  return fields[field].includes(formName);
};
