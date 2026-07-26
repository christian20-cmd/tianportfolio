// src/components/sections/Projets.jsx
import { useReveal } from "../../hooks/useReveal";
import ProjectCard from "../layout/ProjectCard";
import { projects } from "../../data/projects";

const introText =
  "Un aperçu de réalisations qui reflètent ma manière de penser, de concevoir et de résoudre des problèmes concrets. Chacune marque une étape importante de mon évolution.";

export default function Projets({ onProjectClick }) {
  const sectionRef = useReveal();

  return (
    <section id="projets" ref={sectionRef} className="relative w-full bg-[#EDEEF1] py-16">
      <div className="reveal  items-center text-center justify-center flex flex-col w-full pt-16 md:pt-20 pb-8 px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 w-full max-w-xl">
          <div className="bar-anim section-bar bg-green-600"></div>
          <span className="section-title text-gray-400">Mes Projets</span>
          <div className="bar-anim section-bar bg-green-600"></div>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm max-w-[550px]">{introText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16">
        {projects.map((project, i) => (
          <div
            key={project.slug ?? project.number}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="reveal"
          >
            <ProjectCard project={project} onClick={onProjectClick} />
          </div>
        ))}
      </div>
    </section>
  );
}