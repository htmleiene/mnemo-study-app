import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDeckFlashcards, updateFlashcardDifficulty } from '../../services/flashcards';
import Flashcard from '../../components/Flashcard/FlashCard';
import './StudyPage.css';

const StudyPage = () => {
  const { deckId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeck = async () => {
      setIsLoading(true);
      const deckFlashcards = getDeckFlashcards(deckId);
      // Ordenar por prioridade de revisão
      deckFlashcards.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
      setFlashcards(deckFlashcards);
      setIsLoading(false);
    };
    
    loadDeck();
  }, [deckId]);

  const handleRateCard = (difficulty) => {
    const currentCard = flashcards[currentCardIndex];
    updateFlashcardDifficulty(currentCard.id, difficulty);
    
    // Avançar para o próximo card ou reiniciar
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando flashcards...</div>;
  }

  if (flashcards.length === 0) {
    return <div className="empty-deck">Nenhum flashcard neste deck ainda.</div>;
  }

  return (
    <div className="study-page">
      <div className="progress-indicator">
        Card {currentCardIndex + 1} de {flashcards.length}
      </div>
      
      <Flashcard
        front={flashcards[currentCardIndex].front}
        back={flashcards[currentCardIndex].back}
        onRate={handleRateCard}
        currentDeck={deckId}
      />
    </div>
  );
};

export default StudyPage;
