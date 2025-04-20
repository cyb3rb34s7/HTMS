import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Configure axios to use the token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // In a real implementation, we would verify the token with the server
          // For MVP, we'll just check if there's user data in localStorage
          const userData = localStorage.getItem('user');
          if (userData) {
            setCurrentUser(JSON.parse(userData));
          } else {
            // If no user data but token exists, we should logout
            logout();
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      // In a real implementation, this would call the backend API
      // For MVP, we'll simulate a successful login
      const response = {
        data: {
          user: {
            id: '1',
            name: 'Sarah Johnson',
            email: email,
            role: 'developer'
          },
          token: 'mock-jwt-token'
        }
      };
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setToken(response.data.token);
      setCurrentUser(response.data.user);
      
      // Configure axios for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      setLoading(true);
      setError('');
      
      // In a real implementation, this would call the backend API
      // For MVP, we'll simulate a successful registration
      const response = {
        data: {
          user: {
            id: '1',
            name: name,
            email: email,
            role: role || 'developer'
          },
          token: 'mock-jwt-token'
        }
      };
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setToken(response.data.token);
      setCurrentUser(response.data.user);
      
      // Configure axios for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to register');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
