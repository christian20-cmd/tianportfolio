import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../../assets/logo.png";
import {
  InfoIcon,
  ChevronDown,
  Home,
  FolderKanban,
  Info,
  MessageCircle,
  Circle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

// --- Drapeaux SVG autonomes, sans dépendance externe ---

function FlagFR({ size = 18 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 3 2" className="rounded-[2px] shrink-0">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}

function FlagGB({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 60 40"
      className="rounded-[2px] shrink-0"
    >
      <rect width="60" height="40" fill="#00247D" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#FFF" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#CF142B" strokeWidth="3" />
      <path d="M30 0V40M0 20H60" stroke="#FFF" strokeWidth="12" />
      <path d="M30 0V40M0 20H60" stroke="#CF142B" strokeWidth="6" />
    </svg>
  );
}

const languages = [
  { code: "fr", label: "Français", Flag: FlagFR },
  { code: "en", label: "English", Flag: FlagGB },
];

const navIconMap = {
  "#accueil": Home,
  "#home": Home,

  "#apropos": Info,
  "#about": Info,
  "#detail": Info,
  "#details": Info,

  "#projets": FolderKanban,
  "#projects": FolderKanban,
  "#services": FolderKanban,

  "#contact": MessageCircle,
  "#message": MessageCircle,
};

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 50);
  const { lang, setLang } = useLanguage();
  const [activeSection, setActiveSection] = useState(
    () => translations[lang].nav[0].href
  );
  const [langOpen, setLangOpen] = useState(false);

  const langWrapRef = useRef(null);
  const ddMenuRef = useRef(null);
  const ddArrowRef = useRef(null);
  const ddTl = useRef(null);
  const exitTs = 2.5;

  const t = translations[lang];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hrefs = translations.fr.nav.map((link) => link.href);
    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.set(ddMenuRef.current, { autoAlpha: 0, yPercent: -30, scale: 0.7 });
    gsap.set(ddArrowRef.current, { rotation: 0 });

    ddTl.current = gsap.timeline({ paused: true })
      .to(
        ddArrowRef.current,
        { rotation: 180, duration: 0.9, ease: "elastic.out(1.2, 0.3)" },
        0
      )
      .to(
        ddMenuRef.current,
        { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1, ease: "elastic.out(1.2, 0.3)" },
        0
      )
      .from(
        ".lang-item",
        { opacity: 0, x: -20, duration: 0.5, ease: "back.out(3)", stagger: 0.07 },
        0.1
      );

    return () => ddTl.current?.kill();
  }, []);

  const toggleLangMenu = () => {
    const next = !langOpen;
    setLangOpen(next);
    if (next) {
      ddTl.current.timeScale(1).play();
    } else {
      ddTl.current.timeScale(exitTs).reverse();
    }
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (langOpen && langWrapRef.current && !langWrapRef.current.contains(e.target)) {
        setLangOpen(false);
        ddTl.current.timeScale(exitTs).reverse();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [langOpen]);

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <>
      {/* --- Navbar top : logo + (liens desktop uniquement) + langue + info --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 font-poppins transition-colors duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-black" : "bg-transparent"}`}
      >
        <div className="mx-auto flex items-center justify-between w-full px-10 md:px-12 lg:px-16">
          <a
            href="#accueil"
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 h-14 w-14"
          >
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </a>

          {/* Liens nav : masqués en dessous de md, remplacés par la bottom bar */}
          <div className="hidden md:flex items-center gap-6">
            {t.nav.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-md ${
                    isActive ? "text-green-400" : "text-white hover:text-gray-200"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Langue + info : toujours visibles, même en dessous de md */}
          <div className="flex items-center gap-4">
            <div ref={langWrapRef} className="relative">
              <button
                type="button"
                onClick={toggleLangMenu}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t.chooseLang}
                className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-gray-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-md px-1 py-1"
              >
                <currentLang.Flag size={18} />
                <ChevronDown ref={ddArrowRef} size={14} />
              </button>

              <ul
                ref={ddMenuRef}
                role="listbox"
                className={`absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl ${
                  langOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {languages.map(({ code, label, Flag }) => (
                  <li key={code} className="lang-item">
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === code}
                      onClick={() => {
                        setLang(code);
                        setLangOpen(false);
                        ddTl.current.timeScale(exitTs).reverse();
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                        lang === code ? "text-green-400" : "text-white hover:bg-white/10"
                      }`}
                    >
                      <Flag size={16} />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#contact" className="text-green-400" aria-label={t.infoLabel}>
              <InfoIcon size={30} />
            </a>
          </div>
        </div>
      </nav>

      {/* --- Bottom bar mobile : icônes seules, remplace le menu en dessous de md --- */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/10 flex items-center justify-around py-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {t.nav.map((link) => {
          const isActive = activeSection === link.href;
          const Icon = navIconMap[link.href] || Circle;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center p-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition-colors ${
                isActive ? "text-green-400" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon size={22} />
            </a>
          );
        })}
      </nav>
    </>
  );
}