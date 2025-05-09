import express from "express";
import { getDoctorMessage } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/doctor", getDoctorMessage);

export default router;
