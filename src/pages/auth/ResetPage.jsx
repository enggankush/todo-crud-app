import { useState } from "react";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import CustomTextField from "../../components/input-field/CustomTextField";
import CustomButton from "../../components/button/CustomButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CustomAlert from "../../components/common/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import { validation } from "../../utils/validation";
import { reset } from "../../services/AuthService";

const ResetPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
    });
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
        const errors = validation(formData, "reset");
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const result = reset(formData);
            if (result.status) {
                setSeverity("success");
                setAlertMsg(result.msg || "Reset successful");
                setOpenAlert(true);
                setFormData({ email: "", });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setSeverity("error");
                setAlertMsg(result.msg || "Reset failed");
                setOpenAlert(true);
            }
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
                <AuthCard title="Reset Password">
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
                        <CustomButton type="submit" text="Send Password" />
                    </form>
                    <Link style={{ color: "#ddd" }} to="/">
                        Back to Login
                    </Link>
                </AuthCard>
            </CustomBox>
        </>
    );
};

export default ResetPage;
