import './StatsCard.css';

const StatsCard = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;

  return (
    <div className="stats-card">
      <div className="stats-header">
        <h3>{title}</h3>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stats-value">{value}</div>
      <div className={`stats-change ${isPositive ? 'positive' : 'negative'}`}>
        <i className={`fas ${isPositive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
        {Math.abs(change)}% {isPositive ? 'aumento' : 'redução'}
      </div>
    </div>
  );
};

export default StatsCard;