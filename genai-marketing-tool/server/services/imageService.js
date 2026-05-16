const axios = require("axios");

const generateImage = async (data) => {
  try {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";
    
    const response = await axios.post(`${pythonServiceUrl}/generate-image`, {
      product: data.product,
      audience: data.audience,
      platform: data.platform,
      tone: data.tone,
    }, {
      timeout: 60000
    });

    return response.data;

  } catch (error) {
    console.error("⚠️ Image Generation Error:", error.response?.data || error.message);

    // Return fallback image
    return {
      image_url: "https://via.placeholder.com/500x500?text=Image+Generation+Unavailable",
      status: "fallback",
      message: "Using placeholder - Python service unavailable"
    };
  }
};

module.exports = generateImage;