import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  cakeImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    quote: "The chocolate drip cake was the centerpiece of our wedding. Not only was it stunning to look at, but the taste was absolutely divine. Our guests are still talking about it!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    cakeImage: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Birthday Celebration",
    quote: "I ordered a cake for my wife's 40th birthday and was blown away by the attention to detail. The gold-dusted chocolate drip was elegant and the cake itself was incredibly moist and delicious.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    cakeImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Alicia Rodriguez",
    role: "Corporate Event",
    quote: "Our company anniversary celebration needed something special, and ChocoDrip delivered beyond expectations. The customized logo on the cake was perfect, and everyone raved about the taste.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
    cakeImage: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1936&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 lg:py-24 bg-off-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233A2618' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate mb-4 font-cormorant">What Our Customers Say</h2>
          <p className="text-chocolate/80 max-w-2xl mx-auto font-lora text-base sm:text-lg">
            Read testimonials from our delighted customers who experienced our exquisite cakes
          </p>
        </div>
        
        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <Card className="bg-cream border-chocolate/20 overflow-hidden shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Customer Photo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-chocolate/20">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="flex-1 text-center lg:text-left">
                  <blockquote className="relative mb-6">
                    <span className="absolute -top-4 -left-4 text-chocolate/20 text-6xl font-playfair">"</span>
                    <p className="text-chocolate font-lora text-lg sm:text-xl leading-relaxed relative z-10 pl-8">
                      {testimonials[activeIndex].quote}
                    </p>
                    <span className="absolute -bottom-8 -right-4 text-chocolate/20 text-6xl font-playfair">"</span>
                  </blockquote>
                  
                  <div className="border-t border-chocolate/20 pt-6">
                    <h3 className="text-chocolate font-bold text-xl font-cormorant mb-1">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-chocolate/70 font-dm">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-cream border border-chocolate/20 text-chocolate hover:bg-chocolate hover:text-off-white transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Indicators */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-chocolate scale-125" : "bg-chocolate/30 hover:bg-chocolate/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-cream border border-chocolate/20 text-chocolate hover:bg-chocolate hover:text-off-white transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Customer Showcase Gallery */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-chocolate mb-8 sm:mb-10 font-cormorant">
            Featured Cake Creations
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl ${index === activeIndex ? 'ring-2 ring-chocolate shadow-lg' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <img 
                    src={testimonial.cakeImage} 
                    alt={`Cake for ${testimonial.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
                    <p className="text-off-white font-bold text-lg font-cormorant mb-1">{testimonial.name}</p>
                    <p className="text-off-white/90 text-sm font-dm">{testimonial.role}</p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-off-white/80 text-xs font-lora italic">Click to read review</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
