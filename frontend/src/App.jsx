import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "./services/api";
import { progressService } from "./services/progress";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import ProblemPage from "./pages/ProblemPage";
import TheoryDetail from "./pages/TheoryDetail";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({ solvedProblems: [], topicProgress: new Map(), dailyStreak: { currentStreak: 0 } });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    api.getTopics().then(setTopics).catch(console.error);
    loadProgress();
  }, []);

  function loadProgress() {
    const p = progressService.load();
    if (p) setProgress(p);
  }

  function handleSolve(problemSlug, topicSlug) {
    progressService.markSolved(problemSlug, topicSlug);
    loadProgress();
  }

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar
        topics={topics}
        progress={progress}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          streak={progress.dailyStreak?.currentStreak || 0}
          solvedCount={progress.solvedProblems?.length || 0}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Home topics={topics} progress={progress} />} />
            <Route path="/topic/:slug" element={<TopicPage topics={topics} progress={progress} />} />
            <Route path="/topic/:slug/theory" element={<TheoryDetail />} />
            <Route path="/problem/:slug" element={<ProblemPage onSolve={handleSolve} progress={progress} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
