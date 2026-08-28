import { useEffect, useRef } from "react";

export function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold }
    );

    const elements = ref.current?.querySelectorAll(".reveal, .reveal-fade, .reveal-scale");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, [threshold]);

  return ref;
}
