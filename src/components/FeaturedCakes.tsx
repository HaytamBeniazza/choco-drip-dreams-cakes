
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CakeItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const cakes: CakeItem[] = [
  {
    id: 1,
    name: "Classic Chocolate Drip",
    description: "Rich chocolate cake with smooth ganache drip",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Caramel Delight",
    description: "Vanilla cake with caramel drizzle and chocolate drip",
    price: "$54.99",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2650&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Berry Chocolate Dream",
    description: "Fresh berries topped with elegant chocolate drip",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1565958011355-01923f16a25d?q=80&w=2565&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Gold Luxe Drip",
    description: "Chocolate cake with gold-dusted chocolate drip edge",
    price: "$69.99",
    image: "https://images.unsplash.com/photo-1609355109553-3bb6b06f5e4b?q=80&w=2376&auto=format&fit=crop"
  }
];

const FeaturedCakes = () => {
  return (
    <section id="featured" className="py-20 bg-chocolate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Our Featured Cakes</h2>
          <p className="text-cream/80 max-w-2xl mx-auto">
            Each cake is carefully crafted with premium ingredients and finished with our signature chocolate drip
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <div key={cake.id} className="fade-in-delay-1 opacity-0 animate-fade-in">
              <Card className="glass-card overflow-hidden h-full flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={cake.image} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="pt-6 pb-2 flex-grow">
                  <h3 className="text-xl font-bold text-gold mb-2">{cake.name}</h3>
                  <p className="text-cream/80 mb-2">{cake.description}</p>
                  <p className="text-gold font-bold text-lg">{cake.price}</p>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button className="w-full button-gold flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
