import React from "react";

export default function EventCard({ event, onSelect }) {
  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-lg hover:scale-105 transition p-4">
      <img
        src={event.image || "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=60"}
        alt={event.title}
        className="rounded-lg mb-3 w-full h-40 object-cover"
      />
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-sm mb-2">{event.venue}</p>
      <p className="font-semibold">₹{event.price}</p>
      <button
        onClick={onSelect}
        className="mt-3 w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 rounded-lg"
      >
        Book Now
      </button>
    </div>
  );
}
