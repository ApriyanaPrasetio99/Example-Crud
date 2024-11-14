import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!username || !password) {
      setSnackbarMessage("Username dan Password tidak boleh kosong");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Melakukan POST request ke API login
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage("Login berhasil!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Menyimpan token, userId, dan username ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("username", data.username);

        // Redirect ke halaman dashboard setelah login berhasil
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setSnackbarMessage(data.message || "Login gagal. Coba lagi.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Terjadi kesalahan pada server");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 4 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" variant="outlined" name="username" value={username} onChange={handleInputChange} sx={{ mb: 3 }} />
        <TextField fullWidth label="Password" variant="outlined" type="password" name="password" value={password} onChange={handleInputChange} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>

      {/* Snackbar Notifikasi */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
