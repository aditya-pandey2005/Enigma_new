const buildPrompt = (data) => {
  const { product, audience, platform, tone } = data;

  return `
You are a marketing expert.

Platform: ${platform}
Tone: ${tone}
Audience: ${audience}

Task:
Generate marketing content.

Output STRICTLY in this format:

Captions:
1. <caption>
2. <caption>
3. <caption>

Taglines:
1. <tagline>
2. <tagline>

Hashtags:
#tag1 #tag2 #tag3 #tag4 #tag5

Product:
${product}

Rules:
- Do NOT add any explanation
- Do NOT add headings outside format
- Do NOT repeat instructions
- Keep captions short and punchy
- Make content engaging and realistic
`;
};

module.exports = buildPrompt;