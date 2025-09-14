import { Box, Button, Avatar, Card, Typography } from "@mui/material";
import Header from "../../components/nav/Header";
import { useEffect, useState } from "react";
import { getUser, isLoggedIn } from "../../api/api.service";
import { Navigate } from "react-router-dom";

const SettingPage: React.FC = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/setting" />;
  }

  const [user, setUser] = useState<User>({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    _id: null,
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Card elevation={4} sx={cardStyle}>
          <Avatar sx={avatarStyle}>
            {user.name ? user.name.charAt(0).toUpperCase() : "G"}
          </Avatar>
          <Typography>
            <b>My Setting</b>
          </Typography>
          <Button
            sx={buttonStyle}
            variant="contained"
            color="primary"
            fullWidth
          >
            Profile
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default SettingPage;

interface User {
  _id?: string | null;
  name: string;
  dob: string;
  mobile: string;
  email: string;
}

const cardStyle = {
  p: 4,
  width: 450,
  borderRadius: 3,
  textAlign: "center",
  backgroundColor: "lightgray",
};

const avatarStyle = {
  bgcolor: "orange",
  width: 80,
  height: 80,
  fontSize: "2rem",
  mx: "auto",
  mb: 2,
};

const buttonStyle = {
  mt: 2,
  backgroundColor: "#0a2df2ff",
  textTransform: "none",
  borderRadius: 8,
  width: "60%",
  px: 8,
  py: 1.2,
  fontWeight: "bold",
  fontSize: "1rem",
};
