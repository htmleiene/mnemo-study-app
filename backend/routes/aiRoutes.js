const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // coloque sua chave aqui no .env
});
const openai = new OpenAIApi(configuration);

router.post('/generate-flashcards', async (req, res) => {
  const { course, topics } = req.body;

  try {
    const prompt = `Gere flashcards no formato Q: ... A: ... sobre os tópicos: ${topics.join(", ")} do curso ${course}.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response.data.choices[0].message.content;

    // Converte texto em flashcards
    const flashcards = content
      .split('\n\n')
      .map((block) => {
        const [q, a] = block.split('\n');
        return {
          front: q?.replace(/^Q:\s*/, '') || '',
          back: a?.replace(/^A:\s*/, '') || ''
        };
      });

    res.json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar flashcards' });
  }
});

module.exports = router;
