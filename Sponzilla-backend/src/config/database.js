const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    // Exit process if database connection fails
    process.exit(1);
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
