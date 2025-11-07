 import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await API.get(`/bookings/${user._id}`);
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-3 rounded shadow">
          <p>Event: {b.event.name}</p>
          <p>Date: {b.event.date}</p>
          <p>Location: {b.event.location}</p>
        </div>
      ))}
    </div>
  );
}
