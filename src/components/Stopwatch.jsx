import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const secondsDegree = (time % 60) * 6;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <Card className="p-6 w-full max-w-[400px] shadow-lg  bg-black relative">
        <CardContent className="flex flex-col items-center relative">
          <div className="relative w-full max-w-[300px] h-[300px] border-4 border-gray-700 rounded-full flex justify-center items-center shadow-lg shadow-blue-500/50">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-sm font-bold text-white"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-120px) rotate(-${
                    i * 30
                  }deg)`,
                }}
              >
                {i === 0 ? 60 : i * 5}
              </div>
            ))}
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${
                  i % 5 === 0 ? "w-0.5 h-4" : "w-0.5 h-2"
                } bg-gray-400`}
                style={{
                  transform: `rotate(${i * 6}deg) translateY(-140px)`,
                }}
              />
            ))}
            <div className="absolute w-6 h-6 bg-white rounded-full border-2 border-gray-500"></div>
            <motion.div
              className="absolute w-1 h-[110px] bg-blue-400 origin-bottom"
              style={{ top: "20px" }}
              animate={{ rotate: isRunning ? secondsDegree : 0 }}
              transition={{
                ease: "linear",
                duration: 0.5,
                repeat: isRunning ? Infinity : 0,
              }}
            />
            <div className="absolute mb-24 transform -translate-y-1/2 text-3xl font-bold text-white">
              {formatTime(time)}
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="secondary"
              className="flex items-center"
            >
              {isRunning ? (
                <Pause className="mr-2" />
              ) : (
                <Play className="mr-2" />
              )}{" "}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setTime(0);
                setIsRunning(false);
              }}
              className="flex items-center"
            >
              <RefreshCw className="mr-2" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
