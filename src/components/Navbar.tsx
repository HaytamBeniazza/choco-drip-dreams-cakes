
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-chocolate-dark/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-gold font-playfair text-2xl font-bold">ChocoDrip</a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#featured" className="text-cream hover:text-gold transition-colors duration-300">Cakes</a>
          <a href="#about" className="text-cream hover:text-gold transition-colors duration-300">About</a>
          <a href="#testimonials" className="text-cream hover:text-gold transition-colors duration-300">Testimonials</a>
          <a href="#contact" className="text-cream hover:text-gold transition-colors duration-300">Contact</a>
          <Button variant="outline" size="icon" className="ml-4 bg-transparent border-gold/30 text-gold hover:bg-gold/10">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <Button variant="outline" size="icon" className="bg-transparent border-gold/30 text-gold hover:bg-gold/10 mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border-gold/30 text-gold hover:bg-gold/10">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-chocolate-dark/95 backdrop-blur-md">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <a href="#featured" className="text-cream hover:text-gold transition-colors duration-300 px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>Cakes</a>
            <a href="#about" className="text-cream hover:text-gold transition-colors duration-300 px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#testimonials" className="text-cream hover:text-gold transition-colors duration-300 px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="text-cream hover:text-gold transition-colors duration-300 px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
