// AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provider do AuthContext
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Tenta carregar o usuário salvo no localStorage
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Função de login
  const login = async (email, password) => {
    try {
      // Simulação de login com verificação de localStorage
      const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

      const user = savedUsers.find(u => u.email === email && u.password === password);

      if (user) {
        setCurrentUser(user); // Usuário encontrado e logado
        localStorage.setItem('currentUser', JSON.stringify(user)); // Salva o usuário no localStorage
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro no login');
    }
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Função para registrar novo usuário
  const register = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o usuário já existe
    if (savedUsers.some(u => u.email === email)) {
      throw new Error('Usuário já existe');
    }

    const newUser = { email, password };
    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    return newUser;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => useContext(AuthContext);
