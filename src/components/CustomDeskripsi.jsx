import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";

function DescriptionField({ name = "", value, onChange, placeholder = "", rows = 8, maxWidth = 500, sx }) {
  return (
    <FormControl fullWidth sx={{ maxWidth, mb: 2 }}>
      <TextField multiline name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} fullWidth sx={sx} />
    </FormControl>
  );
}

export default DescriptionField;
