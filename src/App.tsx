import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase configuration
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase auth methods
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState<any>(null); // To track user login state

  useEffect(() => {
    // Check for user authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // If user is logged in, set user data
      } else {
        setUser(null); // If no user, reset state
      }
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Reset user state
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <Router>
      <Header />
      {/* Render Sidebar only if the user is logged in */}
      {user && (
        <Sidebar
          username={user.displayName || user.email} // Pass username
          onLogout={handleSignOut} // Pass logout handler
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
