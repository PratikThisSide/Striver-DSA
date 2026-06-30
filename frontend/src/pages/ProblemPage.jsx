import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import MonacoWrapper from "../editor/MonacoWrapper";
import OutputPanel from "../components/OutputPanel";

const JAVA_TEMPLATE = `import java.util.*;
import java.io.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    // Your code here
  }
}`;

const difficultyColors = {
  easy: "text-green-400 bg-green-400/10 border-green-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ProblemPage({ onSolve, progress }) {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(JAVA_TEMPLATE);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionData, setSolutionData] = useState(null);

  useEffect(() => {
    api.getProblem(slug).then((data) => {
      setProblem(data);
    }).catch(console.error);
  }, [slug]);

  const runCode = useCallback(async () => {
    setLoading(true);
    setOutput(null);
    const result = await api.runCode(code, slug);
    setOutput(result);
    setLoading(false);
  }, [code, slug]);

  const submitCode = useCallback(async () => {
    setLoading(true);
    setOutput(null);
    const result = await api.submitCode(code, slug);
    setOutput(result);
    if (result.passed && onSolve) {
      onSolve(slug, problem?.topicSlug);
    }
    setLoading(false);
  }, [code, slug, problem, onSolve]);

  const loadSolution = useCallback(async () => {
    if (solutionData) {
      setShowSolution(!showSolution);
      return;
    }
    const data = await api.getSolution(slug);
    setSolutionData(data);
    setShowSolution(true);
  }, [slug, solutionData, showSolution]);

  const isSolved = progress.solvedProblems?.includes(slug);

  if (!problem) {
    return <div className="text-gray-400">Loading problem...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/topic/${problem.topicSlug}`} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h2 className="text-xl font-bold text-white">{problem.title}</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {isSolved && <span className="text-green-400 text-sm">✅ Solved</span>}
        </div>
        <div className="flex gap-2">
          <button onClick={loadSolution} className="btn-secondary text-sm">
            {showSolution ? "Hide Solution" : "View Solution"}
          </button>
          <button onClick={runCode} disabled={loading} className="btn-secondary text-sm">
            ▶ Run
          </button>
          <button onClick={submitCode} disabled={loading} className="btn-primary text-sm">
            Submit
          </button>
        </div>
      </div>

      {/* Split pane: problem desc + editor/output */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: problem description */}
        <div className="w-2/5 overflow-y-auto space-y-4">
          <div className="card">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{problem.statement}</div>
          </div>

          <div className="card">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Input Format</h4>
            <pre className="text-sm text-gray-400 whitespace-pre-wrap">{problem.inputFormat}</pre>
          </div>

          <div className="card">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Output Format</h4>
            <pre className="text-sm text-gray-400 whitespace-pre-wrap">{problem.outputFormat}</pre>
          </div>

          <div className="card">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Constraints</h4>
            <pre className="text-sm text-gray-400 whitespace-pre-wrap">{problem.constraints}</pre>
          </div>

          {problem.sampleTestCases?.map((tc, i) => (
            <div key={i} className="card">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Sample {i + 1}</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-500">Input:</span>
                  <pre className="text-gray-300 mt-0.5">{tc.input}</pre>
                </div>
                <div>
                  <span className="text-gray-500">Output:</span>
                  <pre className="text-green-400 mt-0.5">{tc.expectedOutput}</pre>
                </div>
              </div>
            </div>
          ))}

          {/* Solution section */}
          {showSolution && solutionData && (
            <div className="space-y-4">
              {solutionData.bruteSolution && (
                <div className="card">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Brute Force Solution</h4>
                  <div className="h-48 rounded-lg overflow-hidden border border-dark-600">
                    <MonacoWrapper value={solutionData.bruteSolution} readOnly />
                  </div>
                </div>
              )}
              {solutionData.optimalSolution && (
                <div className="card">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Optimal Solution</h4>
                  <div className="h-48 rounded-lg overflow-hidden border border-dark-600">
                    <MonacoWrapper value={solutionData.optimalSolution} readOnly />
                  </div>
                </div>
              )}
              {solutionData.explanation && (
                <div className="card">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Explanation</h4>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{solutionData.explanation}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: editor + output */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 rounded-xl overflow-hidden border border-dark-600 mb-2">
            <MonacoWrapper value={code} onChange={setCode} />
          </div>
          <div className="h-48 rounded-xl overflow-hidden border border-dark-600 bg-dark-800">
            <div className="px-3 py-1.5 text-xs text-gray-500 border-b border-dark-600 uppercase tracking-wider">
              Output
            </div>
            <OutputPanel output={output} loading={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
