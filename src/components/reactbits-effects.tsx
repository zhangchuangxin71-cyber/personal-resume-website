type GlitchLabelProps = {
  text: string;
  className?: string;
};

export function GlitchLabel({ text, className }: GlitchLabelProps) {
  return (
    <span className={["glitch-label", className].filter(Boolean).join(" ")} aria-label={text}>
      <span className="glitch-label-text">{text}</span>
      <span className="glitch-label-layer glitch-label-layer-a" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-label-layer glitch-label-layer-b" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <span className="hero-orb hero-orb-a" />
      <span className="hero-orb hero-orb-b" />
      <span className="hero-orb hero-orb-c" />
      <span className="hero-orb hero-orb-d" />
      <span className="hero-grid" />
      <span className="hero-scan" />
    </div>
  );
}
