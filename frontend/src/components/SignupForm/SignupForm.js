import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuth } from '../../AuthContext';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Box } from '@mui/material';

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
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="reader">Reader</MenuItem>
              <MenuItem value="author">Author</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupForm;
