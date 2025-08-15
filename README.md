
# Mini auction and biding platform

⚡ A modern **real-time auction system** where sellers create auctions, buyers place bids, and both interact instantly with **live updates**.

---


## 🛠️ Tech Stack  

**Frontend**  
- ⚛️ React (Hooks, Components, State)  
- 🎨 CSS (custom styling)  

**Backend**  
- 🚀 Express.js (Node.js server)  
- 🔗 WebSockets for real-time bid updates   

**Database**  
- 🗄️ Supabase (PostgreSQL managed database)  
---

## ✨ Features  

- 🔐 **Authentication** – Login, Signup, and Logout functionality  
- 📦 **Auction Creation** – Sellers can create and manage auctions  
- 💰 **Real-time Bidding** – Buyers place higher bids on live auctions  
- ✅ **Seller Controls** – Accept or Reject bids instantly  
- 🔄 **Counter Offers** – Sellers can send counter offers to buyers  
- 🔔 **Live Notifications** – Real-time updates for bids, rejections, and acceptances  

---


## Installation and setup

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/akshat11x/mini_auction.git
cd mini_auction
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
cd src
npm start
```

👉 Backend runs at: http://localhost:4000

### 3️⃣ Frontend Setup
```bash
cd client
npm install
cd src/modules
npm start
```


👉 Frontend runs at: http://localhost:3000



    
## 🔗 API & WebSocket Flow
| Event           | Description                             |
| --------------- | --------------------------------------- |
| `bid`           | Buyer places a new bid                  |
| `bid-accepted`  | Seller accepts bid                      |
| `bid-rejected`  | Seller rejects bid                      |
| `counter-offer` | Seller counter offers buyer             |
| `auction-ended` | Auction is closed, highest bid declared |


## 🚀 Roadmap / Future Enhancements
📧 Email notifications for bid updates (SendGrid)

🧾 PDF invoice generation for winning bids

📱 Mobile-friendly responsive design

💳 Payment gateway integration
## 💡 Acknowledgements
React

Express

Supabase

Redis

                                                        🔥 Built with ❤️ by Akshat Jain
