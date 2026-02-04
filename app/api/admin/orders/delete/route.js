import { getSheetsClient } from "../../../../../lib/googleSheets";

export async function POST(req) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rowIndex } = await req.json();

    const sheets = getSheetsClient();

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Orders sheet index (usually 0)
                dimension: "ROWS",
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          },
        ],
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
