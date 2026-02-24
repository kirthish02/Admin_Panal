import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        background: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0') center/cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          🍴 Restaurant Login
        </Typography>

        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#6d4c41" }}
          onClick={() => navigate("/dashboard")}
        >
          Sign In
        </Button>

        <Typography textAlign="right" mt={2}>
          <Link href="#">Forgot password?</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signin;
