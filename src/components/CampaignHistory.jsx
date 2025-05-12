import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axios';
import '../CSS/CampaignHistory.css';
import Sidebar from './Sidebar';

const CampaignHistory = () => {
  const { id } = useParams();
  const [campaignHistory, setCampaignHistory] = useState([]);

  useEffect(() => {
    const fetchCampaignHistory = async () => {
      try {
        const response = await axiosInstance.get(`/logs/${id}`);
        console.log(response.data);
        setCampaignHistory(response.data);
      } catch (error) {
        console.error('Error fetching campaign history:', error);
      }
    };
    fetchCampaignHistory();
  }, [id]);

  return (
    <div className="main" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '20%' }}>
        <Sidebar />
      </div>
      <div className="campaign-history-container" style={{ width: '80%', padding: '20px', overflowY: 'auto' }}>
        <h2>Campaign History - ID {id}</h2>
        <table className="campaign-history-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Campaign Name</th>
              <th>Success Count</th>
              <th>Failure Count</th>
            </tr>
          </thead>
          <tbody>
            {campaignHistory.length === 0 ? (
              <tr>
                <td colSpan="4">No records found</td>
              </tr>
            ) : (
              campaignHistory.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.campaign_name}</td>
                  <td>{log.successCount}</td>
                  <td>{log.failureCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignHistory;
