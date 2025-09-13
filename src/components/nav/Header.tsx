import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ✅ Get user from localStorage with type check
  const storedUser = localStorage.getItem("currentUser");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // ✅ Navigation handlers
  const goToProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const logoutProfile = () => {
    handleCloseMenu();
    localStorage.removeItem("currentUser"); // ✅ clear login if needed
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "rgb(255 255 255)" }}>
        <Toolbar sx={{ color: "#666666" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My To-Do
          </Typography>

          {/* Profile Avatar */}
          <IconButton onClick={handleOpenMenu} size="large">
            <Avatar sx={{ bgcolor: "orange" }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </Avatar>
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem sx={{ color: "#666666" }} onClick={goToProfile}>
              Profile
            </MenuItem>
            <hr />
            <MenuItem sx={{ color: "#666666" }} onClick={handleCloseMenu}>
              Settings
            </MenuItem>
            <hr />
            <MenuItem sx={{ color: "#666666" }} onClick={logoutProfile}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
