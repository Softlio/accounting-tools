import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.SMTP_HOST,
  from: process.env.SMTP_FROM,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
