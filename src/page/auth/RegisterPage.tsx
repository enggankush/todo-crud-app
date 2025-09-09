import { useState, type ChangeEvent, type FormEvent } from "react";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import AuthCard from "../../components/card/AuthCard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import CustomBox from "../../components/box/CustomBox";
import { registerUserService } from "../../api/api.service";

// import { validation } from "../../utils/validation";

interface RegisterForm {
  name: string;
  dob: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ValidationErrors {
  [key: string]: string; 
}

interface ApiResponse {
  status: boolean;
  msg?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const initialvalue: RegisterForm = {
    name: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [formData, setFormData] = useState<RegisterForm>(initialvalue);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [servermessage, setServermessage] = useState<string>("");

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const errors = validation(formData, "register") as ValidationErrors;
    // setErrors(errors);
    // setServermessage("");

    if (Object.keys(errors).length === 0) {
      try {
        const result: ApiResponse = await registerUserService(formData);
        console.log("data: ", result);

        if (result?.status) {
          setSeverity("success");
          console.log("Register is Successful", formData);
          setAlertMsg(result.msg || "Sign Up successful");
          setOpenAlert(true);
          setFormData(initialvalue);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setSeverity("error");
          setAlertMsg(result?.msg || "Registration failed. Try again.");
          setOpenAlert(true);
        }
      } catch (error) {
        setSeverity("error");
        setAlertMsg("Server error. Please try again later.");
        setOpenAlert(true);
      }
    } else {
      setSeverity("error");
      setAlertMsg(
        servermessage ||
          errors.name ||
          errors.dob ||
          errors.mobile ||
          errors.email ||
          errors.password ||
          errors.confirm_password
      );
      setOpenAlert(true);
    }
  };

  return (
    <>
      <CustomAlert
        openAlert={openAlert}
        severity={severity || "error"}
        alertMsg={alertMsg}
        handleClose={handleAlertClose}
      />

      <CustomBox>
        <AuthCard title="Create Account">
          <form onSubmit={handleSubmit}>
            <CustomTextField
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              icon={PersonOutlineOutlinedIcon}
              onChange={handleChange}
              value={formData.name}
              error={!!errors.name}
              helperText={errors.name}
            />
            <CustomTextField
              id="dob"
              name="dob"
              placeholder="Date of Birth"
              icon={CalendarMonthOutlinedIcon}
              onChange={handleChange}
              value={formData.dob}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <CustomTextField
              id="mobile"
              name="mobile"
              type="number"
              placeholder="Mobile Number"
              icon={LocalPhoneOutlinedIcon}
              onChange={handleChange}
              value={formData.mobile}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <CustomTextField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              icon={EmailOutlinedIcon}
              onChange={handleChange}
              value={formData.email}
              error={!!errors.email}
              helperText={errors.email}
            />
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              icon={LockOpenOutlinedIcon}
              onChange={handleChange}
              value={formData.password}
              error={!!errors.password}
              helperText={errors.password}
            />
            <CustomTextField
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              icon={LockOpenOutlinedIcon}
              onChange={handleChange}
              value={formData.confirm_password}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password}
            />
            <CustomButton type="submit" text="Sign Up" />
          </form>

          <Link style={{ color: "#ddd" }} to="/">
            Already have an account? Login
          </Link>
        </AuthCard>
      </CustomBox>
    </>
  );
};

export default RegisterPage;
