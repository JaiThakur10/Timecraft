import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close sidebar when clicking outside
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen">
      {/* Overlay (only for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar} // Closes sidebar when clicking outside
        ></div>
      )}

      {/* Sidebar: Slide-in/out on mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0  w-64`}
      >
        {/* Close button (Mobile only) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={closeSidebar} className="text-white">
            <FiX size={24} />
          </button>
        </div>

        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <div className="md:hidden  text-white p-4 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h2 className="ml-4 text-xl font-bold">Dashboard</h2>
        </div>

        {/* Outlet: Content Changes Here */}
        <div className="flex-1  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
