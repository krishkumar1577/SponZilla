const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');

const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;
const OAUTH_SIGNUP_TTL_MS = 15 * 60 * 1000;
const OAUTH_AUTH_TTL_MS = 5 * 60 * 1000;

class AuthService {
  constructor() {
    this.oauthStates = new Map();
    this.pendingOAuthSignups = new Map();
    this.oauthAuthSessions = new Map();

    const cleanupInterval = setInterval(() => {
      this.cleanupExpiredSessions();
    }, 5 * 60 * 1000);

    if (typeof cleanupInterval.unref === 'function') {
      cleanupInterval.unref();
    }
  }

  cleanupExpiredSessions() {
    const now = Date.now();

    [this.oauthStates, this.pendingOAuthSignups, this.oauthAuthSessions].forEach((store) => {
      for (const [key, value] of store.entries()) {
        if (!value || value.expiresAt <= now) {
          store.delete(key);
        }
      }
    });
  }

  async getProfileCompletionStatus(userId, role) {
    if (role === 'admin') {
      return true;
    }

    if (role === 'club') {
      return !!(await ClubProfile.exists({ userId }));
    }

    if (role === 'brand') {
      return !!(await BrandProfile.exists({ userId }));
    }

    return false;
  }

  buildUserPayload(user, profileCompleted) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar || null,
      profileCompleted,
    };
  }

  async createAuthResult(user) {
    const profileCompleted = await this.getProfileCompletionStatus(user._id, user.role);

    return {
      user: this.buildUserPayload(user, profileCompleted),
      accessToken: this.generateToken(user._id),
      refreshToken: this.generateRefreshToken(user._id),
    };
  }

  async register(name, email, password, role) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
      isEmailVerified: false,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    console.log('Verification URL:', verificationUrl);

    return this.createAuthResult(user);
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return this.createAuthResult(user);
  }

  async getProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    const profileCompleted = await this.getProfileCompletionStatus(user._id, user.role);
    return this.buildUserPayload(user, profileCompleted);
  }

  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  }

  generateRefreshToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  generateOAuthState(provider) {
    const state = crypto.randomBytes(32).toString('hex');

    this.oauthStates.set(state, {
      provider,
      expiresAt: Date.now() + OAUTH_STATE_TTL_MS,
    });

    return state;
  }

  validateOAuthState(state, expectedProvider) {
    const storedState = this.oauthStates.get(state);

    if (
      !storedState ||
      storedState.provider !== expectedProvider ||
      storedState.expiresAt <= Date.now()
    ) {
      this.oauthStates.delete(state);
      throw new Error('Invalid OAuth state - possible CSRF attack');
    }

    this.oauthStates.delete(state);
  }

  createOAuthAuthSession(authResult) {
    const sessionId = crypto.randomBytes(32).toString('hex');

    this.oauthAuthSessions.set(sessionId, {
      authResult,
      expiresAt: Date.now() + OAUTH_AUTH_TTL_MS,
    });

    return sessionId;
  }

  exchangeOAuthAuthSession(sessionId) {
    const session = this.oauthAuthSessions.get(sessionId);

    if (!session || session.expiresAt <= Date.now()) {
      this.oauthAuthSessions.delete(sessionId);
      throw new Error('OAuth session expired. Please try signing in again.');
    }

    this.oauthAuthSessions.delete(sessionId);
    return session.authResult;
  }

  createPendingOAuthSignup(profile) {
    const sessionId = crypto.randomBytes(32).toString('hex');

    this.pendingOAuthSignups.set(sessionId, {
      ...profile,
      expiresAt: Date.now() + OAUTH_SIGNUP_TTL_MS,
    });

    return sessionId;
  }

  getPendingOAuthSignup(sessionId) {
    const session = this.pendingOAuthSignups.get(sessionId);

    if (!session || session.expiresAt <= Date.now()) {
      this.pendingOAuthSignups.delete(sessionId);
      throw new Error('OAuth signup session expired. Please try again.');
    }

    return {
      sessionId,
      provider: session.provider,
      name: session.name,
      email: session.email,
      avatar: session.avatar || null,
    };
  }

  async completeOAuthSignup(sessionId, role) {
    if (!['club', 'brand'].includes(role)) {
      throw new Error('Role must be either "club" or "brand"');
    }

    const session = this.pendingOAuthSignups.get(sessionId);
    if (!session || session.expiresAt <= Date.now()) {
      this.pendingOAuthSignups.delete(sessionId);
      throw new Error('OAuth signup session expired. Please try again.');
    }

    const providerIdField = session.provider === 'google' ? 'googleId' : 'githubId';
    const providerId = session.provider === 'google' ? session.googleId : session.githubId;

    let user = await User.findOne({
      $or: [{ email: session.email }, { [providerIdField]: providerId }],
    });

    if (user) {
      user[providerIdField] = providerId;
      if (session.avatar && !user.avatar) {
        user.avatar = session.avatar;
      }
      await user.save();
    } else {
      user = await User.create({
        name: session.name,
        email: session.email,
        role,
        [providerIdField]: providerId,
        avatar: session.avatar || null,
        verified: true,
        isEmailVerified: true,
      });
    }

    this.pendingOAuthSignups.delete(sessionId);
    return this.createAuthResult(user);
  }

  async linkExistingSocialUser(user, providerField, providerId, avatar) {
    if (!user[providerField]) {
      user[providerField] = providerId;
    }

    if (avatar && !user.avatar) {
      user.avatar = avatar;
    }

    await user.save();
    return user;
  }

  getGoogleAuthUrl() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/google/callback`;
    const scope = 'profile email';
    const state = this.generateOAuthState('google');

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  async handleGoogleCallback(code, state) {
    this.validateOAuthState(state, 'google');

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/google/callback`;

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
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
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

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      user = await this.linkExistingSocialUser(user, 'googleId', googleId, avatar);
      return {
        kind: 'login',
        sessionId: this.createOAuthAuthSession(await this.createAuthResult(user)),
      };
    }

    return {
      kind: 'signup',
      sessionId: this.createPendingOAuthSignup({
        provider: 'google',
        googleId,
        name: name || 'Google User',
        email,
        avatar,
      }),
    };
  }

  getGithubAuthUrl() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/github/callback`;
    const scope = 'user:email';
    const state = this.generateOAuthState('github');

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  async handleGithubCallback(code, state) {
    this.validateOAuthState(state, 'github');

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    const redirectUri = `${backendUrl}/api/auth/github/callback`;

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
    const name = profile.name || profile.login || 'GitHub User';
    const avatar = profile.avatar_url;
    let email = profile.email;

    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'SponZilla',
        },
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find((entry) => entry.primary && entry.verified);
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

    let user = await User.findOne({ $or: [{ githubId }, { email }] });

    if (user) {
      user = await this.linkExistingSocialUser(user, 'githubId', githubId, avatar);
      return {
        kind: 'login',
        sessionId: this.createOAuthAuthSession(await this.createAuthResult(user)),
      };
    }

    return {
      kind: 'signup',
      sessionId: this.createPendingOAuthSignup({
        provider: 'github',
        githubId,
        name,
        email,
        avatar,
      }),
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user || !user.password) {
      throw new Error('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });

    return { message: 'Password changed successfully' };
  }

  async updateAccount(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('Email already exists');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password' }
    );

    const profileCompleted = await this.getProfileCompletionStatus(updatedUser._id, updatedUser.role);

    return {
      user: this.buildUserPayload(updatedUser, profileCompleted),
    };
  }

  async getSettings(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

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
        theme: 'light',
        language: 'en',
      },
    };
  }

  async updateSettings(userId, settings) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      message: 'Settings updated successfully',
      settings,
    };
  }
}

module.exports = new AuthService();
