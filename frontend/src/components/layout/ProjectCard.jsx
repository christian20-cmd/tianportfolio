// src/components/layout/ProjectCard.jsx
import { Monitor, Smartphone, Globe, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { pick } from "../../i18n/pick";

export default function ProjectCard({ project, onClick }) {
  const { lang } = useLanguage();

  const {
    title,
    number,
    year,
    image,
    tools,
    inProgress,
    status,
    type,
    link,
    downloadLink,
  } = project;

  const tagline = pick(project.tagline, lang);
  const categorie = pick(project.categorie, lang);
  const role = pick(project.role, lang);

  const statusConfig = {
    deployed: { label: lang === "fr" ? "En ligne" : "Live", dot: "bg-green-500" },
    local: { label: lang === "fr" ? "En local" : "Local", dot: "bg-orange-400" },
  };
  const currentStatus = statusConfig[status];

  const typeConfig = {
    mobile: { label: lang === "fr" ? "Mobile" : "Mobile", icon: Smartphone },
    desktop: { label: lang === "fr" ? "Desktop" : "Desktop", icon: Monitor },
    web: { label: lang === "fr" ? "Web" : "Web", icon: Globe },
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

  const ActionIcon =
    actionMode === "link" ? ExternalLink : actionMode === "download" ? Download : null;

  return (
    <div
      onClick={handleAction}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleAction()}
      className="group relative w-full flex flex-col rounded-sm overflow-hidden ring-2 ring-neutral-400 bg-[#EDE9E4] shadow cursor-pointer transition-shadow"    >
      <div className="relative w-full aspect-5/4 overflow-hidden bg-neutral-400">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
            <span className="text-black/10 text-5xl font-bold font-baloo">
              {number}
            </span>
          </div>
        )}

        {currentStatus && (
          <div className="absolute top-3 left-3 flex items-center">
            <span className="relative flex h-2 w-2">
              {status === "deployed" && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.dot} opacity-75`}
                />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatus.dot}`} />
            </span>
          </div>
        )}

        {(currentType || ActionIcon) && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {currentType && (
              <div className="flex items-center justify-center h-7 w-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                <currentType.icon className="w-10 h-10 text-black" />
              </div>
            )}
            {ActionIcon && (
              <div className="flex items-center justify-center h-7 w-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                <ActionIcon className="w-3.5 h-3.5 text-black" />
              </div>
            )}
          </div>
        )}

        {inProgress && (
          <div className="absolute bottom-32 right-28 -rotate-10">
            <div className="border-2 border-red-600/90 rounded-md px-2 bg-white/80 backdrop-blur-sm">
              <span className="text-red-600/90 text-lg font-bold uppercase tracking-widest font-baloo whitespace-nowrap">
                {lang === "fr" ? "En cours" : "In progress"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col pt-4 pb-2 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-black font-poppins font-semibold text-xl leading-tight">
            {title}
          </h3>
          <span className="text-neutral-400 text-xl font-medium shrink-0">{year}</span>
        </div>

        {role && (
          <span className="text-green-700 text-md font-poppins">{role}</span>
        )}

        {tagline && (
          <p className="text-neutral-500 leading-snug">{tagline}</p>
        )}

        {categorie && (
          <span className="text-neutral-400 text-[12px] mt-0.5">{categorie}</span>
        )}

        {tools?.length > 0 && (
          <div className="flex flex-row flex-wrap gap-1.5 mt-2">
            {tools.map((tool) => (
              <tool.icon
                key={tool.label}
                className="w-8 h-8 shrink-0"
                style={{ color: tool.color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}