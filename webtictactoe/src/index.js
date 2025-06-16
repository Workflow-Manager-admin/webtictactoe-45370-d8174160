import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Defensive: If PUBLIC_URL is referenced, use process.env.PUBLIC_URL;
// (In case templating requires it - not used directly here, but added for robustness)
window.PUBLIC_URL = process.env.PUBLIC_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
