import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  Paper,
  Divider,
  Toolbar
} from "@mui/material";
import "./profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import userImg from "../../assets/AV-1.jpg";

function AdminProfile() {
  return (
    <Box className="layout">
      <Sidebar />

      <Box className="main-content">
        <Navbar />
        <Toolbar /> {/* spacing below navbar */}

        {/* ===== SECTION TITLE BELOW NAVBAR ===== */}
        <Box className="section-header">
          <Typography variant="h5" className="page-title">
            My Profile
          </Typography>
        </Box>

        <Container maxWidth="md">

          {/* ===== CARD 1 ===== */}
          <Paper className="profile-card">
            <Box className="profile-header">
              <Avatar src={userImg} sx={{ width: 100, height: 100 }} />

              <Box className="profile-text">
                <Typography variant="h6" className="profile-name">
                  Kirthish
                </Typography>
                <Typography className="profile-role">
                  Admin
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* ===== CARD 2 ===== */}
          <Paper className="profile-card-1">
            <Box className="card-header">
              <Typography variant="h6">
                Personal Information
              </Typography>

              <Button variant="contained" className="edit-btn">
                Edit
              </Button>
            </Box>

            <Divider sx={{ margin: "15px 0" }} />

            <Box className="info-row">
              <Box className="info-box">
                <Typography className="label">First Name</Typography>
                <Typography className="value">Kirthish</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">Last Name</Typography>
                <Typography className="value">S</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">Date of Birth</Typography>
                <Typography className="value">12 Jan 2002</Typography>
              </Box>
            </Box>

            <Box className="info-row">
              <Box className="info-box">
                <Typography className="label">Email Address</Typography>
                <Typography className="value">kirthish@email.com</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">Phone Number</Typography>
                <Typography className="value">8754549101</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">User Role</Typography>
                <Typography className="value">Admin</Typography>
              </Box>
            </Box>
          </Paper>

          {/* ===== CARD 3 ===== */}
          <Paper className="profile-card-2">
            <Box className="card-header">
            <Typography variant="h6">Address</Typography>
            <Button variant="contained" className="edit-btn">
                Edit
              </Button>
              </Box>

            <Divider sx={{ margin: "15px 0" }} />

            <Box className="info-row">
              <Box className="info-box">
                <Typography className="label">Country</Typography>
                <Typography className="value">India</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">City</Typography>
                <Typography className="value">Chennai</Typography>
              </Box>

              <Box className="info-box">
                <Typography className="label">Postal Code</Typography>
                <Typography className="value">600001</Typography>
              </Box>
            </Box>
          </Paper>

        </Container>
      </Box>
    </Box>
  );
}

export default AdminProfile;
