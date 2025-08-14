// mailer.js - SendGrid email client setup
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'YOUR_SENDGRID_API_KEY');

function sendAuctionEmail(to, subject, html) {
  const msg = {
    to,
    from: 'no-reply@miniauction.com', // Change to your verified sender
    subject,
    html,
  };
  return sgMail.send(msg);
}

module.exports = { sendAuctionEmail };
