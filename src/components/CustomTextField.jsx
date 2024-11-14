import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Custom Bootstrap-styled input
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#F3F6F9",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Reusable CustomInputText component
function CustomInputText({ label, defaultValue, id }) {
  return (
    <FormControl variant="standard">
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <BootstrapInput defaultValue={defaultValue} id={id} />
    </FormControl>
  );
}

// Parent component that uses CustomInputText and other inputs
export default function CustomizedInputsStyled() {
  return (
    <Box component="form" noValidate sx={{ display: "grid", gridTemplateColumns: { sm: "1fr 1fr" }, gap: 2 }}>
      <CustomInputText label="Bootstrap Styled Input" defaultValue="react-bootstrap" id="bootstrap-input" />
      {/* <CustomInputText label="Another Bootstrap Input" defaultValue="input-2" id="bootstrap-input-2" /> */}
      {/* Other components like RedditTextField, CssTextField, etc., can go here */}
    </Box>
  );
}
