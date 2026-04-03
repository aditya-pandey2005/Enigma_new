const axios = require("axios");

const evaluateContent = async (content) => {
  try {
    const prompt = `
You are a marketing expert.

Return ONLY valid JSON. No explanation.

{
  "creativity": number,
  "engagement": number,
  "clarity": number,
  "cta": number,
  "feedback": "text"
}

Content:
${content}
`;

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
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        }
      }
    );

    const raw = response.data.choices[0].message.content;

    // ✅ Extract JSON safely
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      parsed = {
        error: "Parsing failed",
        raw: raw
      };
    }

    return parsed;

  } catch (error) {
    console.error("Evaluation Error:", error.response?.data || error.message);
    throw new Error("Failed to evaluate content");
  }
};

module.exports = evaluateContent;