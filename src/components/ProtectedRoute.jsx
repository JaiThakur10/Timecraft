import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../services/appwrite";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
      } catch (error) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  return children;
}
