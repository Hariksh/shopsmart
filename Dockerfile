FROM node:20

WORKDIR /app

COPY . .

# Backend
WORKDIR /app/server
RUN npm install

# Frontend
WORKDIR /app/client

# Clean install fix (IMPORTANT)
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm run build

# Back to backend
WORKDIR /app/server

EXPOSE 5000

CMD ["node", "src/index.js"]