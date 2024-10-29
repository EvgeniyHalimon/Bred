import { config } from 'src/config';

export const confirmationMail = (token: string, firstName: string): string => {
  return `
<html lang="en">
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
    }
    .content {
      padding: 30px;
      background-color: #ffffff;
      color: #333333;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333333;
      font-weight: bold;
    }
    p {
      line-height: 1.6;
      color: #555555;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #3498DB;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 16px;
      display: inline-block;
      transition: 0.7s;
    }
    .button:hover {
      background-color: #2C3E50;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2>Hello ${firstName}!</h2>
      <p>Welcome to Bred! We're thrilled to have you with us.</p>
      <p>To complete your registration, please confirm your email address by clicking the button below:</p>
      <div class="button-container">
        <a href="${config.FE_URL}/welcome/${token}" class="button">Confirm Your Email</a>
      </div>
      <p>If you didn’t create an account with us, please disregard this message.</p>
      <p>Best regards,</p>
      <p><strong>Bred Team</strong></p>
    </div>
    <div class="footer">
      <p>You’re receiving this email because you recently created an account with Bred.</p>
    </div>
  </div>
</body>
</html>`;
};
