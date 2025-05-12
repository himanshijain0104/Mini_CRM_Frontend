import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar'; 
import '../CSS/Segments.css';

const Segments = () => {
  const [segments, setSegments] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await axiosInstance.get('/segments');
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const interpretRules = (rule) => {
    return `Customers whose total_spend ${rule.spendOperator} ${rule.total_spend} ${rule.logicalOperator.toLowerCase()} visit_count ${rule.visitsOperator} ${rule.visit_count}`;

  };

  return (
    <>
      <div
        className="main"
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '20%' }}>
          <Sidebar />
        </div>

        <div className="segments-container" style={{ width: '80%', padding: '2rem', overflowY: 'auto' }}>
          <div className="segments-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>💡 Segments</h2>
            <button className="create-segment-button" onClick={() => navigate('/create-segment')}>
            ➕ Create Segment
            </button>
          </div>

          <table className="segments-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name of Segment</th>
                <th>Rules</th>
                <th>Created By</th>
                <th>Audience Size</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment, index) => (
                <tr key={segment.id}>
                  <td>{index + 1}</td>
                  <td>{segment.name}</td>
                  <td>{interpretRules(segment.rules)}</td>
                  <td>{segment.created_by || user?.name || 'Unknown'}</td>
                  <td>{segment.audience_size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Segments;
