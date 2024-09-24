require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/auth'); // Import the auth middleware
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/addressbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const contactsRouter = require('./routes/contacts');

// Apply the authentication middleware to the contacts routes
app.use('/contacts', authMiddleware, contactsRouter);

// Error handling middleware for authentication errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    res.status(401).json({ message: 'Invalid or missing token' });
  } else {
    next(err);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});