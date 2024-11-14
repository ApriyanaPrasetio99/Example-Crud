import { Box, Button, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TabelUser from "./TabelUser";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce effect to limit API calls while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users based on search term
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(debouncedSearchTerm ? `https://dummyjson.com/users/search?q=${debouncedSearchTerm}` : "https://dummyjson.com/users");
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [debouncedSearchTerm]);

  // Prevent Enter key from submitting the form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addUsers = () => {
    navigate(`/add-user`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "55px" }}>
        <Typography variant="h4">Users List</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
          {/* Search Bar */}
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ "aria-label": "search" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            <IconButton sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" onClick={addUsers}>
            Add User
          </Button>
        </Box>
        {/* Tabel User */}
        <TabelUser users={users} />
      </Box>
    </Box>
  );
}
