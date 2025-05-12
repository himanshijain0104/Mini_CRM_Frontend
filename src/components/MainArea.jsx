import React, { useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const MainArea = ({ user, customers, orders, campaigns }) => {
    const [orderData, setOrderData] = React.useState([]);
    useEffect(()=> {
        const orderData = orders.reduce((acc, order) => {
            const date = new Date(order.order_date).toLocaleDateString();
            const existing = acc.find(entry => entry.name === date);
          
            if (existing) {
              existing.count += 1;
            } else {
              acc.push({ name: date, count: 1 });
            }
          
            return acc;
          }, []);
          
          console.log(orderData);
          setOrderData(orderData);
    },[orders])
  return (
    <div className="main-area">
      <h1>Welcome {user?.name || 'User'} 👋</h1>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card neon-green">
          <h3>Customers</h3>
          <p>{customers.length}</p>
        </div>
        <div className="stat-card neon-blue">
          <h3>Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="stat-card neon-purple">
          <h3>Campaigns</h3>
          <p>{campaigns.length}</p>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="chart-section">
        <h2>📈 Orders Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
  <LineChart data={orderData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="count" stroke="#00ffcc" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>

      </div>

      {/* Customers */}
      <div className="dashboard-section">
        <h2>👥 Customers</h2>
        {customers.length ? (
          <ul>
            {customers.map(customer => (
              <li key={customer.id}>{customer.name} - {customer.email}</li>
            ))}
          </ul>
        ) : <p>No customers found.</p>}
      </div>

      {/* Orders */}
      <div className="dashboard-section">
        <h2>📦 Orders</h2>
        {orders.length ? (
          <ul>
            {orders.map(order => (
              <li key={order.id}>Order ID: {order.id} - ₹{order.amount}</li>
            ))}
          </ul>
        ) : <p>No orders found.</p>}
      </div>

      {/* Campaigns */}
      <div className="dashboard-section">
        <h2>📢 Campaigns</h2>
        {campaigns.length ? (
          <ul>
            {campaigns.map(campaign => (
              <li key={campaign.id}>{campaign.name} - {campaign.message_template}</li>
            ))}
          </ul>
        ) : <p>No campaigns found.</p>}
      </div>
    </div>
  );
};

export default MainArea;
