import { useReveal } from "../../hooks/useReveal";
import { Phone, ArrowUpRight } from "lucide-react";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import Footer from "./Footer";

const contacts = [
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "+261 34 52 717 18",
    href: "https://wa.me/26134527118",
    color: "#25D366",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 34 52 717 18",
    href: "tel:+26134527118",
    color: "#ffffff",
  },
  {
    icon: SiGmail,
    label: "Email",
    value: "christian20.cmd@gmail.com",
    href: "mailto:christian20.cmd@gmail.com",
    color: "#EA4335",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    value: "christian20-cmd",
    href: "https://github.com/christian20-cmd",
    color: "#ffffff",
  },
];

const introText =
  "Vous avez une idée, un projet ou une opportunité de collaboration ? Contactez-moi. Je serai heureux d'échanger avec vous et de concevoir une solution à la hauteur de vos ambitions.";

export default function ContactSection() {
  const sectionRef = useReveal();

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full pt-18 px-6 bg-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[17rem] md:text-[18rem] font-baloo font-bold text-white/5 select-none whitespace-nowrap">
          {"</tian>"}
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-10">
        {/* Header identique à About / Projets */}
        <div className="reveal bg-black items-center text-center justify-center flex flex-col w-full pb-8 px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 w-full max-w-xl">
            <div className="bar-anim section-bar bg-green-600"></div>
            <span className="section-title text-gray-400">Contactez-moi</span>
            <div className="bar-anim section-bar bg-green-600"></div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm max-w-[550px]">{introText}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-12">
          <div className="reveal flex-1 flex items-center justify-center md:justify-start">
            <h2 className="font-baloo text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-none text-center md:text-left">
              Discutons <br className="hidden md:block" />
              <span className="text-6xl md:text-7xl lg:text-9xl xl:text-[9rem] text-green-600 font-medium">
                Ensemble...
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto items-center md:items-end">
            {contacts.map(({ icon: Icon, label, value, href, color }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="reveal group w-72 flex items-center gap-4 bg-[#1c1c1e] rounded-full p-2 hover:bg-[#242426] transition-colors"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-black/40"
                  style={{ color }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[10px] font-poppins">{label}</p>
                  <p className="text-white text-[9px] font-poppins truncate">{value}</p>
                </div>

                <ArrowUpRight className="w-7 h-7 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white/10 h-2 mx-auto"></div>
      <Footer />
    </section>
  );
}