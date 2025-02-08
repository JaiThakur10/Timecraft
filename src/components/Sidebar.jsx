import { Link, useLocation } from "react-router-dom";
import {
  FaTasks,
  FaCalendarAlt,
  FaStopwatch,
  FaChartBar,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Get current path

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Todo", icon: <FaTasks />, path: "/dashboard/todo" },
    { name: "Planner", icon: <FaCalendarAlt />, path: "/dashboard/planner" },
    { name: "Stopwatch", icon: <FaStopwatch />, path: "/dashboard/stopwatch" },
    { name: "Progress", icon: <FaChartBar />, path: "/dashboard/progress" },
  ];

  return (
    <div className="w-64 h-screen   text-black flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-[#7E3285] text-white" // Active state color
                : "bg-transparent hover:bg-[#9F5EA5] text-white" // Transparent by default with a hover effect
            }`}
          >
            {item.icon}
            <span className="text-lg">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
