export type FormName = "register" | "login";

export type ValidationData = {
  name?: string;
  dob?: string;
  mobile?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

export type ValidationErrors = {
  [key in keyof ValidationData]?: string;
};

export const validation = (
  data: ValidationData,
  formName: FormName
): ValidationErrors => {
  const { name, dob, mobile, email, password, confirm_password } = data;
  const errors: ValidationErrors = {};

  // ✅ Check if ALL active fields are empty
  const activeFields = Object.keys(data).filter((field) =>
    activeForm(field as keyof ValidationData, formName)
  );

  const allEmpty = activeFields.every(
    (field) => !data[field as keyof ValidationData]?.trim?.()
  );

  if (allEmpty) {
    errors.name = "All fields are required";
    return errors;
  }

  // ✅ Validate each field separately
  if (activeForm("name", formName) && !name) {
    errors.name = "Name is required";
  }

  if (activeForm("dob", formName) && !dob) {
    errors.dob = "Date of Birth is required";
  }

  if (activeForm("mobile", formName) && !mobile) {
    errors.mobile = "Mobile Number is required";
  }

  if (activeForm("email", formName) && !email) {
    errors.email = "Email is required";
  }

  if (activeForm("password", formName) && !password) {
    errors.password = "Password is required";
  }

  if (activeForm("confirm_password", formName) && !confirm_password) {
    errors.confirm_password = "Confirm Password is required";
  }

  return errors;
};

const activeForm = (
  field: keyof ValidationData,
  formName: FormName
): boolean => {
  const fields: Record<keyof ValidationData, FormName[]> = {
    name: ["register"],
    dob: ["register"],
    mobile: ["register"],
    email: ["register", "login"],
    password: ["register", "login"],
    confirm_password: ["register"],
  };
  return fields[field].includes(formName);
};
