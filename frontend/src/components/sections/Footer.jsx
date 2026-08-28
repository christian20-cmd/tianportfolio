import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "../../context/LanguageContext"; // adapte le chemin
import { translations } from "../../i18n/translations"; // adapte le chemin
import logo from "../../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useIntersectionObserver();
  const { lang } = useLanguage();
  const links = translations[lang].nav;

  return (
    <footer ref={footerRef} className="relative w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 text-center sm:text-left">
        <a
          href="#accueil"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 h-14 w-14"
        >
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </a>

        <nav className="order-3 sm:order-2 flex flex-row flex-wrap items-center justify-center font-baloo gap-x-4 gap-y-2 sm:gap-6">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal text-gray-400 hover:text-white text-sm font-fredoka transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="reveal order-2 sm:order-3 text-gray-500 text-xs font-fredoka flex items-center justify-center gap-1">
          © {year} Christian Nomenjanahary
        </p>
      </div>
    </footer>
  );
}