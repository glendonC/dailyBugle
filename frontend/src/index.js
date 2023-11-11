// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

// Use createRoot to render the application
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
