import React, { useState } from 'react';
import PreviewSegmentModal from './PreviewSegmentModal';
import Sidebar from './Sidebar'; 
import '../CSS/CreateSegment.css'; 
import { useNavigate } from 'react-router-dom';

const comparisons = [
  { name: 'Greater than (>)', value: '>' },
  { name: 'Less than (<)', value: '<' },
  { name: 'Greater than or Equal to (>=)', value: '>=' },
  { name: 'Less than or Equal to (<=)', value: '<=' },
  { name: 'Equal to (=)', value: '=' },
];

const logicalOperators = ['AND', 'OR'];

const CreateSegment = () => {
    const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState('');
  const [rule, setRule] = useState({
    total_spend: '',
    spendOperator: '',
    visit_count: '',
    visitsOperator: '',
    logicalOperator: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = () => {
    if (!segmentName || !rule.total_spend || !rule.visit_count || !rule.spendOperator || !rule.visitsOperator || !rule.logicalOperator) {
      alert('Please fill all fields before previewing.');
      return;
    }
    setShowPreview(true);
  };

  return (
    <div className="main" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', justifyContent: 'space-between' }}>
      <div style={{ width: '20%' }}>
        <Sidebar />
      </div>
      <div style={{ width: '80%', overflow: 'auto', padding: '20px' }}>
        <div className="create-segment-container">
          <div className="create-segment-header">
            <h2>Create New Segment</h2>
          </div>

      <div className="form-group">
        <label>Segment Name</label>
        <input
          type="text"
          className="form-control"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Total Spend</label>
          <input
            type="number"
            name="total_spend"
            value={rule.total_spend}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Spend Operator</label>
          <select
            name="spendOperator"
            value={rule.spendOperator}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select</option>
            {comparisons.map((op) => (
              <option key={op.value} value={op.value}>{op.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Visit Count</label>
          <input
            type="number"
            name="visit_count"
            value={rule.visit_count}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Visits Operator</label>
          <select
            name="visitsOperator"
            value={rule.visitsOperator}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select</option>
            {comparisons.map((op) => (
              <option key={op.value} value={op.value}>{op.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group form-grid-full">
          <label>Logical Operator</label>
          <select
            name="logicalOperator"
            value={rule.logicalOperator}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select</option>
            {logicalOperators.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>
      </div>

      
      <div className="form-buttons">
      <button onClick={handlePreview} className="submit-button">
        Finalize Query
      </button>
      <button type="button" onClick={()=>navigate('/segments')}>Cancel</button>
          </div>
      {showPreview && (
        <PreviewSegmentModal
          segmentName={segmentName}
          rule={rule}
          onClose={() => setShowPreview(false)}
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default CreateSegment;