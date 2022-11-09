const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { application } = require("express");
const colors = require("colors");

const PORT = process.env.PORT || 5000;

const useRoutes = require("./routes/useRoutes");
const connectDB = require("./config/db");

// config
const app = express();
app.use(cors());
app.use(express.json());

// Coonection to db
connectDB();

// Routes
app.use("/api/v1/goals", useRoutes);

// Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
