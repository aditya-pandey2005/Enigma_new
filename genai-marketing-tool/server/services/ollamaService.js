const axios = require("axios");

const generateFromLLM = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // free model
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("LLM Error:", error.response?.data || error.message);
    throw new Error("Failed to generate content");
  }
};

module.exports = generateFromLLM;