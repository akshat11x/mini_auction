// app.js - Auction backend entry point

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('ws');
const routes = require('./routes');
const redis = require('./cache');
const { sendAuctionEmail } = require('./mailer');
const { AuctionItem, Bid } = require('./models');


const app = express();
const server = http.createServer(app);
const wsServer = new Server({ server });

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Serve static React build
const staticDir = path.join(__dirname, '..', 'build');
app.use(express.static(staticDir));

// Simple health endpoint
app.get('/healthz', (req, res) => res.send('ok'));

// SPA fallback for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// In-memory auction state for demonstration (replace with DB in production)
let liveAuctions = {};


// Helper: broadcast to all clients
function broadcastWS(message) {
  wsServer.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wsServer.on('connection', (socket) => {
  socket.send('Connected to auction WebSocket.');

  socket.on('message', async (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch {
      socket.send('Invalid message format');
      return;
    }
    if (data.type === 'bid') {
      // Broadcast bid and outbid notifications
      broadcastWS({ type: 'bid', ...data });
      // Optionally cache bid in Redis
      await redis.set(`auction:${data.auctionId}:latestBid`, JSON.stringify(data));
      // TODO: Notify outbid users
    }
    if (data.type === 'auction-ended') {
      broadcastWS({ type: 'auction-ended', auctionId: data.auctionId, highestBid: data.highestBid });
      // TODO: Notify seller and highest bidder, send emails, generate invoice
    }
    if (data.type === 'accept-bid') {
      broadcastWS({ type: 'bid-accepted', auctionId: data.auctionId });
      // TODO: Send confirmation email and PDF invoice
    }
    if (data.type === 'reject-bid') {
      broadcastWS({ type: 'bid-rejected', auctionId: data.auctionId });
      // TODO: Send rejection email
    }
    if (data.type === 'counter-offer') {
      broadcastWS({ type: 'counter-offer', auctionId: data.auctionId, amount: data.counterAmount });
      // TODO: Notify highest bidder, allow response
    }
    // Add more message types as needed
  });
});

const PORT = process.env.PORT || 4000;
app.set('trust proxy', true);
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
