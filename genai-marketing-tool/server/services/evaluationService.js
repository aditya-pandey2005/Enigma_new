const axios = require("axios");

const getDefaultEvaluation = () => ({
  creativity: 7,
  engagement: 7,
  clarity: 8,
  cta: 7,
  feedback: "Using default scores - API unavailable"
});

const evaluateContent = async (content) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error("❌ OPENROUTER_API_KEY not set in environment");
      return getDefaultEvaluation();
    }

    const prompt = `
You are a marketing expert. Evaluate this content.
Return ONLY valid JSON. No explanation.

{
  "creativity": number between 1-10,
  "engagement": number between 1-10,
  "clarity": number between 1-10,
  "cta": number between 1-10,
  "feedback": "brief feedback text"
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
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const raw = response.data.choices[0].message.content;

    // ✅ Extract JSON safely
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
      // Validate the parsed object
      if (typeof parsed.creativity !== 'number' || 
          typeof parsed.engagement !== 'number' || 
          typeof parsed.clarity !== 'number' || 
          typeof parsed.cta !== 'number') {
        throw new Error("Invalid evaluation format");
      }
    } catch (err) {
      console.warn("⚠️ JSON Parsing failed, using default:", err.message);
      return getDefaultEvaluation();
    }

    return parsed;

  } catch (error) {
    console.warn("⚠️ Evaluation Error:", error.response?.data || error.message);
    console.warn("📝 Using default scores instead");
    return getDefaultEvaluation();
  }
};

module.exports = evaluateContent;