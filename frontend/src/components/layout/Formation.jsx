import { useEffect, useRef } from "react";
import { GraduationCap, Star, MapPin } from "lucide-react";
import gsap from "gsap";
import eniBg from "../../../public/ENI.png";
import logoEni from "../../../public/LogoEni.png";
import MagneticButton from "../layout/Magneticbutton";
import { useLanguage } from "../../context/LanguageContext"; // ajuste le chemin selon ton projet
import { translations } from "../../i18n/translations"; // ajuste le chemin selon ton projet

function StarRating({ rating = 4, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-neutral-300 text-neutral-300"}
        />
      ))}
    </div>
  );
}

function ExpertiseItem({ area }) {
  return (
    <div className="flex flex-col items-start">
      <StarRating rating={4} />
      <h4 className="font-poppins text-xs font-extrabold uppercase tracking-wide text-black sm:text-base">
        {area.title}
      </h4>
      <p className="font-poppins text-[11px] text-neutral-500 sm:text-sm">
        {area.subtitle}
      </p>
    </div>
  );
}

function FormationItem({ item, index, isLast }) {
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.set(itemRef.current, { opacity: 0, x: -20 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(itemRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`flex items-start gap-3 sm:gap-4 ${
        !isLast ? "border-b border-neutral-200 pb-4" : ""
      }`}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white sm:h-8 sm:w-8">
        <GraduationCap size={18} className="text-black sm:hidden" />
        <GraduationCap size={20} className="hidden text-black sm:block" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-poppins text-sm font-bold text-black sm:text-base">
            {item.year} — {item.school}
          </h4>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              item.current ? "bg-green-600 text-white" : "bg-[#460136] text-white"
            }`}
          >
            {item.status}
          </span>
        </div>

        <p className="font-poppins text-xs text-neutral-600 sm:text-sm">
          {item.city} • {item.period}
        </p>
        <p className="font-poppins text-[11px] text-neutral-500 sm:text-xs">
          {item.parcours}
        </p>
      </div>
    </div>
  );
}

function ClickHint() {
  return (
    <>
      <style>{`
        @keyframes handPointNudge {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(-8px); }
          100% { transform: translateX(0); }
        }
        .hand-hint {
          animation: handPointNudge 1s ease-in-out infinite;
        }
      `}</style>
      <img
        src="/hand-point-left-fill-svgrepo-com.svg"
        alt=""
        aria-hidden="true"
        className="hand-hint pointer-events-none h-10 w-10 sm:h-12 sm:w-12"
      />
    </>
  );
}

function SchoolMap({ mapT }) {
  const schoolAddress = "ENI Tanambao, Fianarantsoa, Madagascar";
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    schoolAddress
  )}&output=embed`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xs border border-neutral-200 bg-white ring-2 ring-neutral-400">
      <iframe
        title={mapT.schoolName}
        src={mapEmbedSrc}
        className="h-40 w-full sm:h-full sm:min-h-[180px]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex items-start gap-2 px-3 py-3 sm:px-4">
        <MapPin size={24} className="mt-0.5 shrink-0 text-green-600 sm:h-[33px] sm:w-[33px]" />
        <div>
          <p className="font-poppins text-xs font-bold text-black sm:text-sm">
            {mapT.schoolName}
          </p>
          <p className="font-poppins text-[11px] text-neutral-500 sm:text-xs">
            {mapT.addressLine}
          </p>
        </div>
      </div>
    </div>
  );
}

function Formation() {
  const { lang } = useLanguage();
  const t = translations[lang].formation;

  const headingRef = useRef(null);

  useEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 20 });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden px-5 py-14 sm:px-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        {/* Colonne gauche : titre + sous-titre + image */}
        <div ref={headingRef} className="flex shrink-0 flex-col gap-4 sm:w-1/3">
          <div>
            <h3 className="font-poppins text-lg font-extrabold text-neutral-900 sm:text-xl">
              {t.sectionTitle}
            </h3>
            <p className="mt-1 font-poppins text-xs text-neutral-500 sm:text-sm">
              {t.subtitle}
            </p>
          </div>

          <div className="relative aspect-6/4 w-full overflow-hidden rounded-xs">
            <img
              src={eniBg}
              alt="ENI"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
            <img
              src={logoEni}
              alt="Logo ENI"
              className="absolute -right-3 top-3 z-10 h-7 w-auto -translate-x-1/2 rounded-full object-contain drop-shadow-lg sm:h-12"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <MagneticButton
              as="a"
              href="https://eni.mg"
              download
              fillColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#000000"
              className="inline-flex w-fit items-center gap-2 rounded-xs bg-[#016B32] px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              {t.discoverSchool}
            </MagneticButton>
            <ClickHint />
          </div>
        </div>

        {/* Colonne droite : grid (formations + carte) */}
        <div className="grid flex-1 grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_1.4fr] sm:gap-4">
          <div className="grid grid-cols-1 gap-4">
            {t.items.map((item, i) => (
              <FormationItem
                key={item.year}
                item={item}
                index={i}
                isLast={i === t.items.length - 1}
              />
            ))}
          </div>

          <SchoolMap mapT={t.map} />

          <div className="col-span-1 grid grid-cols-2 gap-4 border-t border-neutral-200 px-1 pt-6 sm:col-span-2 sm:grid-cols-3 sm:px-2 lg:grid-cols-5">
            {t.expertiseAreas.map((area) => (
              <ExpertiseItem key={area.title} area={area} />
            ))}
          </div>
        </div>
      </div>

      {/* Section Compétences */}
      <div className="mt-10 border-t border-neutral-200 pt-8 sm:mt-12 sm:pt-10">
        <h3 className="font-poppins text-base font-extrabold text-neutral-900 sm:text-xl">
          {t.skillsTitle}
        </h3>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.skillCategories.map((cat) => (
            <div key={cat.title} className="flex flex-col gap-3">
              <span className="font-poppins text-[11px] font-bold uppercase tracking-widest text-neutral-400 sm:text-xs">
                {cat.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-neutral-100 px-3 py-1.5 font-poppins text-xs font-medium text-neutral-800 sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Formation;