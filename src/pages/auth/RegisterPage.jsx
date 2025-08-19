import { useState } from "react";
import CustomBox from "../../components/box/CustomBox";
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
import { validation } from "../../utils/validation";

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialvalue = {
    name: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation(formData, "register");
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSeverity("success");
      console.log("Register is Succesfull", formData);
      setAlertMsg("Sign Up successful");
      setOpenAlert(true);
      setFormData(initialvalue);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSeverity("error");
      setAlertMsg(
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
        severity={severity}
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
              // type="date"
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
