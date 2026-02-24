import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";


const width = 250;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // mobile open / close
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const drawerContent = (
    <>
      {/* TOP AREA */}
      <Box>
        <Toolbar>
          <Box display="flex" alignItems="center" gap={1}>
  <img src={logo} alt="KJS Logo" width="40" height="40" />
  <Typography variant="h5">KJS Admin</Typography>
</Box>
        </Toolbar>

        <Divider />

        <List>
          <ListItemButton
          component={Link}
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          sx={{
            border:
            location.pathname === "/dashboard"
            ? "2px solid darkgreen"
            : "2px solid transparent",
            borderRadius: "8px",
            mx: 1,
            textAlign: "center",
            color:
            location.pathname === "/dashboard"
            ? "darkgreen"
            : "black",
            }}
            >
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
          component={Link}
          to="/users"
          onClick={() => setMobileOpen(false)}
          sx={{
            border:
            location.pathname === "/users"
            ? "2px solid darkgreen"
            : "2px solid transparent",
            borderRadius: "8px",
            mx: 1,
            textAlign: "center",
            color:
            location.pathname === "/users"
            ? "darkgreen"
            : "black",
            }}
            >
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
          component={Link}
          to="/menu"
          onClick={() => setMobileOpen(false)}
          sx={{
            border:
            location.pathname === "/menu"
            ? "2px solid darkgreen"
            : "2px solid transparent",
            borderRadius: "8px",
            mx: 1,
            textAlign: "center",
            color:
            location.pathname === "/menu"
            ? "darkgreen"
            : "black",
            }}
            >
              
            <ListItemText primary="Menu" />
          </ListItemButton>

          <ListItemButton
          component={Link}
          to="/combo-offers"
          onClick={() => setMobileOpen(false)}
          sx={{
            border:
            location.pathname === "/combo-offers"
            ? "2px solid darkgreen"
            : "2px solid transparent",
            borderRadius: "8px",
            mx: 1,
            textAlign: "center",
            color:
            location.pathname === "/combo-offers"
            ? "darkgreen"
            : "black",
            }}
            >
            <ListItemText primary="Combo Offers" />
          </ListItemButton>

          <ListItemButton
          component={Link}
          to="/profile"
          onClick={() => setMobileOpen(false)}
          sx={{
            border:
            location.pathname === "/profile"
            ? "2px solid darkgreen"
            : "2px solid transparent",
            borderRadius: "8px",
            mx: 1,
            textAlign: "center",
            color:
            location.pathname === "/profile"
            ? "darkgreen"
            : "black",
            }}
            >
            <ListItemText primary="My profile" />
          </ListItemButton>
          
        </List>
      </Box>

      {/* BOTTOM */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </>
  );

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: "none" },  // hide in desktop
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
          color:"black"
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width,
            boxSizing: "border-box",
            backgroundColor: "#f0f8ef",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width,
          "& .MuiDrawer-paper": {
            width,
            boxSizing: "border-box",
            backgroundColor: "#f0f8ef",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
