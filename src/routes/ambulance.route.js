import express from "express";
import { findNearestAmbulance } from "../controllers/ambulance.controller.js";

const router = express.Router();

router.post("/", findNearestAmbulance);

export default router;
