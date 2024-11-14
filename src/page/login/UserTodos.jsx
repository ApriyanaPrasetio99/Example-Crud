import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";

function UserTodos() {
  const [todosData, setTodosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil userId dari localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch data todos berdasarkan userId
  useEffect(() => {
    if (userId && token) {
      fetch(`https://dummyjson.com/users/${userId}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTodosData(data.todos || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching todos data:", err);
          setError("Failed to fetch todos data");
          setLoading(false);
        });
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [userId, token]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Daftar Todos Anda
      </Typography>
      {todosData.length === 0 ? (
        <Typography>No todos found.</Typography>
      ) : (
        <Paper elevation={3} sx={{ mt: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Tugas</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todosData.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.todo}</TableCell>
                    <TableCell align="center">
                      {todo.completed ? (
                        <Chip label="Completed" color="success" />
                      ) : (
                        <Chip label="Pending" color="warning" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}

export default UserTodos;
