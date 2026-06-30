import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { progressService } from "../services/progress";
import ProblemList from "../components/ProblemList";
import ProgressBar from "../components/ProgressBar";

export default function TopicPage({ topics, progress }) {
  const { slug } = useParams();
  const topic = topics.find((t) => t.slug === slug);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProblemsByTopic(slug).then((data) => {
      setProblems(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (!topic) {
    return <div className="text-gray-400">Topic not found</div>;
  }

  const topicProgress = progressService.getTopicProgress(slug, problems.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{topic.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-white">{topic.name}</h2>
          <p className="text-sm text-gray-400 capitalize">{topic.level}</p>
        </div>
      </div>

      <div className="card mb-6">
        <ProgressBar solved={topicProgress.solved} total={topicProgress.total} />
      </div>

      <div className="flex gap-3 mb-6">
        <Link to={`/topic/${slug}/theory`} className="btn-primary">
          📖 View Theory
        </Link>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Problems</h3>
        {loading ? (
          <div className="text-gray-400">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="card text-gray-500 text-center py-8">
            No problems available for this topic yet.
          </div>
        ) : (
          <ProblemList problems={problems} solvedProblems={progress.solvedProblems || []} />
        )}
      </div>
    </motion.div>
  );
}
