const { Resend } = require('resend');
const Notification = require('../models/Notification');

class NotificationService {
  constructor() {
    this.apiKey = process.env.RESEND_API_KEY;
    this.emailFrom = process.env.EMAIL_FROM || '"SponZilla" <onboarding@resend.dev>';
    
    // Check if we should run in Mock mode
    this.isMock = !this.apiKey ||
                  this.apiKey.trim() === '' ||
                  this.apiKey.startsWith('re_your_api_key') ||
                  this.apiKey === 'placeholder';

    if (!this.isMock) {
      this.resend = new Resend(this.apiKey);
    }
  }

  async sendEmail(to, subject, html, options = {}) {
    const { strict = false } = options;

    if (this.isMock) {
      if (strict) {
        throw new Error('Email service is not configured (Running in Mock mode)');
      }
      console.log(`✉️  [MOCK EMAIL DISPATCH] (Resend SDK not configured/Mock Mode)`);
      console.log(`-----------------------------------------`);
      console.log(`To:      ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)}...`);
      console.log(`-----------------------------------------`);
      return { id: `mock-id-${Date.now()}`, mock: true };
    }

    try {
      const response = await this.resend.emails.send({
        from: this.emailFrom,
        to: [to],
        subject,
        html
      });

      if (response.error) {
        console.error('❌ Resend API returned error:', response.error);
        if (strict) {
          throw new Error(`Failed to send email: ${response.error.message}`);
        }
        // Fallback to mock log on error
        console.log(`✉️  [FALLBACK EMAIL LOG]`);
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body (Text): ${html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)}...`);
        return { id: `mock-fallback-id-${Date.now()}`, error: response.error.message };
      }

      console.log(`✉️ Email sent: ${response.data.id}`);
      return response.data;
    } catch (error) {
      if (strict) {
        console.error('❌ Email sending error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }
      console.error('❌ Email sending error, falling back to mock delivery:', error);
      console.log(`✉️  [FALLBACK EMAIL LOG]`);
      console.log(`To:      ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body (Text): ${html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)}...`);
      return { id: `mock-fallback-id-${Date.now()}`, error: error.message };
    }
  }

  getEmailHtmlWrapper(title, contentHtml, ctaText = null, ctaUrl = null) {
    const ctaButtonHtml = ctaText && ctaUrl
      ? `
        <div style="margin: 32px 0 16px 0; text-align: center;">
          <a href="${ctaUrl}" style="background-color: #121516; color: #ffffff; padding: 14px 28px; font-weight: bold; font-size: 14px; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            ${ctaText}
          </a>
        </div>
      `
      : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f6f8f9; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #121516; line-height: 1.6;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f8f9; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px;">
                <!-- HEADER / LOGO -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <span style="font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #121516;">Spon<span style="color: #6366f1;">Zilla</span></span>
                  </td>
                </tr>
                <!-- CARD -->
                <tr>
                  <td style="background-color: #ffffff; border-radius: 20px; border: 1px solid #dde1e3; box-shadow: 0 4px 12px rgba(18, 21, 22, 0.03); overflow: hidden;">
                    <!-- Accent Line -->
                    <div style="height: 6px; background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);"></div>
                    <!-- Body Content -->
                    <div style="padding: 40px 32px;">
                      <h1 style="margin-top: 0; margin-bottom: 20px; font-size: 22px; font-weight: 700; color: #121516; letter-spacing: -0.3px;">
                        ${title}
                      </h1>
                      <div style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                        ${contentHtml}
                      </div>
                      ${ctaButtonHtml}
                    </div>
                  </td>
                </tr>
                <!-- FOOTER -->
                <tr>
                  <td align="center" style="padding-top: 32px; padding-bottom: 16px;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 500;">
                      Sent by SponZilla. Connecting clubs and brands.
                    </p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8;">
                      Need support? Contact us at <a href="mailto:Sponzilla.k@gmail.com" style="color: #6366f1; text-decoration: none; font-weight: 600;">Sponzilla.k@gmail.com</a>
                    </p>
                    <p style="margin: 16px 0 0 0; font-size: 11px; color: #cbd5e1;">
                      &copy; 2026 SponZilla. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  async sendWelcomeEmail(user, profile = null) {
    if (!user || !user.email) return;

    const title = `Welcome to SponZilla, ${user.name}!`;

    if (user.role === 'club' || user.type === 'club') {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const variables = {
        user_name: user.name,
        first_name: user.name ? user.name.trim().split(/\s+/)[0] : 'there',
        onboarding_link: `${frontendUrl}/club-dashboard`,
        get_started_url: `${frontendUrl}/club-dashboard`,
        company_name: profile?.clubName || 'your Club'
      };

      if (this.isMock) {
        console.log(`✉️  [MOCK EMAIL DISPATCH] (Using Resend Dashboard Template: welcome-email_club)`);
        console.log(`-----------------------------------------`);
        console.log(`To:      ${user.email}`);
        console.log(`Subject: ${title}`);
        console.log(`Template: welcome-email_club`);
        console.log(`Variables:`, JSON.stringify(variables, null, 2));
        console.log(`-----------------------------------------`);
        return { id: `mock-id-${Date.now()}`, mock: true };
      }

      try {
        const response = await this.resend.emails.send({
          from: this.emailFrom,
          to: [user.email],
          subject: title,
          template: {
            id: 'welcome-email_club',
            variables: variables
          }
        });

        if (response.error) {
          console.error('❌ Resend API returned error:', response.error);
          return { id: `mock-fallback-id-${Date.now()}`, error: response.error.message };
        }

        console.log(`✉️ Email sent using template welcome-email_club: ${response.data.id}`);
        return response.data;
      } catch (error) {
        console.error('❌ Email sending error:', error);
        return { id: `mock-fallback-id-${Date.now()}`, error: error.message };
      }
    }

    if (user.role === 'brand' || user.type === 'brand') {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const variables = {
        user_name: user.name,
        first_name: user.name ? user.name.trim().split(/\s+/)[0] : 'there',
        onboarding_link: `${frontendUrl}/brand-dashboard`,
        get_started_url: `${frontendUrl}/brand-dashboard`,
        company_name: profile?.brandName || 'your Brand'
      };

      if (this.isMock) {
        console.log(`✉️  [MOCK EMAIL DISPATCH] (Using Resend Dashboard Template: welcome-email_brand)`);
        console.log(`-----------------------------------------`);
        console.log(`To:      ${user.email}`);
        console.log(`Subject: ${title}`);
        console.log(`Template: welcome-email_brand`);
        console.log(`Variables:`, JSON.stringify(variables, null, 2));
        console.log(`-----------------------------------------`);
        return { id: `mock-id-${Date.now()}`, mock: true };
      }

      try {
        const response = await this.resend.emails.send({
          from: this.emailFrom,
          to: [user.email],
          subject: title,
          template: {
            id: 'welcome-email_brand',
            variables: variables
          }
        });

        if (response.error) {
          console.error('❌ Resend API returned error:', response.error);
          return { id: `mock-fallback-id-${Date.now()}`, error: response.error.message };
        }

        console.log(`✉️ Email sent using template welcome-email_brand: ${response.data.id}`);
        return response.data;
      } catch (error) {
        console.error('❌ Email sending error:', error);
        return { id: `mock-fallback-id-${Date.now()}`, error: error.message };
      }
    }

    // Default flow for other roles using code template wrapper
    let welcomeText = `
      <p>We are thrilled to welcome you to SponZilla! Your gateway to easy sponsorship connections between clubs and brands.</p>
      <p>Log in to your account and complete your onboarding profile to unlock all platform capabilities.</p>
    `;
    let ctaText = 'Complete Profile';
    let ctaUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/onboarding`;

    const bodyHtml = `
      <p>Hello ${user.name},</p>
      ${welcomeText}
      <p>If you have any questions or need assistance, feel free to reach out to our team at any time.</p>
      <p>Best regards,<br>The SponZilla Team</p>
    `;

    const html = this.getEmailHtmlWrapper(title, bodyHtml, ctaText, ctaUrl);
    return this.sendEmail(user.email, title, html);
  }

  async sendAccountVerificationEmail(user, verificationUrl) {
    if (!user || !user.email) return;

    const title = 'Verify your SponZilla account';
    const bodyHtml = `
      <p>Hello ${user.name},</p>
      <p>Welcome to SponZilla! We are excited to have you on board.</p>
      <p>Please click the button below to verify your email address and continue with your onboarding. This link is valid for 24 hours.</p>
    `;
    
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'Verify Email Address', verificationUrl);
    return this.sendEmail(user.email, title, html, { strict: true });
  }

  async sendPasswordResetEmail(user, resetUrl) {
    if (!user || !user.email) return;

    const title = 'Reset your SponZilla password';
    const bodyHtml = `
      <p>Hello ${user.name},</p>
      <p>We received a request to reset the password for your SponZilla account. If you did not make this request, you can safely ignore this email.</p>
      <p>Please click the button below to choose a new password. This link is valid for 1 hour.</p>
    `;

    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'Reset Password', resetUrl);
    return this.sendEmail(user.email, title, html, { strict: true });
  }

  async sendNewMessageEmail(recipientUser, senderName) {
    if (!recipientUser || !recipientUser.email) return;
    
    // Create in-app notification
    try {
      await Notification.create({
        userId: recipientUser._id,
        title: 'New Message',
        message: `${senderName} has sent you a message.`,
        type: 'message',
        link: '/messages'
      });
    } catch (err) {
      console.error('Failed to create in-app notification:', err);
    }

    const title = 'New Message Notification';
    const bodyHtml = `
      <p>Hello,</p>
      <p><strong>${senderName}</strong> has sent you a message on SponZilla.</p>
      <p>Log in to your dashboard to view the message details and reply.</p>
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'View Messages', `${process.env.FRONTEND_URL || 'http://localhost:5173'}/messages`);
    return this.sendEmail(recipientUser.email, `New Message from ${senderName}`, html);
  }

  async sendNewSponsorshipBidEmail(clubUser, brandName, eventTitle, amount) {
    if (!clubUser || !clubUser.email) return;
    
    // Create in-app notification
    try {
      await Notification.create({
        userId: clubUser._id,
        title: 'New Sponsorship Bid',
        message: `${brandName} has submitted a bid for ${eventTitle}.`,
        type: 'sponsorship_bid',
        link: '/club-dashboard'
      });
    } catch (err) {
      console.error('Failed to create in-app notification:', err);
    }

    const title = 'New Sponsorship Bid! 🎉';
    const bodyHtml = `
      <p>Hello,</p>
      <p><strong>${brandName}</strong> has submitted a formal bid to sponsor your event: <strong>${eventTitle}</strong>.</p>
      <p style="font-size: 16px; font-weight: 700; color: #121516; margin: 16px 0;">Bid Amount: ₹${amount.toLocaleString()}</p>
      <p>Please log in to your dashboard to review the proposal, chat with the brand, and accept or decline the offer.</p>
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'Review Bid', `${process.env.FRONTEND_URL || 'http://localhost:5173'}/club-dashboard`);
    return this.sendEmail(clubUser.email, `New Bid from ${brandName} for ${eventTitle}`, html);
  }

  async sendSponsorshipUpdateEmail(brandUser, clubName, status) {
    if (!brandUser || !brandUser.email) return;
    const isAccepted = status === 'accepted';
    
    // Create in-app notification
    try {
      await Notification.create({
        userId: brandUser._id,
        title: 'Sponsorship Update',
        message: `Your request was ${status} by ${clubName}.`,
        type: 'sponsorship_update',
        link: '/brand-dashboard'
      });
    } catch (err) {
      console.error('Failed to create in-app notification:', err);
    }

    const title = `Sponsorship Request ${status === 'accepted' ? 'Accepted! 🎉' : 'Declined'}`;
    const bodyHtml = `
      <p>Hello,</p>
      <p>Your sponsorship request has been <strong>${status}</strong> by <strong>${clubName}</strong>.</p>
      ${isAccepted 
        ? '<p>Congratulations! You can now coordinate further deliverables and payment milestones in the messages.</p>' 
        : '<p>Don\'t worry, there are plenty of other active clubs looking for sponsors on SponZilla!</p>'
      }
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'View Requests', `${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand-dashboard`);
    return this.sendEmail(brandUser.email, `Your Sponsorship Request was ${status}`, html);
  }

  async sendMilestoneSubmissionEmail(brandUser, clubName, eventTitle, milestoneTitle) {
    if (!brandUser || !brandUser.email) return;
    
    // Create in-app notification
    try {
      await Notification.create({
        userId: brandUser._id,
        title: 'Milestone Proof Uploaded',
        message: `${clubName} has uploaded proof of performance for the milestone "${milestoneTitle}".`,
        type: 'escrow_update',
        link: '/brand-dashboard'
      });
    } catch (err) {
      console.error('Failed to create in-app notification:', err);
    }

    const title = 'Milestone Proof Uploaded 📸';
    const bodyHtml = `
      <p>Hello,</p>
      <p><strong>${clubName}</strong> has submitted proof of performance for the milestone <strong>"${milestoneTitle}"</strong> in event: <strong>${eventTitle}</strong>.</p>
      <p>Please log in to your brand dashboard to review the evidence and either release the funds or request changes.</p>
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'Review Proof', `${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand-dashboard`);
    return this.sendEmail(brandUser.email, `Milestone Proof Uploaded - ${clubName}`, html);
  }

  async sendMilestoneStatusEmail(clubUser, brandName, eventTitle, milestoneTitle, status, feedback) {
    if (!clubUser || !clubUser.email) return;
    const isApproved = status === 'verified';

    // Create in-app notification
    try {
      await Notification.create({
        userId: clubUser._id,
        title: isApproved ? 'Milestone Approved' : 'Milestone Change Requested',
        message: isApproved 
          ? `${brandName} has approved your proof for "${milestoneTitle}".`
          : `${brandName} has requested updates for "${milestoneTitle}".`,
        type: 'escrow_update',
        link: '/club-dashboard'
      });
    } catch (err) {
      console.error('Failed to create in-app notification:', err);
    }

    const title = `Milestone Update: ${isApproved ? 'Approved 🎉' : 'Needs Changes ⚠️'}`;
    const bodyHtml = `
      <p>Hello,</p>
      <p><strong>${brandName}</strong> has reviewed your milestone <strong>"${milestoneTitle}"</strong> for <strong>${eventTitle}</strong>.</p>
      <p>Status: <strong>${isApproved ? 'Approved & Funds Released' : 'Requires Modifications'}</strong></p>
      ${feedback ? `<div style="background-color: #f7fafc; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #edf2f7; font-style: italic;"><strong>Feedback from brand:</strong> ${feedback}</div>` : ''}
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml, 'View Dashboard', `${process.env.FRONTEND_URL || 'http://localhost:5173'}/club-dashboard`);
    return this.sendEmail(clubUser.email, `Milestone ${isApproved ? 'Approved' : 'Needs Changes'} - ${brandName}`, html);
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async sendContactEmail(name, email, subject, message) {
    const supportEmail = process.env.SUPPORT_EMAIL || 'Sponzilla.k@gmail.com';
    const safeName = this.escapeHtml(name);
    const safeEmail = this.escapeHtml(email);
    const safeSubject = this.escapeHtml(subject);
    const safeMessage = this.escapeHtml(message).replace(/\n/g, '<br/>');

    const title = 'New Contact Form Submission';
    const bodyHtml = `
      <p>You have received a new message from the SponZilla contact form:</p>
      <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px 0; font-size: 14px;">
        <tr>
          <td style="padding: 6px 12px 6px 0; font-weight: 700; color: #4a5568;">Name:</td>
          <td style="color: #121516;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 12px 6px 0; font-weight: 700; color: #4a5568;">Email:</td>
          <td style="color: #121516;"><a href="mailto:${safeEmail}" style="color: #6366f1; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 12px 6px 0; font-weight: 700; color: #4a5568;">Subject:</td>
          <td style="color: #121516;">${safeSubject}</td>
        </tr>
      </table>
      <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px; font-style: italic; margin-top: 16px; font-size: 14px;">
        ${safeMessage}
      </div>
    `;
    const html = this.getEmailHtmlWrapper(title, bodyHtml);
    return this.sendEmail(supportEmail, `Contact Form: ${safeSubject}`, html);
  }
}

module.exports = new NotificationService();
