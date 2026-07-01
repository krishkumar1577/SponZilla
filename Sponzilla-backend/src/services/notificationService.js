const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

class NotificationService {
  constructor() {
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpHost = process.env.SMTP_HOST || 'smtp.ethereal.email';
    const smtpSecure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : smtpPort === 465;

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    this.emailFrom = process.env.EMAIL_FROM || process.env.SMTP_FROM || '"SponZilla" <noreply@sponzilla.com>';
  }

  async sendEmail(to, subject, html, options = {}) {
    const { strict = false } = options;
    // If SMTP_USER is a placeholder or not set, bypass connection and log to console immediately
    const isMock = !process.env.SMTP_USER || 
                   process.env.SMTP_USER === 'test_user' || 
                   process.env.SMTP_USER.trim() === '';

    if (isMock) {
      if (strict) {
        throw new Error('Email service is not configured');
      }
      console.log(`✉️  [MOCK EMAIL DISPATCH] (SMTP not configured)`);
      console.log(`-----------------------------------------`);
      console.log(`To:      ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)}...`);
      console.log(`-----------------------------------------`);
      return { messageId: `mock-id-${Date.now()}`, mock: true };
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.emailFrom,
        to,
        subject,
        html
      });
      console.log(`✉️ Email sent: ${info.messageId}`);
      if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
        console.log(`🔗 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
      return info;
    } catch (error) {
      if (strict) {
        console.error('❌ Email sending error:', error);
        throw new Error('Failed to send email');
      }
      console.error('❌ Email sending error, falling back to mock delivery:', error);
      console.log(`✉️  [FALLBACK EMAIL LOG]`);
      console.log(`To:      ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body (Text): ${html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)}...`);
      return { messageId: `mock-fallback-id-${Date.now()}`, error: error.message };
    }
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

    const html = `
      <h2>You have a new message on SponZilla!</h2>
      <p><strong>${senderName}</strong> has sent you a message.</p>
      <p>Log in to your dashboard to view and reply.</p>
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/messages">View Messages</a>
    `;
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

    const html = `
      <h2>New Sponsorship Bid! 🎉</h2>
      <p><strong>${brandName}</strong> has submitted a formal bid to sponsor your event: <strong>${eventTitle}</strong>.</p>
      <p>Bid Amount: ₹${amount.toLocaleString()}</p>
      <p>Log in to your dashboard to review and accept/reject the offer.</p>
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/club-dashboard">Review Bid</a>
    `;
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

    const html = `
      <h2>Sponsorship Update</h2>
      <p>Your sponsorship request has been <strong>${status}</strong> by <strong>${clubName}</strong>.</p>
      ${isAccepted ? '<p>Congratulations! You can now coordinate further details in the messages.</p>' : '<p>Don\'t worry, there are plenty of other clubs looking for sponsors!</p>'}
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand-dashboard">View Requests</a>
    `;
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

    const html = `
      <h2>Milestone Proof Uploaded 📸</h2>
      <p><strong>${clubName}</strong> has submitted proof of performance for the milestone: <strong>"${milestoneTitle}"</strong> in event: <strong>${eventTitle}</strong>.</p>
      <p>Please log in to your dashboard to review the evidence and approve or request changes.</p>
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand-dashboard">Review Proof</a>
    `;
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

    const html = `
      <h2>Milestone Update: ${isApproved ? 'Approved 🎉' : 'Needs Changes ⚠️'}</h2>
      <p><strong>${brandName}</strong> has reviewed your milestone <strong>"${milestoneTitle}"</strong> for <strong>${eventTitle}</strong>.</p>
      <p>Status: <strong>${isApproved ? 'Approved & Funds Released' : 'Requires Modifications'}</strong></p>
      ${feedback ? `<p><strong>Feedback from brand:</strong> ${feedback}</p>` : ''}
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/club-dashboard">View Dashboard</a>
    `;
    return this.sendEmail(clubUser.email, `Milestone ${isApproved ? 'Approved' : 'Needs Changes'} - ${brandName}`, html);
  }



  async sendContactEmail(name, email, subject, message) {
    const supportEmail = process.env.SUPPORT_EMAIL || 'Sponzilla.k@gmail.com';
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;
    return this.sendEmail(supportEmail, `Contact Form: ${subject}`, html);
  }
}

module.exports = new NotificationService();
