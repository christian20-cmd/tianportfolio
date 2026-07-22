// backend/src/routes/upload.routes.js
import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

// Route d'upload d'image unique
router.post("/", upload.single("image"), uploadImage);

// Route d'upload multiple (optionnel)
router.post("/multiple", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }
    
    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));
    
    res.status(201).json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'upload" });
  }
});

export default router;