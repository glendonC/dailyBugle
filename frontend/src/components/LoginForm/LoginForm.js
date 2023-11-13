import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { TextField, Button, Container, Box } from '@mui/material';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      console.log("Login response:", response);
      if (response.success) {
        onLogin(response);
        history.push('/');
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
