import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import ReaderView from './components/ReaderView/ReaderView';
import AuthorView from './components/AuthorView/AuthorView';
import UnauthenticatedView from './components/UnauthenticatedView/UnauthenticatedView';


function App() {
  const { auth, dispatch } = useAuth();

  const handleLogin = (loginResponse) => {
    dispatch({ 
        type: 'LOGIN', 
        payload: {
            userId: loginResponse.userId,
            username: loginResponse.username,
            userRole: loginResponse.userRole
        }
    });
  };

  const onSignup = (signupResponse) => {
    console.log("Signup successful:", signupResponse);
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
            {auth.isAuthenticated ? (
              auth.userRole === 'reader' ? <Redirect to="/reader-view" /> : <Redirect to="/author-view" />
            ) : (
              <UnauthenticatedView />
            )}
          </Route>
          <Route path="/reader-view" component={ReaderView} />
          <Route path="/author-view" component={AuthorView} />
          <Route path="/story/:id" component={StoryDisplay} />
          <Route path="/login" render={(props) => <LoginForm onLogin={handleLogin} {...props} />} />
          <Route path="/signup" render={(props) => <SignupForm onSignup={onSignup} {...props} />} />
          {}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
