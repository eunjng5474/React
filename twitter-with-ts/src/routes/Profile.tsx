import { authService } from '../fbase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };
  const navigate = useNavigate();

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
