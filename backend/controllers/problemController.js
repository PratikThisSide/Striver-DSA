import Problem from "../models/Problem.js";

export async function getProblemsByTopic(req, res) {
  try {
    const problems = await Problem.findAll({
      where: { topicSlug: req.params.topicSlug },
      attributes: { exclude: ["hiddenTestCases", "bruteSolution", "optimalSolution"] },
      order: [["order"]],
    });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProblemBySlug(req, res) {
  try {
    const problem = await Problem.findOne({ where: { slug: req.params.slug } });
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    const data = problem.toJSON();
    const { hiddenTestCases, ...rest } = data;
    res.json({ ...rest, hiddenTestCount: hiddenTestCases.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getSolution(req, res) {
  try {
    const problem = await Problem.findOne({ where: { slug: req.params.slug } });
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json({
      bruteSolution: problem.bruteSolution,
      optimalSolution: problem.optimalSolution,
      explanation: problem.explanation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
