const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//CORS options (customized)
// const corsOptions = {
//   origin: ["http://localhost:3000"], // Allow requests from this frontend only
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   credentials: true, // Allow credentials (cookies, etc.)
// };

//middelwares
app.use(cors({
  origin: "http://localhost:3000/", // Allow requests from any origin (use this in production)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
}));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
