const axios = require("axios");

const getMLScore = async (text) => {
  try {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";
    
    const response = await axios.post(`${pythonServiceUrl}/ml-evaluate`, {
      text: text
    }, {
      timeout: 30000
    });

    if (response.data && typeof response.data.ml_score === 'number') {
      return response.data.ml_score;
    }
    return null;

  } catch (error) {
    console.warn("⚠️ ML Service Error:", error.message);
    console.warn("📝 Returning null ML score - will use fallback");
    return null;
  }
};

module.exports = getMLScore;