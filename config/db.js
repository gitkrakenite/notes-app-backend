const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
  } else {
    console.log("Something went wrong".red);
  }
};

module.exports = connectDB;
