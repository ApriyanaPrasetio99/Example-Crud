import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TabelProd({ products }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  // State untuk modal dan snackbar
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => {
    console.log("Viewing product with ID:", id);
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedProduct(id);
    setOpenModal(true); // Buka modal konfirmasi
  };

  // Fungsi untuk melakukan delete
  const confirmDelete = async () => {
    try {
      await fetch(`https://dummyjson.com/products/${selectedProduct}`, {
        method: "DELETE",
      });
      setOpenModal(false);

      setTimeout(() => {
        setOpenSnackbar(true); // Tampilkan notifikasi
      }, 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.brand}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary" size="small" onClick={() => handleView(product.id)}>
                    View
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(product.id)} style={{ marginLeft: 8 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(product.id)} style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={products.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </TableContainer>
      {/* Modal Konfirmasi Hapus */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Konfirmasi Hapus
          </Typography>
          <Typography sx={{ mb: 3 }}>Apakah Anda yakin ingin menghapus produk ini?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Hapus
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Snackbar Notifikasi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Snackbar akan muncul selama 4 detik
        onClose={() => setOpenSnackbar(false)}
        message="Produk berhasil dihapus !"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // action={
        //   <Button color="inherit" size="small" onClick={() => setOpenSnackbar(false)}>
        //     Tutup
        //   </Button>
        // }
      />
    </>
  );
}
