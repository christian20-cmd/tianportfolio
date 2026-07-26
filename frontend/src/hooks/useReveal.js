// src/hooks/useReveal.js
import { useEffect, useRef } from "react";

export function useReveal(options = { threshold: 0.15 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.classList.contains("reveal") || root.classList.contains("reveal-fade") || root.classList.contains("reveal-scale")
      ? [root, ...root.querySelectorAll(".reveal, .reveal-fade, .reveal-scale")]
      : root.querySelectorAll(".reveal, .reveal-fade, .reveal-scale");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, options);

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}