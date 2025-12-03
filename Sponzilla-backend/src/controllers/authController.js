
const authService = require('../services/authService');

class AuthController {
  
  // ===== REGISTER =====
  async register(req, res) {
    try {
      // Get data from request body
      const { name, email, password, role } = req.body;
      
      // Validate input
      if (!name || !email || !password || !role) {
        return res.status(400).json({ 
          error: 'Please provide name, email, password, and role' 
        });
      }
      
      // Check if role is valid
      if (!['club', 'brand'].includes(role)) {
        return res.status(400).json({ 
          error: 'Role must be either "club" or "brand"' 
        });
      }
      
      // Call service to register user
      const result = await authService.register(name, email, password, role);
      
      // Send response
      res.status(201).json({
        message: 'Registration successful',
        ...result
      });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // ===== LOGIN =====
  async login(req, res) {
    try {
      // Get data from request body
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Please provide email and password' 
        });
      }
      
      // Call service to login
      const result = await authService.login(email, password);
      
      // Send response
      res.json({
        message: 'Login successful',
        ...result
      });
      
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
  
  // ===== GET PROFILE =====
  async getProfile(req, res) {
    try {
      // req.userId is set by auth middleware
      const user = await authService.getProfile(req.userId);
      
      res.json({ user });
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // ===== CHANGE PASSWORD =====
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
          error: 'Please provide current password and new password' 
        });
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          error: 'New password must be at least 6 characters' 
        });
      }
      
      await authService.changePassword(req.userId, currentPassword, newPassword);
      
      res.json({ message: 'Password changed successfully' });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ===== UPDATE ACCOUNT =====
  async updateAccount(req, res) {
    try {
      const { name, email } = req.body;
      
      const updatedUser = await authService.updateAccount(req.userId, { name, email });
      
      res.json({ 
        message: 'Account updated successfully',
        user: updatedUser
      });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ===== GET SETTINGS =====
  async getSettings(req, res) {
    try {
      const settings = await authService.getUserSettings(req.userId);
      
      res.json(settings);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // ===== UPDATE SETTINGS =====
  async updateSettings(req, res) {
    try {
      const { notifications, security } = req.body;
      
      await authService.updateUserSettings(req.userId, { notifications, security });
      
      res.json({ message: 'Settings updated successfully' });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Export single instance
module.exports = new AuthController();