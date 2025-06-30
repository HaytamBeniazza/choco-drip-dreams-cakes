import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import VideoBackground from "@/components/VideoBackground";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import FlipBook from "@/components/FlipBook";
import Cakes from "@/components/Cakes";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-chocolate overflow-x-hidden w-full">
      <VideoBackground onLoadingChange={setIsVideoLoaded}>
        <Hero withSlideAnimation={!isVideoLoaded} />
      </VideoBackground>
      <Navbar />
      <About />
      <FlipBook />
      <Cakes />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
