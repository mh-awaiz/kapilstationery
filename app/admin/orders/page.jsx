"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("key") !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      router.replace("/404");
      return;
    }

    fetch("/api/admin/orders", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#17d492]">
        📦 Admin Orders
      </h1>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Gmail</th>
              <th className="p-3">Jamia</th>
              <th className="p-3">Delivery</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-3 font-mono text-xs">{o.orderId}</td>
                <td className="p-3">{o.name}</td>
                <td className="p-3">{o.phone}</td>
                <td className="p-3">{o.email}</td>
                <td className="p-3 text-center">
                  {o.isJamia === "YES" ? "🎓 YES" : "NO"}
                </td>
                <td className="p-3 font-semibold">
                  {o.deliveryCharge === 0 ? "FREE" : `₹${o.deliveryCharge}`}
                </td>
                <td className="p-3 max-w-md text-xs whitespace-pre-wrap">
                  {o.items}
                </td>
                <td className="p-3 font-bold text-[#17d492]">₹{o.total}</td>
                <td className="p-3 text-xs text-white/60">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
