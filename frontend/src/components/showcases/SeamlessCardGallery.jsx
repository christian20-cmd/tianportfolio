// src/components/showcase/SeamlessCardGallery.jsx
import { useRef, useEffect } from "react";

export default function SeamlessCardGallery({ images = [], activeIndex = 0, onSelect }) {
  const cardsRef = useRef(null);

  // Fait défiler la vignette active dans la vue (utile si beaucoup d'images)
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const activeCard = container.children[activeIndex];
    activeCard?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  return (
    <div className="relative w-full pb-8">
      <ul
        ref={cardsRef}
        className="m-0 flex list-none justify-center gap-3 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <li
            key={i}
            onClick={() => onSelect?.(i)}
            className={`aspect-[14/8] w-[4.5rem] flex-none cursor-pointer rounded-lg border-2 bg-cover bg-center bg-no-repeat transition-all duration-200 ease-out hover:-translate-y-0.5 ${
              i === activeIndex ? "border-[#88ce02]" : "border-transparent"
            }`}
            style={{ backgroundImage: `url(${src})`, scrollSnapAlign: "center" }}
          />
        ))}
      </ul>
    </div>
  );
}