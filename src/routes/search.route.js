import express from "express";
import { fetchSuggestions } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", fetchSuggestions);

export default router;
