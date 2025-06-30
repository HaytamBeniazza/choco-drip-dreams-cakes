import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  withSlideAnimation?: boolean;
  isHidden?: boolean;
}

const Hero = ({ withSlideAnimation = false, isHidden = false }: HeroProps) => {
  const slideInFromLeftClass = "animate-slide-from-left";
  const fadeInClass = 'animate-fade-in';
  const entryAnimationClass = !isHidden && withSlideAnimation ? slideInFromLeftClass : (!isHidden ? fadeInClass : '');
  const contentVisibilityClass = `transition-opacity duration-500 ease-in-out ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`;

  const taglines = [
    "Where every bite is a moment of pure bliss",
    "Crafting memories one cake at a time",
    "Your special moments deserve extraordinary cakes",
    "Indulge in the art of chocolate perfection",
    "Creating sweet memories since 2010"
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHidden) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    setIsVisible(true);

    const interval = setInterval(() => {
      setIsVisible(false);
      timeoutRef.current = setTimeout(() => {
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHidden, taglines.length]);

  return (
    <div className="relative min-h-screen flex items-center justify-center z-10 pointer-events-none overflow-hidden w-full">
      <div className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 ${isHidden ? 'pointer-events-none' : ''}`} style={{ pointerEvents: isHidden ? 'none' : 'auto' }}>

        {/* Social Media Icons - Hidden on small mobile, repositioned on larger screens */}
        <div
          className={`absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-4 md:gap-6 ${contentVisibilityClass} ${entryAnimationClass}`}
          style={{ animationDelay: !isHidden && withSlideAnimation ? "0.4s" : (!isHidden ? "0.3s" : '0s') }}
        >
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Facebook size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Instagram size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Twitter size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>

        {/* Centered Content Block */}
        <div className={`flex flex-col items-center text-center max-w-6xl mx-auto w-full ${contentVisibilityClass}`}>
          {/* Title - Better mobile scaling */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-cormorant font-bold text-off-white mb-4 sm:mb-6 max-w-5xl leading-tight ${entryAnimationClass}`}
            style={{
              color: "#FAF8F7",
              letterSpacing: "0.03em",
              textShadow: "0 2px 15px rgba(0,0,0,0.4), 0 4px 30px rgba(212,175,55,0.2)",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
              animationDelay: !isHidden && withSlideAnimation ? "0.4s" : (!isHidden ? "0.3s" : '0s'),
            }}
          >
            Chocolate Drip Dreams
          </h1>

          {/* Tagline Container - Better mobile height and spacing */}
          <div className="relative min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem] mb-6 sm:mb-8 w-full max-w-2xl overflow-hidden">
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-off-white transition-opacity duration-500 px-2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                color: "#FFFCF9",
                letterSpacing: "0.02em",
                lineHeight: "1.6",
                textShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              {taglines[currentTaglineIndex]}
            </p>
          </div>
        </div>

        {/* Social Media Icons for Mobile - Bottom position */}
        <div
          className={`absolute bottom-20 sm:hidden flex justify-center gap-6 w-full ${contentVisibilityClass} ${entryAnimationClass}`}
          style={{
            animationDelay: !isHidden && withSlideAnimation ? "0.6s" : (!isHidden ? "0.6s" : '0s'),
          }}
        >
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-off-white hover:text-chocolate transition-colors duration-300">
            <Twitter size={24} />
          </a>
        </div>

        {/* Explore Button - Better mobile positioning */}
        <div
          className={`absolute bottom-8 sm:bottom-12 left-0 right-0 flex justify-center w-full px-4 ${contentVisibilityClass} ${entryAnimationClass}`}
          style={{
            animationDelay: !isHidden && withSlideAnimation ? "0.8s" : (!isHidden ? "0.8s" : '0s'),
          }}
        >
          <button 
            onClick={() => {
              const cakesSection = document.getElementById('featured');
              if (cakesSection) {
                cakesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-chocolate text-off-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-dm font-medium flex items-center gap-2 hover:bg-chocolate-dark transition-colors duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-sm sm:text-base"
          >
            Explore Our Cakes
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;