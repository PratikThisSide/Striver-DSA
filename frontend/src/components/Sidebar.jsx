import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const levels = [
  { key: "basics", label: "Level 1 — Basics", color: "border-l-accent-500" },
  { key: "intermediate", label: "Level 2 — Intermediate", color: "border-l-blue-500" },
  { key: "advanced", label: "Level 3 — Advanced", color: "border-l-purple-500" },
];

export default function Sidebar({ topics, progress, isOpen, onToggle }) {
  const solved = progress.solvedProblems || [];
  const topicMap = progress.topicProgress || {};

  function getPercent(topicSlug) {
    const t = topicMap[topicSlug];
    return t && t.total > 0 ? Math.round((t.solved / t.total) * 100) : 0;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="bg-dark-800 border-r border-dark-600 overflow-y-auto shrink-0"
        >
          <div className="p-4">
            <nav className="space-y-6">
              {levels.map((level) => {
                const levelTopics = topics.filter((t) => t.level === level.key);
                if (levelTopics.length === 0) return null;
                return (
                  <div key={level.key}>
                    <h3 className={`text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 pl-2 border-l-2 ${level.color}`}>
                      {level.label}
                    </h3>
                    <div className="space-y-1">
                      {levelTopics.map((topic) => {
                        const pct = getPercent(topic.slug);
                        return (
                          <NavLink
                            key={topic.slug}
                            to={`/topic/${topic.slug}`}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? "bg-dark-600 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-dark-700"
                              }`
                            }
                          >
                            <span>{topic.icon}</span>
                            <span className="flex-1 truncate">{topic.name}</span>
                            {topic.problemCount > 0 && (
                              <span className="text-xs text-gray-500">
                                {pct}%
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
