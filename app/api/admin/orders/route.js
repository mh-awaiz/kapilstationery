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
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1!A2:J", 
  });

  const rows = response.data.values || [];

 const orders = rows.map((row) => ({
   orderId: row[0] || "", // Order Id
   name: row[1] || "", // Name
   phone: row[2] || "", // Phone Number
   email: row[3] || "", // Gmail
   address: row[4] || "", // Address
   isJamia: row[5]?.toUpperCase() === "YES" ? "YES" : "NO",
   deliveryCharge: Number(row[6] || 0), // Delivery Charge
   items: row[7] || "", // Iteam
   total: Number(row[8] || 0), // Total Amount
   date: row[9] || "", // Timestamp
 }));

  return Response.json({ orders });
}
