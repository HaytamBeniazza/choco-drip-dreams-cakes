
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    quote: "The chocolate drip cake was the centerpiece of our wedding. Not only was it stunning to look at, but the taste was absolutely divine. Our guests are still talking about it!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Birthday Celebration",
    quote: "I ordered a cake for my wife's 40th birthday and was blown away by the attention to detail. The gold-dusted chocolate drip was elegant and the cake itself was incredibly moist and delicious.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Alicia Rodriguez",
    role: "Corporate Event",
    quote: "Our company anniversary celebration needed something special, and ChocoDrip delivered beyond expectations. The customized logo on the cake was perfect, and everyone raved about the taste.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-chocolate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">What Our Customers Say</h2>
          <p className="text-cream/80 max-w-2xl mx-auto">
            We take pride in creating memorable cake experiences for all occasions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className={`glass-card fade-in-delay-${index + 1} opacity-0 animate-fade-in`}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-cream italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="text-gold font-bold">{testimonial.name}</p>
                  <p className="text-cream/70 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
