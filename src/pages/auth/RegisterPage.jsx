import { useState } from "react";
import CustomBox from "../../components/box/CustomBox";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import AuthCard from "../../components/card/AuthCard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [severity, setSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("")
  const [openAlert, setOpenAlert] = useState(false)

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
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
    const newErrors = { name: "", email: "", password: "" };
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^.{6,}$/; // At least 6 characters
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    setSeverity("error")
    setAlertMsg(newErrors.name || newErrors.email || newErrors.password || "")
    setOpenAlert(true)
    return !newErrors.name && !newErrors.email && !newErrors.password;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Registration successful:", formData);
      setSeverity("success")
      setAlertMsg("Sign Up successful")
      setOpenAlert(true)
      resetForm();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    })
  }

  return (
    <>
      <CustomAlert openAlert={openAlert} severity={severity} alertMsg={alertMsg} handleClose={handleAlertClose} />
      <CustomBox>
        <AuthCard title="Create Account">
          <form onSubmit={handleSubmit}>
            <CustomTextField
              id="name"
              name="name"
              placeholder="Name"
              icon={PersonOutlineOutlinedIcon}
              onChange={handleChange}
              value={formData.name}
              error={!!errors.name}
              helperText={errors.name}
            />
            <CustomTextField
              id="email"
              name="email"
              type="text"
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
            <CustomButton type="submit" text="Sign Up" />
          </form>
        </AuthCard>
      </CustomBox>
    </>
  );
};

export default RegisterPage;
