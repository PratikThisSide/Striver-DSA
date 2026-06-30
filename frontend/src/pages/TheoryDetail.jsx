import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { api } from "../services/api";
import MonacoWrapper from "../editor/MonacoWrapper";

export default function TheoryDetail() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    api.getTopic(slug).then(setTopic).catch(console.error);
  }, [slug]);

  if (!topic) {
    return <div className="text-gray-400">Loading...</div>;
  }

  const { theory } = topic;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <Link to={`/topic/${slug}`} className="text-accent-400 hover:text-accent-300 text-sm mb-4 inline-block">
        ← Back to {topic.name}
      </Link>

      <h2 className="text-2xl font-bold text-white mb-6">{topic.name}</h2>

      <div className="space-y-6">
        {/* Definition */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-2">Definition</h3>
          <p className="text-gray-300 leading-relaxed">{theory.definition}</p>
        </div>

        {/* Analogy */}
        {theory.analogy && (
          <div className="card border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-white mb-2">Real-World Analogy</h3>
            <p className="text-gray-300 leading-relaxed italic">{theory.analogy}</p>
          </div>
        )}

        {/* Code Example */}
        {theory.javaCode && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Java Example</h3>
            <div className="h-64 rounded-lg overflow-hidden border border-dark-600">
              <MonacoWrapper value={theory.javaCode} readOnly />
            </div>
          </div>
        )}

        {/* Complexity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-2">Complexity Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-700 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase mb-1">Time Complexity</div>
              <div className="text-accent-400 font-mono font-bold">{theory.complexity?.time || "N/A"}</div>
            </div>
            <div className="bg-dark-700 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase mb-1">Space Complexity</div>
              <div className="text-blue-400 font-mono font-bold">{theory.complexity?.space || "N/A"}</div>
            </div>
          </div>
          {theory.complexity?.reasoning && (
            <p className="text-gray-400 text-sm mt-3">{theory.complexity.reasoning}</p>
          )}
        </div>

        {/* Edge Cases */}
        {theory.edgeCases?.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Common Edge Cases & Pitfalls</h3>
            <ul className="space-y-2">
              {theory.edgeCases.map((ec, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-red-400 mt-1">⚠️</span>
                  <span>{ec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dry Run */}
        {theory.dryRun && (
          <div className="card border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-white mb-2">Dry Run Walkthrough</h3>
            <p className="text-gray-300 leading-relaxed">{theory.dryRun}</p>
          </div>
        )}

        {/* Full Content */}
        {theory.fullContent && (
          <div className="card">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{theory.fullContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
