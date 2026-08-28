import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hook "fill hover" façon GSAP :
 * un calque de couleur apparaît exactement au point d'entrée du curseur
 * dans le bouton, se scale pour remplir tout le bouton,
 * puis se rétracte au point de sortie du curseur.
 * Le texte/icônes change de couleur en synchro pour rester lisible.
 *
 * Le bouton doit avoir `position: relative` et `overflow: hidden`
 * (géré automatiquement par le composant FillButton).
 *
 * @param {string} textColor - couleur du contenu au repos (optionnel, ne force rien si omis)
 * @param {string} hoverTextColor - couleur du contenu quand le cercle recouvre le bouton
 */
export function useFillHover({ textColor, hoverTextColor = "#000000" } = {}) {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const content = contentRef.current;
    if (!btn || !fill) return;

    // Position de départ : cercle minuscule, invisible
    gsap.set(fill, { xPercent: -50, yPercent: -50, scale: 0 });

    const getRelativePos = (e) => {
      const rect = btn.getBoundingClientRect();
      // Diamètre = diagonale du bouton x2, pour garantir un remplissage total
      // quel que soit le point d'entrée du curseur.
      const diameter = Math.hypot(rect.width, rect.height) * 2;
      gsap.set(fill, { width: diameter, height: diameter });
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleEnter = (e) => {
      const { x, y } = getRelativePos(e);
      gsap.set(fill, { x, y, scale: 0 });
      gsap.to(fill, {
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });
      if (content) {
        gsap.to(content, {
          color: hoverTextColor,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = (e) => {
      const { x, y } = getRelativePos(e);
      gsap.to(fill, {
        x,
        y,
        scale: 0,
        duration: 0.45,
        ease: "power3.out",
      });
      if (content) {
        gsap.to(content, {
          color: textColor || "",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [textColor, hoverTextColor]);

  return { btnRef, fillRef, contentRef };
}