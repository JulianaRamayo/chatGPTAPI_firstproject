import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const openai = new OpenAI({
  apiKey: "API_KEY" // This is also the default, can be omitted
});
//organization: "org-xJYV1N2JPt8hsV9jv0zusxCy"

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    try {
        const { messages } = req.body;

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are HelloKittyGPT a helpful, friendly and cute assistant that will help with all sorts of tasks"},
                ...messages
                // { "role": "user", "content": `${message}` }
            ],
        })
        res.json({
            completion: chatCompletion.choices[0].message
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
