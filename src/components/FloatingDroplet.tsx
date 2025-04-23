
const FloatingDroplet = () => (
  <span
    className="absolute left-1/2 top-[56%] md:top-[55%] -translate-x-1/2 animate-float"
    aria-hidden="true"
    style={{ pointerEvents: "none" }}
  >
    {/* Creamy gold droplet, SVG vector */}
    <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 45C27 39 34 30 34 20C34 10.0589 27.9411 3 18 3C8.05887 3 2 10.0589 2 20C2 30 9 39 18 45Z"
        fill="#FAF8F7"
        stroke="#D4AF37"
        strokeWidth="2"
        style={{ filter: 'drop-shadow(0 2px 8px #fff5)' }}
      />
    </svg>
  </span>
);

export default FloatingDroplet;
