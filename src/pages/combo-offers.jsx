import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./combo-offers.css";

function Combo({ data = {
    breakfast: { title: "Breakfast Combos", items: [] },
    lunch: { title: "Lunch Combos", items: [] },
    dinner: { title: "Dinner Combos", items: [] },
  }, setData }) {
  const navigate = useNavigate();
  const [type, setType] = useState("breakfast");

  const getDiscountedPrice = (price, discount) => {
    const original = Number(price);
    const disc = Number(discount);
    return original - (original * disc) / 100;
  };

  const current = data[type] || { title: "", items: [] };

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    img: "",
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(current.items[index]);
    setOpen(true);
  };

  const handleSave = () => {
    setData((prev) => {
      const updated = { ...prev };
      const items = [...(updated[type]?.items || [])];

      if (editIndex !== null) items[editIndex] = form;
      else items.push(form);

      updated[type] = {
        title: updated[type]?.title || "",
        items,
      };

      return updated;
    });

    setOpen(false);
    setEditIndex(null);
    setForm({ name: "", price: "", discount: "", img: "" });
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setData((prev) => {
      const updated = { ...prev };
      updated[type] = {
        title: updated[type]?.title || "",
        items: updated[type].items.filter((_, i) => i !== deleteIndex),
      };
      return updated;
    });

    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  return (
    <Box className="layout">
      <Sidebar />
      <Box className="main">
        <Navbar />
        <Toolbar />
        <Container maxWidth="xl">

          {/* Tabs */}
          <Box className="tabs" mb={2}>
            {["breakfast", "lunch", "dinner"].map((t) => (
              <Button
                key={t}
                variant={type === t ? "contained" : "outlined"}
                sx={{ mr: 1 }}
                onClick={() => setType(t)}
                className={type === t ? "tab active" : "tab"}
              >
                {t}
              </Button>
            ))}
          </Box>

          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">{current.title}</Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/add-combo", { state: { type } })}
              className="addbtn"
            >
              + Add Combo
            </Button>
          </Box>

          <Grid container spacing={3}>
  {current.items.map((item, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <Card sx={{ position: "relative", borderRadius: 3, overflow: "hidden", width: 350}}>

        {/* Image */}
        <CardMedia
          component="img"
          height="250"
          image={item.img}
          alt={item.name}
        />
        <Typography sx={{ color: "#ff0000", fontWeight: "bold",position: "absolute",bottom: 200,p:2,right:5 ,pr:1,}}>
            {item.discount}% OFF
          </Typography>
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
            p: 2,
          }}
        >

          <Typography variant="h4">
            {item.name}
          </Typography>

          <Typography sx={{ textDecoration: "line-through", fontSize: 14 }}>
            ₹{item.price}
          </Typography>

          <Typography sx={{ color: "#00ff99", fontWeight: "bold"}}>
            ₹{getDiscountedPrice(item.price, item.discount).toFixed(0)}
          </Typography>

          <Box mt={1} sx={{
            position: "absolute",
            bottom: 8,
            right:5 ,
            pr:5,
            pt:1
          }}>
            <IconButton color="primary" onClick={() => handleEdit(i)}>
              <EditIcon />
              </IconButton>

            <IconButton color="error" onClick={() => handleDelete(i)}>
              <DeleteIcon />
              </IconButton>
          </Box>
        </Box>

      </Card>
    </Grid>
  ))}
</Grid>



          {/* Add/Edit Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>
              {editIndex !== null ? "Edit Item" : "Add Item"}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Combo Name"
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
              <TextField
                label="Discount"
                type="number"
                fullWidth
                margin="normal"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
              />
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file)
                      setForm({ ...form, img: URL.createObjectURL(file) });
                  }}
                />
              </Button>
              {form.img && (
                <img src={form.img} alt="preview" width="80" />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation */}
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

        </Container>
      </Box>
    </Box>
  );
}

export default Combo;
