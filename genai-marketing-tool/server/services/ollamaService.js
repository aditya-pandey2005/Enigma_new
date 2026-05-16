const axios = require("axios");

const generateFromLLM = async (prompt) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey || apiKey === "DEMO" || apiKey.length < 10) {
      console.warn("⚠️ Using DEMO mode - no real API key configured");
      // Return demo content for testing
      return `
Captions:
1. "Transform your fitness journey today!"
2. "Pure protein, pure results."
3. "Every shake brings you closer to your goals."

Taglines:
1. "Fuel Your Fitness"
2. "Protein Powered Performance"

Hashtags:
#FitnessGoals #ProteinShake #GymLife #HealthyLiving #FitnessMotivation #WorkoutNutrition
`;
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    if (!response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid response from OpenRouter");
    }

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("❌ LLM Error Details:");
    console.error("  Message:", error.message);
    console.error("  Status:", error.response?.status);
    console.error("  Data:", error.response?.data);
    console.error("  API Key Set:", process.env.OPENROUTER_API_KEY ? "✅ Yes" : "❌ No");
    
    if (error.response?.status === 401) {
      throw new Error("OpenRouter API Key Invalid or Expired");
    } else if (error.response?.status === 429) {
      throw new Error("OpenRouter Rate Limit Exceeded");
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error("Cannot connect to OpenRouter API");
    }
    
    throw new Error(`LLM Generation Failed: ${error.response?.data?.error?.message || error.message}`);
  }
};

module.exports = generateFromLLM;