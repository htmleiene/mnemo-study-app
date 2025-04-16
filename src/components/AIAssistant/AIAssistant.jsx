import { useState } from 'react';
import { generateFlashcardsFromAI } from '../../services/ai';
import './AIAssistant.css';

const AIAssistant = ({ concept, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getExplanation = async () => {
    setIsLoading(true);
    try {
      // Aqui você simula a IA gerando flashcards sobre o conceito
      const flashcards = await generateFlashcardsFromAI(concept);
      if (flashcards.length > 0) {
        setExplanation(flashcards[0].back); // Pega o "back" do primeiro flashcard como explicação
      } else {
        setExplanation('Nenhuma explicação encontrada.');
      }
    } catch (error) {
      console.error('Erro ao obter explicação da IA:', error);
      setExplanation('Não foi possível obter a explicação no momento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-assistant">
      <button onClick={getExplanation} disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Explicação da IA'}
      </button>
      {explanation && (
        <div className="ai-explanation">
          <p>{explanation}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
