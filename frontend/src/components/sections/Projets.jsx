// src/components/sections/Projets.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import ProjectCard from "../layout/ProjectCard";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const introText =
  "Un aperçu de réalisations qui reflètent ma manière de penser, de concevoir et de résoudre des problèmes concrets. Chacune marque une étape importante de mon évolution.";

export default function Projets({ onProjectClick }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const barLeftRef = useRef(null);
  const barRightRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleSplit = SplitText.create(titleRef.current, {
        type: "chars",
      });
      gsap.set(titleSplit.chars, { opacity: 0, x: 150 });

      gsap.set(barLeftRef.current, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(barRightRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tlHeader
        .to(barLeftRef.current, { scaleX: 1, duration: 0.7, ease: "power3.out" })
        .to(barRightRef.current, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "<")
        .to(
          titleSplit.chars,
          { x: 0, opacity: 1, duration: 0.4, ease: "power4", stagger: 0.02 },
          "<"
        )
        .to(
          introRef.current,
          {
            scrambleText: {
              text: introText,
              chars: "upperAndLowerCase",
              revealDelay: 0.2,
              tweenLength: true,
            },
            ease: "power2.inOut",
            duration: 2.2,
          },
          "-=0.3"
        );

      const cards = galleryRef.current.querySelectorAll(".project-card");
      gsap.set(cards, { autoAlpha: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: "sine.out" }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { autoAlpha: 0, y: 40, stagger: 0.1, duration: 0.4, ease: "sine.in" }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projets" ref={sectionRef} className="relative w-full bg-[#EDEEF1] py-16">
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center text-center w-full px-6 mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div ref={barLeftRef} className="bg-green-700 h-3 w-40"></div>
          <span
            ref={titleRef}
            className="text-xs sm:text-md font-baloo uppercase tracking-wide text-black font-bold shrink-0"
          >
            Mes Projets
          </span>
          <div ref={barRightRef} className="bg-green-700 h-3 w-40"></div>
        </div>
        <p ref={introRef} className="text-gray-600 text-center text-sm max-w-[550px]">
          {introText}
        </p>
      </div>

      <div
        ref={galleryRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16"
      >
        {projects.map((project) => (
          <div key={project.slug ?? project.number} className="project-card">
            <ProjectCard project={project} onClick={onProjectClick} />
          </div>
        ))}
      </div>
    </section>
  );
}