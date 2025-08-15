# 🏷️ Mini Auction Platform  

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)  
[![Express](https://img.shields.io/badge/Backend-Express-green?logo=express)](https://expressjs.com/)  
[![Supabase](https://img.shields.io/badge/Database-Supabase-black?logo=supabase)](https://supabase.com/)  
[![WebSockets](https://img.shields.io/badge/RealTime-WebSockets-orange?logo=websocket)](#)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

> ⚡ A modern **real-time auction system** where sellers create auctions, buyers place bids, and both interact instantly with **live updates**.

---

## ✨ Features  

- 🔐 **Authentication** – Login, Signup, and Logout functionality  
- 📦 **Auction Creation** – Sellers can create and manage auctions  
- 💰 **Real-time Bidding** – Buyers place higher bids on live auctions  
- ✅ **Seller Controls** – Accept or Reject bids instantly  
- 🔄 **Counter Offers** – Sellers can send counter offers to buyers  
- 🔔 **Live Notifications** – Real-time updates for bids, rejections, and acceptances  

---

## 🛠️ Tech Stack  

**Frontend**  
- ⚛️ React (Hooks, Components, State)  
- 🎨 CSS (custom styling)  

**Backend**  
- 🚀 Express.js (Node.js server)  
- 🔗 WebSockets for real-time bid updates  
- 📧 SendGrid (email notifications planned)  
- 🛑 Redis (caching latest bids)  

**Database**  
- 🗄️ Supabase (PostgreSQL managed database)  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/akshat11x/mini_auction.git
cd mini_auction
```
###2️⃣ Backend Setup
```bash
cd server
npm install
npm start
```

👉 Backend runs at: http://localhost:4000

###3️⃣ Frontend Setup
```bash
cd client
npm install
npm start
```

👉 Frontend runs at: http://localhost:3000

---
