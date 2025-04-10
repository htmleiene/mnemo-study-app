import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <i className="fas fa-home"></i>
        <span>Início</span>
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <i className="fas fa-book"></i>
        <span>Cursos</span>
      </NavLink>
      <NavLink to="/study" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <i className="fas fa-graduation-cap"></i>
        <span>Estudar</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <i className="fas fa-chart-line"></i>
        <span>Progresso</span>
      </NavLink>
      <div className="nav-item" onClick={signOut}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </div>
    </nav>
  );
};

export default NavBar;