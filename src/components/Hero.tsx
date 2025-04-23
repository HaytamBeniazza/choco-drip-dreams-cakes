
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center z-10 pointer-events-none">
      {/* Minimal Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ pointerEvents: "auto" }}>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-playfair font-extrabold italic mb-4 tracking-tight"
          style={{
            color: "#FAF8F7",
            textShadow: "0 4px 24px rgba(58,38,24,0.18), 0 1px 2px rgba(58,38,24,0.08)",
            letterSpacing: "0.06em",
            fontStyle: "italic"
          }}
        >
          Chocolate Drip Dreams
        </h1>
        <span
          className="block text-lg md:text-xl font-montserrat font-medium tracking-wide"
          style={{
            color: "#FFFCF9",
            letterSpacing: "0.04em",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "0.5em",
            padding: "0.15em 1.3em"
          }}
        >
          Let your senses melt.
        </span>
      </div>
    </div>
  );
};

export default Hero;
