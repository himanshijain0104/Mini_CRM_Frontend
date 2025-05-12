import React, { useState } from 'react';
import axiosInstance from '../services/axios.js';
import '../CSS/CreateCustomerForm.css'; 
import Sidebar from './Sidebar.jsx';
import { useNavigate } from 'react-router-dom';

const CreateCustomerForm = ({ onClose, onCustomerCreated }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    total_spend: '',
    visit_count: '',
    last_visit_date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        last_visit_date: formData.last_visit_date || new Date().toISOString().split('T')[0],
      };
      await axiosInstance.post('/customers', payload);
      onCustomerCreated();
      onClose();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <>
    <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    
      <div className="modal-content" style={{margin:'auto',height:"80%",overflow:'auto'}}>
        <h3>Create New Customer</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="total_spend" placeholder="Total Spend" value={formData.total_spend} onChange={handleChange} required />
          <input name="visit_count" placeholder="Visit Count" value={formData.visit_count} onChange={handleChange} required />
          <input type="date" name="last_visit_date" value={formData.last_visit_date} onChange={handleChange} />
          <div className="form-buttons">
            <button type="submit" onClick={()=>navigate('/customers')}>Create</button>
            <button type="button" onClick={()=>navigate('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    
    </div>
    </>
  );
};

export default CreateCustomerForm;
