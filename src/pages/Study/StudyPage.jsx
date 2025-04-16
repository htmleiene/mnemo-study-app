import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDeckFlashcards, updateFlashcardDifficulty } from '../../services/flashcards';
import Flashcard from '../../components/Flashcard/FlashCard';
import { generateFlashcards } from '../../services/aiService';
import { useAuth } from '../../contexts/AuthContext'; 
import './StudyPage.css';

const StudyPage = () => {
  const { deckId } = useParams();
  const { currentUser } = useAuth();  // Verifique se currentUser é carregado corretamente
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return; // Evita que o código siga sem o currentUser
    }

    const loadDeck = async () => {
      setIsLoading(true);

      let deckFlashcards = await getDeckFlashcards(deckId);

      if (!deckFlashcards || deckFlashcards.length === 0) {
        // Gerar via IA se deck estiver vazio
        const course = currentUser?.course || 'Curso genérico';
        const topics = ['Introdução', 'Tema 1', 'Tema 2']; // ou tornar dinâmico no futuro

        deckFlashcards = await generateFlashcards(course, topics);
      }

      // Ordenar por próxima revisão
      deckFlashcards.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));

      setFlashcards(deckFlashcards);
      setIsLoading(false);
    };

    loadDeck();
  }, [deckId, currentUser]);  // Dependências corretas

  const handleRateCard = (difficulty) => {
    const currentCard = flashcards[currentCardIndex];
    updateFlashcardDifficulty(currentCard.id, difficulty);

    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (isLoading) return <div className="loading">Carregando flashcards...</div>;
  if (flashcards.length === 0) return <div className="empty-deck">Nenhum flashcard neste deck ainda.</div>;

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
