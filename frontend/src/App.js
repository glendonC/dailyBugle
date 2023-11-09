import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StoryList from './components/StoryList/StoryList';
import CategoryList from './components/CategoryList/CategoryList';
import AdBanner from './components/AdBanner/AdBanner';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import LoginForm from './components/LoginForm/LoginForm'; // Import the LoginForm
import SignupForm from './components/SignupForm/SignupForm'; // Import the SignupForm

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (authData) => {
    // Assuming authData contains information about successful login
    setIsAuthenticated(true);
  };
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <main>
              {isAuthenticated ? (
                <>
                  <CategoryList />
                  <StoryList />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </main>
          </Route>
          <Route path="/story/:id" component={StoryDisplay} />
          <Route path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <SignupForm /> {/* Add this route for SignupForm */}
          </Route>
          {/* Add other routes here */}
        </Switch>
        <AdBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
