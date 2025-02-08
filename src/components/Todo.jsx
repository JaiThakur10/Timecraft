import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_TODOS,
} from "@/services/appwrite";
import { account } from "@/services/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Loader, Notification } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import TagForTodo from "@/components/TagForTodo"; // Import the tag component

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null); // Track selected tag

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_TODOS
        );
        setTodos(response.documents);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (!task) return;
    setAdding(true);
    setError(null);
    try {
      const user = await account.get();
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_TODOS,
        "unique()",
        {
          task,
          userId: user.$id,
          completed: false,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          date: date.toISOString().split("T")[0], // Store only the date part
        }
      );
      setTodos((prevTodos) => [response, ...prevTodos]);
      setTask("");
      setStartTime(new Date());
      setEndTime(new Date());
      setDate(new Date());
    } catch (error) {
      setError("Error adding todo");
    } finally {
      setAdding(false);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.$id !== id));
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_TODOS, id);
    } catch (error) {
      setError("Error deleting todo");
    }
  };

  // Toggle Completion
  const toggleCompletion = async (id, completed) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID_TODOS, id, {
        completed: !completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.$id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      setError("Error updating todo");
    }
  };

  const formatTime = (time) =>
    time?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const TimePickerPopover = ({ selectedTime, setTime, placeholder }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex w-1/2 justify-start text-left font-normal border-gray-300",
            !selectedTime && "text-gray-500"
          )}
        >
          <Clock className="mr-2 h-5 w-5 text-gray-500" />
          {selectedTime ? formatTime(selectedTime) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <ScrollArea className="h-48 w-36">
          <div className="flex flex-col space-y-2">
            {Array.from({ length: 24 * 4 }, (_, i) => {
              const time = new Date();
              time.setHours(0, i * 15, 0, 0);
              return (
                <button
                  key={i}
                  onClick={() => setTime(new Date(time))}
                  className="p-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
                >
                  {formatTime(time)}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
        Todo List
      </h1>
      {error && (
        <Notification color="red" title="Error" disallowClose>
          {error}
        </Notification>
      )}
      <div className="flex flex-col gap-2 mb-4">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="w-full border-gray-300"
        />
        <div className="flex gap-4 w-full max-w-md">
          {/* Date and Time Pickers */}
          <div className="flex flex-col gap-4 w-1/2">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full justify-start text-left border-gray-300",
                    !date && "text-gray-500"
                  )}
                >
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  {date ? date.toLocaleDateString() : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ShadCalendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Time Pickers */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full justify-start text-left border-gray-300",
                    !startTime && "text-gray-500"
                  )}
                >
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  {startTime ? formatTime(startTime) : "Start Time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <ScrollArea className="h-48 w-36">
                  <div className="flex flex-col space-y-2">
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const time = new Date();
                      time.setHours(0, i * 15, 0, 0);
                      return (
                        <button
                          key={i}
                          onClick={() => setStartTime(new Date(time))}
                          className="p-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
                        >
                          {formatTime(time)}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full justify-start text-left border-gray-300",
                    !endTime && "text-gray-500"
                  )}
                >
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  {endTime ? formatTime(endTime) : "End Time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <ScrollArea className="h-48 w-36">
                  <div className="flex flex-col space-y-2">
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const time = new Date();
                      time.setHours(0, i * 15, 0, 0);
                      return (
                        <button
                          key={i}
                          onClick={() => setEndTime(new Date(time))}
                          className="p-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
                        >
                          {formatTime(time)}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>

          {/* Tag Selector */}
          <div className="w-1/2">
            <TagForTodo
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </div>

        <Button
          onClick={addTodo}
          disabled={adding}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
        >
          {adding ? <Loader size="xs" /> : "Add"}
        </Button>
      </div>
      <div className="space-y-2">
        {loading ? (
          <Loader size="lg" className="mx-auto" />
        ) : (
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.$id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        toggleCompletion(todo.$id, todo.completed)
                      }
                      className="w-5 h-5 cursor-pointer"
                    />
                    <CardContent
                      className={`text-gray-700 font-medium w-full ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.task}
                      <div className="text-sm text-gray-500">
                        {new Date(todo.date).toLocaleDateString()} |{" "}
                        {new Date(todo.startTime).toLocaleTimeString()} -{" "}
                        {new Date(todo.endTime).toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => deleteTodo(todo.$id)}
                    className="hover:text-red-600 mt-2 sm:mt-0"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Todo;
