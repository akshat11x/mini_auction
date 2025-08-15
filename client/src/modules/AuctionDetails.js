import React, { useEffect, useState } from 'react';
import './AuctionDetails.css';

function AuctionDetails({ auction, onBack, userId, role }) {
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [counterAmount, setCounterAmount] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/api/auction/${auction.id}/bids`)
      .then(res => res.json())
      .then(data => {
        setBids(data.bids || []);
        setLoading(false);
      });
  }, [auction.id]);

  const placeBid = async () => {
    setError('');
    if(bids.length==0){
        if (Number(amount) <= auction.starting_bid) {
        setError(`Bid must be greater than starting bid (${auction.starting_bid})`);
        return;
      }
    }
    else {
      if (Number(amount) < highestBid + auction.bid_increment) {
        setError(`Bid must be at least ${highestBid + auction.bid_increment}`);
        return;
      }
    }
    const res = await fetch(`http://localhost:4000/api/auction/${auction.id}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount: Number(amount) })
    });
    const data = await res.json();
    if (res.ok) {
      setBids([...bids, data.bid]);
      setAmount('');
    } else {
      setError(data.error || 'Bid failed');
    }
  };

  // Seller actions
  const acceptBid = async () => {
    setActionMsg('');
    const res = await fetch(`http://localhost:4000/api/auction/${auction.id}/accept`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) setActionMsg('✅ Bid accepted!');
    else setActionMsg(data.error || 'Accept failed');
  };

  const rejectBid = async () => {
    setActionMsg('');
    const res = await fetch(`http://localhost:4000/api/auction/${auction.id}/reject`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) setActionMsg('❌ Bid rejected!');
    else setActionMsg(data.error || 'Reject failed');
  };

  const sendCounterOffer = async () => {
    setActionMsg('');
    const res = await fetch(`http://localhost:4000/api/auction/${auction.id}/counter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ counterAmount: Number(counterAmount) })
    });
    const data = await res.json();
    if (res.ok) setActionMsg('💬 Counter-offer sent!');
    else setActionMsg(data.error || 'Counter-offer failed');
  };

  // Find highest bid
  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : null;

  return (
    <div className="auction-details">
      <button className="back-btn" onClick={onBack}>← Back to Auctions</button>

      <div className="auction-card">
        <h2>{auction.title}</h2>
        <p>{auction.description}</p>

        <div className="auction-info">
          <p><strong>Starting Bid:</strong> {auction.starting_bid}</p>
          <p><strong>Bid Increment:</strong> {auction.bid_increment}</p>
          <p><strong>Go Live:</strong> {auction.go_live ? new Date(auction.go_live).toLocaleString() : ''}</p>
          <p><strong>Duration:</strong> {auction.duration} minutes</p>
          <p><strong>Status:</strong> {auction.status}</p>
          <p><strong>Ends:</strong> {new Date(auction.end_time).toLocaleString()}</p>
        </div>

        {/* Show highest bid */}
        {highestBid !== null && (
          <div className="highest-bid">
            <strong>Highest Bid:</strong> ${highestBid}
          </div>
        )}
      </div>

      <div className="bids-section">
        <h3>Bids</h3>
        {loading ? (
          <div>Loading bids...</div>
        ) : bids.length > 0 ? (
          <ul className="bids-list">
            {bids.map(bid => (
              <li key={bid.id}>
                <span className="bidder">{bid.user_id}</span> 
                <span className="amount">${bid.amount}</span> 
                <span className="time">{new Date(bid.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>No bids yet.</div>
        )}
      </div>

      {
(userId!== auction.owner && auction.status==='active' && role==='buyer') && (
    <div className="place-bid">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Your bid amount"
        />
        <button onClick={placeBid} disabled={!amount || !userId}>Place Bid</button>
        {error && <div className="error-msg">{error}</div>}
      </div>
)
    
      }

      {role === 'seller' && userId === auction.owner && (
        <div className="seller-actions">
          <h4>Seller Actions</h4>
          <button className="accept-btn" onClick={acceptBid}>Accept Highest Bid</button>
          <button className="reject-btn" onClick={rejectBid}>Reject Highest Bid</button>
          <div className="counter-offer">
            <input
              type="number"
              value={counterAmount}
              onChange={e => setCounterAmount(e.target.value)}
              placeholder="Counter-offer amount"
            />
            <button onClick={sendCounterOffer} disabled={!counterAmount}>Send Counter-Offer</button>
          </div>
          {actionMsg && <div className="success-msg">{actionMsg}</div>}
        </div>
      )}
    </div>
  );
}

export default AuctionDetails;
