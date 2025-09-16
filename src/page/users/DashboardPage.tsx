import {
  Avatar,
  Box,
  Button,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Header from "../../components/nav/Header";
import {
  OndemandVideo,
  Image,
  SendRounded,
  ThumbUpAltOutlined,
  InsertCommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { isLoggedIn } from "../../api/api.service";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const [postText, setPostText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // current logged-in user
  const user = {
    name: "Ankush",
    role: "Software Engineer at Google",
    avatar: "/src/assets/images/ank.jpg",
  };

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
    const newPost = {
      id: Date.now(),
      text: postText,
      file: file ? URL.createObjectURL(file) : null,
      fileType: file ? file.type : null,
      user,
      time: "Just now • 🌐",
      likes: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setFile(null);
  };

  return (
    <>
      {/* Fixed Header */}
      <Header />
      {/* Post create box */}
      <Paper sx={paperStyle}>
        <Box sx={searchStyle}>
          <Avatar
            src={user.avatar || undefined}
            sx={{
              width: 50,
              height: 50,
              mr: 1,
              my: 0.5,
              bgcolor: !user.avatar ? "primary.main" : "transparent",
            }}
          >
            {!user.avatar && user.name.charAt(0).toUpperCase()}
          </Avatar>

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

        {/* Footer buttons */}
        <Box sx={footerStyle}>
          <Button
            sx={{ color: "#666666" }}
            startIcon={<OndemandVideo sx={{ color: "green", fontSize: 30 }} />}
            onClick={() => videoInputRef.current?.click()}
          >
            Video
          </Button>

          <Button
            sx={{ color: "#666666" }}
            startIcon={<Image sx={{ color: "dodgerblue", fontSize: 30 }} />}
            onClick={() => photoInputRef.current?.click()}
          >
            Photo
          </Button>

          <Button
            sx={{ color: "#666666" }}
            startIcon={
              <SendRounded sx={{ color: "orangered", fontSize: 30 }} />
            }
            onClick={handlePost}
          >
            POST
          </Button>
        </Box>
      </Paper>

      {/* <hr style={{ width: "100%" }} /> */}

      {/* ✅ Show posts */}
      <Box sx={{ maxWidth: 560, margin: "20px auto" }}>
        {posts.map((post) => (
          <Paper key={post.id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={post.user.avatar || undefined}
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  bgcolor: !post.user.avatar ? "primary.main" : "transparent",
                }}
              >
                {!post.user.avatar && post.user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {post.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.time}
                </Typography>
              </Box>
            </Box>

            {/* Post Text */}
            <Typography variant="body1" sx={{ mb: 1 }}>
              {post.text}
            </Typography>

            {/* Post Media */}
            {post.file &&
              (post.fileType?.startsWith("video/") ? (
                <video
                  src={post.file}
                  controls
                  controlsList="nodownload"
                  width="100%"
                  style={{ borderRadius: "8px", border: "1px solid #ddd" }}
                />
              ) : (
                <img
                  src={post.file}
                  alt="post media"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    border: "2px solid #ddd",
                  }}
                />
              ))}

            {/* Actions */}
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}
            >
              <Box sx={actionButton}>
                <ThumbUpAltOutlined />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Like
                </Typography>
              </Box>
              <Box sx={actionButton}>
                <InsertCommentOutlined fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Comment
                </Typography>
              </Box>
              <Box sx={actionButton}>
                <ShareOutlined fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Share
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default DashboardPage;

{
  /* Styles */
}

const paperStyle = {
  padding: 4,
  margin: "auto",
  marginTop: 8,
  maxWidth: 500,
  minWidth: 400,
  textAlign: "center",
  color: "rgb(64 64 64)",
  backgroundColor: "rgb(255 255 255)",
  borderRadius: 2,
};

const searchStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
};

const textareaStyle = {
  width: "100%",
  resize: "none" as const,
  padding: 8,
  borderRadius: 8,
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

const actionButton = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  py: 1,
  px: 2,
  borderRadius: 2,
  "&:hover": {
    backgroundColor: "#f3f2ef",
    color: "#0a66c2",
  },
};
