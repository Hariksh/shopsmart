# ShopSmart

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

A robust full-stack e-commerce application built with modern web technologies. This project demonstrates a cohesive architecture connecting a React frontend with a Node.js/Express backend.

##  Features

- **Full-Stack Integration**: Seamless communication between React frontend and Express backend.
- **RESTful API**: Structured API endpoints for data retrieval and management.
- **Testing Setup**: Integrated unit testing environments:
  - **Client**: Vitest for fast, reliable component testing.
  - **Server**: Jest for backend logic verification.
- **Modern Build Tooling**: Powered by Vite for lightning-fast development server and builds.

##  Tech Stack

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Testing**: Jest, Supertest

### Database
- **Planned**: SQLite (with Prisma ORM)

## 📂 Project Structure

```bash
shopsmart/
├── client/         # Frontend React application (Vite)
└── server/         # Backend Express API
```

##  Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites

- **Node.js**: Version 18 or higher is required.
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd shopsmart
    ```

2.  **Install Backend Dependencies:**
    Navigate to the server directory and install packages.
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the client directory and install packages.
    ```bash
    cd ../client
    npm install
    ```

##  Running Locally

### 1. Start the Backend Server

The backend runs on port `5001`.

```bash
# In the /server directory
# Helper: Create a .env file with the port
echo "PORT=5001" > .env

# Start the server
npm run dev
```
Output should confirm: `Server running on port 5001`

### 2. Start the Frontend Application

The frontend connects to the backend API.

```bash
# In the /client directory
# Helper: Point the frontend to the local backend
echo "VITE_API_URL=http://localhost:5001" > .env

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

##  Running Tests

Ensure system reliability by running the test suites.

### Backend Tests
Runs Jest unit tests for the API.
```bash
cd server
npm test
```

### Frontend Tests
Runs Vitest unit tests for UI components.
```bash
cd client
npm test
```

##  Deployment

The project is configured for seamless deployment on **Render**.

- **Backend**: Deployed as a Web Service.
- **Frontend**: Deployed as a Static Site.

Refer to `render.yaml` for infrastructure-as-code configuration.

##  Roadmap

- [ ] Database integration with Prisma & SQLite
- [ ] User Authentication (JWT)
- [ ] Product Catalog & Search
- [ ] Shopping Cart & Checkout Flow

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
