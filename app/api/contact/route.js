import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Google Auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Save to Google Sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, message, new Date().toLocaleString()]],
    },
  });

  // Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message",
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
  });

  return Response.json({ success: true });
}
