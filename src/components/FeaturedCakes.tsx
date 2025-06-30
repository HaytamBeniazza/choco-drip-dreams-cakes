import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import ImageManipulator from "./ImageManipulator";

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
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Gold Luxe Drip",
    description: "Chocolate cake with gold-dusted chocolate drip edge",
    price: "$69.99",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop"
  }
];

const FeaturedCakes = () => {
  const handleAddToCart = (cake: CakeItem) => {
    // Dispatch custom event for cart management
    const cartEvent = new CustomEvent('addToCart', {
      detail: {
        id: cake.id,
        name: cake.name,
        price: parseFloat(cake.price.replace('$', '')),
        image: cake.image
      }
    });
    window.dispatchEvent(cartEvent);

    // Show success feedback
    const button = document.querySelector(`[data-cake-id="${cake.id}"]`) as HTMLButtonElement;
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '✓ Added!';
      button.disabled = true;
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
      }, 1500);
    }
  };

  return (
    <section id="featured" className="py-16 sm:py-20 bg-[#FAF8F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate mb-4 font-cormorant">Our Featured Cakes</h2>
          <p className="text-chocolate/80 max-w-2xl mx-auto font-lora text-base sm:text-lg">
            Each cake is carefully crafted with premium ingredients and finished with our signature chocolate drip
          </p>
        </div>
        
        {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cakes.map((cake) => (
            <div key={cake.id} className="fade-in-delay-1 opacity-0 animate-fade-in">
              <Card className="bg-[#FFFCF9] border-chocolate/20 overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Image container with consistent height */}
                <div className="h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <ImageManipulator
                    imageUrl={cake.image}
                    width={400}
                    height={256}
                    effect="ripple"
                  />
                </div>
                <CardContent className="pt-4 sm:pt-6 pb-2 flex-grow px-4 sm:px-6">
                  <h3 className="text-lg sm:text-xl font-bold text-chocolate mb-2 font-cormorant leading-tight">{cake.name}</h3>
                  <p className="text-chocolate/80 mb-2 font-lora text-sm sm:text-base leading-relaxed">{cake.description}</p>
                  <p className="text-chocolate font-bold text-lg sm:text-xl font-dm">{cake.price}</p>
                </CardContent>
                <CardFooter className="pt-2 pb-4 sm:pb-6 px-4 sm:px-6">
                  <Button 
                    data-cake-id={cake.id}
                    onClick={() => handleAddToCart(cake)}
                    className="w-full bg-chocolate text-[#FAF8F7] hover:bg-chocolate/90 flex items-center justify-center gap-2 font-dm text-sm sm:text-base py-2.5 sm:py-3 transition-all duration-300"
                  >
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
