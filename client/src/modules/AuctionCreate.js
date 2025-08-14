// AuctionCreate.js - Form to create a new auction
import React, { useState } from 'react';
import './AuctionCreate.css';  // new CSS file

function AuctionCreate({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [bidIncrement, setBidIncrement] = useState('');
  const [goLive, setGoLive] = useState('');
  const [duration, setDuration] = useState('');
  const [owner, setOwner] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const goLiveISO = goLive ? new Date(goLive).toISOString() : '';

    const res = await fetch('http://localhost:4000/api/auction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startingBid: Number(startingBid),
        bidIncrement: Number(bidIncrement),
        goLive: goLiveISO,
        duration: Number(duration),
        owner
      })
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setTitle('');
      setDescription('');
      setStartingBid('');
      setBidIncrement('');
      setGoLive('');
      setDuration('');
      setOwner('');
      if (onCreated) onCreated(data.auction);
    } else {
      setError(data.error || 'Auction creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auction-form">
      <h2>Create Auction</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <input
        type="number"
        value={startingBid}
        onChange={e => setStartingBid(e.target.value)}
        placeholder="Starting Bid"
        required
      />

      <input
        type="number"
        value={bidIncrement}
        onChange={e => setBidIncrement(e.target.value)}
        placeholder="Bid Increment"
        required
      />

      <input
        type="datetime-local"
        value={goLive}
        onChange={e => setGoLive(e.target.value)}
        required
      />

      <input
        type="number"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        placeholder="Duration (minutes)"
        required
      />

      <input
        value={owner}
        onChange={e => setOwner(e.target.value)}
        placeholder="Owner"
        required
      />

      <button type="submit">Create Auction</button>

      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">Auction created!</div>}
    </form>
  );
}

export default AuctionCreate;
