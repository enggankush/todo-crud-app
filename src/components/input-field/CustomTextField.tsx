import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import  { type OverridableComponent } from "@mui/types";
import { type SvgIconTypeMap } from "@mui/material/SvgIcon";
import React from "react";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>; // for MUI icons
  error?: boolean;
  helperText?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  name,
  type = "text",
  placeholder = "text",
  value = "",
  icon: IconComponent,
  onChange,
  error = false,
  helperText = "",
  ...props
}) => {
  return (
    <TextField
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        "& .MuiInputBase-input::placeholder": {
          fontWeight: "bold",
          color: "#0c0c0cff",
        },
      }}
      InputProps={{
        startAdornment: IconComponent && (
          <InputAdornment position="start">
            <IconComponent sx={{ color: "#757575" }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default CustomTextField;
