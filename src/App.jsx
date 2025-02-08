import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Planner from "./components/Planner";
import Todo from "./components/Todo";
import Stopwatch from "./components/Stopwatch";
import Progress from "./components/Progress";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* Default Page */}
          <Route path="planner" element={<Planner />} />
          <Route path="todo" element={<Todo />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </Router>
  );
}
