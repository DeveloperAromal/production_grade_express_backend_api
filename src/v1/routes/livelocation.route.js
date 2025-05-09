import express from "express";
import { getLocation } from "../controllers/livelocation.controller.js";

const router = express.Router();

router.post("/live-location", getLocation);

export default router;
