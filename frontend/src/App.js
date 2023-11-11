// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StoryList from './components/StoryList/StoryList';
import CategoryList from './components/CategoryList/CategoryList';
import AdBanner from './components/AdBanner/AdBanner';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';

function App() {
  const { dispatch } = useAuth(); // Use the useAuth hook

  const handleLogin = (userRole) => {
    dispatch({ type: 'LOGIN', payload: userRole });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Router>
      <div className="App">
        <Header onLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <main>
              <CategoryList />
              <StoryList />
            </main>
          </Route>
          <Route path="/story/:id" component={StoryDisplay} />
          <Route path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/signup" component={SignupForm} />
          {/* Other routes */}
        </Switch>
        <AdBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
