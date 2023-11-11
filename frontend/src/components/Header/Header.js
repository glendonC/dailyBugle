import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Header = () => {
  const history = useHistory();
  const { auth, dispatch } = useAuth();

  const handleSignout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token'); // If using tokens
    history.push('/login');
  };
  console.log("Auth state in header:", auth);
  return (
    <div>
        {auth.isAuthenticated ? (
            <>
                <span>Welcome, {auth.username}</span> {}
                <button onClick={handleSignout}>Sign Out</button>
            </>
        ) : (
            <span>Your Header Markup Here</span>
        )}
    </div>
);
};

export default Header;
