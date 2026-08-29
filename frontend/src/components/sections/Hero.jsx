import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroimage from "../../assets/heroimage.png";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "../../context/LanguageContext"; // adapte le chemin si besoin
import { translations } from "../../i18n/translations"; // adapte le chemin si besoin
import '@fontsource/anton';


function Hero() {
  const sectionRef = useIntersectionObserver();
  const { lang } = useLanguage();
  const t = translations[lang];

  const textRef = useRef(null);
  const imgRef = useRef(null);
  const shadowRef = useRef(null);
  const cursorRef = useRef(null);
  const heroRef = useRef(null);

  // Animation d'entrée
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      textRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0
    )
      .fromTo(
        imgRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        0.25
      )
      .fromTo(
        shadowRef.current,
        { opacity: 0, scaleX: 0.6 },
        { opacity: 1, scaleX: 1, duration: 1, ease: "power3.out" },
        0.5
      );

    return () => tl.kill();
  }, [lang]);

  // Curseur personnalisé — un rond plein qui suit la souris,
  // uniquement dans la section Hero, avec un léger effet de "lag"
  // fluide via gsap.quickTo, et mix-blend-mode: difference (géré en CSS).
  useEffect(() => {
    const section = heroRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    const showCursor = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 });
    const hideCursor = () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.25 });

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseenter", showCursor);
    section.addEventListener("mouseleave", hideCursor);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseenter", showCursor);
      section.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        heroRef.current = el;
      }}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black hero-no-native-cursor"
    >
      {/* Photo — plus petite, en arrière-plan (z-10). */}
      <img
        ref={imgRef}
        src={heroimage}
        alt="Christian Nomenjanahary"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[22rem] md:w-sm max-w-sm object-contain pointer-events-none select-none z-10"
      />

      {/* Ombre au sol — ancre la photo dans la scène. */}
      <div
        ref={shadowRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[26%] h-5 bg-black/60 rounded-full blur-2xl z-0"
      />

      {/* Mot géant — au premier plan (z-20), blanc, transparent
          (grâce au blend mode) là où il passe devant la photo. */}
      <h1
        ref={textRef}
        className="font-anton select-none text-center leading-[0.78] tracking-tight px-4 text-white relative z-20"
        style={{
          fontSize: "clamp(4.5rem, 22vw, 16rem)",
          mixBlendMode: "difference",
        }}
      >
        {t.hero.title}
      </h1>

      {/* Curseur personnalisé : rond plein, suit la souris,
          s'inverse (noir/blanc) selon ce qu'il survole. */}
      <div ref={cursorRef} className="hero-cursor" aria-hidden="true" />
    </section>
  );
}

export default Hero;