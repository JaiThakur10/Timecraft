import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Todo from "@/components/Todo";
import Planner from "@/components/Planner";
import Stopwatch from "@/components/Stopwatch";
import Progress from "@/components/Progress";
import Dashboard from "@/pages/Dashboard";

export default function DashHome() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Right side content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
