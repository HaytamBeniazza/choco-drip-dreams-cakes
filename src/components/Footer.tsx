const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-chocolate py-12 border-t border-chocolate/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-off-white font-bold text-xl mb-4">ChocoDrip</h3>
            <p className="text-off-white/70 mb-4">
              Handcrafted cakes for every occasion. Made with premium ingredients and finished with our signature chocolate drip.
            </p>
          </div>
          
          <div>
            <h3 className="text-off-white font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#featured" className="text-off-white/70 hover:text-off-white transition-colors">Our Cakes</a></li>
              <li><a href="#about" className="text-off-white/70 hover:text-off-white transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="text-off-white/70 hover:text-off-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-off-white/70 hover:text-off-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-off-white font-bold text-xl mb-4">Cake Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-off-white/70 hover:text-off-white transition-colors">Birthday Cakes</a></li>
              <li><a href="#" className="text-off-white/70 hover:text-off-white transition-colors">Wedding Cakes</a></li>
              <li><a href="#" className="text-off-white/70 hover:text-off-white transition-colors">Custom Designs</a></li>
              <li><a href="#" className="text-off-white/70 hover:text-off-white transition-colors">Seasonal Specials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-off-white font-bold text-xl mb-4">Newsletter</h3>
            <p className="text-off-white/70 mb-4">
              Subscribe to receive updates on new cake designs and seasonal offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-chocolate-light border border-chocolate/20 text-off-white rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-off-white"
              />
              <button className="bg-off-white text-chocolate px-4 rounded-r-md hover:bg-off-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-chocolate/10 text-center text-off-white/50">
          <p>&copy; {currentYear} ChocoDrip Dreams. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
