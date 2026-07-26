// About.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DownloadIcon } from 'lucide-react'
import profil from '../../assets/heroimage.png'

import {
  SiReact,
  SiVite,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFramer,
  SiExpo,
  SiFlutter,
  SiGsap,
} from "react-icons/si";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const skills = [
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiVite, label: 'Vite', color: '#9C4AF8' },
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#38BDF8' },
  { icon: SiHtml5, label: 'HTML5', color: '#E34F26' },
  { icon: SiCss, label: 'CSS3', color: '#6924CE' },
  { icon: SiFramer, label: 'Framer Motion', color: '#0055FF' },
  { icon: SiGsap, label: 'GSAP', color: '#0FE84A' },
  { icon: SiFlutter, label: 'Flutter', color: '#0055FF' },
  { icon: SiReact, label: 'React Native', color: '#61DAFB' },
  { icon: SiExpo, label: 'Expo', color: '#FFFFFF' },
]

const introText = "Chaque histoire est unique, faite de choix, d'expériences et de découvertes. Cette section retrace la mienne : ce qui m'a mené jusqu'ici, et les valeurs qui guident aujourd'hui mon travail."

function AboutSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const skillsRef = useRef(null)
  const skillItemsRef = useRef([])

  const barLeftRef = useRef(null)
  const barRightRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleSplit = SplitText.create(titleRef.current, { type: 'chars' })
      const descSplit = SplitText.create(descRef.current, {
        type: 'lines',
        linesClass: 'split-line',
      })

      gsap.set(titleRef.current, { opacity: 1 })
      gsap.set(descRef.current, { opacity: 1 })

      gsap.from(titleSplit.chars, {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'power4',
        stagger: 0.03,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(descSplit.lines, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Icônes "Mes outils"
      gsap.fromTo(
        skillItemsRef.current,
        { x: -40, rotation: -180, scale: 0, opacity: 0 },
        {
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
            toggleActions: "play none none reverse"
          },
        }
      )

      // ═══ Tirés qui se "soulignent" (scaleX 0 -> 1, origine côté texte) ═══
      gsap.set(barLeftRef.current, { scaleX: 0, transformOrigin: 'right center' })
      gsap.set(barRightRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      tlHeader
        .to(barLeftRef.current, { scaleX: 1, duration: 0.7, ease: 'power3.out' })
        .to(barRightRef.current, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '<')
        // ═══ ScrambleText sur la description intro ═══
        

      // Re-split au resize
      const handleResize = () => {
        titleSplit.revert()
        descSplit.revert()
        SplitText.create(titleRef.current, { type: 'chars' })
        SplitText.create(descRef.current, { type: 'lines', linesClass: 'split-line' })
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="a-propos" className="relative z-10 bg-black">

      <div
        aria-hidden
        className="pointer-events-none absolute z-50 -right-24  w-80 h-80 rounded-full bg-gray-500/30 blur-3xl"
      />
      <motion.div
        className="pb-48 md:pb-56"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div ref={headerRef} className='bg-black items-center text-center justify-center flex flex-col w-full pt-16 md:pt-20 pb-8 px-4'>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 w-full max-w-xl">
            <div ref={barLeftRef} className="bg-green-600 h-2.5 sm:h-3 flex-1 max-w-16 sm:max-w-40"></div>
            <span className="text-xs sm:text-md font-baloo uppercase tracking-wide text-gray-400 shrink-0">
              À propos de moi
            </span>
            <div ref={barRightRef} className="bg-green-600 h-2.5 sm:h-3 flex-1 max-w-16 sm:max-w-40"></div>
          </div>
          <p ref={descRef} className='text-gray-600 text-xs sm:text-sm max-w-[550px]'>
            {introText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] items-stretch">
        {/* Carte profil */}
        <motion.div variants={item} className="relative z-0 w-full">
          <div className="relative overflow-hidden bg-black h-80 md:h-[420px] lg:h-full">
            <img
              src={profil}
              alt="Christian Nomenjanahary"
              className="w-full h-full object-contain lg:object-cover object-center lg:object-[center_15%]"
            />
            {/* Degrade sombre pour la lisibilite du texte : uniquement utile en mode ligne (lg+) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " />
          </div>
        </motion.div>

        {/* Bloc "partie professionnelle" */}
        <motion.div
          variants={item}
          className="relative z-10 pt-8 sm:pt-10 bg-black px-10 lg:px-24 shadow-xl overflow-hidden flex flex-col justify-center"
        >
            {/* Watermark de fond (cohérent avec ContactSection) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="text-[9rem] lg:text-[18rem] font-baloo font-bold text-white/5 select-none whitespace-nowrap">
                {"</tian>"}
              </span>
            </div>

            <h2
              ref={titleRef}
              className="relative text-xl sm:text-2xl lg:text-3xl font-borel font-bold text-white leading-tight mb-2 opacity-0"
            >
              Développeur web et mobile.
            </h2>

            <p
              ref={descRef}
              className="relative text-gray-400 font-poppins text-[10px] md:text-xs lg:text-sm leading-relaxed mb-4 opacity-0"
            >
              Je suis{" "}
              <span className="text-green-600 font-semibold">
                RANDRIAMAMPIONINA Nomenjanahary Christian
              </span>
              
              . Je développe des applications web et mobiles modernes, performantes et intuitives, avec un fort engagement envers la qualité, la performance et l'expérience utilisateur.
            </p>
            <div className="relative" ref={skillsRef}>
              <span className="text-xs font-fredoka font-semibold uppercase tracking-wide text-white mb-4 block">
                Mes outils
              </span>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {skills.map(({ icon: Icon, label, color }, i) => (
                  <div
                    key={label + i}
                    ref={(el) => (skillItemsRef.current[i] = el)}
                    className="flex flex-col items-center"
                  >
                    <Icon size={28} className="sm:hidden" color={color} />
                    <Icon size={34} className="hidden sm:block" color={color} />
                    <span className="text-[10px] sm:text-[12px] font-fredoka text-stone-300 text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Bouton CV */}
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 justify-center w-full sm:w-auto sm:max-w-48 my-8 rounded-full bg-white text-gray-900 text-sm font-medium px-5 py-2 hover:bg-gray-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Télecharger CV <DownloadIcon size={17} />
            </a>
          </motion.div>
        </div>
      </motion.div>
      <svg
        className="absolute bottom-0 left-0 w-full h-60 z-20 pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C360,200 1080,40 1440,120 L1440,200 L0,200 Z"
          fill="#EDEEF1"
        />
      </svg>
    </section>
  )
}

export default AboutSection