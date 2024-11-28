import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created Successfully!");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={{ xs: "90%", sm: "75%", md: "50%" }}
          border={2}
          borderRadius={5}
          padding={4}
          margin="auto"
          boxShadow={"0 8px 30px rgba(0,0,0,0.3)"}
          display="flex"
          flexDirection={"column"}
          marginTop="40px"
          sx={{
            background: "white",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            padding={3}
            sx={{
              background: "linear-gradient(90deg, #ff8c00, #ff5500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create a New Post
          </Typography>

          {/* Title */}
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#ff8c00" },
                "&.Mui-focused fieldset": { borderColor: "#ff5500" },
              },
            }}
          />

          {/* Description */}
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            multiline
            rows={4}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#ff8c00" },
                "&.Mui-focused fieldset": { borderColor: "#ff5500" },
              },
            }}
          />

          {/* Image URL */}
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#ff8c00" },
                "&.Mui-focused fieldset": { borderColor: "#ff5500" },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              background: "linear-gradient(90deg, #ff8c00, #ff5500)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(90deg, #ff5500, #ff8c00)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
