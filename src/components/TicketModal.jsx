import React, { useState } from "react";

export default function TicketModal({ event, onClose }) {
  const [buyerName, setName] = useState("");
  const [buyerEmail, setEmail] = useState("");
  const [quantity, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  const handleBook = async () => {
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: event._id,
        buyerName,
        buyerEmail,
        quantity: Number(quantity),
      }),
    });
    const data = await res.json();
    if (res.ok) setMsg("✅ Booking successful!");
    else setMsg("❌ " + (data.error || "Booking failed"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-gray-800 p-6 rounded-2xl w-96">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-sm mb-3">{event.venue}</p>
        <input
          placeholder="Your Name"
          className="w-full border rounded p-2 mb-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Your Email"
          className="w-full border rounded p-2 mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          min="1"
          className="w-full border rounded p-2 mb-2"
          value={quantity}
          onChange={(e) => setQty(e.target.value)}
        />
        <p className="font-semibold mb-3">Total: ₹{event.price * quantity}</p>
        <div className="flex justify-between">
          <button
            onClick={handleBook}
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
        {msg && <p className="mt-3 text-center font-semibold">{msg}</p>}
      </div>
    </div>
  );
}
