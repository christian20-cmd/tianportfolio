import { useReveal } from "../../hooks/useReveal";
import { DownloadIcon } from "lucide-react";
import profil from "../../assets/imagecontact.png";

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

const skills = [
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiVite, label: "Vite", color: "#9C4AF8" },
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#38BDF8" },
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiCss, label: "CSS3", color: "#6924CE" },
  { icon: SiFramer, label: "Framer Motion", color: "#0055FF" },
  { icon: SiGsap, label: "GSAP", color: "#0FE84A" },
  { icon: SiFlutter, label: "Flutter", color: "#0055FF" },
  { icon: SiReact, label: "React Native", color: "#61DAFB" },
  { icon: SiExpo, label: "Expo", color: "#FFFFFF" },
];

const introText =
  "Chaque histoire est unique, faite de choix, d'expériences et de découvertes. Cette section retrace la mienne : ce qui m'a mené jusqu'ici, et les valeurs qui guident aujourd'hui mon travail.";

function AboutSection() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} id="a-propos" className="relative z-10 bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute z-50 -right-24 w-80 h-80 rounded-full bg-gray-500/30 blur-3xl"
      />

      <div className="pb-48 md:pb-56">
        <div className="reveal bg-black items-center text-center justify-center flex flex-col w-full pt-16 md:pt-20 pb-8 px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 w-full max-w-xl">
            <div className="bar-anim section-bar bg-green-600"></div>
            <span className="section-title text-gray-400">À propos de moi</span>
            <div className="bar-anim section-bar bg-green-600"></div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm max-w-[550px]">{introText}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] items-stretch">
          {/* Carte profil */}
          <div className="reveal relative z-0 w-full">
            <div className="relative overflow-hidden bg-black h-80 md:h-[420px] lg:h-full">
              <img
                src={profil}
                alt="Christian Nomenjanahary"
                className="w-full h-full object-contain lg:object-cover object-center lg:object-[center_15%]"
              />
              
            </div>
          </div>

          {/* Bloc profesionnel */}
          <div className="reveal relative z-10 pt-8 sm:pt-10 bg-black px-10 lg:px-24 shadow-xl overflow-hidden flex flex-col justify-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="text-[9rem] lg:text-[18rem] font-baloo font-bold text-white/5 select-none whitespace-nowrap">
                {"</tian>"}
              </span>
            </div>

            <h2 className="relative text-lg sm:text-2xl lg:text-3xl font-borel font-bold text-white leading-tight mb-2">
              Développeur web et mobile.
            </h2>

            <p className="relative text-gray-400 font-poppins text-[10px] md:text-xs lg:text-sm leading-relaxed mb-4">
              Je suis{" "}
              <span className="text-green-600 font-semibold">
                RANDRIAMAMPIONINA Nomenjanahary Christian
              </span>
              . Je développe des applications web et mobiles modernes, performantes et intuitives, avec un fort engagement envers la qualité, la performance et l'expérience utilisateur.
            </p>

            <div className="relative">
              <span className="text-xs font-fredoka font-semibold uppercase tracking-wide text-white mb-4 block">
                Mes outils
              </span>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {skills.map(({ icon: Icon, label, color }, i) => (
                  <div
                    key={label + i}
                    style={{ transitionDelay: `${i * 50}ms` }}
                    className="reveal-fade flex flex-col items-center"
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

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 justify-center w-full sm:w-auto sm:max-w-72 my-8 rounded-full bg-white text-gray-900 text-sm font-medium px-5 py-2 hover:bg-gray-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Téléchargez mon CV <DownloadIcon size={17} />
            </a>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-60 z-20 pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path d="M0,120 C360,200 1080,40 1440,120 L1440,200 L0,200 Z" fill="#EDEEF1" />
      </svg>
    </section>
  );
}

export default AboutSection;