import { Box, Button, Avatar, Card, Typography } from "@mui/material";
import Header from "../../components/nav/Header";
import { useEffect, useState } from "react";
import { userProfileService } from "../../api/api.service";
import { Navigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const token = localStorage.getItem("token") as string;
  console.log({ t: token });
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [user, setUser] = useState<User>({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    _id: null,
  });

  const fetchProfile = async () => {
    const res = await userProfileService(token);
    if (res.success && res.data) {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(res.data);
      setUser(res.data);
    } else {
      console.error("Error fetching profile:", res.msg);
    }
  };

  useEffect(() => {
    fetchProfile();
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
            <b>My Profile</b>
          </Typography>
          <Box sx={{ textAlign: "left", mt: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Name:</b> {user.name || "-"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>DOB:</b> {user.dob || "-"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Mobile:</b> {user.mobile || "-"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <b>Email:</b> {user.email || "-"}
            </Typography>
          </Box>
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

export default ProfilePage;

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
