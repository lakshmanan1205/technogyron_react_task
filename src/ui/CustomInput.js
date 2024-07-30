import { FormControl, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export function CustomInput({
  control,
  label,
  name,
  type = "text",
  defaultValue,
  rules,
  minValue = 0,
}) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
  });
  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        type={type}
        InputLabelProps={{ shrink: !defaultValue }}
        inputProps={{ min: minValue }}
        {...inputProps}
        inputRef={ref}
        error={invalid}
        defaultValue={defaultValue}
        helperText={error?.message}
        size="small"

        // onChange={onChange}
      />
    </FormControl>
  );
}
