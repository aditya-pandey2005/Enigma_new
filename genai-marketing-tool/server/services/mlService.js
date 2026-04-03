const axios = require("axios");

const getMLScore = async (text) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/ml-evaluate", {
      text: text
    });

    return response.data.ml_score;

  } catch (error) {
    console.error("ML Service Error:", error.message);
    return null;
  }
};

module.exports = getMLScore;