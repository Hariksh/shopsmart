require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopsmart')
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("Server running");
});
