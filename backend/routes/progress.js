import { Router } from "express";
import {
  getProgress,
  updateProgress,
  markSolved,
} from "../controllers/progressController.js";

const router = Router();

router.get("/:sessionId", getProgress);
router.put("/:sessionId", updateProgress);
router.post("/:sessionId/solve", markSolved);

export default router;
