// src/lib/formatProject.js
import { getImageUrl } from "./api";
import { getToolIcon } from "./toolsRegistry";

/**
 * Transforme les données brutes d'un projet venant de l'API
 * (image relative, tools avec iconName string, screenshots.image)
 * en format attendu par ProjectCard / ProjectShowcase
 * (image absolue, tools avec composant icon, screenshots.src).
 *
 * @param {object} project - projet brut venant de l'API
 * @param {number} [index] - index dans la liste, utilisé pour générer `number` si absent
 */
export function formatProjectFromApi(project, index) {
  return {
    ...project,
    number: project.number ?? String((index ?? 0) + 1).padStart(2, "0"),
    image: getImageUrl(project.image),
    tools: (project.tools || []).map((tool) => ({
      icon: getToolIcon(tool.iconName),
      label: tool.label,
      color: tool.color,
    })),
    screenshots: (project.screenshots || []).map((s) => ({
      ...s,
      src: getImageUrl(s.image || s.src),
    })),
  };
}