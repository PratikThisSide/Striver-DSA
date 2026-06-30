import { Router } from "express";
import { runCode, submitCode } from "../controllers/executionController.js";

const router = Router();

router.post("/run", runCode);
router.post("/submit", submitCode);

export default router;
