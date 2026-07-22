// backend/server.js
import app from "./src/app.js";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Vérifier la connexion à la base de données
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
}

// Démarrer le serveur
async function startServer() {
  await testDatabaseConnection();
  
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`📁 Uploads disponibles sur http://localhost:${PORT}/uploads`);
    console.log(`📋 API disponible sur http://localhost:${PORT}/api`);
  });
}

startServer().catch((error) => {
  console.error('Erreur lors du démarrage du serveur:', error);
  process.exit(1);
});

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Serveur arrêté');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('🛑 Serveur arrêté');
  process.exit(0);
});