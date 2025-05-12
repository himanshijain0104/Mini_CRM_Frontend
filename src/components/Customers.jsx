import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios.js';
import CreateCustomerForm from './CreateCustomerForm';
import '../CSS/Customers.css'; 
import Sidebar from './Sidebar.jsx';
import style from './../../node_modules/dom-helpers/esm/css';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get('/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
    <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    <div className="customers-container" style={{margin:'auto',height:"80%",overflow:'auto'}}>
      <div className="customers-header">
        <h2>👥 Customers</h2>
        <button className="create-button" onClick={() => navigate('/customers-form')}>➕ Create Customer</button>
      </div>

      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Total Spend</th><th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>₹{Number(c.total_spend).toFixed(2)}</td>
              <td>{c.visit_count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <CreateCustomerForm
          onClose={() => setShowForm(false)}
          onCustomerCreated={fetchCustomers}
        />
      )}
    </div>
    </div>
    </>
  );
};

export default Customers;
