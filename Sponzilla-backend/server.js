require('dotenv').config();  // Load .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');  // Import database connection

// STEP 2: Create Express app
const app = express();

// STEP 2.5: Connect to Database
connectDB();

// STEP 3: Middleware (code that runs before routes)
app.use(cors());  // Allow frontend to access backend
app.use(express.json());  // Allow reading JSON data from requests

// Import models and routes
const User = require('./src/models/user');  // Fixed: keep lowercase 'user' as per your file structure
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const eventRoutes = require('./src/routes/eventRoutes'); // Add this new route

// STEP 4: Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SponZilla Backend API!',
    version: '1.0.0',
    status: 'running'
  });
});

// STEP 5: Health check route (to test if server is alive)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date()
  });
});

// Test route: Create a test user
app.get('/test-user', async (req, res) => {
  try {
    // Check if test user already exists
    const existing = await User.findOne({ email: 'test@example.com' });
    if (existing) {
      return res.json({ 
        message: 'Test user already exists',
        user: existing 
      });
    }
    
    // Create test user
    const testUser = await User.create({
      name: 'Test Club',
      email: 'test@example.com',
      password: 'password123',
      role: 'club'
    });
    
    res.json({ 
      message: 'Test user created successfully!',
      user: testUser 
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// STEP 5.5: Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/events', eventRoutes); // Add event routes

// STEP 6: 404 handler (if route doesn't exist)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// STEP 7: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 SponZilla Backend is running!');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log('-----------------------------------');
});