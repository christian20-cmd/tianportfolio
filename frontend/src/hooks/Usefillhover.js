import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useFillHover({ textColor, hoverTextColor = "#000000" } = {}) {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const content = contentRef.current;
    if (!btn || !fill) return;

    gsap.set(fill, { xPercent: -50, yPercent: -50, scale: 0 });

    const getRelativePos = (e) => {
      const rect = btn.getBoundingClientRect();
      const diameter = Math.hypot(rect.width, rect.height) * 2;
      gsap.set(fill, { width: diameter, height: diameter });
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const DURATION = 0.45;

    const handleEnter = (e) => {
      const { x, y } = getRelativePos(e);
      gsap.killTweensOf(fill);
      gsap.killTweensOf(content);

      gsap.set(fill, { x, y, scale: 0 });
      gsap.to(fill, { scale: 1, duration: DURATION, ease: "power3.out" });

      if (content) {
        gsap.to(content, {
          color: hoverTextColor,
          duration: DURATION,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = (e) => {
      const { x, y } = getRelativePos(e);
      gsap.killTweensOf(fill);
      gsap.killTweensOf(content);

      gsap.to(fill, { x, y, scale: 0, duration: DURATION, ease: "power3.out" });

      if (content) {
        gsap.to(content, {
          color: textColor || "",
          duration: DURATION,
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