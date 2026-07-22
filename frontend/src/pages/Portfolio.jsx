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
import { api } from "../lib/api"
import { formatProjectFromApi } from "../lib/formatProject"

gsap.registerPlugin(ScrollToPlugin)

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [loadingProject, setLoadingProject] = useState(false)

  // ═══ Récupère la version complète du projet (avec screenshots) avant d'ouvrir le showcase ═══
  const handleProjectClick = async (project) => {
    setLoadingProject(true)
    try {
      const full = await api.getProjectById(project.id)
      setSelectedProject(formatProjectFromApi(full, undefined))
    } catch (err) {
      console.error("❌ Erreur récupération du projet complet:", err)
      // Repli : affiche quand même ce qu'on a déjà (sans screenshots) plutôt que de bloquer l'utilisateur
      setSelectedProject(project)
    } finally {
      setLoadingProject(false)
    }
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

      {loadingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <p className="text-xs text-white/60 font-poppins">Chargement...</p>
        </div>
      )}

      {selectedProject && (
        <ProjectShowcase project={selectedProject} onBack={handleBack} />
      )}
    </>
  )
}