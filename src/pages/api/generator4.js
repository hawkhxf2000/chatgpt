import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generator4(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const input = req.body.input || '';
    if (input.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid question",
            }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Hello, gpt",
            temperature: 0.6,
        });
        console.log(completion);
        res.status(200).json({result: completion.data.choices[0].text});
    } catch (e) {
        if (e.response) {
            console.error(e.response.status, e.response.data);
            res.status(e.response.status).json(e.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${e.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}