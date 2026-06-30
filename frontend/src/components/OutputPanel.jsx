export default function OutputPanel({ output, loading }) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Running...</span>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
        Click "Run" to execute code or "Submit" to test against all cases
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto font-mono text-sm">
      {output.passed !== undefined && (
        <div className={`px-3 py-2 text-sm font-medium ${output.passed ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}>
          {output.passed
            ? `✅ Passed (${output.passedCount}/${output.totalCount})`
            : `❌ Failed (${output.passedCount}/${output.totalCount})`}
          {output.runtime && <span className="ml-4 text-gray-400">⏱ {output.runtime}</span>}
          {output.memory && <span className="ml-2 text-gray-400">💾 {output.memory}</span>}
        </div>
      )}
      <div className="p-3 space-y-2">
        {output.stdout && (
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Output</div>
            <pre className="text-green-300 whitespace-pre-wrap">{output.stdout}</pre>
          </div>
        )}
        {output.stderr && (
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Stderr</div>
            <pre className="text-red-300 whitespace-pre-wrap">{output.stderr}</pre>
          </div>
        )}
        {output.compileOutput && (
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Compile Output</div>
            <pre className="text-yellow-300 whitespace-pre-wrap">{output.compileOutput}</pre>
          </div>
        )}
        {output.results && output.results.map((r, i) => (
          <div key={i} className={`text-xs ${r.passed ? "text-green-400" : "text-red-400"}`}>
            <span>Test #{i + 1}: {r.passed ? "Passed" : `Failed (expected: ${r.expected}, got: ${r.actual})`}</span>
            <span className="text-gray-500 ml-2">⏱ {r.time}s</span>
          </div>
        ))}
        {output.status && output.status !== "Accepted" && output.status !== "Success" && (
          <div className="text-gray-400">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Status</div>
            <div>{output.status}</div>
          </div>
        )}
      </div>
    </div>
  );
}
