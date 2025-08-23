import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import './styles/fade-in.css';
import App from './App.jsx'

// Set initial styles for the document
document.documentElement.style.backgroundColor = '#000';
document.documentElement.style.transition = 'background-color 0.8s ease';

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// After the app is mounted, update the background
const root = document.documentElement;
setTimeout(() => {
  root.style.backgroundColor = 'transparent';
}, 100);
