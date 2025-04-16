
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/Home/HomePage';
import StudyPage from './pages/Study/StudyPage';
import CoursesPage from './pages/Courses/CoursesPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  const { currentUser } = useAuth(); // Certifique-se de que você está pegando 'currentUser' aqui

  return (
    <Router>
      <Routes>
        {/* Página de Login: Se o usuário já estiver logado, redireciona para a home */}
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />

        {/* Página de Registro: Se o usuário já estiver logado, redireciona para a home */}
        <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/" />} />

        {/* Página Inicial (Home): Se o usuário não estiver logado, redireciona para o login */}
        <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />

        {/* Página de Estudo (Study): Se o usuário não estiver logado, redireciona para o login */}
        <Route path="/study/:deckId" element={currentUser ? <StudyPage /> : <Navigate to="/login" />} />
        <Route path="/study" element={currentUser ? <StudyPage /> : <Navigate to="/login" />} />

        {/* Página de Cursos: Se o usuário não estiver logado, redireciona para o login */}
        <Route path="/courses" element={currentUser ? <CoursesPage /> : <Navigate to="/login" />} />

        {/* Página de Perfil: Se o usuário não estiver logado, redireciona para o login */}
        <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />

        {/* Página de Análises: Se o usuário não estiver logado, redireciona para o login */}
        <Route path="/analytics" element={currentUser ? <AnalyticsPage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Exibe o NavBar apenas se o usuário estiver logado */}
      {currentUser && <NavBar />}
    </Router>
  );
}

export default App;
