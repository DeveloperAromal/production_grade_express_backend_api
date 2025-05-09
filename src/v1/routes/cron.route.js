import express from "express";
import { runCronUpdate } from "../controllers/cron.controller.js";

const router = express.Router();

router.post("/cron", runCronUpdate);

export default router;
