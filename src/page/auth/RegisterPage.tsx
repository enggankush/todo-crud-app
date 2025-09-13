import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  LocalPhoneOutlined,
  CalendarMonthOutlined,
  LockOpenOutlined,
  PersonOutlineOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import AuthCard from "../../components/card/AuthCard";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import CustomBox from "../../components/box/CustomBox";
import { registerUserService } from "../../api/api.service";
import { validation } from "../../utils/validation";

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
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [servermessage, setServermessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");

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
    const errors = validation(formData, "register") as ValidationErrors;
    setServermessage("");

    if (Object.keys(errors).length === 0) {
      try {
        const result: ApiResponse = await registerUserService(formData);
        console.log("data: ", result);

        if (result.success) {
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
              icon={PersonOutlineOutlined}
              onChange={handleChange}
              value={formData.name}
            />
            <CustomTextField
              id="dob"
              name="dob"
              placeholder="Date of Birth"
              icon={CalendarMonthOutlined}
              onChange={handleChange}
              value={formData.dob}
            />
            <CustomTextField
              id="mobile"
              name="mobile"
              type="number"
              placeholder="Mobile Number"
              icon={LocalPhoneOutlined}
              onChange={handleChange}
              value={formData.mobile}
            />
            <CustomTextField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              icon={EmailOutlined}
              onChange={handleChange}
              value={formData.email}
            />
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              icon={LockOpenOutlined}
              onChange={handleChange}
              value={formData.password}
            />
            <CustomTextField
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              icon={LockOpenOutlined}
              onChange={handleChange}
              value={formData.confirm_password}
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
