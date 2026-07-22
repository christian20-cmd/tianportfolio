// src/pages/admin/ProjectsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Smartphone, Globe, Trash2, Plus } from "lucide-react";
import { api } from "../../lib/api";
import { resolveImageUrl } from "../../lib/resolveImageUrl";
import { getToolIcon } from "../../lib/toolsRegistry";

const statusConfig = {
  deployed: { label: "En ligne", dot: "bg-green-500" },
  local: { label: "En local", dot: "bg-orange-400" },
};

const typeConfig = {
  mobile: { label: "Mobile", icon: Smartphone },
  desktop: { label: "Desktop", icon: Monitor },
  web: { label: "Web", icon: Globe },
};

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (e, project) => {
    // ... reste inchangé
    e.preventDefault(); // empêche le clic de suivre le <Link> parent
    e.stopPropagation();

    if (!window.confirm(`Supprimer "${project.title}" ? Cette action est irréversible.`)) {
      return;
    }

    setDeletingId(project.id);
    try {
      await api.deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-sm text-gray-500 font-poppins">Chargement...</p>;
  if (error) return <p className="text-sm text-red-500 font-poppins">Erreur : {error}</p>;

  return (
    <div>
      <div className="relative flex items-center justify-between font-fredoka ">
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[10rem] md:text-[24rem] font-baloo font-bold text-gray-900/5 select-none whitespace-nowrap">
            {'</tian>'}
          </span>
        </div>
        <h1 className="text-xl font-borel font-bold text-black">
          Liste des Projets <span className="text-gray-400">({projects.length})</span>
        </h1>
        <Link
          to="/admin/nouveau"
          className="inline-flex text-xs px-5 py-2  items-center gap-2 rounded-full bg-black text-white font-medium hover:bg-gray-700 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          <Plus size={14}/> Nouveau projet
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {projects.map((p, index) => {
          const imageUrl = resolveImageUrl(p.image);
          const currentStatus = statusConfig[p.status];
          const currentType = typeConfig[p.type];
          const number = String(index + 1).padStart(2, "0");
          const isDeleting = deletingId === p.id;

          return (
            <Link
              to={`/admin/${p.id}/modifier`}
              key={p.id}
              className="relative w-full max-w-[320px] mx-auto aspect-[10/11] rounded-[24px] border-[5px] border-black bg-black/20 overflow-hidden shadow-lg group cursor-pointer block"
            >
              {/* Image de fond (pleine card) ou fallback si pas d'image */}
              <div className="absolute inset-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                    <span className="text-white/10 text-5xl font-bold font-baloo">{number}</span>
                  </div>
                )}
              </div>

              {/* Badge type (mobile/desktop/web), en haut à droite */}
              {currentType && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white border-2 border-black/60 rounded-full px-2 py-2">
                  <currentType.icon className="w-3.5 h-3.5 text-black shrink-0" />
                </div>
              )}

              {/* Bouton suppression, en haut à droite au-dessus du badge type */}
              <button
                type="button"
                onClick={(e) => handleDelete(e, p)}
                disabled={isDeleting}
                title="Supprimer le projet"
                className="absolute top-16 right-4 z-20 flex h-8 w-8 items-center justify-center bg-white border-2 border-black/60 rounded-full text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <span className="text-xs">…</span>
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Tampon "En cours de développement", façon cachet encreur */}
              {p.inProgress && (
                <div className="absolute top-16 right-16 z-30 -rotate-12">
                  <div className="border-[3px] border-red-600/90 rounded-md px-2.5 py-1 relative">
                    <div className="absolute inset-[3px] border border-red-600/60 rounded-sm pointer-events-none" />
                    <span className="text-red-600/90 text-2xl font-bold uppercase tracking-widest font-baloo whitespace-nowrap [text-shadow:_0_0_1px_rgba(220,38,38,0.5)]">
                      En cours
                    </span>
                  </div>
                </div>
              )}

              {/* Badges des outils utilisés, en haut à gauche, autant que nécessaire */}
                {p.tools?.length > 0 && (
                <div className="absolute top-4 left-4 right-20 z-20 flex flex-row flex-wrap gap-1.5">
                    {p.tools.map((tool) => {
                    const Icon = getToolIcon(tool.iconName);
                    if (!Icon) return null;
                    return (
                        <div
                        key={tool.label}
                        className="flex items-center gap-1.5 bg-white border-2 border-black/60 backdrop-blur-sm rounded-full p-1.5"
                        >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: tool.color }} />
                        </div>
                    );
                    })}
                </div>
                )}



              {/* --- Silhouette du volet en 2 blocs superposés --- */}
              <div className="absolute left-0 top-[47.4%] w-[62%] h-[36px] bg-black/90 rounded-t-[16px] z-10" />
              <div className="absolute left-0 right-0 bottom-0 top-[58%] bg-black/90 rounded-tr-[22px] z-10" />

              <div className="absolute left-0 top-[46%] right-0 bottom-0 z-20 px-4 pt-3 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-green-600 font-poppins text-sm leading-tight">{p.title}</h3>

                  {currentStatus && (
                    <div className="flex items-center gap-1.5 shrink-0 bg-white px-2.5 py-0.5 rounded-full font-bold">
                      <span className="relative flex h-1.5 w-1.5">
                        {p.status === "deployed" && (
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.dot} opacity-75`}
                          ></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${currentStatus.dot}`}></span>
                      </span>
                      <span className="text-black text-[10px] font-poppins whitespace-nowrap">
                        {currentStatus.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Rôle, discret sous le titre */}
                {p.role && <span className="text-gray-400 text-[10px] font-poppins">{p.role}</span>}

                <p className="text-orange-400 text-xs mt-1">{p.tagline}</p>

                {p.categorie && (
                  <div className="text-red-400 text-[11px]">
                    Catégorie: <span className="text-white text-[11px] mt-1">{p.categorie}</span>
                  </div>
                )}

                {p.description && (
                  <p className="text-gray-500 text-[11px] mt-1.5 leading-snug line-clamp-2">{p.description}</p>
                )}

                {/* Numéro en bas, rempli avec l'image du projet */}
                <div className="mt-auto flex items-end justify-between pb-4">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl font-bold font-baloo bg-clip-text text-transparent bg-cover bg-center leading-none"
                      style={{
                        backgroundImage: imageUrl
                          ? `url(${imageUrl})`
                          : "linear-gradient(135deg, #ffffff, #9ca3af)",
                        WebkitTextStroke: "0.5px rgba(255,255,255,0.5)",
                      }}
                    >
                      {number}
                    </span>
                    <span className="text-gray-200 text-xs">Projet</span>
                  </div>
                  <span className="text-gray-200 font-semibold text-xs">{p.year}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}