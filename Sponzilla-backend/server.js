require('dotenv').config();  // Load .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');  // Import database connection

// STEP 2: Create Express app
const app = express();

// STEP 2.5: Connect to Database
connectDB();

// STEP 3: Middleware (code that runs before routes)
// Configure CORS for GitHub Codespaces
// const corsOptions = {
//   origin: function (origin, callback) {
//     // 1. Allow direct browser hits
//     if (!origin) return callback(null, true);

//     // 2. Explicitly allow your Vite frontend port
//     if (
//       origin.includes('localhost:5173') ||
//       origin.includes('localhost:3000') ||
//       origin.includes('127.0.0.1')
//     ) {
//       console.log('✅ CORS allowing frontend:', origin);
//       return callback(null, true);
//     }

//     // 3. GitHub & Production
//     const allowedOrigins = ['https://sponzilla.vercel.app'];
//     if (origin.includes('github.dev') || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     console.log('❌ CORS rejected origin:', origin);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// };
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://sponzilla.vercel.app', // Your Vercel frontend
      'http://localhost:5173',       // Local development
      'http://localhost:3000'
    ];

    // Check if origin matches allowed origins or is a GitHub Codespace
    if (allowedOrigins.includes(origin) || origin.includes('github.dev') || origin.includes('githubpreview.dev')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));  // Allow frontend to access backend

app.use(express.json());  // Allow reading JSON data from requests

// Import models and routes
const User = require('./src/models/user');  // Fixed: keep lowercase 'user' as per your file structure
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const eventRoutes = require('./src/routes/eventRoutes'); // Add this new route
const analyticsRoutes = require('./src/routes/analyticsRoutes'); // Add analytics routes



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
app.use('/api/analytics', analyticsRoutes); // Add analytics routes

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

module.exports = app;