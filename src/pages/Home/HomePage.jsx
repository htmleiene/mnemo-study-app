import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRecentDecks, getRecommendedDecks } from '../../services/flashcards';
import DeckCard from '../../components/DeckCard/DeckCard';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const [recentDecks, setRecentDecks] = useState([]);
  const [recommendedDecks, setRecommendedDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDecks = async () => {
      setIsLoading(true);
      try {
        const [recent, recommended] = await Promise.all([
          getRecentDecks(user.id),
          getRecommendedDecks(user.id)
        ]);
        setRecentDecks(recent);
        setRecommendedDecks(recommended);
      } catch (error) {
        console.error('Error loading decks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadDecks();
    }
  }, [user]);

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Bem-vindo, {user.name.split(' ')[0]}!</h1>
        <p>Continue de onde parou ou descubra novos conteúdos</p>
      </section>

      <section className="decks-section">
        <h2>Continue Estudando</h2>
        <div className="decks-grid">
          {recentDecks.map(deck => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      </section>

      <section className="decks-section">
        <h2>Recomendados para Você</h2>
        <div className="decks-grid">
          {recommendedDecks.map(deck => (
            <DeckCard key={deck.id} deck={deck} isRecommended />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;