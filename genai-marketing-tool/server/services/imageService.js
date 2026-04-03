const axios = require("axios");

const generateImage = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/generate-image", {
      product: data.product,
      audience: data.audience,
      platform: data.platform,
      tone: data.tone,
    });

    return response.data;

  } catch (error) {
    console.error("❌ Image Generation Error:", error.response?.data || error.message);

    return {
      image_url: null,
      status: "error"
    };
  }
};

module.exports = generateImage;