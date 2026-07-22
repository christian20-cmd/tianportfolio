// backend/src/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import projectsRoutes from "./routes/projects.routes.js";
import toolsRoutes from "./routes/tools.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://christianportoflio-group.gitlab.io'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ═══════════════════════════════════════════════
// SERVIRE LES FICHIERS STATIQUES - AVANT TOUTE AUTRE ROUTE
// ═══════════════════════════════════════════════

// Chemin vers public/uploads
const uploadsPath = path.join(__dirname, '..', 'public', 'uploads');
console.log(`📁 [STATIC] Dossier uploads: ${uploadsPath}`);

// Vérifier que le dossier existe
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('📁 [STATIC] Dossier uploads créé');
}

// ⚠️ IMPORTANT: Servir les fichiers statiques AVANT les routes API
app.use('/uploads', express.static(uploadsPath));

// Route API pour lister les fichiers
app.get('/api/list-files', (req, res) => {
  try {
    if (!fs.existsSync(uploadsPath)) {
      return res.json({ error: 'Dossier inexistant', path: uploadsPath });
    }
    
    const files = fs.readdirSync(uploadsPath);
    res.json({
      directory: uploadsPath,
      count: files.length,
      files: files.map(f => ({
        name: f,
        url: `/uploads/${f}`,
        fullUrl: `http://localhost:4000/uploads/${f}`
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes API
app.use('/api/projects', projectsRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/upload', uploadRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uploadsPath,
    uploadsExist: fs.existsSync(uploadsPath)
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err);
  res.status(500).json({ error: err.message });
});

export default app;