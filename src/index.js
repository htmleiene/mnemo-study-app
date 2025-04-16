import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Supondo que o seu componente principal seja App
import { AuthProvider } from './contexts/AuthContext'; // Certifique-se de importar o AuthProvider

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
