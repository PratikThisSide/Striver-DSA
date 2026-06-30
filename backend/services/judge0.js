import axios from "axios";

const JUDGE0_URL = process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

const headers = RAPIDAPI_KEY
  ? {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    }
  : {};

const LANGUAGE_ID = 62; // Java (OpenJDK 17)

// Execute a single test case (used for "Run")
export async function executeJavaCode(sourceCode, input) {
  try {
    const submitRes = await axios.post(
      `${JUDGE0_URL}/submissions?wait=true`,
      {
        source_code: sourceCode,
        language_id: LANGUAGE_ID,
        stdin: input || "",
        expected_output: null,
        cpu_time_limit: 5,
        memory_limit: 256000,
      },
      { headers }
    );

    const result = submitRes.data;
    return {
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compileOutput: result.compile_output || "",
      status: result.status?.description || "Unknown",
      time: result.time || "N/A",
      memory: result.memory || "N/A",
      passed: result.status_id === 3,
    };
  } catch (err) {
    return {
      stdout: "",
      stderr: err.message,
      compileOutput: "",
      status: "Error",
      time: "N/A",
      memory: "N/A",
      passed: false,
    };
  }
}

// Execute multiple test cases in parallel using batch API
export async function executeBatchJavaCode(sourceCode, testCases) {
  try {
    // Submit all test cases as a batch
    const batchRes = await axios.post(
      `${JUDGE0_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions: testCases.map((tc) => ({
          source_code: sourceCode,
          language_id: LANGUAGE_ID,
          stdin: tc.input,
          expected_output: tc.expectedOutput,
          cpu_time_limit: 5,
          memory_limit: 256000,
        })),
      },
      { headers }
    );

    const tokens = batchRes.data.map((item) => item.token);

    // Poll for all results at once
    let allResults = null;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 300));
      const getRes = await axios.get(
        `${JUDGE0_URL}/submissions/batch`,
        {
          headers,
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
            fields: "stdout,stderr,status_id,status,time,memory,compile_output,expected_output,stdin",
          },
        }
      );
      const subs = getRes.data.submissions || [];
      allResults = subs;
      const allDone = subs.every((s) => s.status_id >= 3);
      if (allDone) break;
    }

    if (!allResults) {
      return testCases.map(() => ({ passed: false, stdout: "", stderr: "Timeout polling results" }));
    }

    return allResults.map((result, i) => ({
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compileOutput: result.compile_output || "",
      status: result.status?.description || "Unknown",
      time: result.time || "N/A",
      memory: result.memory || "N/A",
      passed: result.status_id === 3,
    }));
  } catch (err) {
    return testCases.map(() => ({
      stdout: "",
      stderr: err.message,
      compileOutput: "",
      status: "Error",
      time: "N/A",
      memory: "N/A",
      passed: false,
    }));
  }
}
