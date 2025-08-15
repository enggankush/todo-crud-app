import { useState } from "react";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [severity, setSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = () => {
    const newErrors = { name: "", password: "" };
    const passwordRegex = /^.{6,}$/; // At least 6 characters

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    setSeverity("error");
    setAlertMsg(newErrors.name || newErrors.password || "");
    setOpenAlert(true);
    return !newErrors.name && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Sign In successful:", formData);
      setSeverity("success");
      setAlertMsg("Sign In successful");
      setOpenAlert(true);
      resetForm();
      setTimeout(() => {
        navigate("/login-success")
      }, 2000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      password: "",
    });
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
              id="name"
              name="name"
              type="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              icon={PersonOutlineOutlinedIcon}
              error={!!errors.name}
              helperText={errors.name}
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
          <Link style={{ color: "#ddd" }} to="/register">Sign Up</Link>
        </AuthCard>
      </CustomBox>
    </>
  );
};

export default LoginPage;
