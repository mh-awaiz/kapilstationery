import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import nodemailer from "nodemailer";

// POST method for placing an order
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { customer, cart, total, deliveryCharge } = body;

    if (!customer || !cart || cart.length === 0) {
      return new Response(JSON.stringify({ message: "Invalid order data" }), {
        status: 400,
      });
    }

    const orderId = "ORD-" + Date.now();

    const order = new Order({
      orderId,
      customer,
      items: cart.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      deliveryCharge,
    });

    await order.save();

    // Send email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const itemsList = cart
          .map(
            (item) =>
              `${item.title} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`,
          )
          .join("\n");

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Order Received: ${orderId}`,
          text: `
You have received a new order!

Order ID: ${orderId}
Name: ${customer.name}
Phone: ${customer.phone}
Email: ${customer.email}
Address: ${customer.address}
Jamia Student: ${customer.isJamiaStudent ? "Yes" : "No"}

Items:
${itemsList}

Delivery Charge: ₹${deliveryCharge}
Total Amount: ₹${total}
Timestamp: ${new Date().toLocaleString()}
          `,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return new Response(
      JSON.stringify({ message: "Order placed successfully", orderId }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Order API error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
