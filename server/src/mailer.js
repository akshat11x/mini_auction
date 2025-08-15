// mailer.js - SendGrid email client setup
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'SG.FtToI8MpSy--uml8rfcqlpg.wnrUSU8-CRVFlkpmQjNhqFS-quSwbP9Q3GI7ImNa5k');

function sendAuctionEmail(to, subject, html) {
  const msg = {
    to,
    from: 'raghav.garg-coend@bvp.edu.in', // Change to your verified sender
    subject,
    html,
  };
  return sgMail.send(msg);
}

module.exports = { sendAuctionEmail };
