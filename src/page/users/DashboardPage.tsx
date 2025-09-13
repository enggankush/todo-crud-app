import { Box, Button, Paper, TextareaAutosize } from "@mui/material";
import Header from "../../components/nav/Header";
import { AccountCircle } from "@mui/icons-material";
import { OndemandVideo, Image, SendRounded } from "@mui/icons-material";

const DashboardPage = () => {
  return (
    <>
      <Box>
        <Header />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Paper sx={paperStyle}>
          <Box sx={searchStyle}>
            <AccountCircle
              sx={{
                color: "action.active",
                mr: 1,
                my: 0.5,
                fontSize: "3.5rem",
              }}
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Start a post..."
              style={textareaStyle}
            />
          </Box>
          <Box sx={footerStyle}>
            <Button
              sx={{ color: "#666666" }}
              startIcon={
                <OndemandVideo
                  sx={{ color: "green", fontSize: "30px !important" }}
                />
              }
            >
              Video
            </Button>

            <Button
              sx={{ color: "#666666" }}
              startIcon={
                <Image
                  sx={{ color: "dodgerblue", fontSize: "30px !important" }}
                />
              }
            >
              Photo
            </Button>

            <Button
              sx={{ color: "#666666" }}
              startIcon={
                <SendRounded
                  sx={{ color: "orangered", fontSize: "30px !important" }}
                />
              }
            >
              POST
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashboardPage;

const paperStyle = {
  padding: 4,
  margin: 4,
  maxWidth: 500,
  minWidth: 400,
  height: "auto",
  textAlign: "center",
  color: "rgb(64 64 64)",
  backgroundColor: "rgb(255 255 255)",
  borderRadius: 4,
};

const searchStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
};

const textareaStyle = {
  width: "100%",
  // resize: "none" as const,
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
};

const footerStyle = {
  display: "flex",
  gap: "140px",
  marginTop: "20px",
};
