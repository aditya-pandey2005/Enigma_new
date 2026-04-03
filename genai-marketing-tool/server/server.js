const app = require("./app");

const PORT = 5000;

// ✅ Optional root route (if not already in app.js)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});