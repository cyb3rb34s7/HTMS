import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout Components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import AIAssistant from './pages/AIAssistant';
import TeamPulse from './pages/TeamPulse';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectSettings from './pages/ProjectSettings';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="tasks/:taskId" element={<TaskDetail />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="team-pulse" element={<TeamPulse />} />
              <Route path="project-settings" element={<ProjectSettings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
