import type React from "react"
import { Link } from "react-router-dom"
import A from "../../assets/A.png"
import "./Header.css"

interface HeaderProps {
  user: any // User object to check if the user is logged in
  onLogout: () => void // Function to handle sign out
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <div className="bar">
      <img src={A || "/placeholder.svg"} className="logo" alt="Logo" />
      <nav className="nav-bar">
        <Link to="/">TODO</Link>
      </nav>

      <div className="buttons">
        {/* Conditionally render buttons based on whether the user is logged in */}
        {user ? (
          // If user is logged in, show Sign Out button
          <button className="btnn" onClick={onLogout}>
            Sign Out
          </button>
        ) : (
          // If no user, show Login and Signup buttons
          <>
            <Link to="/login">
              <button className="btnn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btnn">Signup</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header

