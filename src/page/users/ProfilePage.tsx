import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/nav/Header";
import { useEffect, useState } from "react";
import { getUser, isLoggedIn } from "../../api/api.service";
import { Navigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ProfilePage: React.FC = () => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState<User>({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    _id: null,
    image: "",
    address: "",
  });

  const [formData, setFormData] = useState(user);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
      setFormData(user);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setUser(formData);
    setIsEditing(false);
    alert("✅ Profile Updated !");
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user);
  };

  // const handleButton = () =>{

  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Box>
      <Header />

      <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
        <Card sx={cardStyle}>
          <Box sx={imageBoxStyle}>
            <img
              src={user.image || "../../src/assets/images/ank.jpg"}
              alt={user.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Box>

          <CardContent sx={{ flex: "1" }}>
            {isEditing ? (
              <>
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="dob"
                  label="DOB"
                  value={formData.dob}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    sx={buttonStyle}
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                  <Button
                    sx={buttonStyle}
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <b>Name:</b> {user.name || "-"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <b>DOB:</b> {user.dob || "-"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <b>Mobile:</b> {user.mobile || "-"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <b>Email:</b> {user.email || "-"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <b>Address:</b> {user.address || "-"}
                </Typography>
                <Button
                  sx={buttonStyle}
                  variant="outlined"
                  color="primary"
                  onClick={handleEditClick}
                >
                  <EditOutlinedIcon />
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
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
  image?: string;
  address?: string;
}

const cardStyle = {
  display: "flex",
  p: 4,
  width: "70%",
  maxWidth: 900,
  borderRadius: 4,
  backgroundColor: "white",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
};

const imageBoxStyle = {
  flex: 1,
  minWidth: 250,
  maxWidth: 300,
  height: 250,
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  marginRight: "30px",
};

const buttonStyle = {
  textTransform: "none",
  borderRadius: 4,
  gap: 2,
  mt: 2,
  px: 4,
  fontWeight: "bold",
  fontSize: "1rem",
};
