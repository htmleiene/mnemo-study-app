import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getStudyPlan } from '../services/ai';

const StudyContext = createContext();

const StudyProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [studyPlan, setStudyPlan] = useState(null);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudyPlan = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const plan = await getStudyPlan(user);
          setStudyPlan(plan);
          setCurrentDeck(plan.priorityDecks[0]);
        } catch (error) {
          console.error('Error loading study plan:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadStudyPlan();
  }, [user]);

  const updateStudyPlan = async () => {
    if (user) {
      const updatedPlan = await getStudyPlan(user);
      setStudyPlan(updatedPlan);
    }
  };

  return (
    <StudyContext.Provider value={{ 
      studyPlan, 
      currentDeck, 
      setCurrentDeck,
      isLoading,
      updateStudyPlan
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export { StudyContext, StudyProvider };