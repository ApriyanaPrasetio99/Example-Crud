import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function UserFilter() {
  const [users, setUsers] = useState([]);
  const [hairColor, setHairColor] = useState(""); // Warna rambut yang dipilih
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch users berdasarkan warna rambut
  const fetchFilteredUsers = async (color) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://dummyjson.com/users/filter?key=hair.color&value=${color}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle perubahan pada dropdown
  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setHairColor(selectedColor);
    if (selectedColor) {
      fetchFilteredUsers(selectedColor);
    } else {
      setUsers([]); // Kosongkan tabel jika tidak ada warna yang dipilih
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "55px" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Filter Users by Hair Color
        </Typography>

        {/* Dropdown untuk memilih warna rambut */}
        <FormControl sx={{ minWidth: 200, mb: 4 }}>
          <InputLabel>Hair Color</InputLabel>
          <Select value={hairColor} onChange={handleColorChange}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Black">Black</MenuItem>
            <MenuItem value="Brown">Brown</MenuItem>
            <MenuItem value="Blonde">Blonde</MenuItem>
            <MenuItem value="Red">Red</MenuItem>
            <MenuItem value="Gray">Gray</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
          </Select>
        </FormControl>

        {/* Loader ketika sedang memuat data */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Tampilkan error jika terjadi kesalahan */}
        {error && (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
            {error}
          </Typography>
        )}

        {/* Tabel hasil filter */}
        {!loading && users.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Results:
            </Typography>
            {users.map((user) => (
              <Box key={user.id} sx={{ borderBottom: "1px solid #ccc", p: 2 }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Hair Color:</strong> {user.hair?.color}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {user.gender}
                </Typography>
                <Typography variant="body1">
                  <strong>Age:</strong> {user.age}
                </Typography>
                <Typography variant="body1">
                  <strong>City:</strong> {user.address?.city}
                </Typography>
              </Box>
            ))}
          </Box>    
        )}

        {/* Jika tidak ada hasil */}
        {!loading && users.length === 0 && hairColor && (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No users found for the selected hair color.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
