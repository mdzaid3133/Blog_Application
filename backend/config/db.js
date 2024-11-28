// const mongoose = require("mongoose");
// const colors = require("colors");
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log(
//       `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta
//         .white
//     );
//   } catch (error) {
//     console.log(`MONGO Connect Error ${error}`.bgRed.white);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

