import React, { useState, useEffect, useCallback } from 'react';

const galleryData = {
  'Graphics': [
    { url: 'https://i.ibb.co.com/QwGN3dS/slide1.png', caption: 'ShowHub Logo' },
    { url: 'https://i.ibb.co.com/CKNHdK35/slide3.png', caption: 'Rangers BD Logo' },
    { url: 'https://i.ibb.co.com/ZzdQPFtX/slide2.png', caption: 'Glocalfly Logo' },
    { url: 'https://i.ibb.co.com/4qfqRnB/final-f.jpg', caption: 'Farjana Bake and Cook House Logo' },
  ],
  'Products': [
    { url: 'https://i.ibb.co.com/G4HcnL6j/slide10.png', caption: 'LR Joursey Design' },
    { url: 'https://i.ibb.co.com/rG4Rwwmn/Eid-Ul-Adha-t-shirt-final.jpg', caption: 'Eid UL Adha T-shirt Design' },
    { url: 'https://i.ibb.co.com/HDVqcQkb/mugdho1.jpg', caption: 'Mir Mugdho Bottle Design' },
    { url: 'https://i.ibb.co.com/W4v4yBBb/slide8.png', caption: 'Product Packet Design 1' },
    { url: 'https://i.ibb.co.com/ddHMV2v/slide7.png', caption: 'Product Packet Design 2' },
  ],
  'Others': [
      { url: 'https://i.ibb.co.com/PGCCgypd/slide4.png', caption: 'Cover Poster' },
      { url: 'https://i.ibb.co.com/gbjrj6wQ/Untitled-1-01.png', caption: 'Student ID card' },
      { url: 'https://i.ibb.co.com/23wp9XxZ/invitation-card-3rd-01.png', caption: 'Invitation Card' },
  ]
};

interface GallerySectionProps {
  onScrollToContact: () => void;
  revealRef: (node: HTMLElement | null) => void;
}

const GallerySection = React.forwardRef<HTMLElement, GallerySectionProps>(({ onScrollToContact, revealRef }, ref) => {
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(galleryData)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const slides = galleryData[activeCategory as keyof typeof galleryData] || [];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const offset = index - currentIndex;
    const distance = Math.abs(offset);
    const direction = Math.sign(offset);

    if (distance > 2) return { opacity: 0, pointerEvents: 'none' };
    
    // Adjusted parameters for mobile
    const scale = 1 - distance * (isMobile ? 0.1 : 0.15);
    const opacity = 1 - distance * 0.3;
    const zIndex = slides.length - distance;
    // Tighter spacing on mobile
    const translateX = direction * (isMobile ? 20 : 35); 
    const rotateY = -direction * (isMobile ? 25 : 40);

    return {
      transform: `rotateY(${rotateY}deg) translateX(${translateX}%) translateZ(${-distance * (isMobile ? 200 : 300)}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${distance * 4}px) brightness(${1 - distance * 0.3})`,
      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      pointerEvents: distance === 0 ? 'auto' : 'none',
    };
  };

  return (
    <section ref={ref} className="snap-section relative z-10 w-full flex flex-col items-center justify-center overflow-hidden py-10">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <h2 ref={revealRef} className="reveal font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter text-center drop-shadow-lg">
          Selected Artifacts
        </h2>
        <p ref={revealRef} className="reveal delay-150 text-gray-200 mb-8 md:mb-10 text-center max-w-xl text-sm md:text-base drop-shadow-md">
          A glimpse into high-performance visual solutions crafted for digital excellence.
        </p>

        {/* Category Tabs */}
        <div ref={revealRef} className="reveal delay-300 flex flex-wrap justify-center gap-2 bg-white/5 border border-white/10 rounded-3xl p-1.5 mb-10 md:mb-16 backdrop-blur-xl shadow-lg">
          {Object.keys(galleryData).map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
              className={`px-4 md:px-8 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat ? 'bg-white text-black shadow-lg' : 'text-gray-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Slider */}
        <div className="relative w-full h-[50vh] md:h-[55vh] flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {slides.map((slide, index) => (
              <div
                key={`${activeCategory}-${index}`}
                className="absolute w-[80%] md:w-[60%] lg:w-[45%] h-[80%] md:h-full cursor-pointer group"
                style={getSlideStyle(index)}
                onClick={() => index === currentIndex && setFullscreenImage(slide.url)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                   <img src={slide.url} alt={slide.caption} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-8">
                      <p className="text-white font-bold text-xl md:text-2xl tracking-tighter">{slide.caption}</p>
                      <p className="text-gray-400 text-xs md:text-sm">View Project</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-20 pointer-events-none">
            <button onClick={prevSlide} className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      
      {fullscreenImage && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl cursor-zoom-out" onClick={() => setFullscreenImage(null)}>
          <img src={fullscreenImage} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-[reveal-up_0.4s_ease-out]" />
        </div>
      )}
    </section>
  );
});

export default GallerySection;