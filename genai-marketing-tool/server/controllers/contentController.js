const buildPrompt = require("../utils/promptBuilder");
const generateFromOllama = require("../services/ollamaService");
const generateImage = require("../services/imageService");
const evaluateContent = require("../services/evaluationService");
const getMLScore = require("../services/mlService");

const generateContent = async (req, res) => {
  try {
    const userInput = req.body;

    // Validate input
    if (!userInput.product || !userInput.audience) {
      return res.status(400).json({ 
        error: "Product and audience are required" 
      });
    }

    console.log("📝 Processing request for:", userInput.product);

    // 1️⃣ Prompt Engineering
    const prompt = buildPrompt(userInput);

    // 2️⃣ LLM Content Generation
    let aiResponse;
    try {
      aiResponse = await generateFromOllama(prompt);
      console.log("✅ Content generated successfully");
    } catch (err) {
      console.error("❌ Content generation failed:", err.message);
      return res.status(500).json({ 
        error: "Failed to generate content: " + err.message 
      });
    }

    // 3️⃣ Image Generation (can fail gracefully)
    let imageData;
    try {
      imageData = await generateImage(userInput);
      console.log("✅ Image ready");
    } catch (err) {
      console.warn("⚠️ Image generation failed, using fallback");
      imageData = {
        image_url: "https://via.placeholder.com/500x500?text=Image+Generation+Unavailable",
        status: "fallback",
        message: "Using placeholder"
      };
    }

    // 4️⃣ LLM Evaluation (can fail gracefully)
    let evaluation;
    try {
      evaluation = await evaluateContent(aiResponse);
      console.log("✅ Content evaluated");
    } catch (err) {
      console.warn("⚠️ Evaluation failed, using defaults");
      evaluation = {
        creativity: 7,
        engagement: 7,
        clarity: 8,
        cta: 7,
        feedback: "Using default scores"
      };
    }

    // 5️⃣ ML Evaluation (can fail gracefully)
    let mlScore;
    try {
      mlScore = await getMLScore(aiResponse);
      console.log("✅ ML evaluation done");
    } catch (err) {
      console.warn("⚠️ ML evaluation failed");
      mlScore = null;
    }

    // 6️⃣ Score Fusion
    let finalScore = null;

    if (evaluation && evaluation.creativity !== null && evaluation.creativity !== undefined) {
      const llmAvg =
        (evaluation.creativity +
          evaluation.engagement +
          evaluation.clarity +
          evaluation.cta) / 4;

      if (mlScore !== null && typeof mlScore === 'number') {
        finalScore = (0.7 * llmAvg) + (0.3 * mlScore);
      } else {
        finalScore = llmAvg;
      }

      finalScore = Math.round(finalScore * 100) / 100;
    }

    // 7️⃣ Final Response
    console.log("📤 Sending response...");
    res.json({
      textContent: aiResponse,
      image: imageData,
      evaluation: evaluation,
      mlScore: mlScore,
      finalScore: finalScore
    });

  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    console.error("📋 Full Error:", error);
    res.status(500).json({ 
      error: error.message || "Internal server error",
      details: error.response?.data || error.toString()
    });
  }
};

module.exports = { generateContent };