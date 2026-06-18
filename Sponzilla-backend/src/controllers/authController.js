
const authService = require('../services/authService');
const crypto = require('crypto');
const User = require('../models/user');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/errorHandler');

// Password validation function
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  }
};

const buildFrontendUrl = (path) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${frontendUrl}${path}`;
};

const buildOAuthSuccessRedirect = (authResult) => {
  const params = new URLSearchParams({
    token: authResult.accessToken,
    user: JSON.stringify(authResult.user),
  });

  if (authResult.refreshToken) {
    params.set('refreshToken', authResult.refreshToken);
  }

  return buildFrontendUrl(`/oauth-success#${params.toString()}`);
};

const buildRoleSelectionRedirect = (result) => {
  const params = new URLSearchParams({
    signupToken: result.signupToken,
    provider: result.provider,
    name: result.name,
    email: result.email,
  });

  if (result.avatar) {
    params.set('avatar', result.avatar);
  }

  return buildFrontendUrl(`/role-selection?${params.toString()}`);
};

class AuthController {
  
  // ===== REGISTER =====
  async register(req, res) {
    try {
      // Get data from request body
      const { name, email, password, role } = req.body;

      // Validate input
      if (!name || !email || !password || !role) {
        return sendErrorResponse(res, 400, 'Please provide name, email, password, and role');
      }

      // Check if role is valid
      if (!['club', 'brand'].includes(role)) {
        return sendErrorResponse(res, 400, 'Role must be either "club" or "brand"');
      }

      // Validate password complexity
      try {
        validatePassword(password);
      } catch (validationError) {
        return sendErrorResponse(res, 400, validationError.message);
      }

      // Call service to register user
      const result = await authService.register(name, email, password, role);

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

      // Validate password complexity
      try {
        validatePassword(newPassword);
      } catch (validationError) {
        return res.status(400).json({ error: validationError.message });
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
        user: updatedUser.user
      });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ===== GET SETTINGS =====
  async getSettings(req, res) {
    try {
      const settings = await authService.getSettings(req.userId);
      
      res.json(settings);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // ===== UPDATE SETTINGS =====
  async updateSettings(req, res) {
    try {
      const { notifications, security } = req.body;

      await authService.updateSettings(req.userId, { notifications, security });

      res.json({ message: 'Settings updated successfully' });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ===== REFRESH TOKEN =====
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
      }

      const decoded = authService.verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newAccessToken = authService.generateToken(user._id);

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  // ===== VERIFY EMAIL =====
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired verification token' });
      }

      user.isEmailVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpiry = null;
      await user.save();

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GOOGLE LOGIN =====
  async googleLogin(req, res) {
    try {
      if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(500).json({ error: 'Google OAuth is not configured on the server. Please set GOOGLE_CLIENT_ID in the backend environment variables.' });
      }
      const url = authService.getGoogleAuthUrl();
      res.redirect(url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GOOGLE CALLBACK =====
  async googleCallback(req, res) {
    try {
      const { code, state } = req.query;
      const result = await authService.handleGoogleCallback(code, state);

      if (result.kind === 'login') {
        return res.redirect(buildOAuthSuccessRedirect(result.authResult));
      }

      return res.redirect(buildRoleSelectionRedirect(result));
    } catch (error) {
      console.error('Google Auth Callback Error:', error);
      res.redirect(buildFrontendUrl(`/login?error=${encodeURIComponent(error.message)}`));
    }
  }

  // ===== GITHUB LOGIN =====
  async githubLogin(req, res) {
    try {
      if (!process.env.GITHUB_CLIENT_ID) {
        return res.status(500).json({ error: 'GitHub OAuth is not configured on the server. Please set GITHUB_CLIENT_ID in the backend environment variables.' });
      }
      const url = authService.getGithubAuthUrl();
      res.redirect(url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GITHUB CALLBACK =====
  async githubCallback(req, res) {
    try {
      const { code, state } = req.query;
      const result = await authService.handleGithubCallback(code, state);

      if (result.kind === 'login') {
        return res.redirect(buildOAuthSuccessRedirect(result.authResult));
      }

      return res.redirect(buildRoleSelectionRedirect(result));
    } catch (error) {
      console.error('GitHub Auth Callback Error:', error);
      res.redirect(buildFrontendUrl(`/login?error=${encodeURIComponent(error.message)}`));
    }
  }

  async completeOAuthSignup(req, res) {
    try {
      const { signupToken, role } = req.body;

      if (!signupToken || !role) {
        return res.status(400).json({ error: 'Signup token and role are required' });
      }

      const authResult = await authService.completeOAuthSignup(signupToken, role);
      res.status(201).json({
        message: 'OAuth signup completed successfully',
        ...authResult,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Export single instance
module.exports = new AuthController();
