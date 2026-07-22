// backend/src/controllers/tools.controller.js
import { prisma } from "../lib/prisma.js";

export async function getAllTools(req, res) {
  try {
    const tools = await prisma.tool.findMany({ orderBy: { label: "asc" } });
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer les outils" });
  }
}