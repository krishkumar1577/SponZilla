require('dotenv').config();  // Load .env file

// Validate JWT_SECRET in production
if (process.env.NODE_ENV === 'production' &&
    process.env.JWT_SECRET === 'your_jwt_secret_here') {
  throw new Error('❌ CRITICAL: JWT_SECRET must be changed from default value in production!');
}

const express = require('express');
const cors = require('cors');
const compression = require('compression');
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
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://sponzilla.vercel.app']
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow GitHub Codespaces and Vercel preview deployments in development
    if (process.env.NODE_ENV !== 'production' &&
      (origin.includes('github.dev') ||
       origin.includes('githubpreview.dev') ||
       origin.includes('vercel.app'))) {
      return callback(null, true);
    }

    console.log('❌ CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Allow frontend to access backend

// Enable compression for all responses
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // 1-9, higher = more compression but slower
}));

app.use(express.json({ limit: '10mb' }));  // Allow reading JSON data from requests with 10MB limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));  // Allow reading URL-encoded data with 10MB limit

// Import models and routes
const User = require('./src/models/user');  // Fixed: keep lowercase 'user' as per your file structure
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const proofOfWorkRoutes = require('./src/routes/proofOfWorkRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const sponsorshipRoutes = require('./src/routes/sponsorshipRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');



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

// Test route: Create a test user (development only)
if (process.env.NODE_ENV === 'development') {
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
}

// STEP 5.5: Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/events', eventRoutes); // Add event routes
app.use('/api/analytics', analyticsRoutes); // Add analytics routes
app.use('/api/chat', require('./src/routes/chatRoutes'));
app.use('/api/sponsorships', require('./src/routes/sponsorshipRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/proof-of-work', require('./src/routes/proofOfWorkRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));
app.use('/api/notifications', notificationRoutes);
// TEMPORARILY DISABLED for deployment until Razorpay account is ready
// app.use('/api/payments', require('./src/routes/paymentRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  const statusCode = err.statusCode || 500;
  const message = isDev ? err.message : 'An error occurred. Please try again.';

  console.error('Error:', err);

  res.status(statusCode).json({
    error: message,
    ...(isDev && { stack: err.stack })
  });
});

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