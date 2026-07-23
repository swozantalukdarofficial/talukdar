import nodemailer from 'nodemailer';

// In-Memory Rate Limiter Map (IP -> { count, expires })
const rateLimitMap = new Map();

function isRateLimited(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.expires) {
    rateLimitMap.set(ip, { count: 1, expires: now + windowMs });
    return false;
  }
  record.count += 1;
  return record.count > limit;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit guard (max 5 subscriptions per minute per IP)
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp, 5, 60000)) {
    return res.status(429).json({ error: 'Too many newsletter requests. Please try again in 1 minute.' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shipontalukdar.webestone@gmail.com',
        pass: 'axju tmtr ipat ynbp'
      }
    });

    const refCode = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const currentYear = new Date().getFullYear();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Subscription - WeBestOne</title>
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
    .footer {
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
      padding-top: 25px;
      margin-top: 15px;
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
      
      <h3 class="doc-title">Newsletter Subscription</h3>
      <p class="doc-meta">Subscription Reference: ${refCode} &nbsp;|&nbsp; Date: ${dateStr}</p>
      
      <div class="table-container">
        <table class="info-table">
          <tr>
            <th>Subscriber Email</th>
            <td><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
          </tr>
        </table>
      </div>
      
      <div class="footer">
        <p>This request is auto-generated by WeBestOne Core Systems.<br>&copy; ${currentYear} WeBestOne. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"WeBestOne Subscriptions" <shipontalukdar.webestone@gmail.com>`,
      to: 'shipontalukdar.webestone@gmail.com',
      replyTo: email,
      subject: `[NEWSLETTER SUB] New Subscriber - ${email}`,
      html: htmlContent,
      text: `WeBestOne Newsletter Subscription\n\nReference: ${refCode}\nDate: ${dateStr}\n\nEmail: ${email}`
    });

    res.status(200).json({ success: true, ref: refCode });
  } catch (error) {
    console.error('Newsletter sub error:', error);
    res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
  }
}
