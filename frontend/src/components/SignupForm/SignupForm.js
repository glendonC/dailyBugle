import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuth } from '../../AuthContext';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');
  const history = useHistory();
  const { dispatch } = useAuth();

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await AuthService.signup(username, email, password, role);
          if (response.success) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    userId: response.userId,
                    username: response.username,
                    userRole: response.userRole
                }
            });
        
            history.push(role === 'reader' ? '/reader-view' : '/author-view');
        } else {
            console.log('Signup failed:', response.message);
        }
      } catch (error) {
          console.error('Error during signup:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      {}
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
