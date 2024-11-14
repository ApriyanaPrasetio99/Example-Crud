import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";

export default function TabelKategori() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  

  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
      setCategories(uniqueCategories);
    })
    .catch((error) => console.error("Error fetching categories:", error));
}, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

   const handleEdit = (id) => {
    console.log("Editing product with ID:", id);
    // Implement edit action logic here
  };

  const handleDelete = (id) => {
    console.log("Deleting product with ID:", id);
    // Implement delete action logic here
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Kategori</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category,index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {category}
              </TableCell>
              <TableCell align="right">
             
                <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(categories.id)} style={{ marginLeft: 8 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(categories.id)} style={{ marginLeft: 8 }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={categories.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </TableContainer>
  );
}
