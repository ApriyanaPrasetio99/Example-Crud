import { Card, CardContent } from "@mui/material";
import React from "react";

export default function CustomCard({ children }) {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
