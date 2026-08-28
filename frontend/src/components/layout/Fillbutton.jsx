import { useFillHover } from "../../hooks/Usefillhover";

/**
 * Bouton avec effet "fill" GSAP :
 * un cercle de couleur (`fillColor`) surgit exactement au point
 * où le curseur entre dans le bouton, remplit toute sa surface,
 * puis se rétracte au point de sortie.
 *
 * La couleur du texte/icônes change en synchro (`textColor` -> `hoverTextColor`)
 * via GSAP, pour rester lisible par-dessus le cercle.
 *
 * @param {string} fillColor - couleur du cercle de remplissage (défaut: blanc)
 * @param {string} textColor - couleur du contenu au repos (défaut: hérite du parent)
 * @param {string} hoverTextColor - couleur du contenu quand le cercle est dessus (défaut: noir)
 */
function FillButton({
  as: Tag = "a",
  fillColor = "#ffffff",
  textColor,
  hoverTextColor = "#000000",
  className = "",
  children,
  ...props
}) {
  const { btnRef, fillRef, contentRef } = useFillHover({
    textColor,
    hoverTextColor,
  });

  return (
    <Tag
      ref={btnRef}
      className={`relative isolate inline-flex overflow-hidden ${className}`}
      {...props}
    >
      <span
        ref={fillRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{ backgroundColor: fillColor }}
      />
      <span ref={contentRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}

export default FillButton;