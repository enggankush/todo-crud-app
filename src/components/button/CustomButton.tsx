import { Button } from "@mui/material";

interface CustomButtonProps {
  text: string;
  type: "button" | "submit";
  onClick?: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  type = "button",
  onClick,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      sx={{
        marginY: 4,
        backgroundColor: "#880af2",
        textTransform: "none",
        borderRadius: 2,
        fontWeight: "bold",
        fontSize: "larger",
        px: 8,
        color: "#fff",
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
