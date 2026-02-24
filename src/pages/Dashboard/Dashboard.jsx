import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

import Chart from "react-apexcharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./dashboard.css";

function Dashboard() {
  // ===================== Animated Growth =====================
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 18;
    const duration = 1500;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setGrowth(Math.floor(start));
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // ===================== Line Chart =====================
  const salesSeries = [
    {
      name: "Sales",
      data: [1200, 1900, 1700, 2200, 2600, 2400, 3000],
    },
  ];

  const salesOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "stepline", width: 3 },
    colors: ["#ff6b35"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };

  // ===================== Bar Chart =====================
  const orderSeries = [
    {
      name: "Orders",
      data: [30, 45, 28, 50, 42, 60, 55],
    },
  ];

  const orderOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#4caf50"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
  };

  // ===================== Donut Chart =====================
  const revenueSeries = [44, 25, 18, 13];

  const revenueOptions = {
    chart: { type: "donut" },
    labels: ["Dine-In", "Takeaway", "Online", "Others"],
    colors: ["#ff6b35", "#4caf50", "#2196f3", "#9c27b0"],
    legend: { position: "bottom" },
  };

  return (
    <Box className="layout">
      <Sidebar />

      <Box component="main" className="main">
        <Navbar />
        <Toolbar />

        {/* Header */}
        <div className="pageHeader">
          <Typography variant="h5" className="title">
            🍴 Restaurant Dashboard
          </Typography>
          <Typography className="subtitle">
            Monitor sales, orders and customers.
          </Typography>
        </div>

          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              {/* Orders */}
              <Grid item xs={12} sm={3}>
                <Card className="statCard">
                  <CardContent className="statContent">
                    <Avatar className="avatar orange">
                      <ShoppingCartIcon />
                    </Avatar>
                    <div>
                      <Typography className="statNumber">
                        120
                      </Typography>
                      <Typography className="statLabel">
                        Orders
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Sales */}
              <Grid item xs={12} sm={3}>
                <Card className="statCard">
                  <CardContent className="statContent">
                    <Avatar className="avatar green">
                      <RestaurantIcon />
                    </Avatar>
                    <div>
                      <Typography className="statNumber">
                        $2,430
                      </Typography>
                      <Typography className="statLabel">
                        Sales
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Customers */}
              <Grid item xs={12} sm={3}>
                <Card className="statCard">
                  <CardContent className="statContent">
                    <Avatar className="avatar blue">
                      <PeopleIcon />
                    </Avatar>
                    <div>
                      <Typography className="statNumber">
                        45
                      </Typography>
                      <Typography className="statLabel">
                        Customers
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Growth */}
              <Grid item xs={12} sm={3}>
                <Card className="statCard">
                  <CardContent className="statContent">
                    <Avatar className="avatar purple">
                      📈
                    </Avatar>
                    <div>
                      <Typography className="statNumber">
                        {growth}%
                      </Typography>
                      <Typography className="statLabel">
                        Monthly Growth
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card className="chartCard">
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Weekly Sales
                </Typography>
                <Chart
                  options={salesOptions}
                  series={salesSeries}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="chartCard">
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Weekly Orders
                </Typography>
                <Chart
                  options={orderOptions}
                  series={orderSeries}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="chartCard">
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Revenue Distribution
                </Typography>
                <Chart
                  options={revenueOptions}
                  series={revenueSeries}
                  type="donut"
                  height={320}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Table */}
        <div className="tableSection">
          <Typography variant="h6" className="tableTitle">
            Recent Orders
          </Typography>

          <TableContainer component={Paper} className="tableBox">
            <Table>
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow hover>
                  <TableCell>#101</TableCell>
                  <TableCell>John</TableCell>
                  <TableCell>Pizza</TableCell>
                  <TableCell>Delivered</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>#102</TableCell>
                  <TableCell>Emma</TableCell>
                  <TableCell>Burger</TableCell>
                  <TableCell>Preparing</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>#103</TableCell>
                  <TableCell>David</TableCell>
                  <TableCell>Pasta</TableCell>
                  <TableCell>Pending</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
}

export default Dashboard;
