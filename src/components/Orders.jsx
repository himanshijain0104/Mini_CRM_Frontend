import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import OrderForm from './OrderForm';
import '../CSS/Orders.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
    <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    <div className="orders-page" style={{margin:'auto',height:"80%",overflow:'auto'}}>
      <div className="orders-header">
        <h2>📦 Orders</h2>
        <button className="create-order-btn" onClick={() => navigate('/orders-form')}>
          ➕ Create Order
        </button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>New Total Spend</th>
            <th>New Visit Count</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={`order-${order.id}`}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.newTotalSpend}</td>
              <td>{order.newVisitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {showForm && (
        <OrderForm
          onClose={() => setShowForm(false)}
          onOrderCreated={fetchOrders}
        />
      )} */}
    </div>
    </div>
    </>
  );
};

export default Orders;
