import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";
import { transporter } from "./mailtrap.config.js";

@param {string} email - recipient email
 * @param {string} verificationToken - token to verify email
 * @returns {Promise<object>} - info about the sent email
 */
export const sendVerificationEmail = async (email, verificationToken) => {
  if (!email || !verificationToken) {
    throw new Error("Email and verification token are required.");
  }

  // Using template literals for easier customization
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Verify Your Email</h2>
      <p>Thank you for signing up! Please use the verification code below to verify your email:</p>
      <h3 style="color: #4CAF50;">${verificationToken}</h3>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || "Your App"}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return info; // return info for further logging or tracking
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Unable to send verification email. Please try again later.");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = WELCOME_EMAIL.replace("{user_name}", name);
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Welcome ${name}`,
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, reseturl) => {
  const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    reseturl
  );
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const resetSuccessEmail = async (email) => {
  const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;
  const mailOptions = {
    from: `"Souvik ka authentication" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "password Reset Successful",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending password Reset Successful email: ${error}`);
  }
};
