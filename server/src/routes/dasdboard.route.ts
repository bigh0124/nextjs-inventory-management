import express from "express";
import { getDasdboardMetrics } from "../controllers/dasdboard.controller";

const router = express.Router();

router.get("/", getDasdboardMetrics);

export default router;
