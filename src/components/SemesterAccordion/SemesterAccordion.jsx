import { useState } from 'react';
import SubjectItem from '../SubjectItem/SubjectItem';
import './SemesterAccordion.css';

const SemesterAccordion = ({ semester, subjects, isExpanded, onToggle }) => {
  return (
    <div className={`semester-accordion ${isExpanded ? 'expanded' : ''}`}>
      <div className="semester-header" onClick={() => onToggle(semester)}>
        <h3>{semester}º Semestre</h3>
        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </div>
      {isExpanded && (
        <div className="subjects-list">
          {subjects.map(subject => (
            <SubjectItem key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SemesterAccordion;
