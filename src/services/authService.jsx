import apiUrl from "./apiService";
import { jwtDecode } from "jwt-decode";

export const authLogin = async (email, password) => {
  try {
    const response = await fetch(apiUrl + '/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      // Armazene o token no localStorage
      localStorage.setItem('token', data.token);
      return data;
    } else if (response.status === 404) {
      throw new Error(response.message || 'Usuário não existe!');
    } else if (response.status === 401) {
      throw new Error(response.message || 'Usuário ou senha incorreta! Tente novamente');
    }
  } catch (error) {
    throw error;
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Retorna true se o token existir
};

export const decodedFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id
  }
  return null;
};

// Função para logout
export const logout = () => {
  localStorage.removeItem('token');
};

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime; // Retorna true se o token expirou
  }
  return true; // Se não há token, considere como expirado
};

export const getWakeUp = async () => {
  const response = await fetch(`${apiUrl}/`)
  
  return response
};