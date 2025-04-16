// services/ai.js
export const generateFlashcardsFromAI = async (concept) => {
  // Use o conceito como base para gerar flashcards mockados
  return [
    {
      id: '1',
      front: `O que é ${concept}?`,
      back: `Explicação sobre ${concept} gerada pela IA.`,
      nextReview: new Date().toISOString(),
    },
  ];
};
