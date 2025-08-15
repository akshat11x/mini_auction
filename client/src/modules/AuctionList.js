// AuctionList.js - Displays all auctions
import React, { useEffect, useState } from 'react';
import './AuctionList.css';

function AuctionList({ onSelectAuction }) {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auctions')
      .then(res => res.json())
      .then(data => {
        setAuctions(data.auctions || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading auctions...</div>;
  if (!auctions.length) return <div className="no-auctions">No auctions found.</div>;

  return (
    <div className="auction-list">
      <h2>Available Auctions</h2>
      <div className="auction-grid">
        {auctions.map(auction => (
          <div
            key={auction.id}
            className="auction-card"
            onClick={() => onSelectAuction(auction)}
          >
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <div className="auction-info">
              <p><strong>Starting Bid:</strong> ${auction.starting_bid}</p>
              <p><strong>Ends:</strong> {new Date(auction.end_time).toLocaleString()}</p>
              <p><strong>Status:</strong> {auction.status}</p>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionList;
