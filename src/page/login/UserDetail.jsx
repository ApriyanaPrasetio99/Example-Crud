import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch data user dari API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Error fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Jika masih loading, tampilkan loader
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Jika ada error, tampilkan pesan error
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: "55px" }}>
        <Typography variant="h4">{}</Typography>

        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
          {user ? (
            <>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {user.phone}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Password:</strong> {user.password}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Age:</strong> {user.age}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Gender:</strong> {user.gender}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Address:</strong> {user.address?.address}, {user.address?.city}, {user.address?.state}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Company:</strong> {user.company?.name}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("/users")} sx={{ mt: 3 }}>
                Back to Users
              </Button>
            </>
          ) : (
            <Typography variant="h6">User not found</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
