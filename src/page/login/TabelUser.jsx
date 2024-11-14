import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TabelUser({ users }) {
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log("Editing user with ID:", id);
  };

  const handleViewDetail = (id) => {
    navigate(`/userDetail/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Deleting user with ID:", id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.hair?.color}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleViewDetail(user.id)} style={{ marginRight: 8 }}>
                    View
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(user.id)} style={{ marginRight: 8 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">No users found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination rowsPerPageOptions={[10, 25, 50]} component="div" count={users.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </TableContainer>
  );
}
