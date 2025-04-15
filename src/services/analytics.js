import { getFromStorage } from '../utils/storage';
// import { generateStudyPlan } from './ai';

const STUDY_DATA_KEY = 'study_analytics';

export const getStudyAnalytics = async (userId, range = 'week') => {
  // Simulação - na prática viria de uma API
  const studyData = getFromStorage(STUDY_DATA_KEY)?.[userId] || generateMockData();
  
  return {
    cardsStudied: studyData[range].cardsStudied,
    cardsChange: calculateChange(studyData, range, 'cardsStudied'),
    studyTime: studyData[range].studyTime,
    timeChange: calculateChange(studyData, range, 'studyTime'),
    accuracyRate: studyData[range].accuracyRate,
    accuracyChange: calculateChange(studyData, range, 'accuracyRate'),
    streak: studyData.streak.current,
    streakChange: studyData.streak.change,
    progressChart: generateChartData(range),
    deckPerformance: generateDeckPerformance()
  };
};

const calculateChange = (data, range, metric) => {
  const current = data[range][metric];
  let previous;
  
  if (range === 'week') {
    previous = data.lastWeek[metric];
  } else if (range === 'month') {
    previous = data.lastMonth[metric];
  } else {
    previous = data.lastYear[metric];
  }
  
  return previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;
};

const generateMockData = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  return {
    week: {
      cardsStudied: 24,
      studyTime: 3.5,
      accuracyRate: 78
    },
    lastWeek: {
      cardsStudied: 18,
      studyTime: 2.8,
      accuracyRate: 72
    },
    month: {
      cardsStudied: 120,
      studyTime: 18,
      accuracyRate: 75
    },
    lastMonth: {
      cardsStudied: 95,
      studyTime: 14,
      accuracyRate: 70
    },
    year: {
      cardsStudied: 980,
      studyTime: 156,
      accuracyRate: 80
    },
    lastYear: {
      cardsStudied: 750,
      studyTime: 120,
      accuracyRate: 78
    },
    streak: {
      current: dayOfWeek + 3, // Simula 3 dias consecutivos
      change: 3
    }
  };
};

const generateChartData = (range) => {
  const labels = [];
  const values = [];
  
  if (range === 'week') {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (let i = 0; i < 7; i++) {
      labels.push(days[i]);
      values.push(Math.floor(Math.random() * 10) + 5);
    }
  } else if (range === 'month') {
    for (let i = 1; i <= 4; i++) {
      labels.push(`Semana ${i}`);
      values.push(Math.floor(Math.random() * 30) + 15);
    }
  } else {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    for (let i = 0; i < 12; i++) {
      labels.push(months[i]);
      values.push(Math.floor(Math.random() * 100) + 50);
    }
  }
  
  return { labels, values };
};

const generateDeckPerformance = () => {
  const decks = [
    { id: 'bio-101', name: 'Biologia Celular', color: '#4CAF50' },
    { id: 'chem-101', name: 'Química Orgânica', color: '#9C27B0' },
    { id: 'math-101', name: 'Cálculo I', color: '#2196F3' },
    { id: 'hist-101', name: 'História Moderna', color: '#FF9800' }
  ];
  
  return decks.map(deck => ({
    ...deck,
    mastery: Math.floor(Math.random() * 50) + 50
  }));
};
