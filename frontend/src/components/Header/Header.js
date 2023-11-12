import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Header.css';

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
                <span className="username">Welcome, {auth.username}</span> {}
                <button className="sign-out-btn" onClick={handleSignout}>Sign Out</button>
            </>
        ) : (
            <span>Sign up / Log in to see more!</span>
        )}
    </div>
);
};

export default Header;
