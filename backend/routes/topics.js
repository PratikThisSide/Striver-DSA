import { Router } from "express";
import {
  getAllTopics,
  getTopicBySlug,
  getTopicTheory,
} from "../controllers/topicController.js";

const router = Router();

router.get("/", getAllTopics);
router.get("/:slug", getTopicBySlug);
router.get("/:slug/theory", getTopicTheory);

export default router;
