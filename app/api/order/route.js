import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

/* ---------- GOOGLE SHEETS SETUP ---------- */
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function POST(req) {
  try {
    const { customer, cart, total } = await req.json();

    if (!customer?.name || !customer?.phone || !cart?.length) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 },
      );
    }

    const productsText = cart
      .map(
        (item) =>
          `${item.title} (Qty: ${item.quantity}) - ₹${
            item.price * item.quantity
          }`,
      )
      .join(" | ");

    const orderId = `ORD-${Date.now()}`;

    /* ---------- SAVE TO GOOGLE SHEET (PRIMARY) ---------- */
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:H",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            orderId,
            customer.name,
            customer.phone,
            customer.email || "N/A",
            customer.address,
            productsText,
            total,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    /* ---------- EMAIL (SECONDARY – DO NOT FAIL ORDER) ---------- */
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Stationery Orders" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🛒 New Order Received (${orderId})`,
        html: `
          <h2>New Order Received</h2>
          <p><b>Order ID:</b> ${orderId}</p>
          <p><b>Name:</b> ${customer.name}</p>
          <p><b>Phone:</b> ${customer.phone}</p>
          <p><b>Email:</b> ${customer.email || "N/A"}</p>
          <p><b>Address:</b> ${customer.address}</p>
          <hr/>
          <p><b>Products:</b><br/>${productsText}</p>
          <h3>Total: ₹${total}</h3>
          <p><b>Payment:</b> Cash on Delivery</p>
        `,
      });
    } catch (emailError) {
      // ⚠️ Email failed → log only
      console.error("EMAIL ERROR (ignored):", emailError);
    }

    /* ---------- ALWAYS SUCCESS ---------- */
    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 },
    );
  }
}
