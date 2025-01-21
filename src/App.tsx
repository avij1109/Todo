import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirect
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateTask from './components/tasks/CreateTask';
import ViewTasks from './components/tasks/ViewTasks';
import './App.css'; // Importing global CSS

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  const addTask = (task: any) => {
    setTasks([...tasks, task]);
  };

  return (
    <Router>
      <Header />
      {/* Render Sidebar only if the user is logged in */}
      {user && (
        <Sidebar
          username={user.displayName || user.email}
          onLogout={handleSignOut}
        />
      )}
      
      <div className="auth-container">
        {user ? (
          <div className="user-info">
            <p>Welcome, {user.displayName || user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => (window.location.href = '/login')}>Login</button>
            <button onClick={() => (window.location.href = '/signup')}>Signup</button>
          </div>
        )}
      </div>

      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protect Task Routes: Only accessible if logged in */}
        <Route
          path="/create-task"
          element={user ? <CreateTask onAddTask={addTask} /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-tasks"
          element={user ? <ViewTasks tasks={tasks} /> : <Navigate to="/login" />}
        />

        {/* Redirect to the tasks page or home page if already logged in */}
        <Route
          path="/"
          element={user ? <Navigate to="/view-tasks" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
