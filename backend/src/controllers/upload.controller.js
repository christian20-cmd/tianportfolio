// backend/src/controllers/upload.controller.js
export function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }
    
    // Retourner l'URL du fichier uploadé
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ 
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'upload" });
  }
}