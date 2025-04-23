
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCakes from "@/components/FeaturedCakes";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      {/* Full-screen video background */}
      <VideoBackground />
      
      {/* Content layers */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturedCakes />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
