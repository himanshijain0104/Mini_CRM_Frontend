import React from 'react';

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="profile">
        <img src="https://via.placeholder.com/80" alt="User" />
        <p>Recruiting Manager</p>
      </div>
      <div className="messages">
        <h3>Messages</h3>
        <p>🔔 No new notifications</p>
      </div>
      <div className="activity">
        <h3>Activity</h3>
        <p>✨ You're all set! Segment Builder & Campaigns are live — start targeting smarter and growing faster!
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
