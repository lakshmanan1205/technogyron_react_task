import { FormControl, MenuItem, TextField } from "@mui/material";
import React from "react";

export default function TextFieldSelect({
  label,
  value,
  onChange,
  size = "small",
  selectOptions = [],
  selectValue = "value",
  selectlabel = "label",
  required,
}) {
  return (
    <FormControl fullWidth>
      <TextField
        select
        label={label}
        value={value}
        onChange={onChange}
        size={size}
        required={required}
      >
        {selectOptions.map((option) => (
          <MenuItem key={option[selectValue]} value={option[selectValue]}>
            {option[selectlabel]}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
