import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { FormModalContextProvider } from './context/FormModalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormModalContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </FormModalContextProvider>
  </React.StrictMode>
);
