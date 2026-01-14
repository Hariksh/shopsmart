# ShopSmart

A full-stack e-commerce application built with React and Node.js.

## 🚀 Tech Stack

- **Frontend:** React, Vite, TailwindCSS (assumed standard, or just CSS)
- **Backend:** Node.js, Express
- **Database:** SQLite (with Prisma ORM) - *Planned*
- **Deployment:** Render (Backend), Vercel/Render (Frontend)

## 📂 Project Structure

```
shopsmart/
├── client/         # Frontend React application
└── server/         # Backend Express API
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd shopsmart
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

## 🏃‍♂️ Running Locally

### 1. Start the Backend Server

The backend runs on port `5001` by default.

```bash
cd server
# Create a .env file if needed
echo "PORT=5001" > .env
npm run dev
```
You should see: `Server running on port 5001`

### 2. Start the Frontend Application

The frontend connects to the backend. Ensure your backend is running first.

```bash
cd client
# Update .env or .env.local if needed
echo "VITE_API_URL=http://localhost:5001" > .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

The project is configured for deployment on [Render](https://render.com).

- **Backend:** Deployed as a Web Service.
- **Frontend:** Deployed as a Static Site.

See `render.yaml` for configuration details.

## 📝 Roadmap

- [ ] Database integration with Prisma & SQLite
- [ ] User Authentication
- [ ] Product Catalog
- [ ] Shopping Cart & Checkout
