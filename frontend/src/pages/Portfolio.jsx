// src/pages/Portfolio.jsx
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Navbar from '../components/layout/Navbar'
import AboutSection from '../components/sections/AboutSection'
import Hero from '../components/sections/Hero'
import Projets from '../components/sections/Projets'
import ContactSection from '../components/sections/ContactSection'
import ContactButton from '../components/layout/ContactButton'
import ProjectShowcase from "../components/showcases/ProjectShowcase"

gsap.registerPlugin(ScrollToPlugin)

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)

  // ═══ Le projet vient déjà complet (avec screenshots) depuis data/projects.js ═══
  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const handleBack = () => {
    setSelectedProject(null)
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#projets", offsetY: 100 },
      ease: "power2.inOut",
    })
  }

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedProject])

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br font-fredoka from-gray-200 via-gray-100 to-gray-100">
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[10rem] md:text-[24rem] font-baloo font-bold text-gray-900/5 select-none whitespace-nowrap">
            {'</tian>'}
          </span>
        </div>

        <div className="relative z-10">
          <Navbar />
          <div>
            <Hero />
            <AboutSection />
            <Projets onProjectClick={handleProjectClick} />
            <ContactSection />
          </div>
          <ContactButton />
        </div>
      </div>

      {selectedProject && (
        <ProjectShowcase project={selectedProject} onBack={handleBack} />
      )}
    </>
  )
}