import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent<Omit<CartItem, 'quantity'>>) => {
      addToCart(event.detail);
    };

    window.addEventListener('addToCart', handleAddToCart as EventListener);
    return () => window.removeEventListener('addToCart', handleAddToCart as EventListener);
  }, []);

  const handleCakesClick = () => {
    const cakesSection = document.getElementById('featured');
    if (cakesSection) {
      cakesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 overflow-hidden ${isScrolled ? 'bg-chocolate/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img 
                src={isScrolled ? "/images/cakes/choco_drip_logo_dark_mode.png" : "/images/cakes/choco_drip_logo.png"}
                alt="Chocolate Drip Dreams" 
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-16'} w-auto`}
              />
              <span className={`font-parisienne text-off-white transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl'} leading-relaxed`}>
                Choco Drip
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 mr-6 mt-4">
              <a href="#cakes" className="text-off-white hover:text-off-white/80 transition-colors duration-300 font-medium">Cakes</a>
              <a href="#about" className="text-off-white hover:text-off-white/80 transition-colors duration-300 font-medium">About</a>
              <a href="#testimonials" className="text-off-white hover:text-off-white/80 transition-colors duration-300 font-medium">Testimonials</a>
              <a href="#contact" className="text-off-white hover:text-off-white/80 transition-colors duration-300 font-medium">Contact</a>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative bg-transparent border-off-white/30 text-off-white hover:bg-off-white/10"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-chocolate text-off-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <Button variant="outline" size="icon" className="bg-transparent border-off-white/30 text-off-white hover:bg-off-white/10 mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative bg-transparent border-off-white/30 text-off-white hover:bg-off-white/10"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-chocolate text-off-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-chocolate/95 backdrop-blur-md overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl py-4 flex flex-col space-y-4">
              <a href="#cakes" className="text-off-white hover:text-off-white/80 transition-colors duration-300 px-4 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Cakes</a>
              <a href="#about" className="text-off-white hover:text-off-white/80 transition-colors duration-300 px-4 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#testimonials" className="text-off-white hover:text-off-white/80 transition-colors duration-300 px-4 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="text-off-white hover:text-off-white/80 transition-colors duration-300 px-4 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-off-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="border-b border-chocolate/20 p-4 flex items-center justify-between">
                <h2 className="text-xl font-cormorant font-bold text-chocolate">Shopping Cart</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="text-chocolate hover:bg-chocolate/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-chocolate/30 mx-auto mb-4" />
                    <p className="text-chocolate/60 font-lora">Your cart is empty</p>
                    <p className="text-chocolate/40 font-lora text-sm mt-2">Add some delicious cakes!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-cream p-3 rounded-lg border border-chocolate/10">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-cormorant font-bold text-chocolate">{item.name}</h3>
                          <p className="text-chocolate/80 font-dm">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-chocolate/20"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-chocolate font-dm font-bold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-chocolate/20"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-chocolate/20 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-cormorant font-bold text-chocolate">Total:</span>
                    <span className="text-xl font-cormorant font-bold text-chocolate">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-chocolate text-off-white hover:bg-chocolate-dark font-dm">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
