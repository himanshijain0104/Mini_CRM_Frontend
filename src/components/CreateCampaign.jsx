import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';
import '../CSS/CreateCampaign.css';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const CreateCampaign = () => {
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    segment_id: '', 
    message_template: '',
    audience_size: 0,
    created_by: user?.name || '',
  });
  
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/segments/idname')
      .then(res => setSegments(res.data))
      .catch(err => {
        console.error('Error loading segments:', err);
        setError('Failed to load segments');
      });
  }, []);

  const handleChange = e => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const audience_size = segments.find(segment => segment.id === parseInt(formData.segment_id))?.audience_size;
      console.log(audience_size,segments[0].id,formData.segment_id)
      const obj = {
        ...formData,
        audience_size: audience_size || formData.audience_size,
      }
      // console.log('Form Data:', obj);
      await axiosInstance.post('/campaigns', obj);
      alert('Campaign created successfully!');
      navigate('/campaigns');
    } catch (err) {
      alert('Error creating campaign');
      console.error(err);
    }
  };

  return (
    <>
     <div className="main" style={{ display: 'flex',width:'100vw', height: '100vh', overflow: 'hidden',justifyContent:'space-between' }}>
    <div style={{width:'20%'}}>

    <Sidebar />
    </div>
    <div className="create-campaign-container">
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit} className="create-campaign-form" id="create-campaign-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Segment Name:
          <select name="segment_id" value={formData.segment_id} onChange={handleChange} required>
          <option value="" disabled>Select Segment</option>
          {segments.map(segment => (
            <option key={segment.id} value={segment.id}>{segment.name}</option>
          ))}
        </select>

        </label>
        <label>
          Message Template:
          <textarea name="message_template" value={formData.message_template} onChange={handleChange} required />
        </label>

        {/* <label>
          Audience Size:
          <input type="number" name="audience_size" value={formData.audience_size} onChange={handleChange} required />
        </label> */}

        <label>
          Created By:
          <input type="text" name="created_by" value={formData.created_by} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={()=>navigate('/campaigns')}>Cancel</button>
          </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default CreateCampaign;
