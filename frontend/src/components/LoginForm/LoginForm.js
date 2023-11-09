import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import AuthService from '../../services/AuthService';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Create the history instance

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      onLogin(response); // This should set the authentication state
      history.push('/'); // Redirect to the home route
    } catch (error) {
      // Handle errors, such as displaying a message to the user
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
