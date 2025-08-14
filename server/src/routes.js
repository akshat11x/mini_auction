// routes.js - REST API routes for auction platform
const express = require('express');
const supabase = require('./db');
const redis = require('./cache');
const { sendAuctionEmail } = require('./mailer');
const { AuctionItem, Bid } = require('./models');

const router = express.Router();

// Create auction item


router.post('/auction', async (req, res) => {
  const { title, description, startingBid, bidIncrement, goLive, duration, owner } = req.body;
  // Calculate end time from goLive and duration (in minutes)
  const goLiveTime = new Date(goLive);
  const endTime = new Date(goLiveTime.getTime() + duration * 60000).toISOString();

  const { data, error } = await supabase.from('auctions').insert([
    {
      title,
      description,
      starting_bid: parseFloat(startingBid),
      bid_increment: parseFloat(bidIncrement),
      go_live: goLiveTime.toISOString(),
      end_time: endTime,
      duration: parseInt(duration),
      owner,
      status: 'active'
    }
  ]).select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ auction: data[0] });
});


// Get all auction items
router.get('/auctions', async (req, res) => {
  const { data, error } = await supabase.from('auctions').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ auctions: data });
});

// Place a bid

router.post('/auction/:id/bid', async (req, res) => {
  const auctionId = req.params.id;
  const { userId, amount } = req.body;

  // get current highest from redis
  let currentHighest = 0;
  const cached = await redis.get(`auction:${auctionId}:highest`);
  if (cached) {
    currentHighest = cached.amount ? parseFloat(cached.amount) : parseFloat(cached);
  }

  // validate bid
  if (parseFloat(amount) <= currentHighest) {
    return res.status(400).json({ error: `Bid must be greater than current highest (${currentHighest})` });
  }

  // insert bid in supabase
  const { data, error } = await supabase.from('bids').insert([
    { auction_id: auctionId, user_id: userId, amount: parseFloat(amount) }
  ]).select('*');

  if (error) return res.status(400).json({ error: error.message });

  // update redis with latest bid
  await redis.set(`auction:${auctionId}:highest`, { amount: parseFloat(amount), userId });

  res.json({ bid: data[0] });
});



// Get bids for an auction
router.get('/auction/:id/bids', async (req, res) => {
  const auctionId = req.params.id;
  const { data, error } = await supabase.from('bids').select('*').eq('auction_id', auctionId);
  if (error) return res.status(400).json({ error });
  res.json({ bids: data });
});


// Seller accepts highest bid
router.post('/auction/:id/accept', async (req, res) => {
  const auctionId = req.params.id;
  // Update auction status
  const { data, error } = await supabase.from('auctions').update({ status: 'accepted' }).eq('id', auctionId).select('*');
  if (error) return res.status(400).json({ error });
  // Notify highest bidder (WebSocket and email)
  // TODO: Implement notification logic
  res.json({ auction: data[0], message: 'Bid accepted' });
});

// Seller rejects highest bid
router.post('/auction/:id/reject', async (req, res) => {
  const auctionId = req.params.id;
  const { data, error } = await supabase.from('auctions').update({ status: 'rejected' }).eq('id', auctionId).select('*');
  if (error) return res.status(400).json({ error });
  // Notify highest bidder (WebSocket and email)
  // TODO: Implement notification logic
  res.json({ auction: data[0], message: 'Bid rejected' });
});

// Seller makes a counter-offer
router.post('/auction/:id/counter', async (req, res) => {
  const auctionId = req.params.id;
  const { counterAmount } = req.body;
  // Store counter-offer in auction
  const { data, error } = await supabase.from('auctions').update({ status: 'counter', counter_offer: parseFloat(counterAmount) }).eq('id', auctionId).select('*');
  if (error) return res.status(400).json({ error });
  // Notify highest bidder (WebSocket and email)
  // TODO: Implement notification logic
  res.json({ auction: data[0], message: 'Counter-offer sent' });
});

module.exports = router;
