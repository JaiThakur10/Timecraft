import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, BarChart, Link } from "lucide-react"; // Import icons

export default function Home() {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center px-6 py-12 font-sans">
      <motion.h1
        className="text-5xl font-bold text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Timecraft
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-center max-w-lg opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Track your daily activities, enhance productivity, and gain insights
        into your workflow effortlessly.
      </motion.p>

      <motion.div
        className="mt-6 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button className="bg-[#7E3285] hover:bg-[#9F5EA5] text-white px-6 py-3 rounded-lg shadow-md">
          Get Started
        </Button>
        <Button
          variant="outline"
          className="border-white text-[#A060A6] px-6 py-3 rounded-lg"
        >
          Learn More
        </Button>
      </motion.div>

      {/* Feature Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            <feature.icon className="w-12 h-12 text-[#E0B6E4] mb-4" />{" "}
            {/* Icon added */}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 opacity-80">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "Smart Tracking",
    description: "Automatically track your tasks and progress in real-time.",
    icon: Calendar, // Icon added
  },
  {
    title: "Custom Reports",
    description:
      "Get detailed insights and reports on your productivity trends.",
    icon: BarChart, // Icon added
  },
  {
    title: "Seamless Integration",
    description:
      "Sync with your favorite tools like Google Calendar and Notion.",
    icon: Link, // Icon added
  },
];
