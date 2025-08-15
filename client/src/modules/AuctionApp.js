import React, { useState, useEffect, useRef } from 'react';
import AuctionList from './AuctionList';
import AuctionDetails from './AuctionDetails';
import AuctionCreate from './AuctionCreate';
import NotificationBar from './NotificationBar';
import AuthPanel from './AuthPanel';
import './AuctionApp.css';

function AuctionApp() {
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('buyer');
  const wsRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    // Use same-origin WebSocket in production; fallback to localhost in dev
    const loc = window.location;
    const wsProtocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = loc.host || 'localhost:4000';
    const wsUrl = `${wsProtocol}//${host}`;
    wsRef.current = new window.WebSocket(wsUrl);

    wsRef.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'bid') {
          setNotifications((n) => [
            `New bid: ${msg.amount} by ${msg.userId} on auction ${msg.auctionId}`,
            ...n
          ]);
        }

        if (msg.type === 'bid-accepted') {
          setNotifications((n) => [
            `Your bid was accepted on auction ${msg.auctionId}`,
            ...n,
          ]);
        }

        if (msg.type === 'bid-rejected') {
          setNotifications((n) => [
            `Your bid was rejected on auction ${msg.auctionId}`,
            ...n,
          ]);
        }
      } catch (err) {
        console.error("WebSocket message parse error:", err);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user]);

  const clearNotifications = () => setNotifications([]);

  // Show AuthPanel first if not logged in
  if (!user) {
    return (
      <div className="auction-app">
        <h1 className="title">Mini Auction Platform</h1>
        <AuthPanel user={user} onAuth={setUser} onLogout={() => setUser(null)} />
      </div>
    );
  }

  return (
    <div className="auction-app">
      <AuthPanel user={user} onAuth={setUser} onLogout={() => setUser(null)} />
      <div className="user-controls">
        <label>
          Role:
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </label>
      </div>

      <h1 className="title">Mini Auction Platform</h1>

      <NotificationBar
        notifications={notifications}
        onClear={clearNotifications}
      />

      {!selectedAuction ? (
        <>
          {role === 'seller' && (
            <AuctionCreate onCreated={() => setRefresh((r) => !r)} owner={user.email} />
          )}
          <AuctionList onSelectAuction={setSelectedAuction} key={refresh} />
        </>
      ) : (
        <AuctionDetails
          auction={selectedAuction}
          onBack={() => setSelectedAuction(null)}
          userId={user.email}
          role={role}
        />
      )}
    </div>
  );
}

export default AuctionApp;