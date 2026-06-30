import { executeJavaCode } from "../services/judge0.js";
import Problem from "../models/Problem.js";

export async function runCode(req, res) {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    const problem = await Problem.findOne({ where: { slug: req.body.slug } });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const sampleInput = problem.sampleTestCases.map((tc) => tc.input).join("\n");
    const result = await executeJavaCode(code, sampleInput);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function submitCode(req, res) {
  try {
    const { code, slug } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    const problem = await Problem.findOne({ where: { slug } });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const allTestCases = [...(problem.sampleTestCases || []), ...(problem.hiddenTestCases || [])];
    const results = [];

    for (const tc of allTestCases) {
      const result = await executeJavaCode(code, tc.input);
      const expected = tc.expectedOutput.trim();
      const actual = (result.stdout || "").trim();
      results.push({
        passed: actual === expected && result.passed,
        expected,
        actual,
        time: result.time,
        memory: result.memory,
      });
    }

    const allPassed = results.every((r) => r.passed);
    const maxTime = Math.max(...results.map((r) => parseFloat(r.time) || 0));
    const totalMemory = results[results.length - 1]?.memory || "N/A";

    res.json({
      passed: allPassed,
      passedCount: results.filter((r) => r.passed).length,
      totalCount: results.length,
      results,
      runtime: maxTime.toFixed(3) + "s",
      memory: totalMemory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
