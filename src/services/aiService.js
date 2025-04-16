export const generateFlashcards = async (course, topics) => {
  const response = await fetch('http://localhost:5000/api/generate-flashcards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course, topics }),
  });

  if (!response.ok) {
    throw new Error('Erro ao gerar flashcards');
  }

  return await response.json(); // [{ front, back }]
};
export const generateQuiz = async (course, topics) => {
  const response = await fetch('http://localhost:5000/api/generate-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course, topics }),
  });

  if (!response.ok) {
    throw new Error('Erro ao gerar quiz');
  }

  return await response.json(); // [{ question, options, answer }]
};