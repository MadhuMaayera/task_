import express from "express";
import { addLeaves, getLeaves } from "../controllers/leaverequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/add", authMiddleware, addLeaves);
router.get("", authMiddleware, getLeaves);

export default router;
