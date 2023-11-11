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
import ReaderView from './components/ReaderView/ReaderView';
import AuthorView from './components/AuthorView/AuthorView';

function App() {
  const { auth, dispatch } = useAuth(); // Destructure auth and dispatch

  const handleLogin = (loginResponse) => {
    dispatch({ 
        type: 'LOGIN', 
        payload: {
            username: loginResponse.username,
            userRole: loginResponse.userRole
        }
    });
  };

  const onSignup = (signupResponse) => {
    console.log("Signup successful:", signupResponse);
    // Handle signup response
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const getRoleBasedView = () => {
    switch (auth.userRole) {
      case 'reader':
        return <ReaderView />;
      case 'author':
        return <AuthorView />;
      default:
        return <div>Select a role to get started</div>;
    }
  };

  return (
    <Router>
      <div className="App">
        <Header onLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <main>
              {getRoleBasedView()}
            </main>
          </Route>
          <Route path="/story/:id" component={StoryDisplay} />
          <Route path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <SignupForm onSignup={onSignup} />
          </Route>
          {/* Other routes */}
        </Switch>
        <AdBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
