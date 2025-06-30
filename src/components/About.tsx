const About = () => {
  return (
    <section id="about" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 fade-in-delay-2 opacity-0 animate-fade-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2574&auto=format&fit=crop" 
                alt="Baker preparing a chocolate drip cake" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-chocolate p-4 rounded-lg shadow-lg">
                <p className="text-off-white font-montserrat font-bold text-lg">15+ Years of Excellence</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 fade-in-delay-3 opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-6">Our Chocolate Journey</h2>
            <p className="text-chocolate/80 mb-6">
              Founded in 2010, Chocolate Drip Dreams began as a small family bakery with a passion for creating 
              extraordinary cake experiences. Our founder, Emma Davis, spent years perfecting the art of chocolate 
              drip cakes, combining traditional baking techniques with innovative designs.
            </p>
            <p className="text-chocolate/80 mb-6">
              Today, we continue to craft each cake with the same dedication to quality and artistry. 
              We use only premium ingredients, sourcing the finest chocolate, fresh local produce, and 
              organic dairy to ensure every bite is as exceptional as the cake's appearance.
            </p>
            <p className="text-chocolate/80 mb-6">
              Our team of skilled pastry chefs brings creativity and precision to every creation, 
              ensuring your cake not only looks stunning but tastes divine.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-chocolate p-4 rounded-lg border border-chocolate/20">
                <p className="text-off-white font-bold text-3xl">5000+</p>
                <p className="text-off-white/80">Cakes Crafted</p>
              </div>
              <div className="bg-chocolate p-4 rounded-lg border border-chocolate/20">
                <p className="text-off-white font-bold text-3xl">100%</p>
                <p className="text-off-white/80">Satisfaction</p>
              </div>
              <div className="bg-chocolate p-4 rounded-lg border border-chocolate/20">
                <p className="text-off-white font-bold text-3xl">24</p>
                <p className="text-off-white/80">Unique Flavors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
