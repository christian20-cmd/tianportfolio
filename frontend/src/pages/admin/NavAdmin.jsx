import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const links = [
  { label: "Liste des projets", href: "#listprojet", id: "listprojet" },

];

export default function NavAdmin() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const cvBtnRef = useRef(null);

  // ═══ Effet "pill" quand on scroll (sans masquage) ═══
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

  // ═══ Animation d'entrée au chargement ═══
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, cvBtnRef.current], { opacity: 0, y: -20 });
      gsap.set(navRef.current, { opacity: 0, y: -30 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          logoRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          linksRef.current?.children || [],
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.08 },
          "-=0.3"
        )
        .to(
          cvBtnRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Fonction de scroll animé via GSAP
  const handleNavClick = (e, id) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#" + id, offsetY: 100 },
      ease: "power2.inOut",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-300 ${
        scrolled ? "mt-3" : "mt-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "max-w-3xl px-6 py-2 bg-white shadow-sm rounded-full"
            : "w-full px-14 md:px-28 lg:px-32 py-3 bg-[#ECEEF1] backdrop-blur-sm rounded-none"
        }`}
      >
        <a
          ref={logoRef}
          href="#accueil"
          onClick={(e) => handleNavClick(e, "accueil")}
          className={`font-bold font-baloo text-green-600 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 transition-all duration-300 ${
            scrolled ? "text-lg" : "text-2xl"
          }`}
        >
          {'</'} <span className="text-black/35">tian</span>{'>'}
        </a>

        <ul
          ref={linksRef}
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
          ref={cvBtnRef}
          href="http://localhost:5173/"
          className={`inline-flex items-center gap-2 rounded-full bg-black text-white font-medium hover:bg-gray-700 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
            scrolled ? "text-[11px] px-4 py-1.5" : "text-xs px-5 py-2"
          }`}
        >
          Voir Portfolio
        </a>
      </div>
    </nav>
  );
}