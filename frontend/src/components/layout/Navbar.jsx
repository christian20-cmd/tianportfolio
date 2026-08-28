import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { InfoIcon } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 50);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log("scrollY:", currentScrollY); // <- temporaire, à retirer une fois que ça marche

      // Cache la navbar quand on descend, la montre quand on remonte
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;

      // Fond noir dès qu'on commence à scroll
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white hover:text-gray-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-md"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <a href="#contact" className="text-green-400">
            <InfoIcon size={30} />
          </a>
        </div>
      </div>
    </nav>
  );
}