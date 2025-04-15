import { useAuth } from '../../contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Meu Perfil</h1>
      <div className="profile-info">
        <p>Nome: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Curso: {user?.course?.name}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
