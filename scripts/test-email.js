import nodemailer from 'nodemailer';

async function main() {
  console.log('Sending test email using your Gmail configuration...');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shipontalukdar.webestone@gmail.com',
      pass: 'axju tmtr ipat ynbp'
    }
  });

  const refCode = `WBO-TEST-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email - WeBestOne</title>
  <style>
    body {
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 40px 10px;
    }
    .a4-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      overflow: visible;
      word-wrap: break-word;
      word-break: break-word;
    }
    .header-bar {
      height: 6px;
      background: linear-gradient(90deg, #87E65C 0%, #10b981 100%);
    }
    .content {
      padding: 40px 30px;
    }
    .brand-section {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 1px solid #f3f4f6;
      padding-bottom: 25px;
    }
    .brand-logo {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
      border-radius: 12px;
    }
    .brand-name {
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      margin: 0;
    }
    .brand-tagline {
      font-size: 11px;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 4px 0 0 0;
    }
    .doc-title {
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      margin: 0 0 8px 0;
      text-align: center;
    }
    .doc-meta {
      font-size: 12px;
      color: #6b7280;
      text-align: center;
      margin-bottom: 35px;
    }
    .table-container {
      margin-bottom: 30px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .info-table th, .info-table td {
      padding: 12px 14px;
      text-align: left;
      font-size: 14px;
      border-bottom: 1px solid #f3f4f6;
      word-wrap: break-word;
      word-break: break-word;
    }
    .info-table th {
      background-color: #f9fafb;
      color: #4b5563;
      font-weight: 600;
      width: 35%;
    }
    .info-table td {
      color: #1f2937;
      font-weight: 500;
      width: 65%;
    }
    .message-section {
      background-color: #f9fafb;
      border-left: 4px solid #87E65C;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 35px;
      word-wrap: break-word;
      word-break: break-word;
    }
    .message-title {
      font-size: 12px;
      font-weight: 700;
      color: #4b5563;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 10px 0;
    }
    .message-body {
      font-size: 14px;
      line-height: 1.6;
      color: #374151;
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
      padding-top: 25px;
      margin-top: 15px;
    }

    @media only screen and (max-width: 600px) {
      body {
        padding: 15px 5px !important;
      }
      .content {
        padding: 25px 15px !important;
      }
      .info-table th {
        width: 40% !important;
        font-size: 13px !important;
        padding: 10px 8px !important;
      }
      .info-table td {
        width: 60% !important;
        font-size: 13px !important;
        padding: 10px 8px !important;
      }
      .message-section {
        padding: 15px !important;
      }
    }
  </style>
</head>
<body>
  <div class="a4-container">
    <div class="header-bar"></div>
    <div class="content">
      <div class="brand-section">
        <img class="brand-logo" src="https://raw.githubusercontent.com/dev-shipon/webestone1/main/public/uploads/1770469463115-Webestone-icon.png" alt="WeBestOne Logo" />
        <h2 class="brand-name">WeBestOne</h2>
        <p class="brand-tagline">Your Guide in Automated World</p>
      </div>
      
      <h3 class="doc-title">Project Inquiry Document</h3>
      <p class="doc-meta">Inquiry Reference: ${refCode} &nbsp;|&nbsp; Date: ${dateStr}</p>
      
      <div class="table-container">
        <table class="info-table">
          <tr>
            <th>Client Name</th>
            <td>Shipon Talukdar (Responsive Test)</td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td><a href="mailto:shipontalukdaroffice@gmail.com" style="color: #10b981; text-decoration: none;">shipontalukdaroffice@gmail.com</a></td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>01333600272</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>Fast It</td>
          </tr>
          <tr>
            <th>Service Requested</th>
            <td>SEO & AI Solutions</td>
          </tr>
        </table>
      </div>
      
      <div class="message-section">
        <h4 class="message-title">Client Message & Requirements</h4>
        <p class="message-body">This is an updated responsive formatting test with long text wrapping logic to ensure there are no cutoffs or broken images: tuicvbfgbtuicvbfgbtuicvbfgbtuicvbfgbtuicvbfgbtuicvbfgb.</p>
      </div>
      
      <div class="footer">
        <p>This document is auto-generated by WeBestOne Core Systems.<br>&copy; ${new Date().getFullYear()} WeBestOne. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"WeBestOne Responsive Test" <shipontalukdar.webestone@gmail.com>`,
      to: 'shipontalukdar.webestone@gmail.com',
      subject: `[TEST EMAIL] Responsive SMTP Verification`,
      html: htmlContent
    });
    console.log('✅ Success! Test email sent successfully.');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

main();
