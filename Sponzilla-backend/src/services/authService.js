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

  // ===== CHANGE PASSWORD =====
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await User.findByIdAndUpdate(userId, {
        password: hashedNewPassword
      });

      return { message: "Password changed successfully" };
    } catch (error) {
      throw error;
    }
  }

  // ===== UPDATE ACCOUNT INFO =====
  async updateAccount(userId, updateData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if email is being updated and if it already exists
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (existingUser && existingUser._id.toString() !== userId) {
          throw new Error("Email already exists");
        }
      }

      // Update user data
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, select: "-password" }
      );

      return {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          verified: updatedUser.verified,
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // ===== GET USER SETTINGS =====
  async getSettings(userId) {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new Error("User not found");
      }

      // Return user settings (for now, we'll return basic user info)
      // In the future, you can add a separate settings schema
      return {
        notifications: {
          email: true,
          push: true,
          marketing: false,
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
        },
        preferences: {
          theme: "light",
          language: "en",
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // ===== UPDATE USER SETTINGS =====
  async updateSettings(userId, settings) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // For now, we'll just return success
      // In the future, you can add a separate settings field to the User model
      // or create a UserSettings model
      
      return {
        message: "Settings updated successfully",
        settings: settings
      };
    } catch (error) {
      throw error;
    }
  }
}

// Export single instance
module.exports = new AuthService();
