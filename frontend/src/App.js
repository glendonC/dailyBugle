import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StoryList from './components/StoryList/StoryList';
import CategoryList from './components/CategoryList/CategoryList';
import AdBanner from './components/AdBanner/AdBanner';
import StoryDisplay from './components/StoryDisplay/StoryDisplay'; // Assume you have this component


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <main>
              <CategoryList />
              <StoryList />
            </main>
          </Route>
          <Route path="/story/:id" component={StoryDisplay} />
          {/* Add other routes here */}
        </Switch>
        <AdBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
