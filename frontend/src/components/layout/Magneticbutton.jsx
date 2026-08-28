import { useMagneticHover } from "../../hooks/Usemagnetichover";

/**
 * Wrapper générique qui applique l'effet magnétique GSAP
 * à n'importe quel élément (a, button...).
 * Utilise `as` pour choisir la balise (par défaut "a").
 */
function MagneticButton({
  as: Tag = "a",
  strength = 0.35,
  scale = 1.06,
  className = "",
  children,
  ...props
}) {
  const ref = useMagneticHover({ strength, scale });

  return (
    <Tag ref={ref} className={`inline-flex ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default MagneticButton;