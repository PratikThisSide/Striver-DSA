const STORAGE_KEY = "striver-dsa-progress";

function generateId() {
  let id = localStorage.getItem("dsa-session-id");
  if (!id) {
    id = "striver-" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("striver-session-id", id);
  }
  return id;
}

export const progressService = {
  getSessionId: generateId,

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  },

  save(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  markSolved(problemSlug, topicSlug) {
    const progress = this.load() || {
      solvedProblems: [],
      topicProgress: {},
      dailyStreak: { currentStreak: 0, lastActiveDate: "", totalActiveDays: 0 },
    };

    if (!progress.solvedProblems.includes(problemSlug)) {
      progress.solvedProblems.push(problemSlug);
      if (!progress.topicProgress[topicSlug]) {
        progress.topicProgress[topicSlug] = { solved: 0 };
      }
      progress.topicProgress[topicSlug].solved += 1;
    }

    const today = new Date().toISOString().split("T")[0];
    if (progress.dailyStreak.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (progress.dailyStreak.lastActiveDate === yesterday) {
        progress.dailyStreak.currentStreak += 1;
      } else {
        progress.dailyStreak.currentStreak = 1;
      }
      progress.dailyStreak.lastActiveDate = today;
      progress.dailyStreak.totalActiveDays += 1;
    }

    this.save(progress);
    return progress;
  },

  getTopicProgress(topicSlug, totalProblems) {
    const progress = this.load();
    if (!progress || !progress.topicProgress[topicSlug]) {
      return { solved: 0, total: totalProblems, percent: 0 };
    }
    const solved = progress.topicProgress[topicSlug].solved || 0;
    return {
      solved,
      total: totalProblems,
      percent: totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0,
    };
  },
};
