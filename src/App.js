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
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/study/:deckId" element={user ? <StudyPage /> : <Navigate to="/login" />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/courses" element={user ? <CoursesPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={user ? <AnalyticsPage /> : <Navigate to="/login" />} />
      </Routes>
      {user && <NavBar />}
    </Router>
  );
}

export default App;
