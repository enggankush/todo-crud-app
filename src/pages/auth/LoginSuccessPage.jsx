import React from "react";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import { Button, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser")) || { name: "Guest"};

  return (
    <CustomBox>
      <AuthCard bkColor="#161616">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 100 }}
        >
          <StarIcon sx={{ fontSize: 30, margin: 2 }} />
          <CheckCircleIcon sx={{ fontSize: 90 }} />
          <AutoFixHighIcon sx={{ fontSize: 30, marginBottom: "auto" }} />
        </Stack>

        <Typography variant="h5" marginTop={3} gutterBottom>
          Congratulations {user.name} !
        </Typography>

        <Typography marginTop={3} gutterBottom>
          Your Webside is ready to use.
        </Typography>

        <Button onClick={() => navigate("/dashboard")} variant="contained" sx={buttonStyle}>
          Go to dashboard
        </Button>
      </AuthCard>
    </CustomBox>
  );
};

export default LoginSuccessPage;

const buttonStyle = {
  mt: 8,
  backgroundColor: "#880af2",
  textTransform: "none",
  borderRadius: 8,
  px: 8,
  py: 1.2,
  fontWeight: "bold",
  fontSize: "1rem",
};
