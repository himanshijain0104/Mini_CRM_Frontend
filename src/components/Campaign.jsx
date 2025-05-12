import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';
import '../CSS/Campaign.css';
import Sidebar from './Sidebar';

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error('Error fetching campaigns:', err));
  }, []);
  const sendMessage = async(campaign)=> {
    const obj = {
      campaign_id: campaign.id,
      messageTemplate: campaign.message_template,
      segment_id: campaign.segment_id,
    }
    await axiosInstance.post('/campaigns/sendMessage', obj)
      .then(res => {
        alert('Message sent successfully!');
        // navigate('/campaigns');
      })
      .catch(err => {
        alert('Error sending message');
        console.error(err);
      });
  }
  return (
    <>
    <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    <div className="campaign-container" style={{margin:'auto',height:"80%",overflow:'auto'}}>
      <div className="campaign-header">
        <h2>📢 Campaigns</h2>
        <button className="create-campaign-btn" onClick={() => navigate('/create-campaign')}>
        ➕ Create Campaign
        </button>
      </div>

      <table className="campaign-table" id="campaign-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Segment ID</th>
            <th>Message Template</th>
            <th>Audience Size</th>
            <th>Created By</th>
            <th>Actions</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c,index) => (
            <tr key={c.id}>
              <td>{index+1}</td>
              <td>{c.name}</td>
              <td>{c.segment_id}</td>
              <td>{c.message_template}</td>
              <td>{c.audience_size}</td>
              <td>{c.created_by}</td>
              <td><button className="create-campaign-btn" onClick={()=>sendMessage(c)}>Send Message</button></td>
              <td><button className="create-campaign-btn" onClick={()=>navigate(`/campaign-history/${c.id}`)}>View History</button></td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default Campaign;
