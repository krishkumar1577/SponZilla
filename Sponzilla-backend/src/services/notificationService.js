const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    this.emailFrom = process.env.EMAIL_FROM || '"SponZilla" <noreply@sponzilla.com>';
  }

  async sendEmail(to, subject, html) {
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
      console.error('Email sending error:', error);
      throw error;
    }
  }

  async sendNewMessageEmail(recipientUser, senderName) {
    if (!recipientUser || !recipientUser.email) return;
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
    const html = `
      <h2>New Sponsorship Bid! 🎉</h2>
      <p><strong>${brandName}</strong> has submitted a formal bid to sponsor your event: <strong>${eventTitle}</strong>.</p>
      <p>Bid Amount: ₹${amount.toLocaleString()}</p>
      <p>Log in to your dashboard to review and accept/reject the offer.</p>
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/club/requests">Review Bid</a>
    `;
    return this.sendEmail(clubUser.email, `New Bid from ${brandName} for ${eventTitle}`, html);
  }

  async sendSponsorshipUpdateEmail(brandUser, clubName, status) {
    if (!brandUser || !brandUser.email) return;
    const isAccepted = status === 'accepted';
    const html = `
      <h2>Sponsorship Update</h2>
      <p>Your sponsorship request has been <strong>${status}</strong> by <strong>${clubName}</strong>.</p>
      ${isAccepted ? '<p>Congratulations! You can now coordinate further details in the messages.</p>' : '<p>Don\'t worry, there are plenty of other clubs looking for sponsors!</p>'}
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/brand/requests">View Requests</a>
    `;
    return this.sendEmail(brandUser.email, `Your Sponsorship Request was ${status}`, html);
  }
}

module.exports = new NotificationService();
