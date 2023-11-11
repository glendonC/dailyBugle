import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

const SignupForm = ({ onSignup }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          // Include the role in the signup request
          const response = await AuthService.signup(username, email, password, role);
          if (response.success) {
              onSignup(response);
              // Redirect or show success message
          } else {
              // Handle unsuccessful signup
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
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="reader">Reader</option>
                    <option value="author">Author</option>
                </select>
            </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
