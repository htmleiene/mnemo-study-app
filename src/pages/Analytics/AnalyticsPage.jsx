import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getStudyAnalytics } from '../../services/analytics';
import ProgressChart from '../../components/ProgressChart/ProgressChart';
import StatsCard from '../../components/StatsCard/StatsCard';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await getStudyAnalytics(user.id, timeRange);
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadAnalytics();
    }
  }, [user, timeRange]);

  if (isLoading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="analytics-page">
      <div className="time-range-selector">
        <button 
          className={timeRange === 'week' ? 'active' : ''}
          onClick={() => setTimeRange('week')}
        >
          Semana
        </button>
        <button 
          className={timeRange === 'month' ? 'active' : ''}
          onClick={() => setTimeRange('month')}
        >
          Mês
        </button>
        <button 
          className={timeRange === 'year' ? 'active' : ''}
          onClick={() => setTimeRange('year')}
        >
          Ano
        </button>
      </div>

      <div className="stats-grid">
        <StatsCard 
          title="Flashcards Estudados" 
          value={analytics.cardsStudied} 
          change={analytics.cardsChange} 
          icon="fa-clipboard-list"
        />
        <StatsCard 
          title="Tempo de Estudo" 
          value={`${analytics.studyTime}h`} 
          change={analytics.timeChange}
          icon="fa-clock"
        />
        <StatsCard 
          title="Taxa de Acerto" 
          value={`${analytics.accuracyRate}%`} 
          change={analytics.accuracyChange}
          icon="fa-check-circle"
        />
        <StatsCard 
          title="Dias Consecutivos" 
          value={analytics.streak} 
          change={analytics.streakChange}
          icon="fa-fire"
        />
      </div>

      <div className="chart-container">
        <h3>Progresso de Aprendizado</h3>
        <ProgressChart data={analytics.progressChart} />
      </div>

      <div className="deck-performance">
        <h3>Desempenho por Tópico</h3>
        {analytics.deckPerformance.map(deck => (
          <div key={deck.id} className="deck-item">
            <span className="deck-name">{deck.name}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${deck.mastery}%`, backgroundColor: deck.color }}
              ></div>
            </div>
            <span className="deck-percentage">{deck.mastery}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;