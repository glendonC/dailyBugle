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
      console.log("Login response:", response);
      if (response.success) {
        const userRole = response.userRole; // Replace with the actual property name from the response
        onLogin(userRole); // Pass the user role to onLogin
        history.push('/'); // Redirect to the home route
      } else {
        // Handle unsuccessful login
      }
    } catch (error) {
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
