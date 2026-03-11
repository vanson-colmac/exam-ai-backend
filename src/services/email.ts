// Email service for sending notifications

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationEmail = async (email: string, code: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
    to: email,
    subject: 'Verify your Exam AI account',
    html: `
      <h2>Welcome to Exam AI!</h2>
      <p>Please use this code to verify your email address:</p>
      <h1 style="color: #3B82F6; font-size: 32px; letter-spacing: 2px;">${code}</h1>
      <p>This code expires in 10 minutes.</p>
      <p>If you didn't create this account, please ignore this email.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Verification email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send verification email:', error)
  }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
    to: email,
    subject: 'Welcome to Exam AI',
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>We're excited to have you on Exam AI.</p>
      <p>Start generating AI-powered exam questions in seconds.</p>
      <a href="https://exam-ai.vercel.app/dashboard" style="background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Go to Dashboard</a>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Need help? <a href="https://exam-ai.vercel.app/support">Contact Support</a>
      </p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Welcome email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
    to: email,
    subject: 'Reset your Exam AI password',
    html: `
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password.</p>
      <a href="${resetLink}" style="background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Password reset email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send password reset email:', error)
  }
}

export const sendUpgradeConfirmation = async (email: string, plan: string, amount: number) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
    to: email,
    subject: 'Upgrade Confirmation - Exam AI',
    html: `
      <h2>Thank you for upgrading!</h2>
      <p>Your account has been upgraded to the <strong>${plan} plan</strong>.</p>
      <p>Amount: <strong>$${(amount / 100).toFixed(2)}</strong></p>
      <p>You now have:</p>
      <ul>
        <li>Unlimited questions per day</li>
        <li>Access to all topics</li>
        <li>Advanced analytics</li>
        <li>Priority support</li>
      </ul>
      <a href="https://exam-ai.vercel.app/dashboard" style="background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Go to Dashboard</a>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Upgrade confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send upgrade confirmation:', error)
  }
}
