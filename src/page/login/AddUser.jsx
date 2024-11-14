import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function AddUser() {
  // State untuk menyimpan input dari form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "age") setAge(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "phone") setPhone(value);
  };

  // Fungsi untuk handle Batal
  const handleCancel = () => {
    // alert("Keranjang dibatalkan!");
    navigate("/users");
  };

  // Fungsi untuk menambahkan data pengguna
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!firstName || !lastName || !age) {
      setMessage("Harap isi semua field yang diperlukan");
      setSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    // Data yang akan dikirim ke server
    const newUser = {
      firstName,
      lastName,
      age: parseInt(age),
      email,
      password,
      phone,
    };

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Pengguna berhasil ditambahkan!");
        setSeverity("success");
        navigate("/dashboard");
        setOpenSnackbar(true);
        // Reset form
        setFirstName("");
        setLastName("");
        setAge("");
        setEmail("");
        setPassword("");
        setPhone("");
      } else {
        setMessage(data.message || "Gagal menambahkan pengguna");
        setSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setMessage("Terjadi kesalahan pada server");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          maxWidth: "auto",
          margin: "9 px",
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Tambah Pengguna Baru
        </Typography>
        {/* <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}> */}

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr", // 3 kolom dengan lebar yang sama
              gap: 2, // Jarak antar elemen
              mb: 3,
            }}
          >
            {/* Baris pertama */}
            <TextField fullWidth label="First Name" name="firstName" value={firstName} onChange={handleChange} />
            <TextField fullWidth label="Email" name="email" value={email} onChange={handleChange} />
            <TextField fullWidth label="Age" name="age" type="number" value={age} onChange={handleChange} />

            {/* Baris kedua */}
            <TextField fullWidth label="Last Name" name="lastName" value={lastName} onChange={handleChange} />
            <TextField fullWidth label="Password" name="password" type="password" value={password} onChange={handleChange} />
            <TextField fullWidth label="Phone" name="phone" value={phone} onChange={handleChange} />
          </Box>

          {/* Wrapper untuk tombol */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" color="error" onClick={handleCancel} size="small" sx={{ minWidth: "100px" }}>
              Batal
            </Button>
            <Button type="submit" variant="contained" color="primary" size="small" sx={{ minWidth: "100px" }}>
              Tambah
            </Button>
          </Box>
        </form>

        {/* <Button variant="outlined" color="error" onClick={handleCancel}>
        Batal
      </Button> */}
        {/* </Stack> */}

        {/* Snackbar Notifikasi */}
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AddUser;
