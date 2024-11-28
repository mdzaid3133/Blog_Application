import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {/* User Info and Action Buttons */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {/* User Avatar */}
          <Avatar
            sx={{
              bgcolor: "black",
              width: 40,
              height: 40,
              color: "white",
              fontSize: "1rem",
            }}>
            {username?.slice(0,1)?.toUpperCase()}
          </Avatar>
          {/* Username */}
          <Typography variant="h6">{username}</Typography>
        </Box>

        {/* Action Buttons */}
        {isUser && (
          <Box display="flex" gap={1}>
            <IconButton onClick={handleEdit}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Blog Content */}
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Blog Image"
        sx={{ borderRadius: "8px" }}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {`${description.slice(0, 100)}...`}
        </Typography>
      </CardContent>
    </Card>
  );
}
