import { ChevronsRight } from "lucide-react";
import ProjectCard from "../layout/ProjectCard";
import { projects } from "../../data/projects";
import { useHorizontalGallery } from "../../hooks/useHorizontalGallery";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

export default function Projets({ onProjectClick }) {
  const revealRef = useIntersectionObserver();
  const { sectionRef, stripRef } = useHorizontalGallery();
  const { lang } = useLanguage();
  const t = translations[lang].projets;

  return (
    <section
      ref={revealRef}
      id="projets"
      className="relative overflow-hidden bg-white pt-16"
    >
      <div className="reveal items-center text-center justify-center flex flex-col w-full px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-xl">
          <div className="bar-anim section-bar bg-green-600"></div>
          <span className="text-2xl font-bold font-poppins text-black">{t.sectionTitle}</span>
          <div className="bar-anim section-bar bg-green-600"></div>
        </div>
      </div>

      <div className="items-start justify-center px-6 pt-16 sm:px-10 lg:w-[62%] lg:px-16">
        <h2 className="font-poppins text-[clamp(1.8rem,4.5vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight text-black">
          {t.heading}
        </h2>
      </div>

      {/* Wrapper pinné */}
      <div
        ref={sectionRef}
        id="portfolio"
        className="horiz-gallery-wrapper relative flex overflow-hidden"
      >
        <div
          ref={stripRef}
          className="horiz-gallery-strip flex flex-nowrap will-change-transform gap-4 px-16"
        >
          {projects.map((project) => {
            return (
              <div
                key={project.slug ?? project.number}
                className="project-wrap box-content shrink-0 py-16 transition-transform duration-300"
                style={{ width: "min(350px, 80vw)" }}
              >
                <ProjectCard project={project} onClick={onProjectClick} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}