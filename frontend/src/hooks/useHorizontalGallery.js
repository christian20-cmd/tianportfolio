// src/hooks/useHorizontalGallery.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalGallery() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const pinWrap = stripRef.current;
    if (!sec || !pinWrap) return;

    const ctx = gsap.context(() => {
      let pinWrapWidth, horizontalScrollLength;

      function refresh() {
        pinWrapWidth = pinWrap.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      }
      refresh();

      gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: sec,
          pin: sec,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
        },
        x: () => -horizontalScrollLength,
        ease: "none",
      });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    }, sec);

    return () => ctx.revert();
  }, []);

  return { sectionRef, stripRef };
}