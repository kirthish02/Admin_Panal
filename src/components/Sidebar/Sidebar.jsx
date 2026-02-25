import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMdLogOut } from "react-icons/io";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const drawerWidth = 260;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Menu", icon: <MenuBookIcon />, path: "/menu" },
    { text: "Combo Offers", icon: <LocalOfferIcon />, path: "/combo-offers" },
    { text: "My Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#d8f7d4",
        color: "black",
      }}
    >
      {/* TOP SECTION */}
      <Box>
        <Toolbar>
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <img src={logo} width="150" height="48" />
          </Box>
        </Toolbar>

        <Divider sx={{ backgroundColor: "#1f2937", mr:"15px", ml:"15px"}} />

        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: 2,
                  position: "relative",
                  backgroundColor: active ? "none" : "transparent",
                  transition: "all 0.3s ease",
                  color: active ? "#22c55e" : "black",
                     
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "#22c55e" : "black",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* BOTTOM LOGOUT */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ backgroundColor: "#1f2937", mb: 2 }} />
        <Button
          fullWidth
          startIcon={<IoMdLogOut style={{ strokeWidth: 15 }}/>}
          onClick={handleLogout}
          sx={{
            backgroundColor: "none",
            color: "red",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 1000,
          }}
        >
          Logout
        </Button>
      </Box> 
    </Box>
  );

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: "none" },
          position: "fixed",
          top: 15,
          left: 15,
          zIndex: 1300,
          color: "#111",
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
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP DRAWER */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;