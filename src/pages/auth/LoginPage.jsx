import { useState } from "react";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import { validation } from "../../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const initialvalue = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialvalue);
  const [errors, setErrors] = useState({});
  const [severity, setSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, "login");
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Login successful:", formData);
      setSeverity("success");
      setAlertMsg("Sign In successful");
      setOpenAlert(true);
      setFormData(initialvalue);
      setTimeout(() => {
        navigate("/login-success");
      }, 2000);
    } else {
      setSeverity("error");
      setAlertMsg(errors.email || errors.password || "");
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
              error={!!errors.email}
              helperText={errors.email}
            />
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              icon={LockOpenOutlinedIcon}
              error={!!errors.password}
              helperText={errors.password}
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
