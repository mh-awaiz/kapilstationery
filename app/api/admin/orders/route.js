export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { google } from "googleapis";

export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A2:J",
  });

  const rows = response.data.values || [];

  const orders = rows.map((row) => ({
    orderId: row[0] || "",
    name: row[1] || "",
    phone: row[2] || "",
    email: row[3] || "",
    address: row[4] || "",
    isJamia: row[5]?.toUpperCase() === "YES" ? "YES" : "NO",
    deliveryCharge: Number(row[6] || 0),
    items: row[7] || "",
    total: Number(row[8] || 0),
    date: row[9] || "",
  }));

  return Response.json({ orders });
}
