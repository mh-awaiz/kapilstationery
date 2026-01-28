"use client";

import { useCart } from "../context/CartContext.js";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isJamiaStudent, setIsJamiaStudent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

const deliveryCharge = isJamiaStudent === false ? 30 : 0;

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const grandTotal = total + deliveryCharge;
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          ...form,
          isJamiaStudent,
        },
        cart,
        total: grandTotal,
        deliveryCharge,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      clearCart();
      setForm({ name: "", phone: "", email: "", address: "" });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#22323c] text-[#f5f5f5] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#17d492]">Checkout</h1>

        {/* ✅ Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-[#17d492] bg-[#17d492]/10 p-4 text-[#17d492] font-semibold">
            ✅ Order placed successfully! We’ll contact you soon.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Details */}
          <div className="bg-[#334b54] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#17d492]">
              Delivery Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#22323c]
                border border-white/10 focus:outline-none focus:border-[#17d492]"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#22323c]
                border border-white/10 focus:outline-none focus:border-[#17d492]"
                required
              />

              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#22323c]
                border border-white/10 focus:outline-none focus:border-[#17d492]"
                required
              />
              <div className="mb-4">
                <p className="mb-2 font-medium text-[#17d492]">
                  Are you a Jamia student?
                </p>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="jamia"
                      value="yes"
                      onChange={() => setIsJamiaStudent(true)}
                    />
                    Yes
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="jamia"
                      value="no"
                      onChange={() => setIsJamiaStudent(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              {isJamiaStudent && (
                <div className="mt-4 rounded-lg bg-[#17d492]/10 border border-[#17d492] p-4 text-sm">
                  <p className="font-semibold mb-2 text-[#17d492]">
                    📌 Important Delivery Information
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>
                      Delivery for Jamia students is <b>FREE</b>
                    </li>
                    <li>
                      Girls Hostel: <b>7–8 PM</b> (J&K, BHM, Halls of Girls
                      Residence, etc.)
                    </li>
                    <li>
                      Boys Hostel: <b>8–9 PM</b> (APJ, AMK, SRK, FRK, etc.)
                    </li>
                  </ul>
                </div>
              )}

              <textarea
                rows="4"
                placeholder="Complete Address *"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#22323c]
                border border-white/10 focus:outline-none focus:border-[#17d492]"
                required
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#334b54] rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-[#17d492]">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/80">
                    {item.title} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-[#17d492]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-[#17d492]/50 cursor-not-allowed"
                    : "bg-[#17d492] text-[#22323c] hover:opacity-90"
                }`}
            >
              {loading ? "Placing Order..." : "Confirm Order (COD)"}
            </button>

            <p className="text-xs text-center mt-3 text-white/60">
              Cash on Delivery • Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useCart } from "../context/CartContext.js";
// import { useState } from "react";

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart();

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//   });

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleSubmit = async () => {
//     if (!form.name || !form.phone || !form.address) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const res = await fetch("/api/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customer: form,
//         cart,
//         total,
//       }),


//     });

//     if (res.ok) {
//       clearCart();
//       alert("Order placed successfully 🎉");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#22323c] text-[#f5f5f5] py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-8 text-[#17d492]">Checkout</h1>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Customer Details */}
//           <div className="bg-[#334b54] rounded-xl p-6">
//             <h2 className="text-lg font-semibold mb-4 text-[#17d492]">
//               Delivery Details
//             </h2>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full Name *"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full px-4 py-3 rounded-lg bg-[#22323c]
//                 border border-white/10 focus:outline-none focus:border-[#17d492]"
//               />

//               <input
//                 type="tel"
//                 placeholder="Phone Number *"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 className="w-full px-4 py-3 rounded-lg bg-[#22323c]
//                 border border-white/10 focus:outline-none focus:border-[#17d492]"
//               />

//               <input
//                 type="email"
//                 placeholder="Email (optional)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full px-4 py-3 rounded-lg bg-[#22323c]
//                 border border-white/10 focus:outline-none focus:border-[#17d492]"
//               />

//               <textarea
//                 rows="4"
//                 placeholder="Complete Address *"
//                 value={form.address}
//                 onChange={(e) => setForm({ ...form, address: e.target.value })}
//                 className="w-full px-4 py-3 rounded-lg bg-[#22323c]
//                 border border-white/10 focus:outline-none focus:border-[#17d492]"
//               />
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-[#334b54] rounded-xl p-6 h-fit">
//             <h2 className="text-lg font-semibold mb-4 text-[#17d492]">
//               Order Summary
//             </h2>

//             <div className="space-y-3 mb-4">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex justify-between text-sm">
//                   <span className="text-white/80">
//                     {item.title} × {item.quantity}
//                   </span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span className="text-[#17d492]">₹{total}</span>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full mt-6 bg-[#17d492] text-[#22323c]
//               py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
//             >
//               Confirm Order (COD)
//             </button>

//             <p className="text-xs text-center mt-3 text-white/60">
//               Cash on Delivery • Secure Checkout
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
