import React from 'react';
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
        <li>Create New Task</li>
        <li>View All Tasks</li>
      </ul>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
};

export default Sidebar;
