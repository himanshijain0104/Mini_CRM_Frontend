import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Segments from './Segments';

const Sidebar = () => {
    
  return (
    <div className="sidebar">
      <h2>📊 CRM</h2>
      <ul>
        <Link to="/dashboard" ><li className={`${window.location.pathname==='/dashboard' && 'activeNav'}`}>Dashboard</li></Link>
        <Link to="/customers"><li className={`${(window.location.pathname==='/customers'|| window.location.pathname==='/customers-form') && 'activeNav'}`}>Customers</li></Link>
        <Link to="/orders"><li className={`${(window.location.pathname==='/orders' || window.location.pathname==='/orders-form') && 'activeNav'}`}>Orders</li></Link>
        <Link to="/campaigns"><li className={`${(window.location.pathname==='/campaigns' || window.location.pathname==='/create-campaign' || window.location.pathname.includes('/campaign-history')) && 'activeNav'}`}>Campaigns</li></Link>
        <Link to="/segments"><li className={`${(window.location.pathname==='/segments' || window.location.pathname==='/create-segment') && 'activeNav'}`}>Segments</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
