import { Router } from "express";
import {
  getProblemsByTopic,
  getProblemBySlug,
  getSolution,
} from "../controllers/problemController.js";

const router = Router();

router.get("/topic/:topicSlug", getProblemsByTopic);
router.get("/:slug", getProblemBySlug);
router.get("/:slug/solution", getSolution);

export default router;
