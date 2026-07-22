// backend/src/controllers/projects.controller.js
import { prisma } from "../lib/prisma.js";

// Champs à inclure pour la vue "liste" (grille de cards) — léger, pas de screenshots complets
const listInclude = {
  tools: { include: { tool: true }, orderBy: { displayOrder: "asc" } },
};

// Champs à inclure pour la vue "détail" (ProjectShowcase) — tout, avec features imbriquées
const detailInclude = {
  tools: { include: { tool: true }, orderBy: { displayOrder: "asc" } },
  screenshots: {
    orderBy: { displayOrder: "asc" },
    include: {
      features: { orderBy: { displayOrder: "asc" } },
    },
  },
};

// Aplati les relations project_tools -> tools pour matcher le format attendu par le frontend
function formatProject(project) {
  return {
    ...project,
    tools: project.tools?.map((pt) => pt.tool) ?? [],
  };
}

// Formate un screenshot avec ses features pour le frontend
function formatScreenshot(screenshot) {
  return {
    id: screenshot.id,
    image: screenshot.src,
    titre: screenshot.titre || "",
    caption: screenshot.caption || "",
    traitement: screenshot.features?.map(f => f.texte) || [],
    displayOrder: screenshot.displayOrder
  };
}

// Formate un projet complet avec les screenshots formatés
function formatProjectFull(project) {
  const formatted = formatProject(project);
  return {
    ...formatted,
    screenshots: project.screenshots?.map(formatScreenshot) || []
  };
}

// Fonction pour nettoyer le slug automatiquement
function cleanSlug(slug) {
  if (!slug) return slug;
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Validation des données du projet
function validateProjectData(data) {
  const errors = [];
  
  if (!data.title?.trim()) {
    errors.push("Le titre est requis");
  }
  if (!data.slug?.trim()) {
    errors.push("Le slug est requis");
  }
  
  return errors;
}

// Fonction pour transformer un screenshot du frontend vers le format backend
function transformScreenshot(s, index) {
  console.log(`📸 Transformation screenshot ${index}:`, s);
  
  // S'assurer que l'image existe
  const src = s.image || s.src || "";
  if (!src) {
    console.warn(`⚠️ Screenshot ${index} sans image`);
  }
  
  // Nettoyer le traitement
  const traitement = Array.isArray(s.traitement) 
    ? s.traitement.filter(t => t && t.trim()) 
    : [];
  
  return {
    src: src,
    titre: s.titre || "",
    caption: s.caption || "",
    displayOrder: index,
    features: traitement.length > 0
      ? {
          create: traitement.map((texte, j) => ({ 
            texte: texte.trim(), 
            displayOrder: j 
          }))
        }
      : undefined
  };
}

// ═══════════════════════════════════════════════════════════════
// FONCTIONS EXPORTÉES
// ═══════════════════════════════════════════════════════════════

export async function getAllProjects(req, res) {
  console.log('📊 [getAllProjects] Appelé');
  try {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
      include: listInclude,
    });
    console.log(`📊 [getAllProjects] ${projects.length} projets trouvés`);
    res.json(projects.map(formatProject));
  } catch (err) {
    console.error('❌ [getAllProjects] Erreur:', err);
    res.status(500).json({ error: "Impossible de récupérer les projets" });
  }
}

export async function getProjectBySlug(req, res) {
  console.log(`🔍 [getProjectBySlug] Appelé avec slug:`, req.params.slug);
  try {
    const slug = req.params.slug;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: detailInclude,
    });
    
    if (!project) {
      return res.status(404).json({ error: `Projet avec slug "${slug}" introuvable` });
    }
    
    res.json(formatProjectFull(project));
  } catch (err) {
    console.error('❌ [getProjectBySlug] Erreur:', err);
    res.status(500).json({ error: "Impossible de récupérer le projet" });
  }
}

export async function getProjectById(req, res) {
  console.log(`🔍 [getProjectById] Appelé avec ID:`, req.params.id);
  
  try {
    const id = Number(req.params.id);
    console.log(`🔍 [getProjectById] ID converti: ${id}`);
    
    if (isNaN(id)) {
      console.log(`❌ [getProjectById] ID invalide: ${req.params.id}`);
      return res.status(400).json({ error: "ID invalide" });
    }
    
    console.log(`🔍 [getProjectById] Recherche dans la BDD...`);
    const project = await prisma.project.findUnique({
      where: { id },
      include: detailInclude,
    });
    
    if (!project) {
      console.log(`❌ [getProjectById] Projet ID ${id} introuvable`);
      return res.status(404).json({ error: `Projet avec ID ${id} introuvable` });
    }
    
    console.log(`✅ [getProjectById] Projet trouvé:`, project.title);
    console.log(`📸 [getProjectById] Nombre de screenshots:`, project.screenshots?.length || 0);
    
    res.json(formatProjectFull(project));
  } catch (err) {
    console.error('❌ [getProjectById] Erreur:', err);
    res.status(500).json({ 
      error: "Impossible de récupérer le projet",
      details: err.message 
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// CREATE PROJECT - CORRIGÉ AVEC SCREENSHOTS
// ═══════════════════════════════════════════════════════════════
export async function createProject(req, res) {
  try {
    console.log('📝 Création d\'un nouveau projet');
    console.log('📦 Body reçu:', JSON.stringify(req.body, null, 2));
    
    const { toolIds, screenshots, ...data } = req.body;
    
    // Nettoyer le slug
    if (data.slug) {
      data.slug = cleanSlug(data.slug);
      console.log(`🔍 Slug nettoyé: "${data.slug}"`);
      if (!data.slug) {
        data.slug = `project-${Date.now()}`;
        console.log(`🔍 Slug généré: "${data.slug}"`);
      }
    }

    // Validation
    const errors = validateProjectData(data);
    if (errors.length) {
      console.log('❌ Erreurs de validation:', errors);
      return res.status(400).json({ errors });
    }

    // Nettoyer les données
    const cleanData = {
      ...data,
      year: data.year ? Number(data.year) : null,
      image: data.image || null,
      link: data.link || null,
      downloadLink: data.downloadLink || null,
      inProgress: data.inProgress === true || data.inProgress === 'true',
    };

    console.log('📦 DONNÉES NETTOYÉES:', cleanData);
    console.log(`📸 Nombre de screenshots à créer:`, screenshots?.length || 0);
    console.log(`🔧 Nombre d'outils à associer:`, toolIds?.length || 0);

    // Créer le projet
    const project = await prisma.project.create({
      data: {
        ...cleanData,
        // Gestion des outils
        tools: toolIds?.length
          ? { 
              create: toolIds.map((toolId, i) => ({ 
                toolId, 
                displayOrder: i 
              })) 
            }
          : undefined,
        // Gestion des screenshots - CORRIGÉ
        screenshots: screenshots?.length
          ? {
              create: screenshots.map((s, i) => transformScreenshot(s, i))
            }
          : undefined
      },
      include: detailInclude,
    });

    console.log(`✅ Projet créé avec ID: ${project.id}`);
    console.log(`📸 Screenshots créés: ${project.screenshots?.length || 0}`);
    
    res.status(201).json(formatProjectFull(project));
  } catch (err) {
    console.error('❌ Erreur createProject:', err);
    console.error('❌ Stack:', err.stack);
    
    // Gestion des erreurs Prisma spécifiques
    if (err.code === 'P2002') {
      return res.status(400).json({ 
        error: "Un projet avec ce slug existe déjà",
        details: "Le slug doit être unique"
      });
    }
    
    res.status(400).json({ 
      error: "Création du projet impossible", 
      details: err.message,
      code: err.code
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// UPDATE PROJECT - CORRIGÉ AVEC SCREENSHOTS
// ═══════════════════════════════════════════════════════════════
export async function updateProject(req, res) {
  try {
    const id = Number(req.params.id);
    console.log(`📝 Mise à jour du projet ID: ${id}`);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    console.log('📦 Body reçu:', JSON.stringify(req.body, null, 2));
    
    const { toolIds, screenshots, ...data } = req.body;
    
    // Log des screenshots reçus
    console.log(`📸 Screenshots reçus: ${screenshots?.length || 0}`);
    if (screenshots && screenshots.length > 0) {
      console.log('📸 Détails des screenshots:', JSON.stringify(screenshots, null, 2));
    }
    
    // Nettoyer le slug
    if (data.slug) {
      data.slug = cleanSlug(data.slug);
      console.log(`🔍 Slug nettoyé: "${data.slug}"`);
      if (!data.slug) {
        data.slug = `project-${Date.now()}`;
        console.log(`🔍 Slug généré: "${data.slug}"`);
      }
    }

    // Validation
    const errors = validateProjectData(data);
    if (errors.length) {
      console.log('❌ Erreurs de validation:', errors);
      return res.status(400).json({ errors });
    }

    // Nettoyer les données
    const cleanData = {
      ...data,
      year: data.year ? Number(data.year) : null,
      image: data.image || null,
      link: data.link || null,
      downloadLink: data.downloadLink || null,
      inProgress: data.inProgress === true || data.inProgress === 'true',
    };

    console.log('📦 DONNÉES NETTOYÉES:', cleanData);

    // Préparer les données de mise à jour
    const updateData = {
      ...cleanData,
    };

    // Gestion des outils
    if (toolIds !== undefined) {
      updateData.tools = {
        deleteMany: {},
        create: toolIds.map((toolId, i) => ({ 
          toolId, 
          displayOrder: i 
        })),
      };
      console.log(`🔧 Mise à jour des outils: ${toolIds.length} outils`);
    }

    // Gestion des screenshots - CORRIGÉ
    if (screenshots !== undefined) {
      if (screenshots.length === 0) {
        // Si le tableau est vide, supprimer tous les screenshots
        updateData.screenshots = {
          deleteMany: {},
        };
        console.log('🗑️ Suppression de tous les screenshots');
      } else {
        // Sinon, remplacer tous les screenshots
        const transformedScreenshots = screenshots.map((s, i) => {
          console.log(`📸 Transformation screenshot ${i}:`, s);
          return transformScreenshot(s, i);
        });
        
        updateData.screenshots = {
          deleteMany: {},
          create: transformedScreenshots
        };
        console.log(`📸 Création de ${transformedScreenshots.length} nouveaux screenshots`);
      }
    }

    // Mettre à jour le projet
    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: detailInclude, // IMPORTANT: Inclure les screenshots dans la réponse
    });

    console.log(`✅ Projet ID ${id} mis à jour avec succès`);
    console.log(`📸 Screenshots après mise à jour: ${project.screenshots?.length || 0}`);
    
    // Formater la réponse avec les screenshots
    const formattedProject = formatProjectFull(project);
    console.log('📤 Réponse envoyée avec screenshots:', formattedProject.screenshots?.length || 0);
    
    res.json(formattedProject);
  } catch (err) {
    console.error('❌ Erreur updateProject:', err);
    console.error('❌ Stack:', err.stack);
    
    // Gestion des erreurs Prisma spécifiques
    if (err.code === 'P2002') {
      return res.status(400).json({ 
        error: "Un projet avec ce slug existe déjà",
        details: "Le slug doit être unique"
      });
    }
    
    if (err.code === 'P2025') {
      return res.status(404).json({ 
        error: "Projet non trouvé",
        details: `Le projet avec l'ID ${req.params.id} n'existe pas`
      });
    }
    
    res.status(400).json({ 
      error: "Mise à jour impossible", 
      details: err.message,
      code: err.code
    });
  }
}

export async function deleteProject(req, res) {
  try {
    const id = Number(req.params.id);
    console.log(`🗑️ Suppression du projet ID: ${id}`);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    
    await prisma.project.delete({ 
      where: { id } 
    });
    
    console.log(`✅ Projet ID ${id} supprimé`);
    res.status(204).send();
  } catch (err) {
    console.error('❌ Erreur deleteProject:', err);
    res.status(400).json({ error: "Suppression impossible", details: err.message });
  }
}