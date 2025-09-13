import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Get user from localStorage with type check
  const storedUser = localStorage.getItem("currentUser");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const userProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handletodo = () => {
    navigate("/todo");
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>

          {/* ✅ Safe check for user */}
          <Avatar sx={{ bgcolor: "orange", mr: 2 }} onClick={userProfile}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
          </Avatar>

          <Button color="inherit" onClick={handletodo}>
            To-Do
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

interface User {
  name: string;
  email: string;
}
