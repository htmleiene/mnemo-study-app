import { useState } from 'react';
import { fetchAIExplanation } from '../../services/ai';
import './AIAssistant.css';

const AIAssistant = ({ concept, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getExplanation = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAIExplanation(concept);
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Error getting AI explanation:', error);
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