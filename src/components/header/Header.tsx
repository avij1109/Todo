import React from 'react'
import A from '../../assets/A.png'; 
import './Header.css'
const Header = () => {
  return (
    <div className='bar'>
        <img src={A} className='logo' alt="" />
        <nav className='nav-bar'>
            <a href="/">Todo</a>
            <a href="">Home</a>

        </nav>
        <button className='btnn'>login</button>
        <button className='btnn'>signup</button>
    </div>
  )
}

export default Header