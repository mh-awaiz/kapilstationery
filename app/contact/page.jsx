"use client";
import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-[#22323c] text-[#f5f5f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#17d492] mb-8">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#22323c] border border-[#17d492]/30 rounded-lg p-8 space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-transparent border border-[#f5f5f5]/30 focus:outline-none focus:border-[#17d492]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-transparent border border-[#f5f5f5]/30 focus:outline-none focus:border-[#17d492]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded bg-transparent border border-[#f5f5f5]/30 focus:outline-none focus:border-[#17d492]"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button
            type="submit"
            className="bg-[#17d492] text-[#22323c] px-6 py-3 rounded font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
