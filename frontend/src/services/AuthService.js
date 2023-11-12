const AuthService = {
    signup: async (username, email, password, role) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      };
  
      try {
        const response = await fetch('http://localhost:5001/api/signup', requestOptions);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error signing up');
        }
        return data;
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      }
    },
    login: async (username, password) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      };
  
      try {
        const response = await fetch('http://localhost:5001/api/login', requestOptions);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  };
  
  export default AuthService;
  