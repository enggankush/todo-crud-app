import { useState, type ChangeEvent, type FormEvent } from "react";
import { EmailOutlined, LockOpenOutlined } from "@mui/icons-material";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService, type ApiResponse } from "../../api/api.service";
import type { AlertColor } from "@mui/material";
import { validation } from "../../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValue: LoginForm = { email: "", password: "" };
  const [formData, setFormData] = useState<LoginForm>(initialValue);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [servermessage, setServermessage] = useState<string>("");

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Handle Form Submit ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validation(formData, "login") as ValidationErrors;
    console.log(errors);
    setServermessage("");
    if (Object.keys(errors).length === 0) {
      try {
        const result: ApiResponse<string> = await loginUserService(formData);

        if (result.success) {
          localStorage.setItem("token", result.data);

          setSeverity("success");
          setAlertMsg(result.msg || "Sign In successful");
          setOpenAlert(true);
          setFormData(initialValue);

          setTimeout(() => {
            navigate("/login-success");
          }, 2000);
        } else {
          setSeverity("error");
          setAlertMsg(result.msg || "Invalid email or password");
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
        errors.email ||
        errors.password
      );
      setOpenAlert(true);
    }
  };

  return (
    <>
      <CustomAlert
        openAlert={openAlert}
        severity={severity}
        alertMsg={alertMsg}
        handleClose={handleAlertClose}
      />
      <CustomBox>
        <AuthCard title="Log In">
          <form onSubmit={handleSubmit}>
            <CustomTextField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              icon={EmailOutlined}
            />
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              icon={LockOpenOutlined}
            />
            <CustomButton type="submit" text="Sign In" />
          </form>
          <Link style={{ color: "#ddd" }} to="/register">
            Don't have an account? Sign up
          </Link>
          <p>
            <Link style={{ color: "#ddd" }} to="/reset">
              Forgot Password?
            </Link>
          </p>
        </AuthCard>
      </CustomBox>
    </>
  );
};

export default LoginPage;

interface ValidationErrors {
  [key: string]: string;
}

interface LoginForm {
  email: string;
  password: string;
}
