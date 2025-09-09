import { useState, type ChangeEvent, type FormEvent } from "react";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../../api/api.service";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValue: LoginForm = { email: "", password: "" };

  const [formData, setFormData] = useState<LoginForm>(initialValue);
  const [severity, setSeverity] = useState<"success" | "error" | "">("");
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginUserService(formData);
      console.log("data: ", result);

      if (result?.status) {
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
              icon={EmailOutlinedIcon}
            />
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              icon={LockOpenOutlinedIcon}
            />
            <CustomButton type="submit" text="Sign In" />
          </form>
          <Link style={{ color: "#ddd" }} to={"/register"}>
            Don't have an account? Sign up
          </Link>
          <p>
            <Link style={{ color: "#ddd" }} to={"/reset"}>
              Forgot Password?
            </Link>
          </p>
        </AuthCard>
      </CustomBox>
    </>
  );
};

export default LoginPage;
