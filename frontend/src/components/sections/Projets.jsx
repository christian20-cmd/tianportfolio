import { ChevronsRight } from "lucide-react";
import ProjectCard from "../layout/ProjectCard";
import { projects } from "../../data/projects";
import { useHorizontalGallery } from "../../hooks/useHorizontalGallery";

export default function Projets({ onProjectClick }) {
  const { sectionRef, stripRef } = useHorizontalGallery();

  return (
    <section id="projets" className="relative overflow-hidden bg-white">
      <div className="items-start justify-center px-6 pt-16 sm:px-10 lg:w-[62%] lg:px-16">
        <div className="mb-8 flex items-center">
          <ChevronsRight size={30} className="text-green-600" strokeWidth={4} />
          <ChevronsRight size={30} className="text-green-600" strokeWidth={4} />
          <span className="font-poppins ml-4 text-lg font-bold uppercase tracking-[0.25em] text-black/50">
            Mes projets
          </span>
        </div>
        <h2 className="font-poppins text-[clamp(1.8rem,4.5vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight text-black">
          Là où les idées prennent vie grâce au code.
        </h2>
      </div>
      
    

      {/* Wrapper pinné */}
      <div
        ref={sectionRef}
        id="portfolio"
        className="horiz-gallery-wrapper relative flex overflow-hidden px-16"
      >
        <div
          ref={stripRef}
          className="horiz-gallery-strip flex flex-nowrap will-change-transform gap-4"
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