import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './RegisterPage.css'; // Estilos específicos para registro

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studyPurpose: '',
    university: '',
    course: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const courses = [
    {
      id: 'medicina',
      name: 'Medicina',
      university: 'Universidade de São Paulo (USP)',
      icon: 'fa-user-md'
    },
    {
      id: 'direito',
      name: 'Direito',
      university: 'Universidade Federal do Rio de Janeiro (UFRJ)',
      icon: 'fa-gavel'
    },
    {
      id: 'engenharia',
      name: 'Engenharia Civil',
      university: 'Universidade Estadual de Campinas (UNICAMP)',
      icon: 'fa-cogs'
    },
    {
      id: 'computacao',
      name: 'Ciência da Computação',
      university: 'Universidade Federal de Minas Gerais (UFMG)',
      icon: 'fa-laptop-code'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'studyPurpose') {
      setFormData(prev => ({
        ...prev,
        university: '',
        course: ''
      }));
    }
  };

  const handleCourseSelect = (course, university) => {
    setFormData(prev => ({
      ...prev,
      course,
      university
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!formData.studyPurpose) newErrors.studyPurpose = 'Selecione um objetivo';
    if (formData.studyPurpose === 'university' && !formData.course) newErrors.course = 'Selecione um curso';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        {
          studyPurpose: formData.studyPurpose,
          university: formData.university,
          course: formData.course
        }
      );
      navigate('/');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <img src="/logo.png" alt="MNemo Logo" className="register-logo" />
        <h1>Crie sua conta</h1>
        <p>Personalize sua experiência de estudo</p>
      </div>

      <div className="register-form">
        {errors.general && (
          <div className="register-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Digite seu nome"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Digite seu e-mail"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Crie uma senha"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Você está estudando para:</label>
            <select
              name="studyPurpose"
              value={formData.studyPurpose}
              onChange={handleChange}
              className={`form-control ${errors.studyPurpose ? 'error' : ''}`}
            >
              <option value="">Selecione uma opção</option>
              <option value="university">Faculdade/Universidade</option>
              <option value="school">Ensino Médio</option>
              <option value="concurso">Concurso Público</option>
              <option value="certification">Certificação Profissional</option>
              <option value="other">Outro</option>
            </select>
            {errors.studyPurpose && (
              <span className="error-message">{errors.studyPurpose}</span>
            )}
          </div>

          {formData.studyPurpose === 'university' && (
            <div className="form-group">
              <div className="course-selection">
                <p className="course-selection-title">Selecione seu curso:</p>
                <div className="courses-grid">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`course-option ${
                        formData.course === course.name ? 'selected' : ''
                      }`}
                      onClick={() => handleCourseSelect(course.name, course.university)}
                    >
                      <div className="course-icon">
                        <i className={`fas ${course.icon}`}></i>
                      </div>
                      <div className="course-info">
                        <h3>{course.name}</h3>
                        <p>{course.university}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.course && (
                  <span className="error-message">{errors.course}</span>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Criando conta...
              </>
            ) : (
              'Criar conta'
            )}
          </button>
        </form>

        <div className="register-footer">
          Já tem uma conta? <a href="/login">Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;