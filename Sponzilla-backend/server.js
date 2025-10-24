

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');  // Import database connection


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
