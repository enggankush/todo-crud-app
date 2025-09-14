import { Box, Button, Paper, TextareaAutosize } from "@mui/material";
import Header from "../../components/nav/Header";
import { AccountCircle } from "@mui/icons-material";
import { OndemandVideo, Image, SendRounded } from "@mui/icons-material";
import { useRef, useState } from "react";
import { isLoggedIn } from "../../api/api.service";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("file selected", e.target.files[0]);
    }
  };
  const handlePost = () => {
    if (!postText.trim() && !file) {
      alert("⚠️ Please enter text or add media before posting!");
      return;
    }
    console.log("Posting:", { text: postText, file });
    alert("✅ Post submitted!");
    setPostText("");
    setFile(null);
  };

  return (
    <>
      <Box>
        <Header />
      </Box>
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
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />

          {/* Hidden inputs */}
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            ref={videoInputRef}
            onChange={handleFileChange}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={photoInputRef}
            onChange={handleFileChange}
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
            onClick={() => videoInputRef.current?.click()}
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
            onClick={() => photoInputRef.current?.click()}
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
            onClick={handlePost}
          >
            POST
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default DashboardPage;

const paperStyle = {
  padding: 4,
  margin: "auto",
  marginTop: 4,
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
  resize: "none" as const,
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "4.5rem",
  marginTop: "20px",
};
