const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

class AuthService {
  
    async register(name, email, password, role) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.generateToken(user._id, role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
      token,
    };
  } catch (error) {
    throw error;
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = this.generateToken(user._id, user.role);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      // Find user by ID (exclude password)
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // ===== GENERATE JWT TOKEN =====
  generateToken(userId, role) {
    // Create token with user ID and role
    const token = jwt.sign(
      { userId, role }, // Payload (data inside token)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "7d" } // Token expires in 7 days
    );
    return token;
  }

  // ===== VERIFY JWT TOKEN =====
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // Returns { userId, role }
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

// Export single instance
module.exports = new AuthService();
