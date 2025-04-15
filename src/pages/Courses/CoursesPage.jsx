import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CourseSelector from '../../components/CourseSelector/CourseSelector';
import './CoursesPage.css';

const CoursesPage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleCourseSelect = (course) => {
    console.log('Curso selecionado:', course);
    setIsEditing(false);
  };

  return (
    <div className="courses-page">
      <h1>Meu Curso</h1>
      {isEditing ? (
        <CourseSelector onSelect={handleCourseSelect} />
      ) : (
        <div>
          <p>Você está matriculado em: {user?.course?.name}</p>
          <button onClick={() => setIsEditing(true)}>
            Alterar Curso
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
