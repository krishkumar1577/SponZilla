

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');  // Import database connection
const User = require('./src/models/user');


const app = express();

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database


app.get('/',(req, res) => {
    res.json({
        message: 'welcome to sponzilla backend',
        version: '1.0.0.0',
        status: 'running'
    });
})

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

app.get('/health', (req, res)=>{
    res.json({
        status: 'healthy',
        timestamp: new Date()
    });
})


app.use((req, res)=>{
    res.status(404).json({
        error: 'routes not found',
        path: req.path
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
console.log('🚀 SponZilla Backend is running!');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log('-----------------------------------');
});

// Without --- IGNORE ---
