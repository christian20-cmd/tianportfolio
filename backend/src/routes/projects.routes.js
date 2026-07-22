// backend/src/routes/projects.routes.js
import { Router } from "express";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

const router = Router();

// L'ordre est important : les routes spécifiques avant les routes génériques
router.get("/", getAllProjects);
router.get("/id/:id", getProjectById);  // /id/2
router.get("/slug/:slug", getProjectBySlug);  // /slug/mon-projet
router.get("/:slug", getProjectBySlug);  // Gardé pour compatibilité
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;