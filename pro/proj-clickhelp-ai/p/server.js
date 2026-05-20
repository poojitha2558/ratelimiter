require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const payload = req.body;

    // Only when PR opened
    if (payload.action !== "opened") {
      return res.send("Ignored");
    }

    const prTitle = payload.pull_request.title;
    const prDescription =
      payload.pull_request.body || "No description";

    console.log("PR Received:", prTitle);

    // ==========================
    // STEP 1: Gemini Generation
    // ==========================

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Convert this GitHub PR into technical documentation.

PR Title:
${prTitle}

PR Description:
${prDescription}

Generate:
1. Overview
2. Changes made
3. Technical Details
4. Usage
                `
              }
            ]
          }
        ]
      }
    );

    const generatedContent =
      geminiResponse.data.candidates[0]
        .content.parts[0].text;

    console.log("Generated docs");

    // ==========================
    // STEP 2: MCP Create Topic
    // ==========================

    const mcpResponse = await axios.post(
      process.env.MCP_SERVER_URL,
      {
        method: "tools/call",
        params: {
          name: "create_topic",
          arguments: {
            title: prTitle,
            content: generatedContent
          }
        }
      }
    );

    console.log("Topic Created");
    console.log(mcpResponse.data);

    res.send("Success");
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// fchisudhv sfcjhkicdh