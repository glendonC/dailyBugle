import React from 'react';
import { useHistory } from 'react-router-dom'; // If you are using react-router

const Header = () => {
  const history = useHistory();

  const handleSignout = () => {
    // Clear authentication tokens or session data here
    localStorage.removeItem('token'); // Example if you're using localStorage

    // Redirect to login page or home page
    history.push('/login');
  };

  return (
    <div>
      Your Header Markup Here
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Header;
