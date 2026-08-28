// components/layout/ContactButton.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link as LinkIcon, X, ChevronUp, ChevronDown } from "lucide-react";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import { Phone } from "lucide-react";
import FillButton from "./Fillbutton";

const contactOptions = [
  {
    label: "WhatsApp",
    href: "https://wa.me/26134527118",
    icon: SiWhatsapp,
    color: "#25D366",
  },
  {
    label: "Téléphone",
    href: "tel:+261345271718",
    icon: Phone,
    color: "#ffffff",
  },
  {
    label: "Email",
    href: "mailto:christian20.cmd@gmail.com",
    icon: SiGmail,
    color: "#EA4335",
  },
  {
    label: "GitHub",
    href: "https://github.com/christian20-cmd",
    icon: SiGithub,
    color: "#ffffff",
  },
];

const RADIUS = 100;
const START_ANGLE = 180;
const END_ANGLE = 270;
const ANGLE_STEP = (END_ANGLE - START_ANGLE) / (contactOptions.length - 1);

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState("accueil"); // "accueil" | "contact"
  const itemsRef = useRef([]);
  const linkIconRef = useRef(null);
  const xIconRef = useRef(null);
  const chevronUpRef = useRef(null);
  const chevronDownRef = useRef(null);
  const tl = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    gsap.set(itemsRef.current, { x: 0, y: 0, scale: 0, opacity: 0 });
    gsap.set(xIconRef.current, { opacity: 0, rotate: -90, scale: 0.5 });
    gsap.set(linkIconRef.current, { opacity: 1, rotate: 0, scale: 1 });

    tl.current = gsap.timeline({ paused: true });

    // Morph icône Link -> X
    tl.current.to(
      linkIconRef.current,
      { opacity: 0, rotate: 90, scale: 0.5, duration: 0.25, ease: "power2.in" },
      0
    );
    tl.current.to(
      xIconRef.current,
      { opacity: 1, rotate: 0, scale: 1, duration: 0.3, ease: "back.out(2)" },
      0.1
    );

    // Items radiaux
    itemsRef.current.forEach((item, i) => {
      const angle = (START_ANGLE + ANGLE_STEP * i) * (Math.PI / 180);
      const tx = Math.cos(angle) * RADIUS;
      const ty = Math.sin(angle) * RADIUS;

      tl.current.to(
        item,
        {
          x: tx,
          y: ty,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        i * 0.05
      );
    });
  }, []);

  // Morph ChevronUp <-> ChevronDown, initialisé une fois
  useEffect(() => {
    gsap.set(chevronDownRef.current, { opacity: 0, rotate: -90, scale: 0.5 });
    gsap.set(chevronUpRef.current, { opacity: 1, rotate: 0, scale: 1 });
  }, []);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      tl.current.timeScale(1).play();
    } else {
      tl.current.timeScale(1.3).reverse();
    }
  };

  const handleScrollToggle = () => {
    const targetId = scrollTarget === "accueil" ? "accueil" : "contact";
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });

    const showingUp = scrollTarget === "accueil";
    const fromRef = showingUp ? chevronUpRef : chevronDownRef;
    const toRef = showingUp ? chevronDownRef : chevronUpRef;

    gsap.killTweensOf([chevronUpRef.current, chevronDownRef.current]);
    gsap.to(fromRef.current, {
      opacity: 0,
      rotate: showingUp ? 90 : -90,
      scale: 0.5,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(toRef.current, {
      opacity: 1,
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: "back.out(2)",
      delay: 0.1,
    });

    setScrollTarget(showingUp ? "contact" : "accueil");
  };

  // Fermer au clic extérieur
  useEffect(() => {
    const onClickOutside = (e) => {
      if (isOpen && wrapRef.current && !wrapRef.current.contains(e.target)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  // Fermer à Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div ref={wrapRef} className="fixed bottom-8 right-10 z-50 w-14 h-14">
      {contactOptions.map(({ label, href, icon: Icon, color }, i) => (
        <div
          key={label}
          ref={(el) => (itemsRef.current[i] = el)}
          className="absolute bottom-0 right-0 h-10 w-10 z-10"
        >
          <FillButton
            as="a"
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            title={label}
            fillColor="#ffffff"
            hoverTextColor="#000000"
            className="h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e]"
            style={{ color }}
          >
            <Icon size={18} />
          </FillButton>
        </div>
      ))}

      {/* Bouton chevron haut/bas, au-dessus du FAB principal */}
      <div className="absolute bottom-0 right-[38rem] h-12 w-12 z-20">
        <FillButton
          as="button"
          type="button"
          onClick={handleScrollToggle}
          aria-label={
            scrollTarget === "accueil"
              ? "Retour en haut de la page"
              : "Aller vers la section contact"
          }
          title={scrollTarget === "accueil" ? "Haut de page" : "Section contact"}
          fillColor="#000000"
          hoverTextColor="#ffffff"
          className="h-full w-full items-center justify-center rounded-full bg-white text-black hover:text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          overlay={
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <ChevronUp ref={chevronUpRef} className="absolute" size={40} />
              <ChevronDown ref={chevronDownRef} className="absolute" size={40} />
            </span>
          }
        />
      </div>

      <div className="absolute bottom-0 right-0 h-12 w-12 z-20">
        <FillButton
          as="button"
          id="fabBtn"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer le contact" : "Ouvrir le contact"}
          fillColor="#15803d"
          className="h-full w-full items-center justify-center rounded-full bg-green-500 text-white shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          overlay={
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <LinkIcon ref={linkIconRef} className="absolute" size={24} />
              <X ref={xIconRef} className="absolute" size={24} />
            </span>
          }
        />
      </div>
    </div>
  );
}