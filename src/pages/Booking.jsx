 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Booking() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please log in first!");
        return;
      }

      await axios.post("http://localhost:5000/api/bookings", {
        eventId: id,
        userId: user._id,
      });
      setBooked(true);
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  if (!event) return <h2 className="text-center mt-10">Loading event...</h2>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-700 mb-2">
        📅 {new Date(event.date).toDateString()}
      </p>
      <p className="text-gray-700 mb-4">📍 {event.location}</p>
      <p className="mb-6">{event.description}</p>
      <button
        onClick={handleBooking}
        disabled={booked}
        className={`px-6 py-2 rounded-lg text-white ${
          booked ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {booked ? "✅ Booked!" : "Book Now"}
      </button>
    </div>
  );
}

export default Booking;
