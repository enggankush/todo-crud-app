import React from "react";
import { CheckCircle, AutoFixHigh } from "@mui/icons-material";
import CustomBox from "../../components/box/CustomBox";
import AuthCard from "../../components/card/AuthCard";
import { Button, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const LoginSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user: User = storedUser ? JSON.parse(storedUser) : { name: "Guest" };

  return (
    <CustomBox>
      <AuthCard>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 100 }}
        >
          <StarIcon sx={{ fontSize: 30, margin: 2 }} />
          <CheckCircle sx={{ fontSize: 90 }} />
          <AutoFixHigh sx={{ fontSize: 30, marginBottom: "auto" }} />
        </Stack>

        <Typography variant="h5" marginTop={3} gutterBottom>
          Congratulations {user.name}!
        </Typography>

        <Typography marginTop={3} gutterBottom>
          Your Website is ready to use.
        </Typography>

        <Button
          onClick={() => navigate("/dashboard")}
          variant="contained"
          sx={buttonStyle}
        >
          Go to dashboard
        </Button>
      </AuthCard>
    </CustomBox>
  );
};

export default LoginSuccessPage;

interface User {
  name: string;
  email?: string;
  [key: string]: any;
}

const buttonStyle = {
  mt: 8,
  backgroundColor: "#880af2",
  textTransform: "none" as const,
  borderRadius: 8,
  px: 8,
  py: 1.2,
  fontWeight: "bold",
  fontSize: "1rem",
};
