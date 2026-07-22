import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const links = [
  { label: "Accueil", href: "#accueil", id: "accueil" },
  { label: "À propos", href: "#a-propos", id: "a-propos" },
  { label: "Projets", href: "#projets", id: "projets" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef(null);
  const linksRef = useRef(null);
  const logoRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(copyrightRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      tl.fromTo(
        linksRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }
      )
        .to(
          logoRef.current,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .to(
          copyrightRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#" + id, offsetY: 100 },
      ease: "power2.inOut",
    });
  };

  return (
    <footer ref={footerRef} className="relative w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-6 overflow-hidden">

  <div className="relative z-10 mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 text-center sm:text-left">

    {/* Logo / nom */}
    <a
      ref={logoRef}
      href="#accueil"
      onClick={(e) => handleNavClick(e, "accueil")}
      className="order-1 text-2xl sm:text-3xl font-bold font-baloo text-green-600 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
    >
       {'</'} <span className="text-white/15">tian</span>{'>'}
    </a>

    {/* Liens de navigation */}
    <nav
      ref={linksRef}
      className="order-3 sm:order-2 flex flex-row flex-wrap items-center justify-center font-baloo gap-x-4 gap-y-2 sm:gap-6"
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleNavClick(e, link.id)}
          className="text-gray-400 hover:text-white text-sm font-fredoka transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>

    {/* Copyright */}
    <p
      ref={copyrightRef}
      className="order-2 sm:order-3 text-gray-500 text-xs font-fredoka flex items-center justify-center gap-1"
    >
      © {year} Christian Nomenjanahary
    </p>
  </div>
</footer>
  );
}