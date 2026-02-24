import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Toolbar,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./menu.css";

// Breakfast images
import b1 from "../assets/Breakfast_images/b1.webp";
import b2 from "../assets/Breakfast_images/b2.jpg";
import b3 from "../assets/Breakfast_images/b3.webp";
import b4 from "../assets/Breakfast_images/b4.webp";
import b5 from "../assets/Breakfast_images/b5.webp";
import b6 from "../assets/Breakfast_images/b6.webp";
import b7 from "../assets/Breakfast_images/b7.jpg";
import b8 from "../assets/Breakfast_images/b8.jpg";

// Lunch images
import l1 from "../assets/Lunch_images/l1.jpg";
import l2 from "../assets/Lunch_images/l2.jpg";
import l3 from "../assets/Lunch_images/l3.jpg";
import l4 from "../assets/Lunch_images/l4.jpg";
import l5 from "../assets/Lunch_images/l5.jpg";
import l6 from "../assets/Lunch_images/l6.jpg";
import l7 from "../assets/Lunch_images/l7.jpg";
import l8 from "../assets/Lunch_images/l8.jpg";

// Dinner images
import d1 from "../assets/Dinner_images/d1.jpg";
import d2 from "../assets/Dinner_images/d2.jpg";
import d3 from "../assets/Dinner_images/d3.jpg";
import d4 from "../assets/Dinner_images/d4.jpg";
import d5 from "../assets/Dinner_images/d5.jpg";
import d6 from "../assets/Dinner_images/d6.jpg";
import d7 from "../assets/Dinner_images/d7.jpg";
import d8 from "../assets/Dinner_images/d8.jpg";

function Menu() {
  const [type, setType] = useState("breakfast");

  const [data, setData] = useState({
    breakfast: {
      title: "Breakfast Menu",
      items: [
        { name: "Pongal", price: 60, img: b1 },
        { name: "Poori", price: 50, img: b2 },
        { name: "Idiyappam", price: 40, img: b3 },
        { name: "Dosa", price: 80, img: b4 },
        { name: "Podi Dosa", price: 90, img: b5 },
        { name: "Ghee Dosa", price: 110, img: b6 },
        { name: "Idly", price: 40, img: b7 },
        { name: "Podi Idly", price: 60, img: b8 },
      ],
    },
    lunch: {
      title: "Lunch Menu",
      items: [
        { name: "Biriyani", price: 120, img: l1 },
        { name: "Meals", price: 64, img: l2 },
        { name: "Fried Rice", price: 78, img: l3 },
        { name: "Noodles", price: 82, img: l4 },
        { name: "Chettinad Gravy", price: 58, img: l5 },
        { name: "Chicken 65", price: 42, img: l6 },
        { name: "Fish Fry", price: 147, img: l7 },
        { name: "Prawn Gravy", price: 35, img: l8 },
      ],
    },
    dinner: {
      title: "Dinner Menu",
      items: [
        { name: "Parotta", price: 120, img: d1 },
        { name: "Nool Parotta", price: 64, img: d2 },
        { name: "Butter Naan", price: 78, img: d3 },
        { name: "Garlic Naan", price: 82, img: d4 },
        { name: "Plain Naan", price: 58, img: d5 },
        { name: "Kulcha", price: 42, img: d6 },
        { name: "Butter Chicken Gravy", price: 147, img: d7 },
        { name: "Crispy Chicken", price: 35, img: d8 },
      ],
    },
  });

  const current = data[type];

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", img: "" });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAdd = () => {
    setEditIndex(null);
    setForm({ name: "", price: "", img: "" });
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(current.items[index]);
    setOpen(true);
  };

  const handleSave = () => {
    const updated = { ...data };
    const items = [...current.items];

    if (editIndex !== null) items[editIndex] = form;
    else items.push(form);

    updated[type].items = items;
    setData(updated);
    setOpen(false);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    const updated = { ...data };
    updated[type].items.splice(deleteIndex, 1);
    setData(updated);
    setDeleteOpen(false);
  };

  return (
    <Box className="layout">
      <Sidebar />

      <Box className="main">
        <Navbar />
        <Toolbar />

        <Container maxWidth="xl" className="content">
          <Box className="tabs">
            {["breakfast", "lunch", "dinner"].map((t) => (
              <Button
                key={t}
                onClick={() => setType(t)}
                className={type === t ? "tab active" : "tab"}
              >
                {t}
              </Button>
            ))}
          </Box>

          <Box className="header">
            <Typography variant="h4" className="title">
              {current.title}
            </Typography>

            {/* GREEN ADD BUTTON */}
            <Button
              variant="contained"
              onClick={handleAdd}
              className="addbtn"
            >
              + Add Item
            </Button>
          </Box>

          <Grid container spacing={3}>
            {current.items.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card className="menu-card">
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.img}
                    alt={item.name}
                  />

                  <CardContent>
                    <Typography className="food-name">
                      {item.name}
                    </Typography>

                    <Typography className="price">
                      ₹{item.price}
                    </Typography>

                    <Box className="actions">
                      {/* GREEN EDIT BUTTON */}
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEdit(i)}
                        className="editbtn"
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* ADD / EDIT DIALOG */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>
            {editIndex !== null ? "Edit Item" : "Add Item"}
          </DialogTitle>

          <DialogContent className="dialog">
            <TextField
              label="Item Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Button variant="outlined" component="label">
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setForm({ ...form, img: url });
                  }
                }}
              />
            </Button>

            {form.img && (
              <img src={form.img} alt="preview" className="preview" />
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* DELETE CONFIRMATION */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              <b>{current.items[deleteIndex]?.name}</b>?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={confirmDelete}
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Menu;
