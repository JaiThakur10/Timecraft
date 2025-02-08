import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_TODOS,
} from "@/services/appwrite";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const colorSchemes = {
  green: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  yellow: ["#fff9c4", "#ffeb3b", "#fbc02d", "#f57f17"],
  purple: ["#ede7f6", "#d1c4e9", "#9575cd", "#512da8"],
  red: ["#ffebee", "#ef9a9a", "#e57373", "#c62828"],
  blue: ["#e3f2fd", "#90caf9", "#42a5f5", "#1565c0"],
};

// Function to determine the date range dynamically
const getDateRange = () => {
  if (typeof window === "undefined") return { from: "", to: "" }; // Prevent SSR issues

  const today = new Date();
  if (window.innerWidth < 700) {
    // Mobile: Show last 3 months (including current)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 2); // Set to 2 months before today
    return {
      from: threeMonthsAgo.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };
  } else {
    // Desktop: Show full year
    return {
      from: `${today.getFullYear()}-01-01`,
      to: today.toISOString().split("T")[0],
    };
  }
};

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [contributions, setContributions] = useState({});
  const [selectedColor, setSelectedColor] = useState("green");
  const [dateRange, setDateRange] = useState(getDateRange());

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_TODOS
        );
        setTodos(response.documents);
        updateContributions(response.documents);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();

    // Update date range when screen resizes
    const handleResize = () => {
      setDateRange(getDateRange());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateContributions = (todos) => {
    const data = {};
    todos.forEach((todo) => {
      if (todo.completed) {
        const date = todo.date;
        data[date] = (data[date] || 0) + 1;
      }
    });
    setContributions(data);
  };

  const heatmapData = Object.keys(contributions).map((date) => ({
    day: date,
    value: contributions[date],
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Card className="p-4 shadow-md mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Contribution Graph</h2>

          {/* Color Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Select Heatmap Color:
            </label>
            <Select onValueChange={setSelectedColor} value={selectedColor}>
              <SelectTrigger className="border border-gray-300 rounded-md p-2 w-full">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(colorSchemes).map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contribution Heatmap */}
          <div className="h-[360px] w-full overflow-x-auto flex justify-center items-center">
            <ResponsiveCalendar
              data={heatmapData}
              from={dateRange.from}
              to={dateRange.to}
              emptyColor="#ebedf0"
              colors={colorSchemes[selectedColor]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              yearSpacing={50} // Increase spacing between years
              monthBorderColor="#ffffff"
              dayBorderWidth={2} // Increase border width for clarity
              dayBorderColor="#ffffff"
              squareSize={20} // Make heatmap boxes bigger
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  translateY: 40,
                  itemCount: 4,
                  itemWidth: 40,
                  itemHeight: 14,
                  itemsSpacing: 4,
                  itemDirection: "right-to-left",
                },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Motivational Quote */}
      <p className="text-center mt-6 text-lg italic font-semibold text-gray-700">
        "Success is the sum of small efforts, repeated day in and day out."
      </p>
    </div>
  );
};

export default Dashboard;
