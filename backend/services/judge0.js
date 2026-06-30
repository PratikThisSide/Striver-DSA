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

export async function executeJavaCode(sourceCode, input) {
  try {
    const submitRes = await axios.post(
      `${JUDGE0_URL}/submissions`,
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

    const token = submitRes.data.token;
    let result;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const getRes = await axios.get(
        `${JUDGE0_URL}/submissions/${token}`,
        { headers, params: { base64_encoded: false, fields: "stdout,stderr,status_id,status,time,memory,compile_output" } }
      );
      result = getRes.data;
      if (result.status_id >= 3) break;
    }

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
