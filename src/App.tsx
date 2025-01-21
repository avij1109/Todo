import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase configuration
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App = () => {
  const [user, setUser] = useState<any>(null); // Track login state

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="logo">
          Todo
        </Link>
        <div className="nav-items">
          {user ? (
            <>
              <span className="username">Hello, {user.displayName || user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn">Signup</Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
