import { useState } from "react";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCakes from "@/components/FeaturedCakes";
import Cakes from "@/components/Cakes";
import About from "@/components/About";
import FlipBook from "@/components/FlipBook";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Define a custom animation class for slide-in from left
const slideInFromLeft = "opacity-0 translate-x-[-50px] animate-slide-from-left";

const Index = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Full-screen video background */}
      <VideoBackground onLoadingChange={setVideoLoaded}>
        {/* Content layers - only show when video is loaded */}
        {videoLoaded && (
          <div className="relative z-10">
            {/* Navbar with sliding animation */}
            <div className={slideInFromLeft} style={{ animationDelay: "0.2s" }}>
              <Navbar />
            </div>
            
            {/* Hero with sliding animation handled within the component */}
            <Hero withSlideAnimation={true} />
            
            {/* Other content sections with regular fade-in */}
            <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
              <FeaturedCakes />
              <Cakes />
              <About />
              <FlipBook />
              <Testimonials />
              <Contact />
              <Footer />
            </div>
          </div>
        )}
      </VideoBackground>
    </div>
  );
};

export default Index;
