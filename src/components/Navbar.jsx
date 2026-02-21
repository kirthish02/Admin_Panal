import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import userImg from "../assets/AV-1.jpg";

const drawerWidth = 220;

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#f0f8ef",
        color: "black",

        // ⭐ responsive width
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Typography>Kirthish...,,111</Typography>

        <Box>
          <Avatar src={userImg} sx={{ width: 40, height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
