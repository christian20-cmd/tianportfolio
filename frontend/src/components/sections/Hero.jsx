import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroimage from "../../assets/heroimage.png";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import '@fontsource/anton'

const ZONE_1 = "polygon(0% 0%, 70% 0%, 5% 100%, 0% 100%)";
const ZONE_2 = "polygon(70% 0%, 100% 0%, 35% 100%, 5% 100%)";
const ZONE_3 = "polygon(100% 0%, 100% 0%, 100% 100%, 35% 100%)";

const SPOT_RADIUS = 90;

const imgBaseClass =
  "absolute top-4 sm:top-6 lg:top-8 left-1/2 -translate-x-1/2 w-72 h-[26rem] sm:w-80 sm:h-[30rem] lg:w-[26rem] lg:h-[38rem] xl:w-[28rem] xl:h-[620px] object-cover object-top opacity-60";

const textBaseClass =
  "text-[18vw] sm:text-[16vw] lg:text-[14vw] font-extrabold tracking-tight text-neutral-400 whitespace-nowrap leading-none";

function Hero() {
  const sectionRef = useIntersectionObserver();
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const fill1Ref = useRef(null);
  const fill2Ref = useRef(null);
  const fill3Ref = useRef(null);
  const hoverZoneRef = useRef(null);
  const fillRefs = [fill1Ref, fill2Ref, fill3Ref];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      text1Ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      0
    )
      .fromTo(
        text2Ref.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.1
      )
      .fromTo(
        text3Ref.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.2
      );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const zone = hoverZoneRef.current;
    if (!zone) return;

    const setters = fillRefs.map((ref) => {
      if (!ref.current) return null;
      return {
        x: gsap.quickTo(ref.current, "--mx", { duration: 0.15, ease: "power2.out" }),
        y: gsap.quickTo(ref.current, "--my", { duration: 0.15, ease: "power2.out" }),
        el: ref.current,
      };
    });

    const handleMove = (e) => {
      setters.forEach((s) => {
        if (!s) return;
        const rect = s.el.getBoundingClientRect();
        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;
        s.x(xPct);
        s.y(yPct);
      });
      fillRefs.forEach((ref) => {
        if (ref.current) gsap.to(ref.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
      });
    };

    const handleLeave = () => {
      fillRefs.forEach((ref) => {
        if (ref.current) gsap.to(ref.current, { opacity: 0, duration: 0.35, overwrite: "auto" });
      });
    };

    zone.addEventListener("mousemove", handleMove);
    zone.addEventListener("mouseleave", handleLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMove);
      zone.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="accueil" className="relative min-h-screen font-poppins overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" style={{ clipPath: ZONE_1 }} />
        <div className="absolute inset-0 bg-neutral-800" style={{ clipPath: ZONE_2 }} />
        <div className="absolute inset-0 bg-black" style={{ clipPath: ZONE_3 }} />
      </div>

      <div ref={hoverZoneRef} className="absolute inset-0 z-20 cursor-default" />

      <div
        className="absolute inset-0 z-[5] pointer-events-none overflow-hidden mix-blend-exclusion"
        aria-hidden="true"
      >
        <div className="absolute font-anton inset-0 flex items-end justify-center pb-10" style={{ clipPath: ZONE_1 }}>
          <span ref={text1Ref} className={`${textBaseClass} relative`}>
            DÉVELOPPEUR
            <span
              ref={fill1Ref}
              className="absolute inset-0 font-anton text-white opacity-0"
              style={{
                "--mx": "50%",
                "--my": "50%",
                maskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
              }}
              aria-hidden="true"
            >
              DÉVELOPPEUR
            </span>
          </span>
        </div>
        <div className="absolute font-anton inset-0 flex items-end justify-center pb-10" style={{ clipPath: ZONE_2 }}>
          <span ref={text2Ref} className={`${textBaseClass} relative`}>
            DÉVELOPPEUR
            <span
              ref={fill2Ref}
              className="absolute inset-0 font-anton text-white opacity-0"
              style={{
                "--mx": "50%",
                "--my": "50%",
                maskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
              }}
              aria-hidden="true"
            >
              DÉVELOPPEUR
            </span>
          </span>
        </div>
        <div className="absolute font-anton inset-0 flex items-end justify-center pb-10" style={{ clipPath: ZONE_3 }}>
          <span ref={text3Ref} className={`${textBaseClass} relative`}>
            DÉVELOPPEUR
            <span
              ref={fill3Ref}
              className="absolute inset-0 font-anton text-white opacity-0"
              style={{
                "--mx": "50%",
                "--my": "50%",
                maskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${SPOT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
              }}
              aria-hidden="true"
            >
              DÉVELOPPEUR
            </span>
          </span>
        </div>
      </div>

      <div className="reveal absolute inset-0 z-10">
        <div className="absolute inset-0" style={{ clipPath: ZONE_1 }}>
          <img
            src={heroimage}
            alt="Christian Nomenjanahary"
            className={`${imgBaseClass} grayscale contrast-125 brightness-75`}
          />
        </div>
        <div className="absolute inset-0" style={{ clipPath: ZONE_2 }}>
          <img
            src={heroimage}
            alt=""
            aria-hidden="true"
            className={`${imgBaseClass} grayscale contrast-125 brightness-90`}
          />
        </div>
        <div className="absolute inset-0" style={{ clipPath: ZONE_3 }}>
          <img
            src={heroimage}
            alt=""
            aria-hidden="true"
            className={`${imgBaseClass} grayscale contrast-125 brightness-75`}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;