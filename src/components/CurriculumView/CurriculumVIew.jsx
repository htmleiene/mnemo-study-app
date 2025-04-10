import { useState } from 'react';
import SemesterAccordion from '../SemesterAccordion/SemesterAccordion';
import './CurriculumView.css';

const CurriculumView = ({ curriculum }) => {
  const [expandedSemester, setExpandedSemester] = useState(null);

  const toggleSemester = (semester) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  return (
    <div className="curriculum-view">
      {curriculum.map(({ semester, subjects }) => (
        <SemesterAccordion
          key={semester}
          semester={semester}
          subjects={subjects}
          isExpanded={expandedSemester === semester}
          onToggle={toggleSemester}
        />
      ))}
    </div>
  );
};

export default CurriculumView;