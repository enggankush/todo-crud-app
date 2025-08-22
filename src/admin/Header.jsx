import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser")) || { name: "Guest", email: "" };

    const userProfile = () => {
        navigate("/profile")
    }

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    const handleTodo = () =>{
        navigate("/todo");
    }

    const handleGame = () =>{
        navigate("/game");
    }

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

                    <Avatar sx={{ bgcolor: "orange", mr: 2 }} onClick={userProfile}>
                        {user.name ? user.name.charAt(0).toUpperCase() : "G"}
                    </Avatar>
                    <Button color="inherit" onClick={handleTodo}>To-Do</Button>
                    <Button color="inherit" onClick={handleGame}>Game</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
