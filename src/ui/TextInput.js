import { FormControl, TextField } from "@mui/material";
import React from "react";

export default function TextInput({
  label,
  value,
  onChange,
  size = "small",
  required,
}) {
  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        size={size}
        required={required}
        sx={{ textTransform: "capitalize" }}
      />
    </FormControl>
  );
}
