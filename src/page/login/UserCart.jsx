import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function UserCart() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Ambil token dan userId dari localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch data keranjang berdasarkan userId
  useEffect(() => {
    if (userId && token) {
      fetch(`https://dummyjson.com/users/${userId}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.carts && data.carts.length > 0) {
            const products = data.carts[0].products;
            setCartData(products);

            // Hitung total harga
            const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching cart data:", err);
          setError("Failed to fetch cart data");
          setLoading(false);
        });
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [userId, token]);

  // Fungsi untuk handle Checkout
  const handleCheckout = () => {
    navigate("/dashboard");
  };

  // Fungsi untuk handle Batal
  const handleCancel = () => {
    navigate("/products");
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // function UseCart({ cartData, totalPrice, handleCheckout, handleCancel }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Cart */}
      <Box sx={{ flex: 1, p: 2, marginTop: "55px" }}>
        <Typography variant="h4" gutterBottom>
          Keranjang Belanja
        </Typography>

        {cartData.length === 0 ? (
          <Typography>No items in the cart.</Typography>
        ) : (
          <>
            <Paper elevation={3} sx={{ mt: 2, mb: 4 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nama Produk</TableCell>
                      <TableCell align="center">Kuantitas</TableCell>
                      <TableCell align="right">Harga Satuan ($)</TableCell>
                      <TableCell align="right">Subtotal ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Menampilkan Total Harga */}
            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>

            {/* Tombol Checkout dan Batal */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button variant="contained" color="success" onClick={handleCheckout}>
                Checkout
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Batal
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
  // }
}

export default UserCart;
