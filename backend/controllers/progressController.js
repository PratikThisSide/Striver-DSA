import Progress from "../models/Progress.js";

export async function getProgress(req, res) {
  try {
    let progress = await Progress.findOne({ where: { sessionId: req.params.sessionId } });
    if (!progress) {
      progress = await Progress.create({ sessionId: req.params.sessionId });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProgress(req, res) {
  try {
    const [progress] = await Progress.upsert({
      sessionId: req.params.sessionId,
      ...req.body,
      lastUpdated: new Date(),
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function markSolved(req, res) {
  try {
    const { problemSlug, topicSlug } = req.body;
    let progress = await Progress.findOne({ where: { sessionId: req.params.sessionId } });
    if (!progress) {
      progress = await Progress.create({ sessionId: req.params.sessionId });
    }

    const solved = progress.solvedProblems || [];
    const topicProg = progress.topicProgress || {};

    if (!solved.includes(problemSlug)) {
      solved.push(problemSlug);
      topicProg[topicSlug] = {
        solved: (topicProg[topicSlug]?.solved || 0) + 1,
        total: topicProg[topicSlug]?.total || 0,
      };
    }

    const today = new Date().toISOString().split("T")[0];
    const streak = progress.dailyStreak || { currentStreak: 0, lastActiveDate: "", totalActiveDays: 0 };

    if (streak.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (streak.lastActiveDate === yesterday) {
        streak.currentStreak += 1;
      } else {
        streak.currentStreak = 1;
      }
      streak.lastActiveDate = today;
      streak.totalActiveDays += 1;
    }

    progress.solvedProblems = solved;
    progress.topicProgress = topicProg;
    progress.dailyStreak = streak;
    progress.lastUpdated = new Date();
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
