import { executeJavaCode, executeBatchJavaCode } from "../services/judge0.js";
import Problem from "../models/Problem.js";

export async function runCode(req, res) {
  try {
    const { code, slug } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    const problem = await Problem.findOne({ where: { slug } });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // Run only the first sample test case for "Run" (fastest feedback)
    const firstSample = problem.sampleTestCases?.[0];
    if (!firstSample) return res.status(400).json({ error: "No sample test cases" });

    const result = await executeJavaCode(code, firstSample.input);
    const expected = firstSample.expectedOutput.trim();
    const actual = (result.stdout || "").trim();

    res.json({
      ...result,
      passed: actual === expected && result.passed,
      expected,
      actual,
    });
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
    if (allTestCases.length === 0) return res.status(400).json({ error: "No test cases" });

    // Execute all test cases in parallel via batch API
    const results = await executeBatchJavaCode(code, allTestCases);

    const mapped = results.map((result, i) => {
      const expected = allTestCases[i].expectedOutput.trim();
      const actual = (result.stdout || "").trim();
      return {
        passed: actual === expected && result.passed,
        expected,
        actual,
        time: result.time,
        memory: result.memory,
      };
    });

    const allPassed = mapped.every((r) => r.passed);
    const maxTime = Math.max(...mapped.map((r) => parseFloat(r.time) || 0));
    const lastMem = mapped[mapped.length - 1]?.memory || "N/A";

    res.json({
      passed: allPassed,
      passedCount: mapped.filter((r) => r.passed).length,
      totalCount: mapped.length,
      results: mapped,
      runtime: maxTime.toFixed(3) + "s",
      memory: lastMem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
