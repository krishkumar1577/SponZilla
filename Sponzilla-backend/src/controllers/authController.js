
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
}

// Export single instance
module.exports = new AuthController();