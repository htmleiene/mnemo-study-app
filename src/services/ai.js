export const getSpacedRepetitionSchedule = (reviewsCount, difficulty) => {
    // Algoritmo SM-2 modificado
    const intervals = [
      1,    // Primeira revisão: 1 dia
      3,    // Segunda revisão: 3 dias
      7,    // Terceira revisão: 1 semana
      16,   // Quarta revisão: ~2 semanas
      35    // Quinta revisão: ~1 mês
    ];
    
    const difficultyWeights = [0.5, 0.7, 1, 1.3, 1.5];
    const weight = difficultyWeights[difficulty - 1] || 1;
    
    const interval = reviewsCount < intervals.length 
      ? intervals[reviewsCount] 
      : intervals[intervals.length - 1] * Math.pow(2, reviewsCount - intervals.length);
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + Math.round(interval * weight));
    
    return nextDate;
  };
  
  export const generateStudyPlan = (user) => {
    const { course, performance } = user;
    const today = new Date();
    
    // Simulação - na prática isso viria de uma API de IA
    return {
      priorityDecks: course.curriculum
        .filter(subject => 
          !performance?.masteredDecks?.includes(subject.deckId))
        .sort((a, b) => a.semester - b.semester)
        .slice(0, 3)
        .map(subject => subject.deckId),
      suggestedSchedule: {
        [today.toISOString().split('T')[0]]: [
          { deckId: 'biology-101', duration: 30 },
          { deckId: 'math-101', duration: 45 }
        ]
      },
      estimatedMastery: {
        weeklyGoal: 15,
        projectedMasteryDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 30
        )
      }
    };
  };
  
  export const fetchAIExplanation = async (concept) => {
    // Simulação - na prática chamaria uma API como OpenAI
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          explanation: `A IA explica que "${concept}" é um conceito fundamental que...`,
          relatedConcepts: ['Concept A', 'Concept B'],
          mnemonics: ['Mnemônico 1', 'Mnemônico 2']
        });
      }, 1000);
    });
  };
