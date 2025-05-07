import express from "express";
import { getDoctorMessage } from "../controllers/doctor.controller.js";

const router = express.Router();

// POST route for doctor message
router.post("/chat", getDoctorMessage);

export default router;
