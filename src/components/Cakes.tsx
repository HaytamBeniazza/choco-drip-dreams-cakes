import { useState } from 'react';

const Cakes = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'fruit', name: 'Fruit' },
    { id: 'special', name: 'Special Occasions' },
  ];

  const cakes = [
    {
      id: 1,
      name: 'Chocolate Drip Delight',
      category: 'chocolate',
      description: 'Rich chocolate cake with smooth ganache drip and fresh berries',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    },
    {
      id: 2,
      name: 'Berry Bliss',
      category: 'fruit',
      description: 'Vanilla cake with fresh berries and whipped cream',
      price: '$50',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    },
    {
      id: 3,
      name: 'Wedding Wonder',
      category: 'special',
      description: 'Elegant three-tier wedding cake with delicate floral details',
      price: '$200',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    },
    {
      id: 4,
      name: 'Chocolate Raspberry Dream',
      category: 'chocolate',
      description: 'Decadent chocolate cake with raspberry filling and chocolate ganache',
      price: '$55',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    },
    {
      id: 5,
      name: 'Tropical Paradise',
      category: 'fruit',
      description: 'Coconut cake with mango and passion fruit filling',
      price: '$48',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    },
    {
      id: 6,
      name: 'Anniversary Elegance',
      category: 'special',
      description: 'Two-tier celebration cake with gold leaf accents',
      price: '$180',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80'
    }
  ];

  const filteredCakes = activeCategory === 'all' 
    ? cakes 
    : cakes.filter(cake => cake.category === activeCategory);

  const handleAddToCart = (cake: typeof cakes[0]) => {
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
    const button = document.querySelector(`[data-cake-id="collection-${cake.id}"]`) as HTMLButtonElement;
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
    <section id="cakes" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cormorant font-bold text-chocolate mb-4">
            Our Cake Collection
          </h2>
          <p className="text-lg font-lora text-chocolate/80 max-w-2xl mx-auto">
            Indulge in our exquisite selection of handcrafted cakes, each made with the finest ingredients and a touch of love.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-dm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-chocolate text-off-white'
                  : 'bg-chocolate/10 text-chocolate hover:bg-chocolate/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Cake Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCakes.map(cake => (
            <div key={cake.id} className="bg-cream rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9 bg-chocolate/10">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-cormorant font-bold text-chocolate mb-2">
                  {cake.name}
                </h3>
                <p className="text-chocolate/80 font-lora mb-4">
                  {cake.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-chocolate font-dm font-medium">
                    {cake.price}
                  </span>
                  <button
                    data-cake-id={`collection-${cake.id}`}
                    onClick={() => handleAddToCart(cake)}
                    className="px-4 py-2 bg-chocolate text-off-white rounded-full font-dm hover:bg-chocolate-dark transition-colors duration-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cakes; 