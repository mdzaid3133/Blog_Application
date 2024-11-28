import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        console.error("User ID not found in localStorage.");
        return;
      }
  
      const response = await axios.get(`/api/v1/blog/user-blog/${id}`);
      const { data } = response;
       console.log(data)
      if (data?.success) {
        setBlogs(data?.data?.blogs || []);
      } else {
        console.error("Failed to fetch user blogs:", data?.message);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error.message || error);
    }
  };
  

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "16px",
      padding: "16px",
    }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
