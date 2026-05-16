const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const contentRoutes = require("./routes/contentRoutes");

// ✅ CORS FIX - Accept all origins and add production domain
app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:5173", "https://enigma-new-taupe.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Serve static files from React build
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// routes
app.use("/api/content", contentRoutes);

// ✅ Fallback for SPA - serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientDistPath, "index.html"));
  } else {
    res.status(404).json({ error: "API endpoint not found" });
  }
});

module.exports = app;