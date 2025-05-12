import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../CSS/Navbar.css';

const Navbar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logs out the user by clearing the auth token cookie, resetting user state, and redirecting to login page
    document.cookie = 'token=; Max-Age=0';
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Mini CRM  </div>
      <div className="nav-links">
      <NavLink
  to="/home"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  Home
</NavLink>
<NavLink
  to="/dashboard"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  Dashboard
</NavLink>

        
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
