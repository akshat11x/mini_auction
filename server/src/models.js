// models.js - Auction data models

// Example auction item structure
// In production, use Supabase/PostgreSQL for persistence
class AuctionItem {
  constructor({ id, title, description, startingBid, endTime, owner }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startingBid = startingBid;
    this.endTime = endTime;
    this.owner = owner;
    this.bids = [];
  }

  placeBid(bid) {
    this.bids.push(bid);
  }
}

class Bid {
  constructor({ userId, amount, timestamp }) {
    this.userId = userId;
    this.amount = amount;
    this.timestamp = timestamp;
  }
}

module.exports = { AuctionItem, Bid };
