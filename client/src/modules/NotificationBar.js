// NotificationBar.js - Displays in-app notifications
import React from 'react';

function NotificationBar({ notifications, onClear }) {
  if (!notifications.length) return null;
  return (
    <div style={{ background: '#ffeeba', padding: 10, marginBottom: 16, borderRadius: 4 }}>
      <ul style={{ margin: 0, padding: 0 }}>
        {notifications.map((note, idx) => (
          <li key={idx} style={{ marginBottom: 4 }}>{note}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default NotificationBar;
