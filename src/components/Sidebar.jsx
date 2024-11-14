import React, { useEffect, useState } from "react";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Badge, useTheme, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const { userId } = useParams();

  // Fetch data dari API keranjang pengguna
  useEffect(() => {
    const fetchCartData = async () => {
      console.log("Fetching cart data for user:", userId);
      if (userId) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${userId}/carts`);
          const data = await response.json();
          if (data.carts && data.carts.length > 0) {
            const totalItems = data.carts[0].totalProducts;
            setCartCount(totalItems);
          }
          console.log("Data fetched:", data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, [userId]);

  const username = localStorage.getItem("username");

  // Toggle Drawer
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  // Tema Siang dan Malam
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#31484b",
        paper: "#31484b",
      },
      text: {
        primary: "#ffffff",
        secondary: "#cfd8dc",
      },
    },
  });

  const theme = darkMode ? darkTheme : lightTheme;

  const drawer = (
    <div>
      {/* Judul Aplikasi di pojok kiri atas */}
      <Box sx={{ p: 2, textAlign: "center", borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6" noWrap component="div">
          Nama Aplikasi Anda
        </Typography>
      </Box>
      <Divider />
      <ListItem disablePadding onClick={() => navigate("/dashboard")}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={() => navigate("/products")}>
        <ListItemButton>
          <ListItemIcon>
            <ProductionQuantityLimitsTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={() => navigate("/categories")}>
        <ListItemButton>
          <ListItemIcon>
            <CategoryTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={() => navigate("/users")}>
        <ListItemButton>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: darkMode ? "#31484b" : undefined,
          }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {username ? `Hi, ${username}` : "User"}
            </Typography>

            {/* Dark/Light Mode Toggle Button */}
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Ikon Keranjang */}
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
