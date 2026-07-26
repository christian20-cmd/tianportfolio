// src/components/layout/ProjectCard.jsx
import { Monitor, Smartphone, Globe, Download, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, onClick }) {
  const {
    title,
    tagline,
    description,
    categorie,
    number,
    year,
    image,
    tools,
    inProgress,
    status,
    type,
    role,
    link,
    downloadLink,
  } = project;

  const statusConfig = {
    deployed: { label: "En ligne", dot: "bg-green-500" },
    local: { label: "En local", dot: "bg-orange-400" },
  };
  const currentStatus = statusConfig[status];

  const typeConfig = {
    mobile: { label: "Mobile", icon: Smartphone },
    desktop: { label: "Desktop", icon: Monitor },
    web: { label: "Web", icon: Globe },
  };
  const currentType = typeConfig[type];

  const isDeployed = status === "deployed";
  const isWeb = type === "web";
  const isDownloadable = type === "desktop" || type === "mobile";

  let actionMode = "showcase";
  if (isDeployed && isWeb && link) actionMode = "link";
  if (isDeployed && isDownloadable && downloadLink) actionMode = "download";

  const handleAction = () => {
    if (actionMode === "link") {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    if (actionMode === "download") {
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    onClick?.(project);
  };

  const ActionIcon = actionMode === "link" ? ExternalLink : actionMode === "download" ? Download : null;

  return (
    <div
      onClick={handleAction}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleAction()}
      className="relative w-full max-w-[320px] mx-auto aspect-[12/12] rounded-[24px] border-[5px] border-black bg-black/20 overflow-hidden shadow-lg group cursor-pointer"
    >
      <div className="absolute inset-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
            <span className="text-white/10 text-5xl font-bold font-baloo">
              {number}
            </span>
          </div>
        )}
      </div>

      {currentType && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white border-2 border-black/60 rounded-full px-2 py-2">
          <currentType.icon className="w-3.5 h-3.5 text-black shrink-0" />
        </div>
      )}

      {ActionIcon && (
        <div className="absolute top-16 right-4 z-20 flex h-8 w-8 items-center justify-center bg-white border-2 border-black/60 rounded-full">
          <ActionIcon className="w-3.5 h-3.5 text-black" />
        </div>
      )}

      {inProgress && (
        <div className="absolute top-16 right-16 z-30 -rotate-12">
          <div className="border-[3px] border-red-600/90 rounded-md px-2.5 py-1 relative">
            <div className="absolute inset-[3px] border border-red-600/60 rounded-sm pointer-events-none" />
            <span className="text-red-600/90 text-2xl font-bold uppercase tracking-widest font-baloo whitespace-nowrap [text-shadow:_0_0_1px_rgba(220,38,38,0.5)]">
              En cours
            </span>
          </div>
        </div>
      )}

      {tools?.length > 0 && (
        <div className="absolute top-4 left-4 right-20 z-20 flex flex-row flex-wrap gap-1.5">
          {tools.map((tool) => (
            <div
              key={tool.label}
              className="flex items-center gap-1.5 bg-white border-2 border-black/60 backdrop-blur-sm rounded-full p-1.5"
            >
              <tool.icon className="w-4 h-4 shrink-0" style={{ color: tool.color }} />
            </div>
          ))}
        </div>
      )}

      <div className="absolute left-0 right-0 bottom-0 top-[47%] bg-black/90 rounded-t-[22px] z-10" />

      <div className="absolute left-0 top-[46%] right-0 bottom-0 z-20 px-4 pt-3 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-green-600 font-poppins text-sm leading-tight">
            {title}
          </h3>

          {currentStatus && (
            <div className="flex items-center gap-1.5 shrink-0 bg-white px-2.5 py-0.5 rounded-full font-bold">
              <span className="relative flex h-1.5 w-1.5">
                {status === "deployed" && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.dot} opacity-75`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${currentStatus.dot}`}></span>
              </span>
              <span className="text-black text-[10px] font-poppins whitespace-nowrap">
                {currentStatus.label}
              </span>
            </div>
          )}
        </div>

        {role && (
          <span className="text-gray-400 text-[10px] font-poppins">{role}</span>
        )}

        <p className="text-orange-400 text-xs mt-1">{tagline}</p>
        <div className="text-red-400 text-[11px]">
          Catégorie: <span className="text-white text-[11px] mt-1">{categorie}</span>
        </div>
        {description && (
          <p className="text-gray-500 text-[11px] mt-1.5 leading-snug line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between pb-4">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-3xl font-bold font-baloo bg-clip-text text-transparent bg-cover bg-center leading-none"
              style={{
                backgroundImage: image
                  ? `url(${image})`
                  : "linear-gradient(135deg, #ffffff, #9ca3af)",
                WebkitTextStroke: "0.5px rgba(255,255,255,0.5)",
              }}
            >
              {number}
            </span>
            <span className="text-gray-200 text-xs">Projet</span>
          </div>
          <span className="text-gray-200 font-semibold text-xs">{year}</span>
        </div>
      </div>
    </div>
  );
}