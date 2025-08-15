🏷️ Mini Auction Platform










⚡ Mini Auction Platform is a modern real-time auction system where sellers create auctions, buyers place bids, and both interact instantly with live updates.

✨ Features

🔐 Authentication – Login, Signup, Logout

📦 Auction Management – Sellers can create, update, and delete auctions

💰 Real-time Bidding – Buyers place higher bids on live auctions

✅ Seller Controls – Accept or reject bids instantly

🔄 Counter Offers – Sellers can propose counter offers to buyers

🔔 Live Notifications – Real-time updates for bids, acceptances, and rejections

🛠️ Tech Stack
Frontend

⚛️ React (Hooks, Functional Components, State Management)

🎨 CSS (Custom Styling & Animations)

Backend

🚀 Node.js + Express.js server

🔗 WebSockets for real-time bid updates

📧 SendGrid for email notifications

🛑 Redis caching for latest bids

Database

🗄️ Supabase (PostgreSQL Managed Database)

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/akshat11x/mini_auction.git
cd mini_auction

2️⃣ Backend Setup
cd server
npm install
npm start


🔗 Backend runs at: http://localhost:4000

3️⃣ Frontend Setup
cd client
npm install
npm start


🔗 Frontend runs at: http://localhost:3000

🔗 API & WebSocket Events
Event	Description
bid	Buyer places a new bid
bid-accepted	Seller accepts a bid
bid-rejected	Seller rejects a bid
counter-offer	Seller sends a counter offer to buyer
auction-ended	Auction is closed, highest bid declared
🚀 Roadmap / Future Enhancements

📧 Email notifications for bid updates (SendGrid)

🧾 PDF invoice generation for winning bids

📱 Fully responsive mobile-friendly design

💳 Payment gateway integration

🤝 Contributing

🍴 Fork the repo

🌱 Create your feature branch:

git checkout -b feature/AmazingFeature


💾 Commit your changes:

git commit -m "Add some AmazingFeature"


🚀 Push to the branch:

git push origin feature/AmazingFeature


🎉 Open a Pull Request

💡 Acknowledgements

React

Express.js

Supabase

Redis

🔥 Built with ❤️ by Akshat Jain
