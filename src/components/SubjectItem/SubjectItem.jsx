import { Link } from 'react-router-dom';
import './SubjectItem.css';

const SubjectItem = ({ subject }) => {
  return (
    <div className="subject-item">
      <div className="subject-info">
        <h4>{subject.name}</h4>
        <p>{subject.credits} créditos</p>
      </div>
      <div className="subject-actions">
        <Link to={`/study/${subject.id}`} className="study-btn">
          <i className="fas fa-book-open"></i> Estudar
        </Link>
        {subject.decks && (
          <span className="decks-count">
            {subject.decks.length} decks
          </span>
        )}
      </div>
    </div>
  );
};

export default SubjectItem;