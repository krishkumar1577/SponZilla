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

  // ===== GOOGLE OAUTH URL =====
  getGoogleAuthUrl(role = 'club') {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/google/callback`;
    const scope = 'profile email';
    
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${role}`;
  }

  // ===== GOOGLE OAUTH CALLBACK =====
  async handleGoogleCallback(code, stateRole = 'club') {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/google/callback`;

    // 1. Exchange authorization code for access and ID tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Google Token Exchange Error:', errorText);
      throw new Error('Failed to exchange Google authorization code');
    }

    const tokens = await tokenResponse.json();
    const accessToken = tokens.access_token;

    // 2. Fetch user profile information using the access token
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile from Google');
    }

    const profile = await profileResponse.json();
    const { sub: googleId, name, email, picture: avatar } = profile;

    if (!email) {
      throw new Error('Google account must have an email address associated');
    }

    // 3. Find or create the user in the database
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // If user exists but googleId isn't linked yet, link it
      if (!user.googleId) {
        user.googleId = googleId;
        if (avatar && !user.avatar) {
          user.avatar = avatar;
        }
        await user.save();
      }
    } else {
      // Determine the role: if stateRole is valid, use it; otherwise default to 'club'
      const role = ['club', 'brand'].includes(stateRole) ? stateRole : 'club';

      // Create the new user (without password since it is social login)
      user = await User.create({
        name: name || 'Google User',
        email,
        role,
        googleId,
        avatar,
        verified: true, // Google accounts are pre-verified
      });
    }

    // 4. Generate Sponzilla JWT token for our app
    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        avatar: user.avatar,
      },
      token,
    };
  }

  // ===== GITHUB OAUTH URL =====
  getGithubAuthUrl(role = 'club') {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/github/callback`;
    const scope = 'user:email';
    
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${role}`;
  }

  // ===== GITHUB OAUTH CALLBACK =====
  async handleGithubCallback(code, stateRole = 'club') {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/github/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('GitHub Token Exchange Error:', errorText);
      throw new Error('Failed to exchange GitHub authorization code');
    }

    const tokens = await tokenResponse.json();
    const accessToken = tokens.access_token;

    if (!accessToken) {
      throw new Error('No access token returned from GitHub');
    }

    // 2. Fetch user profile info
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'SponZilla',
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile from GitHub');
    }

    const profile = await profileResponse.json();
    const githubId = profile.id.toString();
    const name = profile.name || profile.login;
    const avatar = profile.avatar_url;
    let email = profile.email;

    // 3. GitHub users can have hidden emails. Fetch user's emails if primary email is missing or private
    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'SponZilla',
        },
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find(e => e.primary && e.verified);
        if (primaryEmail) {
          email = primaryEmail.email;
        } else if (emails.length > 0) {
          email = emails[0].email;
        }
      }
    }

    if (!email) {
      throw new Error('GitHub account must have an email address associated');
    }

    // 4. Find or create the user
    let user = await User.findOne({ $or: [{ githubId }, { email }] });

    if (user) {
      if (!user.githubId) {
        user.githubId = githubId;
        if (avatar && !user.avatar) {
          user.avatar = avatar;
        }
        await user.save();
      }
    } else {
      const role = ['club', 'brand'].includes(stateRole) ? stateRole : 'club';

      user = await User.create({
        name: name || 'GitHub User',
        email,
        role,
        githubId,
        avatar,
        verified: true,
      });
    }

    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        avatar: user.avatar,
      },
      token,
    };
  }
}

// Export single instance
module.exports = new AuthService();
