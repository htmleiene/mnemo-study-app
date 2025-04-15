// src/components/Flashcard/FlashCard.jsx
import { useState } from 'react';
import AIAssistant from '../AIAssistant/AIAssistant';
import './Flashcard.css';

const Flashcard = ({ front, back, onRate, currentDeck }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAIHelp, setShowAIHelp] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAIHelp(false);
  };

  const handleRate = (difficulty) => {
    onRate(difficulty);
    setIsFlipped(false);
  };

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={handleFlip}
      >
        <div className="flashcard-front">
          {front}
        </div>
        <div className="flashcard-back">
          {back}
          <button 
            className="ai-help-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowAIHelp(true);
            }}
          >
            <i className="fas fa-robot"></i>
          </button>
        </div>
      </div>

      {isFlipped && (
        <div className="flashcard-actions">
          <button className="difficulty-btn hard" onClick={() => handleRate(1)}>
            Difícil
          </button>
          <button className="difficulty-btn medium" onClick={() => handleRate(3)}>
            Médio
          </button>
          <button className="difficulty-btn easy" onClick={() => handleRate(5)}>
            Fácil
          </button>
        </div>
      )}

      {showAIHelp && (
        <AIAssistant 
          concept={back} 
          deckId={currentDeck}
          onClose={() => setShowAIHelp(false)}
        />
      )}
    </div>
  );
};

export default Flashcard;
