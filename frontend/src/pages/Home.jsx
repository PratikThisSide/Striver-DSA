import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

const levels = [
  { key: "basics", label: "Level 1 — Basics", desc: "Time complexity, arrays, recursion", color: "border-accent-500", bg: "bg-accent-500/10" },
  { key: "intermediate", label: "Level 2 — Intermediate", desc: "Sorting, binary search, strings, linked lists, stacks & queues", color: "border-blue-500", bg: "bg-blue-500/10" },
  { key: "advanced", label: "Level 3 — Advanced", desc: "Trees, BST, heaps, graphs, greedy, DP, tries", color: "border-purple-500", bg: "bg-purple-500/10" },
];

export default function Home({ topics, progress }) {
  const solvedCount = progress.solvedProblems?.length || 0;
  const totalProblems = topics.reduce((sum, t) => sum + (t.problemCount || 0), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Striver DSA</h2>
        <p className="text-gray-400">A2Z roadmap. Master DSA one topic at a time.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-3">Your Progress</h3>
        <ProgressBar solved={solvedCount} total={totalProblems} />
      </motion.div>

      <div className="space-y-6">
        {levels.map((level, li) => {
          const levelTopics = topics.filter((t) => t.level === level.key);
          if (levelTopics.length === 0) return null;
          return (
            <motion.div
              key={level.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + li * 0.1 }}
            >
              <div className={`border-l-4 ${level.color} ${level.bg} rounded-r-xl p-4`}>
                <h3 className="text-lg font-semibold text-white mb-1">{level.label}</h3>
                <p className="text-sm text-gray-400 mb-3">{level.desc}</p>
                <div className="grid gap-2">
                  {levelTopics.map((topic) => (
                    <Link
                      key={topic.slug}
                      to={`/topic/${topic.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors group"
                    >
                      <span className="text-xl">{topic.icon}</span>
                      <span className="flex-1 text-gray-300 group-hover:text-white">{topic.name}</span>
                      <span className="text-xs text-gray-500">{topic.problemCount || 0} problems</span>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
