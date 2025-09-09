import { Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
  bkColor?: string; // optional background color
}
const AuthCard: React.FC<AuthCardProps> = ({ title, children, bkColor }) => {
  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: 450,
        minWidth: 400,
        height: "auto",
        textAlign: "center",
        backgroundColor: bkColor ? bkColor : "#2c2c2c",
        color: "#fff",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{
          color: "#fff",
          marginBottom: 2,
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default AuthCard;
