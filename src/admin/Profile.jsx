import { Avatar, Box, Button, Card, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
    //   const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "",
        dob: "",
        mobile: "",
        email: "",
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Card elevation={4} sx={cardStyle}>
                <Avatar sx={avaterStyle}>
                    {user.name ? user.name.charAt(0).toUpperCase() : "G"}
                </Avatar>
                <Typography>
                    <b>My Profile</b>
                </Typography>
                <Box sx={{ textAlign: "left", mt: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>Name:</b> {user.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>DOB:</b> {user.dob}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>Mobile:</b> {user.mobile}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <b>Email:</b> {user.email}
                    </Typography>
                </Box>
                <Button sx={buttonStyle} variant="contained" color="primary" fullWidth>
                    Profile
                </Button>
            </Card>
        </Box>
    );
};

export default Profile;

const cardStyle = {
    p: 4,
    width: 450,
    borderRadius: 3,
    textAlign: "center",
    backgroundColor: "lightgray",
};
const avaterStyle = {
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
