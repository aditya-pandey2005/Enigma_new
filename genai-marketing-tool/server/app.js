const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const contentRoutes = require("./routes/contentRoutes");

// ✅ CORS configuration
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

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

// ✅ API routes
app.use("/api/content", contentRoutes);

// ✅ SPA fallback - serve index.html for all other routes
app.use((req, res) => {
  const indexPath = path.join(clientDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ error: "Not found" });
    }
  });
});

module.exports = app;