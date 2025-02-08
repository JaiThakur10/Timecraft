import { useState } from "react";

export default function ActivityForm({ onAddActivity }) {
  const [activity, setActivity] = useState("");
  const [hours, setHours] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddActivity({ activity, hours });
    setActivity("");
    setHours(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Activity
      </button>
    </form>
  );
}
