import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  Download,
  Play,
  Code2,
  Server,
  PenTool,
  Wrench,
  Rocket,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { SiWhatsapp, SiFacebook, SiGithub } from "react-icons/si";
import profil from "../../assets/heroimage.png";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import FillButton from "../layout/Fillbutton";

import {
  SiReact,
  SiVite,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

gsap.registerPlugin(SplitText);

// --- SVG icons non fournis (ou instables) par react-icons/si ---

function FigmaSVG({ size = 50, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.8056 22.8056 20 27.5 20C32.1944 20 36 23.8056 36 28.5C36 33.1944 32.1944 37 27.5 37C22.8056 37 19 33.1944 19 28.5Z" fill="#1ABCFE" />
      <path d="M2 47.5C2 42.8056 5.80558 39 10.5 39H19V47.5C19 52.1944 15.1944 56 10.5 56C5.80558 56 2 52.1944 2 47.5Z" fill="#0ACF83" />
      <path d="M19 2V20H27.5C32.1944 20 36 16.1944 36 11.5C36 6.80558 32.1944 3 27.5 3L19 2Z" fill="#FF7262" />
      <path d="M2 11.5C2 16.1944 5.80558 20 10.5 20H19V3H10.5C5.80558 3 2 6.80558 2 11.5Z" fill="#F24E1E" />
      <path d="M2 28.5C2 33.1944 5.80558 37 10.5 37H19V20H10.5C5.80558 20 2 23.8056 2 28.5Z" fill="#A259FF" />
    </svg>
  );
}

function AdobeXdSVG({ size = 50, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="240" rx="42" fill="#470137" />
      <text x="120" y="158" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="110" fill="#FF61F6">
        Xd
      </text>
    </svg>
  );
}

const skills = [
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E", level: 85 },
  { icon: SiReact, label: "React", color: "#61DAFB", level: 90 },
  { icon: SiVite, label: "Vite", color: "#9C4AF8", level: 80 },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#38BDF8", level: 88 },
  { icon: SiNodedotjs, label: "Node.js", color: "#8CC84B", level: 78 },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#336791", level: 75 },
  { icon: FigmaSVG, label: "Figma", color: "#F24E1E", level: 70, isSvg: true },
  { icon: AdobeXdSVG, label: "Adobe XD", color: "#FF61F6", level: 65, isSvg: true },
];

const serviceIcons = [Code2, Server, PenTool, Wrench, Rocket];

/**
 * Icône de skill avec tooltip GSAP (pop élastique + pulse du cercle),
 * inspiré du pattern tooltip du CodePen fourni : la bulle apparaît en
 * elastic.out avec autoAlpha/y/scale, l'icône grossit en même temps,
 * et la fermeture est plus rapide (timeScale) que l'ouverture.
 * `onEnter`/`onLeave` are used on touch devices (tap toggles the tooltip
 * since there's no real hover state on mobile).
 */
function SkillIcon({ icon: Icon, label, color, level, isSvg }) {
  const iconWrapRef = useRef(null);
  const bubbleRef = useRef(null);
  const barRef = useRef(null);
  const tl = useRef(null);
  const EXIT_SPEED = 2.2;

  useEffect(() => {
    gsap.set(bubbleRef.current, { autoAlpha: 0, y: 14, scale: 0.4 });
    gsap.set(iconWrapRef.current, { scale: 1 });
    gsap.set(barRef.current, { width: "0%" });

    tl.current = gsap.timeline({ paused: true })
      .to(
        bubbleRef.current,
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1.2, 0.3)" },
        0
      )
      .to(
        iconWrapRef.current,
        { scale: 1.15, duration: 0.8, ease: "elastic.out(1.2, 0.3)" },
        0
      )
      .to(
        barRef.current,
        { width: `${level}%`, duration: 0.6, ease: "power2.out" },
        0.15
      );

    return () => tl.current?.kill();
  }, [level]);

  const handleEnter = () => tl.current.timeScale(1).play();
  const handleLeave = () => tl.current.timeScale(EXIT_SPEED).reverse();
  // On mobile there's no hover: a tap opens the tooltip, a second tap (or
  // tapping elsewhere) closes it.
  const handleTouch = (e) => {
    e.stopPropagation();
    const isOpen = tl.current.progress() > 0;
    isOpen ? handleLeave() : handleEnter();
  };

  return (
    <div
      className="group relative flex flex-col items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTouch}
    >
      <div ref={iconWrapRef} className="origin-center">
        {isSvg ? (
          <Icon size={40} className="sm:hidden" />
        ) : (
          <Icon size={40} color={color} className="sm:hidden" />
        )}
        {isSvg ? (
          <Icon size={50} className="hidden sm:block" />
        ) : (
          <Icon size={50} color={color} className="hidden sm:block" />
        )}
      </div>

      {/* Bulle tooltip, contrôlée entièrement par GSAP (autoAlpha) */}
      <div
        ref={bubbleRef}
        className="pointer-events-none absolute -top-16 left-1/2 z-30 w-28 -translate-x-1/2 rounded-lg bg-black px-3 py-2 text-center shadow-lg sm:w-32"
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {label}
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            ref={barRef}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <p className="mt-1 text-[10px] font-bold text-white">{level}%</p>
        <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-black" />
      </div>
    </div>
  );
}

function ServiceCard({ Icon, label, sub, stars = 5 }) {
  return (
    <div className="group flex flex-col items-center px-4 text-center sm:text-start">
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < stars ? "#FFD700" : "#D1D5DB"} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>
      <h3 className="font-poppins text-lg sm:text-xl font-bold uppercase text-black">{label}</h3>
      <p className="font-poppins text-sm leading-relaxed text-black/60 max-w-[220px] sm:max-w-none">{sub}</p>
    </div>
  );
}

function createConfettiExplosion(container, colors) {
  const dotQuantity = 25;
  const dotSizeMax = 20;
  const dotSizeMin = 10;
  const speed = 3;
  const gravity = 3;
  const emitterSize = 40;

  const tl = gsap.timeline();

  for (let i = 0; i < dotQuantity; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `position:absolute; border-radius:50%; background:${colors[i % colors.length]};`;
    container.appendChild(dot);

    const size = gsap.utils.random(dotSizeMin, dotSizeMax, 1);
    const angle = Math.random() * Math.PI * 2;
    const length = Math.random() * (emitterSize / 2 - size / 2);

    gsap.set(dot, {
      x: Math.cos(angle) * length,
      y: Math.sin(angle) * length,
      width: size,
      height: size,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });

    const dist = (100 + Math.random() * 250) * speed * 0.4;

    tl.to(
      dot,
      {
        x: `+=${Math.cos(angle) * dist}`,
        y: `+=${Math.sin(angle) * dist + gravity * 30}`,
        duration: 1 + Math.random(),
        ease: "power2.out",
      },
      0
    ).to(dot, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.7);
  }

  return tl;
}

function ProfileCard({ contactLabel }) {
  const socials = [
    { icon: Mail, href: "mailto:christian20.cmd@gmail.com", label: "Email" },
    { icon: SiWhatsapp, href: "https://wa.me/261345271718", label: "WhatsApp" },
    { icon: SiFacebook, href: "https://www.facebook.com/christian.smithdwell", label: "Facebook" },
    { icon: SiGithub, href: "https://github.com/christian20-cmd", label: "GitHub" },
  ];

  return (
    <div className="mx-auto w-full max-w-[350px] lg:mx-0">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#460136] pt-4">
        <img src={profil} alt="Christian Nomenjanahary" className="h-full w-full object-cover object-top" />
      </div>

      <div className="bg-white p-4">
        <div className="flex items-center gap-1.5">
          <h3 className="font-poppins text-base sm:text-lg font-bold leading-tight text-black">
            RANDRIAMAMPIONINA Nomenjanahary Christian
          </h3>
          <BadgeCheck size={26} className="shrink-0 fill-green-500 text-white sm:h-[30px] sm:w-[30px]" />
        </div>

        <div className="mt-1 space-y-0.5">
          <div className="flex items-center gap-1 text-black/70">
            <MapPin size={14} className="shrink-0" />
            <p className="font-poppins leading-snug">Fianarantsoa, Madagascar</p>
          </div>
          <div className="flex items-center gap-1 text-black/70">
            <Phone size={14} className="shrink-0" />
            <p className="font-poppins leading-snug">+261 34 95 906 08</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }, i) => (
              <FillButton
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                fillColor="#ffffff"
                textColor="#000000"
                hoverTextColor="#000000"
                className="items-center justify-center rounded-full p-1.5 text-black"
              >
                <Icon size={22} className="sm:hidden" />
                <Icon size={25} className="hidden sm:block" />
              </FillButton>
            ))}
          </div>

          <FillButton
            href="#contact"
            fillColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#000000"
            className="items-center gap-1 rounded-full bg-black px-3 py-1.5 font-semibold text-white"
          >
            {contactLabel}
          </FillButton>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const sectionRef = useIntersectionObserver();
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const downloadBtnRef = useRef(null);
  const headingRef = useRef(null);
  const skillsWrapRef = useRef(null);

  const handleDownloadClick = () => {
    const btn = downloadBtnRef.current;
    if (!btn) return;

    const bounds = btn.getBoundingClientRect();
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      left: ${bounds.left + bounds.width / 2}px;
      top: ${bounds.top + bounds.height / 2}px;
      overflow: visible;
      z-index: 5000;
      pointer-events: none;
    `;
    document.body.appendChild(container);

    const colors = ["#16a34a", "#22c55e", "#000000", "#ffffff"];
    const tl = createConfettiExplosion(container, colors);
    tl.eventCallback("onComplete", () => container.remove());
  };

  // --- Reveal du titre lettre par lettre avec GSAP SplitText, déclenché à
  // l'entrée dans le viewport et ré-appliqué si la fenêtre est redimensionnée
  // (les lignes changent) tant que l'animation n'a pas encore joué.
  useEffect(() => {
    if (!headingRef.current) return;

    let split;
    let tween;
    let played = false;

    const setup = () => {
      split?.revert();
      split = SplitText.create(headingRef.current, { type: "chars,words" });
      gsap.set(split.chars, { opacity: 0, y: 40 });
    };

    setup();

    const play = () => {
      if (played) return;
      played = true;
      tween = gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && play(),
      { threshold: 0.3 }
    );
    observer.observe(headingRef.current);

    const handleResize = () => {
      if (!played) setup();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      tween?.kill();
      split?.revert();
    };
  }, [t.heading]);

  // --- Reveal en cascade des icônes de compétences quand la rangée entre
  // dans le viewport.
  useEffect(() => {
    if (!skillsWrapRef.current) return;
    const items = skillsWrapRef.current.children;
    gsap.set(items, { opacity: 0, y: 20, scale: 0.85 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.06,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(skillsWrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="relative w-full overflow-hidden bg-[#EDE9E4] py-16 font-poppins sm:py-24"
    >
      <div className="reveal flex w-full flex-col items-center justify-center px-4 pb-8 text-center">
        <div className="mb-4 flex w-full max-w-xl items-center justify-center gap-2 sm:gap-3">
          <div className="bar-anim section-bar bg-green-600"></div>
          <span className="text-xl sm:text-2xl font-bold text-black">{t.sectionTitle}</span>
          <div className="bar-anim section-bar bg-green-600"></div>
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-fit max-w-[1400px] flex-col lg:min-h-[calc(100vh-88px)] lg:flex-row lg:items-center">
        <div className="flex w-full flex-col justify-center px-6 pt-6 sm:px-10 lg:w-[62%] lg:px-16">
          <p className="mb-4 text-base sm:text-lg">
            {t.tagline} <br /> {t.taglineLine2} <br /> {t.taglineLine3}
          </p>
          <h2
            ref={headingRef}
            className="font-poppins text-[clamp(1.8rem,4.5vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight text-black"
          >
            {t.heading}
          </h2>

          <div className="mt-10 flex flex-wrap gap-4 sm:mt-14 sm:gap-6 lg:mt-20">
            <div ref={skillsWrapRef} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 sm:justify-start sm:gap-x-8">
              {skills.map((skill, i) => (
                <SkillIcon key={`${skill.label}-${i}`} {...skill} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-full flex-1 items-center justify-center px-6 lg:mt-0 lg:items-end lg:px-0">
          <ProfileCard contactLabel={t.contact} />
        </div>
      </div>

      <div className="h-1.5 w-full bg-gray-300" />
      <div className="py-10">
        <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-5">
          {t.services.map((service, i) => (
            <ServiceCard
              key={`${service.label}-${i}`}
              Icon={serviceIcons[i]}
              label={service.label}
              sub={service.sub}
              stars={4}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-8">
        <div className="reveal flex flex-wrap items-center justify-center gap-4 px-4">
          <span ref={downloadBtnRef} onClick={handleDownloadClick} className="inline-block">
            <FillButton
              as="a"
              href="/Cv_Christian.pdf"
              download
              fillColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#000000"
              className="items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:px-6 sm:text-md"
            >
              {t.downloadCv}
              <Download size={16} />
            </FillButton>
          </span>

          <FillButton
            as="a"
            href="#projets"
            aria-label={t.play || "Play"}
            fillColor="#000000"
            textColor="#000000"
            hoverTextColor="#ffffff"
            className="items-center gap-2 rounded-full bg-white px-4 py-4 text-xs font-semibold uppercase tracking-widest text-black outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <Play size={20} />
          </FillButton>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;