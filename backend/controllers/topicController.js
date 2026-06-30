import Topic from "../models/Topic.js";

export async function getAllTopics(req, res) {
  try {
    const topics = await Topic.findAll({ order: [["level"], ["order"]] });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopicBySlug(req, res) {
  try {
    const topic = await Topic.findOne({ where: { slug: req.params.slug } });
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopicTheory(req, res) {
  try {
    const topic = await Topic.findOne({ where: { slug: req.params.slug } });
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic.theory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
