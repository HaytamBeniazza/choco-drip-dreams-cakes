import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Track 404 errors without console logging for production
    // You could send this to an analytics service instead
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-cormorant font-bold text-chocolate mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-chocolate mb-4">Page Not Found</h2>
        <p className="text-base sm:text-lg text-chocolate/80 font-lora mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <a href="/">
          <Button className="bg-chocolate text-off-white hover:bg-chocolate-dark font-dm text-sm sm:text-base px-6 py-3">
            Return to Home
          </Button>
        </a>
        
        {/* Decorative elements */}
        <div className="mt-12 opacity-20">
          <div className="text-chocolate text-4xl">🍰</div>
          <p className="text-chocolate/60 font-lora text-sm mt-2">
            Why not try one of our delicious cakes instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
