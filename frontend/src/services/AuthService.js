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
          // If the response status code is not OK, throw an error with the message from the response
          throw new Error(data.message || 'Error signing up');
        }
        return data; // Return the data if signup was successful
      } catch (error) {
        // Log the error to the console for debugging
        console.error('Signup error:', error);
        throw error; // Re-throw the error to be handled by the component
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
          // If the response status code is not OK, throw an error with the message from the response
          throw new Error(data.message || 'Login failed');
        }
        return data; // Return the data if login was successful
      } catch (error) {
        // Log the error to the console for debugging
        console.error('Login error:', error);
        throw error; // Re-throw the error to be handled by the component
      }
    }
  };
  
  export default AuthService;
  