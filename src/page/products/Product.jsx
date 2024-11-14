import { Box, Button, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TabelProd from "./TabelProd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [prod, setProd] = useState([]);
  const navigate = useNavigate();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products based on debounced search term
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (debouncedSearchTerm) {
          response = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}`);
        } else {
          response = await fetch("https://dummyjson.com/products");
        }
        const data = await response.json();

        // Filter products by name to match the search term
        const filteredProducts = data.products.filter((product) => product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        console.log("dataaaa", response);
        setProd(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  // Prevent Enter key submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addProduct = () => {
    navigate(`/products/add`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "55px" }}>
        <Typography variant="h4">Product List</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ "aria-label": "search" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            <IconButton sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Button variant="contained" onClick={addProduct}>
            Add Product
          </Button>
        </Box>

        {/* Kondisi untuk menampilkan pesan jika produk tidak ditemukan */}
        {prod.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
            Produk Tidak Ditemukan
          </Typography>
        ) : (
          <TabelProd products={prod} />
        )}
      </Box>
    </Box>
  );
}
