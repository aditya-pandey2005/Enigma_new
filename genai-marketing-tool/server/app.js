const express = require("express");
const cors = require("cors");

const app = express();

const contentRoutes = require("./routes/contentRoutes");

// ✅ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// routes
app.use("/api/content", contentRoutes);

module.exports = app;