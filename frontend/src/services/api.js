import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const client = axios.create({ baseURL: BASE_URL });

export const api = {
  getTopics: () => client.get("/topics").then((r) => r.data),
  getTopic: (slug) => client.get(`/topics/${slug}`).then((r) => r.data),
  getTopicTheory: (slug) => client.get(`/topics/${slug}/theory`).then((r) => r.data),
  getProblemsByTopic: (topicSlug) => client.get(`/problems/topic/${topicSlug}`).then((r) => r.data),
  getProblem: (slug) => client.get(`/problems/${slug}`).then((r) => r.data),
  getSolution: (slug) => client.get(`/problems/${slug}/solution`).then((r) => r.data),
  runCode: (code, slug) => client.post("/execute/run", { code, slug }).then((r) => r.data),
  submitCode: (code, slug) => client.post("/execute/submit", { code, slug }).then((r) => r.data),
  getProgress: (sessionId) => client.get(`/progress/${sessionId}`).then((r) => r.data),
  markSolved: (sessionId, problemSlug, topicSlug) =>
    client.post(`/progress/${sessionId}/solve`, { problemSlug, topicSlug }).then((r) => r.data),
};
