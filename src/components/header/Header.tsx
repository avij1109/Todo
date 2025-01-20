import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import A from '../../assets/A.png'; 
import './Header.css';

const Header = () => {
  return (
    <div className='bar'>
      <img src={A} className='logo' alt="Logo" />
      <nav className='nav-bar'>
        <Link to="/">Todo</Link> {/* Use Link for navigation */}
        <Link to="/home">Home</Link>
      </nav>
      <div className="buttons">
        {/* Update buttons to navigate to login and signup pages */}
        <Link to="/login">
          <button className='btnn'>Login</button>
        </Link>
        <Link to="/signup">
          <button className='btnn'>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
