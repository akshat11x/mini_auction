// AuctionApp.js - Main auction frontend component

import React, { useState, useEffect, useRef } from 'react';
import AuctionList from './AuctionList';
import AuctionDetails from './AuctionDetails';
import AuctionCreate from './AuctionCreate';
import NotificationBar from './NotificationBar';
import { useUser } from './UserContext';
import './AuctionApp.css';   // <-- Added CSS import

function AuctionApp() {
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const wsRef = useRef(null);
  const { userId, setUserId, role, setRole } = useUser();

  useEffect(() => {
    wsRef.current = new window.WebSocket('ws://localhost:4000');

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
  }, []);

  const clearNotifications = () => setNotifications([]);

  return (
    <div className="auction-app">
      <div className="user-controls">
        <label>
          User ID:
          <input
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
        </label>
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
          <AuctionCreate onCreated={() => setRefresh((r) => !r)} />
          <AuctionList onSelectAuction={setSelectedAuction} key={refresh} />
        </>
      ) : (
        <AuctionDetails
          auction={selectedAuction}
          onBack={() => setSelectedAuction(null)}
        />
      )}
    </div>
  );
}

export default AuctionApp;
