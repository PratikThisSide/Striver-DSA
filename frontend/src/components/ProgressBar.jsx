import { motion } from "framer-motion";

export default function ProgressBar({ solved, total, showLabel = true }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{solved} / {total} solved</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-accent-500 rounded-full"
        />
      </div>
    </div>
  );
}
