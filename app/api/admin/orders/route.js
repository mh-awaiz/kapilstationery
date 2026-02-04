import { getSheetsClient } from "../../../../lib/googleSheets";

export async function GET(req) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sheets = getSheetsClient();

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A2:J",
    });

    const rows = res.data.values || [];
    

    const orders = rows.map((row, index) => ({
      rowIndex: index + 2, // important for delete
      orderId: row[0],
      name: row[1],
      phone: row[2],
      total: row[3],
      items: row[4],
    }));

    return Response.json(orders);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
