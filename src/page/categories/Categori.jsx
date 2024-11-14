import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import TabelKategori from "./TabelKategori";
import Sidebar from "../../components/Sidebar";
import AddKategori from "./AddKategori";
import { useNavigate } from "react-router-dom";

export default function Categori() {
  const navigate = useNavigate();

  const addKategori = () => {
    navigate(`/categories/add`);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "55px" }}>
          <Typography variant="h4">Category</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
            <Paper />
            <Button variant="contained" onClick={addKategori}>
              Add Kategori
            </Button>
          </Box>
          <TabelKategori />
        </Box>
      </Box>
    </>
  );
}
