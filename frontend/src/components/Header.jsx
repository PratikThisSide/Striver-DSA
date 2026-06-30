import { motion } from "framer-motion";

export default function Header({ streak, solvedCount, onMenuToggle }) {
  return (
    <header className="h-14 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="text-gray-400 hover:text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-white tracking-tight">
          Striver <span className="text-accent-400">DSA</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1 text-yellow-400"
        >
          <span>🔥</span>
          <span className="font-medium">{streak} day streak</span>
        </motion.div>
        <div className="flex items-center gap-1 text-gray-400">
          <span>✅</span>
          <span>{solvedCount} solved</span>
        </div>
      </div>
    </header>
  );
}
