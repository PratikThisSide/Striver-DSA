import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const difficultyColors = {
  easy: "text-green-400 bg-green-400/10",
  medium: "text-yellow-400 bg-yellow-400/10",
  hard: "text-red-400 bg-red-400/10",
};

export default function ProblemList({ problems, solvedProblems = [] }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return problems;
    return problems.filter((p) => p.difficulty === filter);
  }, [problems, filter]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["all", "easy", "medium", "hard"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-sm capitalize ${
              filter === f ? "bg-accent-500 text-white" : "bg-dark-700 text-gray-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((problem, i) => {
          const isSolved = solvedProblems.includes(problem.slug);
          return (
            <motion.div
              key={problem.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/problem/${problem.slug}`}
                className="card flex items-center gap-4 hover:border-dark-400 transition-colors group"
              >
                <span className={`text-lg ${isSolved ? "text-green-400" : "text-gray-600"}`}>
                  {isSolved ? "✅" : "⬜"}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-200 group-hover:text-white truncate">
                    {problem.title}
                  </h4>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                    {problem.tags?.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
