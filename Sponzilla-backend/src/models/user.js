const mongoose = require("mongoose");  

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [ 6, "password must be at least 6 characters long"],
  },

  role: {
    type: String,
    enum: ["club", "brand", "admin"],
    required: [true, "Role is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    
}, {
  // Add timestamps automatically (createdAt, updatedAt)
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;