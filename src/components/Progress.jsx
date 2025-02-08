import React, { useState, useEffect, useMemo } from "react";
import "react-calendar-heatmap/dist/styles.css"; // Import styles
import {
  account,
  databases,
  DATABASE_ID,
  COLLECTION_ID,
} from "../services/appwrite";
import { Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [hours, setHours] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        console.log("Fetched user:", user); // Debug log
        setUserId(user.$id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchActivities(userId);
    }
  }, [userId]); // Fetch activities only after userId is set

  // Fetch activities from Appwrite
  const fetchActivities = async (userId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", userId)]
      );
      setActivities(response.documents || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // Handle new activity submission
  const handleAddActivity = async () => {
    if (!newActivity.trim() || !hours.trim() || isNaN(hours) || hours <= 0) {
      alert("Please enter valid activity and hours.");
      return;
    }

    console.log("User ID before submitting:", userId); // Debugging
    if (!userId) {
      console.error(
        "Error: userId is missing. Make sure the user is logged in."
      );
      alert("User is not logged in. Please log in to add activities.");
      return;
    }

    setLoading(true);
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        {
          userId, // Ensure userId is passed correctly
          activity: newActivity,
          hours: parseInt(hours, 10),
          date: new Date().toISOString().split("T")[0],
        }
      );

      console.log("Activity added successfully:", response);

      fetchActivities(userId);
      setNewActivity("");
      setHours("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding activity:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Activity-wise bar chart (fixed thick bars)
  const barChartData = useMemo(
    () => ({
      labels: activities.map((a) => a.activity),
      datasets: [
        {
          label: "Hours Spent",
          data: activities.map((a) => a.hours),
          backgroundColor: "#4F46E5",
          barThickness: 8, // **Made bars thinner**
        },
      ],
    }),
    [activities]
  );

  // ✅ Summing up total hours per day for daily progress bar chart
  const dailyTotals = useMemo(() => {
    const totals = {};
    activities.forEach(({ date, hours }) => {
      totals[date] = (totals[date] || 0) + hours;
    });

    return {
      labels: Object.keys(totals),
      datasets: [
        {
          label: "Total Hours per Day",
          data: Object.values(totals),
          backgroundColor: "#10B981",
          barThickness: 8, // **Made bars thinner**
        },
      ],
    };
  }, [activities]);

  // ✅ Total daily hours for the line chart
  const dailyLineChart = useMemo(() => {
    const totals = {};
    activities.forEach(({ date, hours }) => {
      totals[date] = (totals[date] || 0) + hours;
    });

    return {
      labels: Object.keys(totals),
      datasets: [
        {
          label: "Total Hours per Day",
          data: Object.values(totals),
          borderColor: "#F59E0B",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  }, [activities]);

  // ✅ Contribution Graph Data
  const contributionData = useMemo(() => {
    const data = {};
    activities.forEach(({ date, hours }) => {
      data[date] = (data[date] || 0) + hours;
    });

    return Object.keys(data).map((date) => ({
      date,
      count: data[date],
    }));
  }, [activities]);

  return (
    <>
      {/* contents */}

      <div className="p-8 bg-yellow-300">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome, {userEmail}!</p>

        {/* Add Activity Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>Add Activity</Button>
          </DialogTrigger>
          <DialogContent>
            <Input
              placeholder="Activity (e.g., Coding)"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <Input
              placeholder="Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="1"
            />
            <Button onClick={handleAddActivity} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Contribution Graph */}

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity-wise hours */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Hours Spent per Activity</h2>
            <div className="h-96">
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>

          {/* ✅ New: Total daily hours as bar chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Total Hours per Day (Bar Chart)
            </h2>
            <div className="h-96">
              <Bar data={dailyTotals} options={{ responsive: true }} />
            </div>
          </div>

          {/* ✅ Total daily hours as line chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Total Hours per Day (Line Chart)
            </h2>
            <div className="h-96">
              <Line data={dailyLineChart} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
