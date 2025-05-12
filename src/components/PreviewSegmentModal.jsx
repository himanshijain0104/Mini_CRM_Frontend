import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../services/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../CSS/PreviewSegmentModal.css';

const PreviewSegmentModal = ({ segmentName, rule, onClose }) => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await axiosInstance.post('/segment-preview', rule);
        setCustomers(res.data.preview || []);
      } catch (err) {
        console.error('Preview error:', err);
      }
    };

    fetchPreview();
    console.log(user)
  }, [rule]); // rerun preview if rule changes

  const handleCreateSegment = async () => {
    try {
      await axiosInstance.post('/segments', {
        name: segmentName,
        rules: rule,
        audience_size: customers.length,
        created_by: user?.name || 'Unknown',
      });
      onClose();
      navigate('/segments');
    } catch (err) {
      console.error('Creation error:', err);
    }
  };

  const getRuleText = () => {
    return `Customers whose total_spend ${rule.spendOperator} ${rule.total_spend} ${rule.logicalOperator} visit_count ${rule.visitsOperator} ${rule.visit_count}`;
  };

  return (
    <div className="modal-backdrop">
      <div className="preview-modal-content">
        <div className="modal-header">
          <h2>Segment Preview</h2>
        </div>
        
        <div className="modal-info">
          <p><strong>Name:</strong> {segmentName}</p>
          <p><strong>Rule:</strong> {getRuleText()}</p>
          <p><strong>Audience Size:</strong> {customers.length}</p>
        </div>

        <div className="modal-table-container">
          {customers.length > 0 ? (
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Total Spend</th>
                  <th>Visit Count</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td className="rule-match">{c.total_spend}</td>
                    <td className="rule-match">{c.visit_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="modal-empty">
              No customers match these criteria
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-button modal-button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-button-create" onClick={handleCreateSegment}>
            Create Segment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewSegmentModal;