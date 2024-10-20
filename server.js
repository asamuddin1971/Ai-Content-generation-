const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const port = 3000;

// OpenAI API key (You need to sign up on OpenAI and get your API key)
const OPENAI_API_KEY = import OpenAI from "openai";
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {"role": "user", "content": "write a haiku about ai"}
    ]
});;

app.post("/generate", async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const generatedText = response.data.choices[0].text.trim();

        res.json({ content: generatedText });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});