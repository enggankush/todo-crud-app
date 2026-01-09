import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

  const navigation = (path: string) => {
    handleCloseMenu();
    if (path === "/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    }
    navigate(path);
  };

  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar sx={{ color: "#666666" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
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
          <MenuItem
            component={NavLink}
            to="/profile"
            onClick={handleCloseMenu}
            sx={menuItemStyle}
          >
            Profile
          </MenuItem>
          {/* <hr /> */}
          <MenuItem
            component={NavLink}
            to="/todo"
            onClick={handleCloseMenu}
            sx={menuItemStyle}
          >
            My to-do
          </MenuItem>
          {/* <hr /> */}
          <MenuItem
            component={NavLink}
            to="/setting"
            onClick={handleCloseMenu}
            sx={menuItemStyle}
          >
            Settings
          </MenuItem>
          {/* <hr /> */}
          <MenuItem
            onClick={() => {
              navigation("/login");
            }}
            sx={{
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#fdecea",
                color: "#d32f2f",
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
const headerStyle = {
  position: "fixed",
  top: " 0",
  left: " 0",
  width: " 100%",
  height: " 60px",
  boxShadow: " 0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgb(255 255 255)",
};

const menuItemStyle = {
  color: "#666",
  "&:hover": {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
  },
  "&.active": {
    color: "#1976d2",
    fontWeight: "bold",
  },
  "&.active:hover": {
    backgroundColor: "#bbdefb",
  },
};
