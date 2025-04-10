import { saveToStorage, getFromStorage } from '../utils/storage';

const FLASHCARDS_KEY = 'user_flashcards';
const DECKS_KEY = 'user_decks';

// Funções para decks
export const getRecentDecks = (userId) => {
  const decks = getFromStorage(DECKS_KEY) || {};
  return Object.values(decks)
    .filter(deck => deck.userId === userId)
    .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .slice(0, 3);
};

export const getRecommendedDecks = (userId) => {
  return [
    {
      id: 'genetics-101',
      name: 'Genética Básica',
      cardCount: 25,
      progress: 40,
      icon: 'fa-dna'
    },
    {
      id: 'neuroscience-101',
      name: 'Neurociência',
      cardCount: 18,
      progress: 15,
      icon: 'fa-brain'
    }
  ];
};

// Funções para flashcards
export const getDeckFlashcards = (deckId) => {
  const flashcards = getFromStorage(FLASHCARDS_KEY) || {};
  return Object.values(flashcards).filter(card => card.deckId === deckId);
};

export const updateFlashcardDifficulty = (cardId, difficulty) => {
  const flashcards = getFromStorage(FLASHCARDS_KEY) || {};
  if (flashcards[cardId]) {
    flashcards[cardId].difficulty = difficulty;
    flashcards[cardId].lastReviewed = new Date().toISOString();
    saveToStorage(FLASHCARDS_KEY, flashcards);
  }
};

export const createFlashcard = (deckId, front, back) => {
  const flashcards = getFromStorage(FLASHCARDS_KEY) || {};
  const newCard = {
    id: `card-${Date.now()}`,
    deckId,
    front,
    back,
    difficulty: 3,
    lastReviewed: null,
    nextReview: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  flashcards[newCard.id] = newCard;
  saveToStorage(FLASHCARDS_KEY, flashcards);
  return newCard;
};