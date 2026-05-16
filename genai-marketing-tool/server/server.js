// ✅ Load environment variables at the very start
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "GenAI Marketing Tool Backend Running ✅",
    environment: process.env.NODE_ENV || "development"
  });
});

// Only listen if not on Vercel (Vercel exports the app as a function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔑 API Key configured: ${process.env.OPENROUTER_API_KEY ? "✅ Yes" : "❌ No"}`);
  });
}

// Export for Vercel
module.exports = app;