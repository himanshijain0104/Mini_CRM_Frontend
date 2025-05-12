import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import '../CSS/OrderForm.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ onClose, onOrderCreated }) => {
  const Navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: '',
    amount: '',
    status: 'Placed',
  });

  const statusOptions = ['Completed', 'In Transit', 'Shipped', 'Placed', 'Cancelled'];

  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/customers/idname')
      .then(res => setCustomers(res.data))
      .catch(err => {
        console.error('Error loading customers:', err);
        setError('Failed to load customers');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/orders', formData);
      alert('Order created successfully!');
      setFormData({
        customer_id: '',
        order_date: '',
        amount: '',
        status: 'Placed',
      });
      if (onOrderCreated) onOrderCreated();
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError('Error creating order');
    }
  };

  return (
    <>
    <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    
      <div className="order-form-container" style={{margin:'auto',height:"80%",overflow:'auto'}}>
        <h2>Create Order</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Customer:
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label>
            Order Date:
            <input
              type="date"
              name="order_date"
              value={formData.order_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Amount:
            <input
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          {error && <p className="order-form-error">{error}</p>}

          <div className="order-form-actions">
            <button type="submit">Create Order</button>
            
              <button type="button" className="cancel-btn" onClick={()=>Navigate('/orders')}>
                Cancel
              </button>
           
          </div>
        </form>
      </div>
    
    </div>
    </>
  );
};

export default OrderForm;
