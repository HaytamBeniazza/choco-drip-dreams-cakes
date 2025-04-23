
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center z-10">
      <div className="container mx-auto px-4 text-center content-overlay opacity-0 animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold mb-6">
          Chocolate Drip Dreams
        </h1>
        <p className="text-xl md:text-2xl text-cream mb-8 max-w-2xl mx-auto">
          Indulge in exquisite handcrafted cakes made with the finest ingredients and finished with a perfect chocolate drip
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button className="button-gold">Order Now</Button>
          <Button variant="outline" className="button-chocolate">Explore Menu</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
