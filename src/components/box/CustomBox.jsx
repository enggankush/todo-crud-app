import { Box } from "@mui/material";
import BgImg from "../../assets/images/bg-img.jpg";

const CustomBox = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: BgImg ? `url(${BgImg})` : "none",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
