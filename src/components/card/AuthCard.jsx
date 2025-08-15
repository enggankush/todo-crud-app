import { Paper, Typography } from "@mui/material";
import React from "react";

const AuthCard = ({ title, children, bkColor = null }) => {
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
          marginBottom: 6,
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
