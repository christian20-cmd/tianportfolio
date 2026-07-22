// backend/src/routes/tools.routes.js
import { Router } from "express";
import { getAllTools } from "../controllers/tools.controller.js";

const router = Router();
router.get("/", getAllTools);

export default router;