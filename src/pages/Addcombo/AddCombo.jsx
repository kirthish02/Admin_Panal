import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Toolbar,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function AddCombo({ addCombos }) {
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type || "breakfast";

  const [combos, setCombos] = useState([
    { name: "", price: "", discount: 10, img: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...combos];
    updated[index][field] = value;
    setCombos(updated);
  };

  const handleAddCombo = () => {
    setCombos([
      ...combos,
      { name: "", price: "", discount: 10, img: "" },
    ]);
  };

  const getDiscountedPrice = (price, discount) =>
    price - (price * discount) / 100;

  const handleSave = () => {
    if (addCombos) {
      addCombos(type, combos);
    }
    alert("Combos Added Successfully!");
    navigate("/combo-offers");
  };

  return (
    <Box className="layout">
      <Sidebar />
      <Box className="main">
        <Navbar />
        <Toolbar />

        <Container maxWidth="sm">
          <Typography variant="h5" mb={2}>
            Add {type} Combo
          </Typography>

          {combos.map((form, index) => (
            <Paper sx={{ p: 4, mb: 3 }} key={index}>
              <Typography variant="h6">
                Combo {index + 1}
              </Typography>

              <TextField
                label="Combo Name"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
              />

              <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={form.price}
                onChange={(e) =>
                  handleChange(index, "price", e.target.value)
                }
              />

              <TextField
                label="Discount %"
                type="number"
                fullWidth
                margin="normal"
                value={form.discount}
                onChange={(e) =>
                  handleChange(index, "discount", e.target.value)
                }
              />

              {/* image upload button + preview */}
              <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      handleChange(index, "img", url);
                    }
                  }}
                />
              </Button>
              {form.img && (
                <img
                  src={form.img}
                  alt="combo"
                  width="80"
                  style={{ display: "block", marginTop: 8 }}
                />
              )}

              {form.price && (
                <Typography color="green">
                  Discounted Price: ₹
                  {getDiscountedPrice(
                    Number(form.price),
                    Number(form.discount)
                  ).toFixed(0)}
                </Typography>
              )}
            </Paper>
          ))}

          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={handleAddCombo}
          >
            + Add Another Combo
          </Button>

          <Box display="flex" gap={2}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default AddCombo;
