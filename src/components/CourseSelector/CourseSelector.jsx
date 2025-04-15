import { useState, useEffect } from 'react';
import { getUniversities, getCoursesByUniversity } from '../../services/courses';
import './CourseSelector.css';

const CourseSelector = ({ onSelect }) => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true);
      const data = await getUniversities();
      setUniversities(data);
      setIsLoading(false);
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      const fetchCourses = async () => {
        setIsLoading(true);
        const data = await getCoursesByUniversity(selectedUniversity);
        setCourses(data);
        setIsLoading(false);
      };
      fetchCourses();
    }
  }, [selectedUniversity]);

  const handleCourseSelect = (course) => {
    onSelect({
      university: universities.find(u => u.id === selectedUniversity)?.name,
      ...course
    });
  };

  return (
    <div className="course-selector">
      <div className="form-group">
        <label>Universidade</label>
        <select 
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Selecione uma universidade</option>
          {universities.map(university => (
            <option key={university.id} value={university.id}>
              {university.name}
            </option>
          ))}
        </select>
      </div>

      {selectedUniversity && (
        <div className="form-group">
          <label>Curso</label>
          {isLoading ? (
            <p>Carregando cursos...</p>
          ) : (
            <div className="courses-list">
              {courses.map(course => (
                <div 
                  key={course.id}
                  className="course-card"
                  onClick={() => handleCourseSelect(course)}
                >
                  <div className="course-icon">
                    <i className={`fas ${course.icon || 'fa-graduation-cap'}`}></i>
                  </div>
                  <div className="course-info">
                    <h3>{course.name}</h3>
                    <p>{course.duration} semestres</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSelector;
