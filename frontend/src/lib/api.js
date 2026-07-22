// src/lib/api.js

const API_BASE_URL = 'http://localhost:4000/api';

// Origine du serveur (sans le /api), pour préfixer les URLs relatives (ex: /uploads/xxx.png)
const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export function getImageUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${SERVER_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
}

console.log('═══════════════════════════════════════');
console.log('🔗 API BASE_URL =', API_BASE_URL);
console.log('═══════════════════════════════════════');

// Helper pour gérer les réponses
async function handleResponse(response) {
  console.log(`📡 [handleResponse] Status: ${response.status} ${response.statusText}`);
  console.log(`📡 [handleResponse] URL: ${response.url}`);

  if (!response.ok) {
    let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      console.error('❌ [handleResponse] Erreur détaillée:', errorData);
      errorMessage = errorData.error || errorData.details || errorMessage;
    } catch (e) {
      console.error('❌ [handleResponse] Impossible de parser l\'erreur:', e);
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log(`✅ [handleResponse] Succès, données reçues:`, data);
  return data;
}

export const api = {
  // ═══════════════════════════════════════════════
  // PROJETS
  // ═══════════════════════════════════════════════

  /**
   * Récupère tous les projets (pour la liste)
   */
  getProjects: async () => {
    console.log('📊 [getProjects] Appel API');
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      console.log(`📊 [getProjects] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [getProjects] Erreur:', error);
      throw error;
    }
  },

  /**
   * Récupère un projet par son ID
   */
  getProjectById: async (id) => {
    const url = `${API_BASE_URL}/projects/id/${id}`;
    console.log(`🔍 [getProjectById] Appel API: ${url}`);
    console.log(`🔍 [getProjectById] ID: ${id}`);

    try {
      const response = await fetch(url);
      console.log(`🔍 [getProjectById] Status: ${response.status}`);
      console.log(`🔍 [getProjectById] StatusText: ${response.statusText}`);
      console.log(`🔍 [getProjectById] Headers:`, Object.fromEntries(response.headers));

      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('🔍 [getProjectById] Erreur détaillée:', errorData);
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (e) {
          console.error('🔍 [getProjectById] Impossible de parser l\'erreur:', e);
          // Essayer de lire le texte brut
          try {
            const text = await response.text();
            console.error('🔍 [getProjectById] Réponse brute:', text);
          } catch (e2) {
            console.error('🔍 [getProjectById] Impossible de lire la réponse:', e2);
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`✅ [getProjectById] Données reçues:`, data);
      return data;
    } catch (error) {
      console.error('❌ [getProjectById] Erreur:', error);
      console.error('❌ [getProjectById] Stack:', error.stack);
      throw error;
    }
  },

  /**
   * Récupère un projet par son slug
   */
  getProjectBySlug: async (slug) => {
    const url = `${API_BASE_URL}/projects/slug/${slug}`;
    console.log(`🔍 [getProjectBySlug] Appel API: ${url}`);
    console.log(`🔍 [getProjectBySlug] Slug: ${slug}`);

    try {
      const response = await fetch(url);
      console.log(`🔍 [getProjectBySlug] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [getProjectBySlug] Erreur:', error);
      throw error;
    }
  },

  /**
   * Crée un nouveau projet
   */
  createProject: async (data) => {
    const url = `${API_BASE_URL}/projects`;
    console.log(`📝 [createProject] Appel API: ${url}`);
    console.log(`📝 [createProject] Données:`, data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(`📝 [createProject] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [createProject] Erreur:', error);
      throw error;
    }
  },

  /**
   * Met à jour un projet existant
   */
  updateProject: async (id, data) => {
    const url = `${API_BASE_URL}/projects/${id}`;
    console.log(`📝 [updateProject] Appel API: ${url}`);
    console.log(`📝 [updateProject] ID: ${id}`);
    console.log(`📝 [updateProject] Données:`, data);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(`📝 [updateProject] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [updateProject] Erreur:', error);
      throw error;
    }
  },

  /**
   * Supprime un projet
   */
  deleteProject: async (id) => {
    const url = `${API_BASE_URL}/projects/${id}`;
    console.log(`🗑️ [deleteProject] Appel API: ${url}`);
    console.log(`🗑️ [deleteProject] ID: ${id}`);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      console.log(`🗑️ [deleteProject] Status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch {
          // Réponse d'erreur non-JSON : on garde le message par défaut
        }
        throw new Error(errorMessage);
      }

      return response;
    } catch (error) {
      console.error('❌ [deleteProject] Erreur:', error);
      throw error;
    }
  },

  // ═══════════════════════════════════════════════
  // OUTILS
  // ═══════════════════════════════════════════════

  /**
   * Récupère tous les outils disponibles
   */
  getTools: async () => {
    const url = `${API_BASE_URL}/tools`;
    console.log(`🔧 [getTools] Appel API: ${url}`);

    try {
      const response = await fetch(url);
      console.log(`🔧 [getTools] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [getTools] Erreur:', error);
      throw error;
    }
  },

  // ═══════════════════════════════════════════════
  // UPLOAD
  // ═══════════════════════════════════════════════

  /**
   * Upload une image
   */
  uploadImage: async (file) => {
    const url = `${API_BASE_URL}/upload`;
    console.log(`📤 [uploadImage] Appel API: ${url}`);
    console.log(`📤 [uploadImage] Fichier:`, file.name, file.size, file.type);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Ne pas définir Content-Type, le navigateur le fera avec le boundary
      });
      console.log(`📤 [uploadImage] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [uploadImage] Erreur:', error);
      throw error;
    }
  },

  // ═══════════════════════════════════════════════
  // TEST / DEBUG
  // ═══════════════════════════════════════════════

  /**
   * Teste la connexion au serveur
   */
  testConnection: async () => {
    const url = `${API_BASE_URL}/health`;
    console.log(`🏥 [testConnection] Appel API: ${url}`);

    try {
      const response = await fetch(url);
      console.log(`🏥 [testConnection] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [testConnection] Erreur:', error);
      throw error;
    }
  },

  /**
   * Teste les routes projects
   */
  testProjectsRoute: async () => {
    const url = `${API_BASE_URL}/projects`;
    console.log(`🧪 [testProjectsRoute] Appel API: ${url}`);

    try {
      const response = await fetch(url);
      console.log(`🧪 [testProjectsRoute] Status: ${response.status}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('❌ [testProjectsRoute] Erreur:', error);
      throw error;
    }
  }
};

// Export pour utilisation
export default api;

// ═══════════════════════════════════════════════
// FONCTIONS DE TEST AUTOMATIQUE (à utiliser dans la console)
// ═══════════════════════════════════════════════

// Pour tester dans la console du navigateur :
// window.testApi = async () => {
//   try {
//     console.log('🧪 Test de connexion...');
//     await api.testConnection();
//     console.log('✅ Connexion OK');
//
//     console.log('🧪 Test des projets...');
//     await api.testProjectsRoute();
//     console.log('✅ Projets OK');
//
//     console.log('🧪 Test du projet ID 2...');
//     await api.getProjectById(2);
//     console.log('✅ Projet ID 2 OK');
//   } catch (error) {
//     console.error('❌ Test échoué:', error);
//   }
// };