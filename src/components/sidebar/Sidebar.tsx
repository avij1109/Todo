import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Sidebar.css';

interface SidebarProps {
  username: string; // User's display name or email
  onLogout: () => void; // Logout handler
}

const Sidebar: React.FC<SidebarProps> = ({ username, onLogout }) => {
  return (
    <div className="sidebar">
      <h3>Welcome, {username}</h3>
      <ul>
        {/* Use Link for navigation */}
        <li>
          <Link to="/create-task">Create New Task</Link>
        </li>
        <li>
          <Link to="/view-tasks">View All Tasks</Link>
        </li>
      </ul>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
};

export default Sidebar;
