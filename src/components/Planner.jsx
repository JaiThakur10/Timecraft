import { Query } from "appwrite"; // ✅ Import Query
import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_TODOS,
  account, // ✅ Import account from Appwrite service
} from "@/services/appwrite";
import { Card } from "@/components/ui/card";
import { Loader } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Dumbbell,
  Briefcase,
  ShoppingCart,
  Music,
  Utensils,
  Code,
  Globe,
  Guitar,
} from "lucide-react";

const iconMap = {
  study: BookOpen,
  workout: Dumbbell,
  work: Briefcase,
  shopping: ShoppingCart,
  music: Music,
  food: Utensils,
  coding: Code,
  geography: Globe,
  history: Globe,
  politics: Globe,
  sociology: Globe,
  psychology: Globe,
  philosophy: Globe,
  guitar: Guitar,
};

const getIconForTask = (task) => {
  const matchedKeyword = Object.keys(iconMap).find((keyword) =>
    task.toLowerCase().includes(keyword)
  );
  return matchedKeyword ? iconMap[matchedKeyword] : BookOpen;
};

const getStatusMessage = (todo) => {
  if (todo.completed) return "✅ Done! One step closer to your goals!";

  const today = new Date();
  const taskDateObj = new Date(todo.date);
  const todayStr = today.toDateString();
  const taskDateStr = taskDateObj.toDateString();

  if (taskDateStr === todayStr) return "🔥 Keep going, you're doing amazing!";
  if (taskDateObj < today) return "😞 Ahhh, you missed it!";

  return "👀 See you soon!";
};

const Planner = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const user = await account.get(); // ✅ Get logged-in user
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_TODOS,
          [Query.equal("userId", user.$id)] // ✅ Fetch only this user's todos
        );

        setTodos(
          response.documents.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      } catch (error) {
        console.error("Failed to fetch todos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center py-10">
      {/* Custom Scrollbar Styles */}
      <style>{`
  ::-webkit-scrollbar { display: none; }
`}</style>

      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div> */}

      <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center relative z-10">
        Planner
      </h1>

      {loading ? (
        <Loader size="lg" className="mx-auto relative z-10" />
      ) : (
        <AnimatePresence>
          <div className="flex flex-col items-center space-y-6 w-full max-w-3xl relative z-10 overflow-hidden">
            {todos.map((todo) => {
              const Icon = getIconForTask(todo.task);
              return (
                <motion.div
                  key={todo.$id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex justify-center"
                >
                  <Card
                    className={`w-full max-w-lg my-4 p-6 shadow-xl rounded-xl border border-gray-700 bg-purple-700 text-white transition-all ${
                      todo.completed ? "opacity-50" : "opacity-100"
                    } relative z-10`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2 text-left">
                        <h2 className="text-2xl font-semibold text-purple-200 uppercase">
                          {todo.task}
                        </h2>
                        <p className="text-lg text-gray-300">
                          📅 Date: {new Date(todo.date).toLocaleDateString()}
                        </p>
                        <p className="text-lg text-gray-300">
                          ⏰ Time:{" "}
                          {new Date(todo.startTime).toLocaleTimeString()} -{" "}
                          {new Date(todo.endTime).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-500 rounded-full">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <hr className="my-4 border-gray-500" />
                    <p className="text-lg font-medium text-gray-300 text-center">
                      {getStatusMessage(todo)}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Planner;
