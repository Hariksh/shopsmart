#!/bin/bash

echo "🚀 Starting ShopSmart with Docker Compose..."

# Check if docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Ensure the server/.env file exists to prevent docker-compose from failing
if [ ! -f "server/.env" ]; then
    echo "⚠️ server/.env file not found. Creating a default one..."
    echo "PORT=5001" > server/.env
    echo "MONGODB_URI=mongodb://mongodb:27017/shopsmart" >> server/.env
    echo "JWT_SECRET=yoursecretkey" >> server/.env
fi

# Build and start the containers in detached mode
echo "📦 Building and starting containers..."
docker compose up -d --build

# Check if docker compose succeeded
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Frontend is running at: http://localhost:5173"
    echo "🔌 Backend API is running at: http://localhost:5001"
else
    echo "❌ Failed to start Docker containers."
    exit 1
fi
