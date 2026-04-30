const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI is not defined in environment variables!');
      return;
    }
    
    console.log(`🔌 Attempting to connect to MongoDB... (URI starts with: ${uri.substring(0, 15)}...)`);
    
    // Connect to MongoDB with timeout options
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database: ${mongoose.connection.name}`);

  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    // On Vercel/Render, we don't want to kill the process
    // process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err.message);
});

// Export the function
module.exports = connectDB;
