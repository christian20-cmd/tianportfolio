// src/components/layout/ContactSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Phone, ArrowUpRight } from "lucide-react";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

// 👉 Remplace les valeurs ci-dessous par tes vraies infos
const contacts = [
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "+261 34 52 717 18",
    href: "https://wa.me/26134527118",
    color: "#25D366",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 34 52 717 18",
    href: "tel:+26134527118",
    color: "#ffffff",
  },
  {
    icon: SiGmail,
    label: "Email",
    value: "christiannomenjanahary4@gmail.com",
    href: "mailto:christiannomenjanahary4@gmail.com",
    color: "#EA4335",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    value: "christian20-cmd",
    href: "https://github.com/christian20-cmd",
    color: "#ffffff",
  },
];

const introText =
  "Vous avez une idée, un projet ou une opportunité de collaboration ? Contactez-moi. Je serai heureux d'échanger avec vous et de concevoir une solution à la hauteur de vos ambitions.";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const barLeftRef = useRef(null);
  const barRightRef = useRef(null);
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsWrapRef = useRef(null);
  const buttonItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ═══ Tirés qui se "soulignent" + scramble text (même pattern que About) ═══
      gsap.set(barLeftRef.current, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(barRightRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tlHeader
        .to(barLeftRef.current, { scaleX: 1, duration: 0.7, ease: "power3.out" })
        .to(barRightRef.current, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "<")
        .to(
          introRef.current,
          {
            scrambleText: {
              text: introText,
              chars: "upperAndLowerCase",
              revealDelay: 0.2,
              tweenLength: true,
            },
            ease: "power2.inOut",
            duration: 2.2,
          },
          "-=0.3"
        );

      // ═══ Titre "Discutons Ensemble..." en chars ═══
      const titleSplit = SplitText.create(titleRef.current, { type: "chars" });
      gsap.set(titleRef.current, { opacity: 1 });

      gsap.from(titleSplit.chars, {
        opacity: 0,
        y: 60,
        rotation: () => gsap.utils.random(-15, 15),
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: 0.02,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ═══ Boutons de contact : fromTo façon exemple gsap.to/from ═══
      gsap.fromTo(
        buttonItemsRef.current,
        { x: 60, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: buttonsWrapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
        }
      );

      const handleResize = () => {
        titleSplit.revert();
        SplitText.create(titleRef.current, { type: "chars" });
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full pt-18 px-6 bg-black overflow-hidden"
    >
      {/* Watermark de fond */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[17rem] md:text-[18rem] font-baloo font-bold text-white/5 select-none whitespace-nowrap">
          {"</tian>"}
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-10">
        {/* Header */}
        <div ref={headerRef} className="items-center text-center justify-center flex flex-col w-full pb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div ref={barLeftRef} className="bg-green-600 h-3 w-40"></div>
            <span className="text-xs sm:text-md font-baloo uppercase tracking-wide text-gray-400 shrink-0">
              Contactez-Moi
            </span>
            <div ref={barRightRef} className="bg-green-600 h-3 w-40"></div>
          </div>
          <p ref={introRef} className="text-gray-600 text-sm max-w-[550px]">
            {introText}
          </p>
        </div>

        {/* Contenu principal : grand texte à gauche, boutons en colonne à droite */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-12">

          {/* Grand texte Let's Talk */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <h2
              ref={titleRef}
              className="font-baloo text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-none text-center md:text-left opacity-0"
            >
              Discutons <br className="hidden md:block" />
              <span className="text-6xl md:text-7xl lg:text-9xl xl:text-[9rem] text-green-600 font-medium">Ensemble...</span>
            </h2>
          </div>

          {/* Colonne de boutons de contact */}
          <div
            ref={buttonsWrapRef}
            className="flex flex-col gap-2 w-full md:w-auto items-center md:items-end"
          >
            {contacts.map(({ icon: Icon, label, value, href, color }, i) => (
              <a
                key={label}
                ref={(el) => (buttonItemsRef.current[i] = el)}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group w-72 flex items-center gap-4 bg-[#1c1c1e] rounded-full p-2 hover:bg-[#242426] transition-colors"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-black/40"
                  style={{ color }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[10px] font-poppins">{label}</p>
                  <p className="text-white text-[9px] font-poppins truncate">{value}</p>
                </div>

                <ArrowUpRight className="w-7 h-7 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white/10 h-2 mx-auto"></div>
      <Footer />
    </section>
  );
}