import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { DownloadIcon } from 'lucide-react'
import heroimage from '../../assets/heroimage.png'

gsap.registerPlugin(SplitText, ScrollToPlugin)

const skills = [
  { label: 'ReactJs & Vite', top: '23%', side: 'right', offset: '10%' },
  { label: 'Gsap', top: '47%', side: 'left', offset: '-7%' },
  { label: 'Tailwind CSS', top: '70%', side: 'left', offset: '-20%' },
  { label: 'Framer Motion', top: '72%', side: 'right', offset: '-17%' },
]

const services = [
  'Développement Web',
  'Développement Mobile',
  'Backend & API',
  'Maintenance',
]

const accents = ['bg-green-600', 'bg-black', 'bg-green-300', 'bg-gray-300', 'bg-green-400']

function Hero() {
  const sectionRef = useRef(null)
  const accentsRef = useRef([])
  const nameRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)
  const imageRef = useRef(null)
  const skillsRef = useRef([])
  const dotsRef = useRef(null)
  const scrollTextRef = useRef(null)
  const footerRef = useRef(null)
  const splitRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      splitRef.current = SplitText.create(titleRef.current, {
        type: 'chars',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.from(accentsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.2,
        stagger: 0.04,
      })
        .from(nameRef.current, { opacity: 0, y: 40, duration: 0.8 }, '-=0.4')
        .from(badgeRef.current, { opacity: 0, y: 20, duration: 0.5 }, '-=0.5')
        .to(titleRef.current, { opacity: 1, duration: 0.01 }, '-=0.3')
        .from(
          splitRef.current.chars,
          {
            x: 150,
            opacity: 0,
            duration: 0.4,
            ease: 'power4',
            stagger: 0.04,
          },
          '+=0.1'
        )
        .from(textRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
        .from(btnRef.current, { opacity: 0, y: 20, duration: 0.5 }, '-=0.35')
        .from(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.9, ease: 'power2.out' }, '-=0.5')
        .from(
          skillsRef.current,
          { opacity: 0, x: (i, target) => (target.dataset.side === 'left' ? -20 : 20), duration: 0.5, stagger: 0.1 },
          '-=0.5'
        )
        .from(dotsRef.current, { opacity: 0, duration: 0.4 }, '-=0.4')
        .from(scrollTextRef.current, { opacity: 0, duration: 0.6 }, '-=0.3')
        .from(footerRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')

      const handleResize = () => {
        splitRef.current && splitRef.current.revert()
        splitRef.current = SplitText.create(titleRef.current, { type: 'chars' })
      }
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, sectionRef)

    return () => ctx.revert()
  }, [])



  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative z-10 overflow-hidden font-poppins min-h-[770px] md:min-h-[630px] px-10 lg:px-20 flex items-center"
    >
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 md:px-10 py-10 md:pt-16">
        <div className="grid md:grid-cols-[auto_1fr] gap-2 md:gap-4 items-center">
          {/* Colonne nom : visible partout, horizontal sur mobile/tablette, vertical en desktop */}
          <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-2 md:gap-4 md:-ml-14 shrink-0">
            <div className="flex md:flex-col gap-1.5 md:gap-4">
              {accents.map((c, i) => (
                <span
                  key={i}
                  ref={(el) => (accentsRef.current[i] = el)}
                  className={`w-7 h-3 md:h-6 md:w-4 lg:h-9 rounded-sm ${c}`}
                />
              ))}
            </div>
            <span
              ref={nameRef}
              className="font-baloo font-black text-black leading-none md:leading-[0.7] tracking-tight [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] text-3xl md:text-4xl lg:text-[3rem] select-none"
            >
              CHRISTIAN
            </span>
          </div>

          {/* Colonne droite : texte + photo */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span
                ref={badgeRef}
                className="inline-block text-sm font-baloo font-bold uppercase tracking-wide text-gray-500 mb-8"
              >
                Disponible pour un poste
              </span>

              <h1
                ref={titleRef}
                className="text-3xl lg:text-5xl font-borel font-bold text-black leading-tight opacity-0"
              >
                Développeur.
              </h1>

              <p ref={textRef} className="mt-2 text-gray-600 font-poppins text-sm lg:text-md max-w-md">
                Développeur motivé par l'innovation, je transforme des idées en applications modernes, fonctionnelles et élégantes.
              </p>

              <div ref={btnRef} className="mt-8 flex justify-center lg:justify-start items-center gap-4">
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 justify-center w-full sm:w-auto sm:max-w-48 rounded-full bg-white text-gray-900 text-sm font-medium px-5 py-2 hover:bg-gray-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                >
                  Télécharger CV <DownloadIcon size={17} />
                </a>
              </div>
            </div>

            {/* Image + annotations */}
            <div className="relative flex justify-center">
              <img
                ref={imageRef}
                src={heroimage}
                alt="Christian Nomenjanahary"
                className="w-64 h-72 sm:w-72 sm:h-96 lg:w-[24rem] xl:h-[500px] object-cover object-top relative z-10"
              />

              {skills.map((skill, i) => (
                <div
                  key={skill.label}
                  ref={(el) => (skillsRef.current[i] = el)}
                  data-side={skill.side}
                  className={`hidden lg:flex items-center gap-2 absolute z-20 ${
                    skill.side === 'left' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  style={{
                    top: skill.top,
                    [skill.side]: skill.offset,
                  }}
                >
                  <span
                    className={`w-10 h-px border-t border-dashed border-gray-400 ${
                      skill.side === 'left' ? 'origin-right' : 'origin-left'
                    }`}
                  ></span>
                  <span className="text-xs font-fredoka text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination à points : visible partout, réduite et repositionnée sur mobile */}
      <div
        ref={dotsRef}
        className="flex flex-col gap-1.5 lg:gap-2 absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30"
      >
        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gray-900"></span>
        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gray-300"></span>
        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gray-300"></span>
      </div>

      {/* Scroll vertical : réservé aux écrans larges (peu de place ailleurs) */}
      <div
        ref={scrollTextRef}
        className="hidden lg:flex items-center gap-2 absolute right-14 z-30 [writing-mode:vertical-rl]"
      >
        <span className="text-xs font-fredoka tracking-widest text-gray-500 uppercase">
          Scroller pour explorer
        </span>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-72 z-20 pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path d="M0,120 C360,200 1080,40 1440,120 L1440,200 L0,200 Z" fill="#000" />
      </svg>

      {/* Contenu dans la vague noire : services + copyright */}
      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 w-full z-30 flex items-center justify-center px-4 sm:px-10 lg:px-24 pb-4 sm:pb-6 pointer-events-none"
      >
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pointer-events-auto scrollbar-none pr-4">
          {services.map((service) => (
            <span
              key={service}
              className="flex items-center justify-between text-center gap-1 text-[10px] sm:text-xs lg:text-md font-fredoka uppercase tracking-wide text-green-600 hover:text-green-500 transition-colors whitespace-nowrap shrink-0"
            >
              {'.</'}
              <span className="text-white/35">{service}</span>
              {'>'}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero