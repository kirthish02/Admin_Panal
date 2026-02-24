import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import {
  Box,
  Toolbar,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "./users.css";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kirthish", email: "kirthish@gmail.com" },
    { id: 2, name: "Aadhiran", email: "aadhi@gmail.com" },
    { id: 3, name: "Sathish", email: "sathish@gmail.com" },
    { id: 4, name: "Jayanthi", email: "jaya@gmail.com" },
    { id: 5, name: "Suvidharan", email: "suvi@gmail.com" },
    { id: 6, name: "Sujitha", email: "suji@gmail.com" },
    { id: 7, name: "Janarthanan", email: "jana@gmail.com" },
    { id: 8, name: "Rahul", email: "rahul@gmail.com" },
  ]);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false); // delete dialog
  const [deleteId, setDeleteId] = useState(null);       // id to delete

  const [form, setForm] = useState({ id: null, name: "", email: "" });

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteId));
    setDeleteId(null);
    setOpenDelete(false);
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id, name: form.name, email: form.email }]);
    setForm({ id: null, name: "", email: "" });
    setOpenAdd(false);
  };

  const handleEditClick = (user) => {
    setForm(user);
    setOpenEdit(true);
  };

  const handleUpdateUser = () => {
    const updated = users.map((u) => (u.id === form.id ? form : u));
    setUsers(updated);
    setForm({ id: null, name: "", email: "" });
    setOpenEdit(false);
  };

  return (
    <Box className="usersLayout">
      <Sidebar />
      <Navbar />

      <Box component="main" className="usersMain">
        <Toolbar />

        {/* Header */}
        <div className="usersHeader">
          <Typography variant="h5" className="usersTitle">
            Users
          </Typography>

          <TextField
            label="Search Users"
            size="small"
            className="searchBox"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="contained"
            className="addBtn"
            onClick={() => {
              setForm({ id: null, name: "", email: "" });
              setOpenAdd(true);
            }}
          >
            + Add User
          </Button>
        </div>

        {/* Table */}
        <Paper className="tableWrapper">
          <Table>
            <TableHead className="tableHead">
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className="editBtn"
                      onClick={() => handleEditClick(u)}
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      className="deleteBtn"
                      onClick={() => handleDeleteClick(u.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* ADD */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent className="dialogContent">
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button variant="contained" className="addBtn" onClick={handleAddUser}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* EDIT */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent className="dialogContent">
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button
              variant="contained"
              className="editBtn"
              onClick={handleUpdateUser}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* DELETE CONFIRMATION */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              <b>{users.find((u) => u.id === deleteId)?.name}</b>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button color="error" variant="contained" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Users;
