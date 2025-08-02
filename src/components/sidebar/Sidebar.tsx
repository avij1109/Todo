import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  username: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ username, onLogout }) => {
  return (
    <div className="velocity-sidebar">
      <div className="sidebar-header">
        <h3>Welcome, {username}</h3>
        <p className="sidebar-subtitle">Manage your tasks efficiently</p>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4>Task Management</h4>
          <ul>
            <li>
              <Link to="/dashboard" className="nav-link">
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/create-task" className="nav-link">
                <span className="nav-icon">➕</span>
                Create Task
              </Link>
            </li>
            <li>
              <Link to="/view-tasks" className="nav-link">
                <span className="nav-icon">📋</span>
                View Tasks
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h4>Tools</h4>
          <ul>
            <li>
              <Link to="/calendar" className="nav-link">
                <span className="nav-icon">📅</span>
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="nav-link">
                <span className="nav-icon">📈</span>
                Analytics
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-button">
          <span className="nav-icon">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
