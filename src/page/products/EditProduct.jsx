import React, { useState, useEffect } from "react";
import { Box, Button, TextField, FormControl, FormHelperText, Snackbar } from "@mui/material";

export default function EditProduct({ product }) {
  const [productData, setProductData] = useState({
    id: product.id,
    name: product.title,
    category: product.category,
    stock: product.price,
    brand: product.brand,
    description: product.description,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setProductData({
      id: product.id,
      name: product.title,
      category: product.category,
      stock: product.price,
      brand: product.brand,
      description: product.description,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://dummyjson.com/products/${productData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: productData.name,
          category: productData.category,
          price: productData.stock,
          description: productData.description,
          brand: productData.brand,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        setOpenSnackbar(true);
      } else {
        console.error("Failed to update product:", result);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormHelperText>Product Name</FormHelperText>
        <TextField
          name="name"
          value={productData.name}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormHelperText>Category</FormHelperText>
        <TextField
          name="category"
          value={productData.category}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormHelperText>Price</FormHelperText>
        <TextField
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormHelperText>Brand</FormHelperText>
        <TextField
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormHelperText>Description</FormHelperText>
        <TextField
          name="description"
          value={productData.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update Product
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Product updated successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
}
