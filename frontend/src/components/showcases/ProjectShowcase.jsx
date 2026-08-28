// src/components/showcases/ProjectShowcase.jsx
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import MobileShowcase from "./MobileShowcase";
import DesktopShowcase from "./DesktopShowcase";
import SeamlessCardGallery from "./SeamlessCardGallery";
import MonitorFrame from "./MonitorFrame";
import PhoneFrame from "./PhoneFrame";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { pick } from "../../i18n/pick";

export default function ProjectShowcase({ project, onBack }) {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const isMobile = project.type === "mobile";
  const shot = project.screenshots?.[activeIndex];
  const images = project.screenshots?.map((s) => s.image || s.src) ?? [];

  // Champs localisés du projet
  const categorie = pick(project.categorie, lang);
  const role = pick(project.role, lang);
  const client = pick(project.client, lang);
  const description = pick(project.description, lang);
  const tagline = pick(project.tagline, lang);

  // Champs localisés du screenshot actif
  const shotTitre = pick(shot?.titre, lang);
  const shotCaption = pick(shot?.caption, lang);
  const shotTraitement = pick(shot?.traitement, lang) ?? [];

  const labels = {
    fr: { online: "En ligne", local: "En local", project: "Projet", treatment: "Traitement", stack: "Stack" },
    en: { online: "Live", local: "Local", project: "Project", treatment: "Details", stack: "Stack" },
  }[lang];

  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const asideRef = useRef(null);
  const mainRef = useRef(null);
  const wheelLockRef = useRef(false);

  const goTo = (index) => {
    const count = images.length;
    if (!count) return;
    setActiveIndex((index + count) % count);
  };
  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 0 });
      gsap.set(laptopWrapRef.current, { opacity: 0, scale: 0.9, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(bgRef.current, { opacity: 1, duration: 0.4 }).to(
        laptopWrapRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.2"
      );

      if (asideRef.current) {
        gsap.set(asideRef.current, { opacity: 0 });
        tl.to(asideRef.current, { opacity: 1, duration: 0.5 }, "-=0.4");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el || images.length < 2) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 10) return;

      e.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      if (e.deltaX > 0) handleNext();
      else handlePrev();

      setTimeout(() => {
        wheelLockRef.current = false;
      }, 450);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeIndex, images.length]);

  return (
    <section ref={sectionRef} className="fixed inset-0 z-50 w-full h-full overflow-hidden">
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(8px) brightness(0.5)",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <button
        type="button"
        onClick={() => onBack?.()}
        className="fixed left-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => setPanelOpen((p) => !p)}
        aria-label={panelOpen ? (lang === "fr" ? "Fermer le panneau" : "Close panel") : (lang === "fr" ? "Ouvrir le panneau" : "Open panel")}
        className="fixed right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:text-white hover:border-white/40 lg:hidden"
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Menu
            size={18}
            className={`absolute transition-all duration-300 ${
              panelOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            size={18}
            className={`absolute transition-all duration-300 ${
              panelOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </span>
      </button>

      {panelOpen && (
        <div
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
      <div className="relative z-10 h-full flex flex-col lg:flex-row">
        <main
          ref={mainRef}
          className="flex flex-1 min-h-0 flex-col items-center justify-center text-center overflow-hidden pt-6 pb-4 lg:pb-6"
        >
          {shotTitre && (
            <h2 className="text-xl font-borel text-white/80 mt-4">
              {shotTitre}
            </h2>
          )}
          <div className="flex items-center justify-center w-full">
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex shrink-0 items-center justify-center text-white/60 transition-colors hover:text-[#88ce02]"
              >
                <ChevronLeft size={48} />
              </button>
            )}

            <div ref={laptopWrapRef} className="w-full max-w-3xl">
              {isMobile ? (
                <MobileShowcase screenshots={project.screenshots} activeIndex={activeIndex} lang={lang} />
              ) : (
                <DesktopShowcase screenshots={project.screenshots} activeIndex={activeIndex} lang={lang} />
              )}
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="flex shrink-0 items-center justify-center text-white/60 transition-colors hover:text-[#88ce02]"
              >
                <ChevronRight size={48} />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <SeamlessCardGallery
              images={images}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          )}
        </main>

        <aside
          ref={asideRef}
          className={`fixed lg:static top-0 right-0 z-20 h-full font-poppins w-[85%] max-w-[340px] lg:w-[340px] flex flex-col gap-2 p-4 lg:p-6 shrink-0 justify-start bg-black/95 lg:bg-white/5 border-l border-white/10 overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-out lg:translate-x-0 ${
            panelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {project.image && (
            <div className="flex justify-center py-1">
              <div className="w-28">
                {isMobile ? (
                  <PhoneFrame>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </PhoneFrame>
                ) : (
                  <MonitorFrame>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </MonitorFrame>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-widest text-white">
              {categorie || labels.project}
            </span>
            {project.status && (
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  {project.status === "deployed" && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      project.status === "deployed" ? "bg-green-500" : "bg-orange-400"
                    }`}
                  />
                </span>
                <span className="text-white text-[10px] font-poppins whitespace-nowrap">
                  {project.status === "deployed" ? labels.online : labels.local}
                </span>
              </span>
            )}
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold uppercase leading-[0.95] text-green-400 font-baloo">
            {project.title}
          </h1>

          {(role || client) && (
            <p className="text-xs text-white/70">
              {role && <span className="text-orange-400">{role}</span>}
              {role && client && <span className="mx-1.5">·</span>}
              {client && <span>{client}</span>}
            </p>
          )}

          <p className="text-[10px] leading-relaxed text-white/50">
            {description || tagline}
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="text-md text-white/30">{project.year}</span>
            {project.type && (
              <span className="text-md text-white font-baloo capitalize">{project.type}</span>
            )}
          </div>

          {shotTitre && (
            <h2 className="text-lg font-borel text-white/80 mt-4">
              {shotTitre}
            </h2>
          )}

          {shotCaption && (
            <p className="text-xs leading-relaxed text-white/50">{shotCaption}</p>
          )}

          {shotTraitement.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {labels.treatment}
              </span>
              <ul className="flex flex-col gap-1.5">
                {shotTraitement.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/60 leading-snug">
                    <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" />👉 {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tools?.length > 0 && (
            <div className="flex flex-col gap-3 mt-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {labels.stack}
              </span>
              <div className="flex flex-wrap gap-3">
                {project.tools.map((tool, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-14">
                    <span
                      title={tool.label}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white"
                      style={{ color: tool.color }}
                    >
                      <tool.icon size={16} />
                    </span>
                    <span className="text-[9px] text-white/50 font-poppins text-center leading-tight">
                      {tool.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}