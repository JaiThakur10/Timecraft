import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../services/appwrite";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const userData = await account.get(); // Check if user is logged in
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Log out user
      localStorage.clear(); // Clear stored user data (if any)
      sessionStorage.clear(); // Clear session storage (if used)
      setUser(null); // Reset user state
      navigate("/login"); // Redirect to login page
      window.location.reload(); // Force reload to prevent stale session issues
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white p-4 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Timecraft
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
