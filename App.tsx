import React, { useState, useRef, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Stars from './components/Stars';
import ForegroundBlobs from './components/ForegroundBlobs';
import GallerySection from './components/GallerySection';
import ContactSection, { ContactSectionHandle } from './components/ContactSection';
import StudyResourcesSection from './components/StudyResourcesSection';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import LightPillar from './components/LightPillar';

function useRevealOnScroll() {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [elements]);

  return (node: HTMLElement | null) => {
    if (node && !elements.includes(node)) {
      setElements((prev) => [...prev, node]);
    }
  };
}

function App() {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [isNavbarFolded, setIsNavbarFolded] = useState(false);
  
  // Refs for direct DOM manipulation to avoid re-renders
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  
  // View State Management
  const [currentView, setCurrentView] = useState<'home' | 'study'>('home');
  const [targetSection, setTargetSection] = useState<'home' | 'works' | 'contact' | null>(null);
  
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const studyRef = useRef<HTMLElement>(null);
  
  // Ref for ContactSection Handle (Scroll + Logic)
  const contactRef = useRef<ContactSectionHandle>(null);
  
  const revealRef = useRevealOnScroll();

  // Fix for mobile scroll issue: Force scroll to top on mount
  useEffect(() => {
    // Disable default browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTop = 0;
      }
    };

    // Immediate reset
    resetScroll();

    // Delayed reset to handle layout settling or browser paint timing
    const timer = setTimeout(resetScroll, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Optimized mouse handler using Request Animation Frame logic implicitly via direct DOM updates
    // and CSS variables for smooth compositor-driven animations.
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // 1. Update Cursor Positions Directly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorOutlineRef.current) {
         // We use style.left/top for position to separate it from the scale transform which is handled by class
         cursorOutlineRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`;
      }

      // 2. Update CSS Variables for Parallax (Stars, Blobs)
      // This allows children components to animate without React re-renders.
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      document.documentElement.style.setProperty('--mouse-x', x.toFixed(4));
      document.documentElement.style.setProperty('--mouse-y', y.toFixed(4));
      
      // 3. Hover Detection
      // Check target infrequently or relies on event bubbling, React state update only on change.
      const target = e.target as HTMLElement;
      const hovering = !!target.closest('button, a, .pc-card, .logoloop__item');
      setIsHovering(prev => prev === hovering ? prev : hovering);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isHovering]); // Dependency on isHovering to update the cursor transform string correctly

  // Handle scrolling to specific sections after view change
  useEffect(() => {
    if (currentView === 'home' && targetSection) {
       // Small timeout to allow DOM to render
       const timer = setTimeout(() => {
         if (targetSection === 'home') homeRef.current?.scrollIntoView({ behavior: 'smooth' });
         if (targetSection === 'works') galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
         
         if (targetSection === 'contact') {
             contactRef.current?.scrollIntoView({ behavior: 'smooth' });
             // Trigger focus animation if coming from navigation
             setTimeout(() => {
                 contactRef.current?.triggerFormFocus();
             }, 800);
         }
         setTargetSection(null);
       }, 100);
       return () => clearTimeout(timer);
    } else if (currentView === 'study') {
       if (mainContainerRef.current) mainContainerRef.current.scrollTop = 0;
    }
  }, [currentView, targetSection]);

  const handleScroll = () => {
    if (mainContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = mainContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
      
      // Show scroll to top button after 50% of screen height
      setIsScrollButtonVisible(scrollTop > window.innerHeight / 2);
      
      // Fold navbar after 100px of scrolling
      setIsNavbarFolded(scrollTop > 100);
    }
  };

  // Navigation Handlers
  const navigateToHome = () => {
    if (currentView === 'study') {
      setCurrentView('home');
      setTargetSection('home');
    } else {
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToWorks = () => {
    if (currentView === 'study') {
      setCurrentView('home');
      setTargetSection('works');
    } else {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToContact = () => {
    if (currentView === 'study') {
      setCurrentView('home');
      setTargetSection('contact');
    } else {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Trigger "Creative" Focus Effect
      setTimeout(() => {
          contactRef.current?.triggerFormFocus();
      }, 500);
    }
  };

  const navigateToStudy = () => {
    if (currentView !== 'study') {
      setCurrentView('study');
    }
  };

  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden bg-black ${isHovering ? 'cursor-hover' : ''}`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorDotRef}
        className="cursor-dot hidden md:block" 
        style={{ transform: 'translate(-50%, -50%)' }} // Initial state
      />
      <div 
        ref={cursorOutlineRef}
        className="cursor-outline hidden md:block" 
        style={{ transform: 'translate(-50%, -50%)' }} // Initial state
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 z-[100] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <Navbar 
        onScrollToHome={navigateToHome}
        onScrollToWorks={navigateToWorks}
        onScrollToStudy={navigateToStudy}
        onScrollToContact={navigateToContact}
        isFolded={isNavbarFolded}
      />

      <div
        ref={mainContainerRef}
        onScroll={handleScroll}
        // Disable scroll snap for the Study page to allow natural scrolling of long content
        className={`relative w-full h-full overflow-x-hidden ${currentView === 'home' ? 'snap-container' : 'overflow-y-auto'}`}
      >
        <div className="fixed inset-0 pointer-events-none">
          {/* Layer 0: Light Pillar */}
          <div className="absolute inset-0 z-0">
             <LightPillar
                topColor="#5227FF"
                bottomColor="#FF9FFC"
                intensity={0.9}
                rotationSpeed={0.3}
                glowAmount={0.005}
                pillarWidth={3.0}
                pillarHeight={0.4}
                noiseIntensity={0.5}
                pillarRotation={0}
                interactive={true}
                mixBlendMode="normal"
              />
          </div>
          
          {/* Layer 1: Overlay for contrast */}
          <div className="absolute inset-0 z-[1] bg-black/40" />

          {/* Layer 2: Stars */}
          <div className="absolute inset-0 z-[2]">
            <Stars />
          </div>

          {/* Layer 3: Background Blobs */}
          <div className="absolute inset-0 z-[3]">
             <AnimatedBackground />
          </div>
        </div>

        {/* Foreground Blobs moved here so they scroll with the content */}
        <ForegroundBlobs />

        {currentView === 'home' ? (
          <>
            <main ref={homeRef} className="snap-section relative z-10 flex flex-col items-center justify-center text-center p-6 px-4">
              <div className="w-full">
                <span ref={revealRef} className="reveal block font-tech text-violet-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-4 md:mb-6 drop-shadow-md">
                  Digital Experience Studio
                </span>
                <h1 ref={revealRef} className="reveal delay-150 font-display text-[9vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-[0.95] md:leading-[0.9] text-white drop-shadow-lg">
                  Breathtaking <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-pink-400 drop-shadow-sm">Digital Works.</span>
                </h1>
                <p ref={revealRef} className="reveal delay-300 mt-6 md:mt-8 text-sm md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                  Crafting immersive experiences where cutting-edge technology meets artistic precision.
                </p>
                <div ref={revealRef} className="reveal delay-500 mt-10 md:mt-12">
                  <button 
                    onClick={navigateToWorks}
                    className="group relative px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-violet-900/20"
                  >
                    <div className="absolute inset-0 bg-white group-hover:bg-violet-500 transition-colors duration-500" />
                    <span className="relative text-black group-hover:text-white font-bold text-base md:text-lg flex items-center gap-2">
                      Explore Showcases
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </main>

            <GallerySection ref={galleryRef} onScrollToContact={navigateToContact} revealRef={revealRef} />
            
            <ContactSection 
              ref={contactRef} 
              onScrollToHome={navigateToHome}
              onScrollToWorks={navigateToWorks}
              revealRef={revealRef}
            />
          </>
        ) : (
          <StudyResourcesSection ref={studyRef} revealRef={revealRef} />
        )}
      </div>

      <ScrollToTopButton onClick={navigateToHome} visible={isScrollButtonVisible} />
    </div>
  );
}

export default App;
