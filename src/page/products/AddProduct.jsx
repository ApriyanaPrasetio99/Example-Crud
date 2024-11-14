import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, FormControl, FormHelperText, Snackbar } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import CustomCard from "../../components/CustomeCard";
import DescriptionField from "../../components/CustomDeskripsi";
import { useParams, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

export default function AddProduct({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    sku: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    description: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

  // Fill productData if editing
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    if (isEdit && id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductData({
            sku: data.sku || "",
            name: data.title || "",
            category: data.category || "",
            price: data.price || "",
            stock: data.stock || "",
            brand: data.brand || "",
            description: data.description || "",
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [isEdit, id]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `https://dummyjson.com/products/${id}` : "https://dummyjson.com/products/add";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        brand: productData.brand,
        description: productData.description,
      }),
    });

    setOpenSnackbar(true);
    setTimeout(() => navigate("/products"), 2000); // Redirect after saving
  };

    // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: "55px" }}>
        <Typography variant="h4">{isEdit ? "Edit Product" : "Add Product"}</Typography>

        <CustomCard>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Kode SKU</FormHelperText>
              <TextField name="sku" value={productData.sku} onChange={handleChange} placeholder="Masukkan Kode SKU" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }} />
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 550, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Nama Product</FormHelperText>
              <TextField name="name" value={productData.name} onChange={handleChange} placeholder="Masukkan Nama Produk" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }} />
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Kategori</FormHelperText>
              <TextField select name="category" value={productData.category} onChange={handleChange} placeholder="Pilih Kategori" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }}>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Price</FormHelperText>
              <TextField name="price" value={productData.price} onChange={handleChange} placeholder="Masukkan Stok" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }} />
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Brand</FormHelperText>
              <TextField name="brand" value={productData.brand} onChange={handleChange} placeholder="Masukkan Brand" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }} />
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Stock</FormHelperText>
              <TextField name="stock" value={productData.stock} onChange={handleChange} placeholder="Masukkan Brand" variant="outlined" sx={{ width: "50%" }} InputProps={{ sx: { height: 40 } }} />
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
              <FormHelperText sx={{ fontSize: "1.2rem" }}>Keterangan</FormHelperText>
              <DescriptionField name="description" value={productData.description} onChange={handleChange} placeholder="Masukkan Keterangan Produk" rows={3} sx={{ width: "150%" }} />{" "}
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/products")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {isEdit ? "Update" : "Simpan"}
              </Button>
            </Box>
          </Box>
        </CustomCard>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={isEdit ? "Produk berhasil diperbarui!" : "Produk berhasil disimpan!"} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
      </Box>
    </Box>
  );
}
