const buildPrompt = require("../utils/promptBuilder");
const generateFromOllama = require("../services/ollamaService");
const generateImage = require("../services/imageService");
const evaluateContent = require("../services/evaluationService");
const getMLScore = require("../services/mlService"); // ✅ NEW

const generateContent = async (req, res) => {
  try {
    const userInput = req.body;

    // 1️⃣ Prompt Engineering
    const prompt = buildPrompt(userInput);

    // 2️⃣ LLM Content Generation (phi3)
    const aiResponse = await generateFromOllama(prompt);

    // 3️⃣ Image Generation
    const imageData = await generateImage(userInput);

    // 4️⃣ LLM Evaluation
    const evaluation = await evaluateContent(aiResponse);

    // 5️⃣ ML Evaluation
    const mlScore = await getMLScore(aiResponse);

    // 6️⃣ Score Fusion (SAFE)
    let finalScore = null;

    if (
      evaluation &&
      mlScore !== null &&
      evaluation.creativity !== null
    ) {
      const llmAvg =
        (evaluation.creativity +
          evaluation.engagement +
          evaluation.clarity +
          evaluation.cta) / 4;

      finalScore = (0.7 * llmAvg) + (0.3 * mlScore);

      // round to 2 decimal places
      finalScore = Math.round(finalScore * 100) / 100;
    }

    // 7️⃣ Final Response
    res.json({
      textContent: aiResponse,
      image: imageData,
      evaluation: evaluation,
      mlScore: mlScore,
      finalScore: finalScore
    });

  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateContent };