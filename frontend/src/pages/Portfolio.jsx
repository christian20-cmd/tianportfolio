import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import Hero from "../components/sections/Hero";
import Projets from "../components/sections/Projets";
import ContactSection from "../components/sections/ContactSection";
import ContactButton from "../components/layout/ContactButton";
import ProjectShowcase from "../components/showcases/ProjectShowcase";

import { LanguageProvider } from "../context/LanguageContext";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPlusInfo, setShowPlusInfo] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject || showPlusInfo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, showPlusInfo]);

  return (
    <LanguageProvider>
      <div className="relative bg-gradient-to-br font-fredoka from-gray-200 via-gray-100 to-gray-100">
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[7rem] md:text-[11.7rem] font-poppins uppercase font-baloo font-bold text-gray-900/10 select-none whitespace-nowrap">
            Développeur.
          </span>
        </div>

        <div className="relative z-10">
          <Navbar onInfoClick={() => setShowPlusInfo(true)} />
          <Hero />
          <AboutSection />
          <Projets onProjectClick={handleProjectClick} />
          <ContactSection />
          <ContactButton />
        </div>
      </div>

      {selectedProject && (
        <ProjectShowcase project={selectedProject} onBack={handleBack} />
      )}

    </LanguageProvider>
  );
}