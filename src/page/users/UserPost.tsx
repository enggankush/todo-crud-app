import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Header from "../../components/nav/Header";
import { useState } from "react";
import {
  ThumbUpAltOutlined,
  InsertCommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const UserPost = () => {
  const [user, _setUser] = useState({
    name: "",
    text: "",
    time: "",
    image: "",
  });

  return (
    <>
      <Header />
      <Card sx={postCardStyle}>
        <CardContent>
          {/* Profile Section */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              alt={user.name && "Ankush"}
              src={user.image || "../../src/assets/images/ank.jpg"}
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user.name || "Ankush Kumar"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.name || "Software Engineer at Google"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.time || "1h • 🌐"}
              </Typography>
            </Box>
          </Box>
          {/* Post Content */}
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.text ||
                "Google offers Material Symbols as the successor offers Material Symbols as offers Material Symbols as the successor the successor to Material Icons. "}
            </Typography>
            {/* {user.image && (
              <Box
                component="img"
                src={user.image && "../../src/assets/images/ank.jpg"}
                sx={postImage}
              />
            )} */}
            <img
              src={user.image || "../../src/assets/images/bg-img.jpg"}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                objectFit: "cover",
                marginBottom: 2,
              }}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
            <Box sx={actionButton}>
              <ThumbUpAltOutlined fontSize="small" />
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
        </CardContent>
      </Card>
    </>
  );
};

export default UserPost;

const postCardStyle = {
  margin: "20px auto",
  maxWidth: 500,
  borderRadius: 3,
  boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const actionButton = {
  display: "flex",
  cursor: "pointer",
  py: 1,
  "&:hover": {
    backgroundColor: "#f3f2ef",
    color: "#0a66c2",
  },
};
