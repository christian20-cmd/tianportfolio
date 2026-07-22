// backend/src/middleware/upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ═══════════════════════════════════════════════
// MÊME CHEMIN QUE DANS APP.JS
// ═══════════════════════════════════════════════
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');

console.log(`📁 [UPLOAD] Dossier: ${uploadDir}`);

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 [UPLOAD] Dossier créé');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`📂 [UPLOAD] Destination: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    console.log(`📄 [UPLOAD] Fichier: ${filename}`);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Type non supporté: ${file.mimetype}`), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});