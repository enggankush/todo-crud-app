import { Box } from "@mui/material";
import BgImg from "../../assets/images/bg-img.jpg";
import type { ReactNode } from "react";

interface CustomBoxProps {
  children: ReactNode;
}

const CustomBox: React.FC<CustomBoxProps> = ({ children }) => {
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
