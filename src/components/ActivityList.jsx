import { motion } from "framer-motion";

export default function ActivityList({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 border rounded shadow-sm bg-white"
        >
          <p className="font-semibold text-lg">{item.activity}</p>
          <p className="text-gray-600">{item.hours} hours</p>
        </motion.div>
      ))}
    </div>
  );
}
