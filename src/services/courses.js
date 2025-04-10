import { getFromStorage, saveToStorage } from '../utils/storage';

const COURSES_KEY = 'app_courses';
const USER_COURSES_KEY = 'user_courses';

// Dados mockados - em produção viriam de uma API
const mockUniversities = [
  {
    id: 'usp',
    name: 'Universidade de São Paulo (USP)',
    courses: [
      { id: 'med-usp', name: 'Medicina', duration: 12, icon: 'fa-user-md' },
      { id: 'comp-usp', name: 'Ciência da Computação', duration: 8, icon: 'fa-laptop-code' }
    ]
  },
  {
    id: 'ufrj',
    name: 'Universidade Federal do Rio de Janeiro (UFRJ)',
    courses: [
      { id: 'dir-ufrj', name: 'Direito', duration: 10, icon: 'fa-gavel' },
      { id: 'eng-ufrj', name: 'Engenharia Civil', duration: 10, icon: 'fa-ruler-combined' }
    ]
  }
];

export const getUniversities = async () => {
  // Em produção: fetch('/api/universities')
  return mockUniversities.map(u => ({ id: u.id, name: u.name }));
};

export const getCoursesByUniversity = async (universityId) => {
  // Em produção: fetch(`/api/universities/${universityId}/courses`)
  const university = mockUniversities.find(u => u.id === universityId);
  return university ? university.courses : [];
};

export const getUserCourse = async (userId) => {
  const userCourses = getFromStorage(USER_COURSES_KEY) || {};
  return userCourses[userId] || null;
};

export const updateUserCourse = async (userId, courseData) => {
  const userCourses = getFromStorage(USER_COURSES_KEY) || {};
  userCourses[userId] = courseData;
  saveToStorage(USER_COURSES_KEY, userCourses);
  return courseData;
};

export const getCourseCurriculum = async (courseId) => {
  // Busca em todas as universidades mockadas
  for (const uni of mockUniversities) {
    const course = uni.courses.find(c => c.id === courseId);
    if (course) {
      // Simulação de grade curricular
      return generateMockCurriculum(courseId);
    }
  }
  return null;
};

const generateMockCurriculum = (courseId) => {
  // Gerar uma grade curricular mockada baseada no curso
  const semesters = courseId.includes('med') ? 12 : 8;
  const curriculum = [];
  
  for (let i = 1; i <= semesters; i++) {
    curriculum.push({
      semester: i,
      subjects: [
        {
          id: `${courseId}-subj${i}-1`,
          name: `Disciplina ${i}.1`,
          credits: 4,
          required: true
        },
        {
          id: `${courseId}-subj${i}-2`,
          name: `Disciplina ${i}.2`,
          credits: 4,
          required: true
        }
      ]
    });
  }
  
  return curriculum;
};