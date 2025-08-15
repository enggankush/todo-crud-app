import { InputAdornment, TextField } from "@mui/material";

const CustomTextField = ({
  id,
  name,
  type,
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
    //   helperText={helperText}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        input: {
          "&::placeholder": {
            fontWeight: "bold",
            color: "#0c0c0cff",
          },
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
