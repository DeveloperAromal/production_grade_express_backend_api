import express from "express";
import { calculateEstimatedTime } from "../controllers/estimatedTime.controller.js";

const router = express.Router();

router.post("/estimated-time", calculateEstimatedTime);

export default router;
