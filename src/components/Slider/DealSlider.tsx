import { useState, useEffect } from 'react';
import DealCard from '../Card/DealCard';

const DealSlider = ({ destinations }: { destinations: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // Number of cards visible at once - responsive
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1280) return 4; // xl
      if (window.innerWidth > 768) return 2; // md
      return 1; // mobile
    }
    return 4; // default for SSR
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  // Update cards per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(destinations.length / cardsPerView);

  // Get visible destinations based on current index
  const getVisibleDestinations = () => {
    const startIndex = (currentIndex * cardsPerView) % destinations.length;
    const visibleDestinations = [];

    for (let i = 0; i < cardsPerView; i++) {
      const idx = (startIndex + i) % destinations.length;
      visibleDestinations.push(destinations[idx]);
    }

    return visibleDestinations;
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: any) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    if (isAnimating) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      goToNextSlide();
    } else if (diff < -50) {
      goToPrevSlide();
    }
  };

  return (
    <div className='vacation-slider-container relative w-full'>
      {/* Slider content */}
      <div
        className='slider-content'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className={`grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-4`}
        >
          {getVisibleDestinations().map((destination, index) => (
            <DealCard key={index} {...destination} />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className='mt-8 mb-4 flex items-center justify-center gap-3'>
        <button
          onClick={goToPrevSlide}
          className='bg-background-white hover:bg-gray-100 dark:hover:bg-gray-800 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#999999]/50 transition-all duration-300 focus:outline-none'
          disabled={isAnimating}
          aria-label='Previous destinations'
        >
          <img
            className='h-2 w-2'
            src='/assets/arrow-gray.svg'
            alt='Previous'
          />
        </button>
        <button
          onClick={goToNextSlide}
          className='bg-emerald-600 hover:bg-emerald-700 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-300 focus:outline-none'
          disabled={isAnimating}
          aria-label='Next destinations'
        >
          <img className='h-2 w-2' src='/assets/arrow-white.svg' alt='Next' />
        </button>
      </div>
    </div>
  );
};

export default DealSlider;
