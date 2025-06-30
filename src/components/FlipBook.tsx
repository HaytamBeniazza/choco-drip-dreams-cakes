import { useState } from "react";
import { ChevronLeft, ChevronRight, X, BookOpen } from "lucide-react";

interface FlipBookPage {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  type: 'recipe' | 'process' | 'story' | 'gallery';
  backgroundColor: string;
  textColor: string;
}

const flipBookPages: FlipBookPage[] = [
  {
    id: 1,
    title: "The Perfect Chocolate Selection",
    subtitle: "Where It All Begins",
    content: "We source the finest Belgian chocolate, ensuring each cake starts with premium cocoa beans. Our chocolate selection process involves tasting over 50 varieties to find the perfect balance of richness and smoothness.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2065&auto=format&fit=crop",
    type: "story",
    backgroundColor: "#FAF8F7",
    textColor: "#3A2618"
  },
  {
    id: 2,
    title: "Secret Batter Recipe",
    subtitle: "Our Family's Legacy",
    content: "Passed down through three generations, our signature batter combines organic flour, farm-fresh eggs, and pure vanilla. The secret lies in the precise temperature control and the gentle folding technique that creates our signature fluffy texture.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2065&auto=format&fit=crop",
    type: "recipe",
    backgroundColor: "#FFFCF9",
    textColor: "#3A2618"
  },
  {
    id: 3,
    title: "The Art of Ganache",
    subtitle: "Silky Smooth Perfection",
    content: "Our ganache is made fresh daily using a 2:1 ratio of premium chocolate to heavy cream. The temperature is crucial - heated to exactly 185°F and slowly incorporated to create that mirror-like finish you see on our cakes.",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2070&auto=format&fit=crop",
    type: "process",
    backgroundColor: "#FAF8F7",
    textColor: "#3A2618"
  },
  {
    id: 4,
    title: "Mastering the Drip",
    subtitle: "Our Signature Touch",
    content: "The chocolate drip technique requires perfect timing. We let the ganache cool to exactly 90°F before applying. Each drip is carefully placed by hand, creating that elegant cascade effect that makes our cakes instantly recognizable.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2073&auto=format&fit=crop",
    type: "process",
    backgroundColor: "#FFFCF9",
    textColor: "#3A2618"
  },
  {
    id: 5,
    title: "Decorative Artistry",
    subtitle: "Where Creativity Meets Skill",
    content: "Each cake is a canvas for our pastry artists. From hand-piped rosettes to delicate sugar work, every decoration is crafted with precision. We use only edible gold leaf, fresh flowers, and natural food coloring.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2050&auto=format&fit=crop",
    type: "gallery",
    backgroundColor: "#FAF8F7",
    textColor: "#3A2618"
  },
  {
    id: 6,
    title: "The Final Touch",
    subtitle: "Ready to Delight",
    content: "Before delivery, each cake undergoes a final quality check. We ensure the drip is set, decorations are secure, and the cake is at the perfect temperature. Every cake is a masterpiece ready to create lasting memories.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
    type: "story",
    backgroundColor: "#FFFCF9",
    textColor: "#3A2618"
  }
];

const FlipBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    setTimeout(() => {
      if (direction === 'next' && currentPage < flipBookPages.length - 1) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === 'prev' && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
      
      setTimeout(() => {
        setIsFlipping(false);
      }, 150);
    }, 400);
  };

  const handleDotClick = (pageIndex: number) => {
    if (isFlipping || pageIndex === currentPage) return;
    
    const direction = pageIndex > currentPage ? 'next' : 'prev';
    setIsFlipping(true);
    setFlipDirection(direction);

    setTimeout(() => {
      setCurrentPage(pageIndex);
      setTimeout(() => {
        setIsFlipping(false);
      }, 150);
    }, 400);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const currentPageData = flipBookPages[currentPage];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-cream via-off-white to-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233A2618' fill-opacity='0.1'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,1 80,0a40,40 0 1,1 -80,0'/%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate mb-4 font-cormorant">
            Behind the Scenes
          </h2>
          <p className="text-chocolate/80 max-w-3xl mx-auto font-lora text-base sm:text-lg leading-relaxed">
            Discover the artistry and passion behind every chocolate drip cake. Follow our step-by-step journey from selecting the finest ingredients to creating edible masterpieces.
          </p>
        </div>

        {/* 3D Book Preview */}
        <div className="max-w-2xl mx-auto">
          <div className="relative perspective-book" style={{ perspective: '1000px' }}>
            {/* Book Container */}
            <div 
              className="relative transform-gpu hover:rotate-y-12 transition-all duration-700 cursor-pointer group"
              onClick={openFullscreen}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Book Shadow */}
              <div className="absolute inset-0 bg-chocolate/30 rounded-r-lg transform translate-x-2 translate-y-4 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Book Cover */}
              <div className="relative bg-gradient-to-br from-chocolate via-chocolate-dark to-chocolate-light rounded-r-lg shadow-2xl border-l-8 border-chocolate-dark transform-gpu transition-all duration-500 group-hover:shadow-3xl">
                {/* Book Spine */}
                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-b from-chocolate-light via-chocolate to-chocolate-dark rounded-l-lg border-r border-chocolate-light/30"></div>
                
                {/* Cover Content */}
                <div className="relative p-8 lg:p-12 min-h-[400px] lg:min-h-[500px] flex flex-col justify-between">
                  {/* Title */}
                  <div className="text-center">
                    <div className="mb-6">
                      <BookOpen className="w-16 h-16 mx-auto text-cream/80 mb-4" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-cream mb-4 font-cormorant leading-tight">
                      The Art of<br />Chocolate Drip Cakes
                    </h3>
                    <p className="text-cream/80 font-lora text-sm lg:text-base">
                      A Master Class in Cake Creation
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center items-center gap-4">
                      <div className="w-8 h-px bg-cream/30"></div>
                      <div className="w-2 h-2 bg-cream/50 rounded-full"></div>
                      <div className="w-8 h-px bg-cream/30"></div>
                    </div>
                    
                    {/* Chapter Count */}
                    <p className="text-cream/60 text-xs font-dm">
                      {flipBookPages.length} Chapters • Behind the Scenes
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-cream/20 backdrop-blur-sm rounded-full border border-cream/30 text-cream text-sm font-dm group-hover:bg-cream/30 transition-colors duration-300">
                      <BookOpen size={16} />
                      <span>Click to Open</span>
                    </div>
                  </div>
                </div>

                {/* Cover Gloss Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-r-lg pointer-events-none"></div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-amber-200 via-transparent to-transparent rounded-r-lg transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Book Pages Effect */}
              <div className="absolute top-1 right-1 w-full h-full bg-off-white rounded-r-lg transform translate-x-1 -z-10 border border-chocolate/20"></div>
              <div className="absolute top-2 right-2 w-full h-full bg-cream rounded-r-lg transform translate-x-2 -z-20 border border-chocolate/10"></div>
            </div>
          </div>

          {/* Preview Text */}
          <div className="text-center mt-8">
            <p className="text-chocolate/70 font-lora text-sm">
              Click the book to explore our complete cake-making process
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Flip Book Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-60 p-3 bg-chocolate/80 hover:bg-chocolate text-off-white rounded-full transition-colors duration-300 backdrop-blur-sm"
            aria-label="Close book"
          >
            <X size={24} />
          </button>

          {/* Fullscreen Book Container */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative flip-container" style={{ perspective: '1200px' }}>
              {/* Book Shadow */}
              <div className="absolute inset-0 bg-chocolate/20 rounded-2xl transform translate-x-2 translate-y-2 blur-sm"></div>
              
              {/* Main Book */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-chocolate/10">
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-chocolate/20 to-transparent z-10"></div>
                
                {/* Page Content Container */}
                <div className="relative min-h-[70vh]" style={{ perspective: '1200px' }}>
                  {/* Current Page */}
                  <div 
                    className={`absolute inset-0 flip-page transition-all duration-700 ease-in-out ${
                      isFlipping 
                        ? flipDirection === 'next' 
                          ? 'transform -rotate-y-180' 
                          : 'transform rotate-y-180'
                        : 'transform rotate-y-0'
                    }`}
                    style={{ 
                      backgroundColor: currentPageData.backgroundColor,
                      transformStyle: 'preserve-3d',
                      transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                      {/* Left Side - Image */}
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 to-transparent z-10"></div>
                        <img 
                          src={currentPageData.image} 
                          alt={currentPageData.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Page Type Badge */}
                        <div className="absolute top-6 left-6 z-20">
                          <span className={`px-4 py-2 rounded-full text-xs font-dm font-medium shadow-lg ${
                            currentPageData.type === 'recipe' ? 'bg-amber-100 text-amber-800' :
                            currentPageData.type === 'process' ? 'bg-blue-100 text-blue-800' :
                            currentPageData.type === 'story' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {currentPageData.type.charAt(0).toUpperCase() + currentPageData.type.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="space-y-6">
                          {/* Page Number */}
                          <div className="text-chocolate/40 font-dm text-sm font-medium">
                            Chapter {currentPage + 1} of {flipBookPages.length}
                          </div>

                          {/* Title */}
                          <div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mb-2 font-cormorant leading-tight">
                              {currentPageData.title}
                            </h3>
                            <p className="text-chocolate/70 font-dm text-sm sm:text-base font-medium">
                              {currentPageData.subtitle}
                            </p>
                          </div>

                          {/* Content */}
                          <p className="text-chocolate/80 font-lora text-base sm:text-lg leading-relaxed">
                            {currentPageData.content}
                          </p>

                          {/* Decorative Element */}
                          <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-px bg-chocolate/30"></div>
                            <div className="w-2 h-2 bg-chocolate/40 rounded-full"></div>
                            <div className="w-8 h-px bg-chocolate/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Page Back (visible during flip) */}
                    <div 
                      className="absolute inset-0 transform rotate-y-180 bg-gray-100"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                          </div>
                          <p className="font-lora text-sm">Turning page...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page turn effect overlay */}
                  {isFlipping && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ${
                          flipDirection === 'next' 
                            ? 'transform translate-x-full animate-page-sweep-right' 
                            : 'transform -translate-x-full animate-page-sweep-left'
                        }`}
                        style={{
                          background: flipDirection === 'next' 
                            ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                            : 'linear-gradient(-90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
                <button
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 0 || isFlipping}
                  className={`p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 ${
                    currentPage === 0 || isFlipping
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-chocolate text-off-white hover:bg-chocolate-dark hover:shadow-2xl hover:scale-110 active:scale-95'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
                <button
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === flipBookPages.length - 1 || isFlipping}
                  className={`p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 ${
                    currentPage === flipBookPages.length - 1 || isFlipping
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-chocolate text-off-white hover:bg-chocolate-dark hover:shadow-2xl hover:scale-110 active:scale-95'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8 sm:mt-12">
              {flipBookPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isFlipping}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentPage
                      ? 'w-8 h-3 bg-off-white shadow-lg'
                      : 'w-3 h-3 bg-off-white/30 hover:bg-off-white/50'
                  } ${isFlipping ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="w-full bg-off-white/10 rounded-full h-1">
                <div 
                  className="bg-off-white h-1 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentPage + 1) / flipBookPages.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-center text-off-white/60 text-sm font-dm mt-2">
                {currentPage + 1} of {flipBookPages.length} chapters
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlipBook; 