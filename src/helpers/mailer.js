import nodemailer from 'nodemailer';
import User from '@/models/user-model';
import bcryptjs from 'bcryptjs';
import { htmlEmail } from './html-email-verify';
import { htmlPassword } from './html-password-change';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //hashed token creation
    const createdHashedToken = await bcryptjs.hash(userId.toString(), 10);

    const removeSpecialChars = (input) => {
      return input.replace(/[^\w\s]/gi, '');
    };

    const hashedToken = removeSpecialChars(createdHashedToken);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'patilerceinfo@gmail.com',
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html:
        emailType === 'VERIFY'
          ? htmlEmail(
              `http://${process.env.DOMAIN}/verify-email?token=${hashedToken}`
            )
          : htmlPassword(
              `http://${process.env.DOMAIN}/password-change?token=${hashedToken}`
            ),
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error(error.message);
  }
};
