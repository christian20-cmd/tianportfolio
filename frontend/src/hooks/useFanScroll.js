import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function useFanScroll(itemsCount, startIndex = 0) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(startIndex);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${itemsCount * 400}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress * (itemsCount - 1));
        },
      });
      return () => st.kill();
    }, el);

    return () => ctx.revert();
  }, [itemsCount]);

  return { containerRef, progress };
}