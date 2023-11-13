import React from 'react';
import { AuthProvider } from './AuthContext';
import App from './App';

function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Main;
