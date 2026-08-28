import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hook "bouton magnétique" façon GSAP.
 * Le bouton suit légèrement le curseur dans sa zone,
 * grossit un peu au survol, puis revient en élastique à la sortie.
 *
 * @param {Object} options
 * @param {number} options.strength - intensité du déplacement (0 à 1). Défaut 0.35
 * @param {number} options.scale - échelle au survol. Défaut 1.06
 */
export function useMagneticHover({ strength = 0.35, scale = 1.06 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // quickTo = version optimisée de gsap.to pour des updates très fréquentes (mousemove)
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handleMouseEnter = () => {
      scaleTo(scale);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, scale]);

  return ref;
}