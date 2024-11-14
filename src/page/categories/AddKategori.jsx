import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function AddKategori({ isEdit = false }) {
  const [kategoriData, setKategoriData] = useState({ category: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil id dari parameter URL jika isEdit

  // Fetch data ketika halaman dimuat
  useEffect(() => {
    if (isEdit && id) {
      fetch(`https://dummyjson.com/products/categories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setKategoriData({ category: data.category || "" });
        })
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [isEdit, id]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { value } = e.target;
    setKategoriData({ category: value });
    setError(""); // Reset error ketika ada perubahan input
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kategoriData.category.trim()) {
      setError("Nama kategori tidak boleh kosong");
      return;
    }

    setIsSubmitting(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `https://dummyjson.com/products/categories/${id}` : "https://dummyjson.com/products/categories/add";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: kategoriData.category }),
      });

      if (response.ok) {
        setOpenSnackbar(true);
        // Tunggu 4 detik sebelum redirect
        setTimeout(() => navigate("/categories"), 4000);
      } else {
        const data = await response.json();
        setError(data.message || "Gagal menyimpan kategori");
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {isEdit ? "Edit Kategori" : "Tambah Kategori Baru"}
        </Typography>
        <Box
          sx={{
            maxWidth: 500,
            margin: "auto",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nama Kategori" variant="outlined" name="category" value={kategoriData.category} onChange={handleInputChange} error={!!error} helperText={error} sx={{ mb: 3 }} disabled={isSubmitting} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/categories")} color="secondary" disabled={isSubmitting}>
                Batal
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isEdit ? "Update" : "Simpan"}
              </Button>
            </Box>
          </form>
        </Box>

        {/* Snackbar Notifikasi */}
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {isEdit ? "Kategori berhasil diperbarui" : "Kategori berhasil ditambahkan"}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
