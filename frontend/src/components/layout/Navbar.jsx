import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Accueil", href: "#accueil", id: "accueil" },
  { label: "A Propos", href: "#a-propos", id: "a-propos" },
  { label: "Projets", href: "#projets", id: "projets" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);

  // ═══ Effet "pill" quand on scroll ═══
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ═══ Détection de la section active ═══
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // ═══ Animation d'entrée simple au chargement (CSS, sans GSAP) ═══
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll fluide natif, sans GSAP
  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-500 ${
        scrolled ? "mt-3" : "mt-0"
      } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "max-w-3xl px-6 py-2 bg-white shadow-sm rounded-full"
            : "w-full px-14 md:px-28 lg:px-32 py-3 bg-[#ECEEF1] backdrop-blur-sm rounded-none"
        }`}
      >
        <a
          href="#accueil"
          onClick={(e) => handleNavClick(e, "accueil")}
          className={`font-bold font-baloo text-green-600 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 transition-all duration-300 ${
            scrolled ? "text-lg" : "text-2xl"
          }`}
        >
          {'</'} <span className="text-black/35">tian</span>{'>'}
        </a>

        <ul
          className={`hidden md:flex items-center font-bold text-gray-400 transition-all duration-300 ${
            scrolled ? "gap-5 text-xs" : "gap-8 text-sm"
          }`}
        >
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.label} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-1 outline-none rounded-md transition-colors
                    focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
                    ${isActive ? "text-black" : "hover:text-black"}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="/cv.pdf"
          download
          className={`inline-flex items-center gap-2 rounded-full bg-black text-white font-medium hover:bg-gray-700 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
            scrolled ? "text-[11px] px-4 py-1.5" : "text-xs px-5 py-2"
          }`}
        >
          Télécharger CV
        </a>
      </div>
    </nav>
  );
}