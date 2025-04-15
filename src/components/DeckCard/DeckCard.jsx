import { Link } from 'react-router-dom';
import './DeckCard.css';

const DeckCard = ({ deck, isRecommended = false }) => {
  return (
    <Link to={`/study/${deck.id}`} className={`deck-card ${isRecommended ? 'recommended' : ''}`}>
      <div className="deck-icon">
        <i className={`fas ${deck.icon || 'fa-layer-group'}`}></i>
      </div>
      <div className="deck-info">
        <h3>{deck.name}</h3>
        <p>{deck.cardCount} flashcards</p>
        {isRecommended && <span className="recommended-badge">Recomendado</span>}
      </div>
      {deck.progress && (
        <div className="deck-progress">
          <div 
            className="progress-bar"
            style={{ width: `${deck.progress}%` }}
          ></div>
          <span>{deck.progress}%</span>
        </div>
      )}
    </Link>
  );
};

export default DeckCard;
