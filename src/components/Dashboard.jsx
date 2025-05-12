import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import MainArea from '../components/MainArea';
import RightPanel from '../components/RightPanel';

import '../CSS/Dashboard.css';

const Dashboard = () => {
  const { token, user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [customersRes, ordersRes, campaignsRes] = await Promise.all([
          axiosInstance.get('/customers'),
          axiosInstance.get('/orders'),
          axiosInstance.get('/campaigns'),
        ]);
        setCustomers(customersRes.data);
        setOrders(ordersRes.data);
        setCampaigns(campaignsRes.data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="dashboard-container"><p>Loading Dashboard...</p></div>;
  if (error) return <div className="dashboard-container"><p className="error">{error}</p></div>;

  return (
    <div className="dashboard-layout">
        
      <Sidebar />
      <MainArea user={user} customers={customers} orders={orders} campaigns={campaigns} />
      <RightPanel />
    </div>
  );
};

export default Dashboard;
