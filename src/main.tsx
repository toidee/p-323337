
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';

// Add Poppins font
const poppinsLink = document.createElement('link');
poppinsLink.rel = 'stylesheet';
poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
document.head.appendChild(poppinsLink);

// Apply Poppins font globally
const style = document.createElement('style');
style.textContent = `
  * {
    font-family: 'Poppins', sans-serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
