import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onScrollToHome: () => void;
  onScrollToWorks: () => void;
  onScrollToStudy: () => void;
  onScrollToContact: () => void;
  isFolded?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onScrollToHome, 
  onScrollToWorks, 
  onScrollToStudy,
  onScrollToContact,
  isFolded = false 
}) => {
  // State to track if the navbar should be temporarily expanded despite being scrolled down
  const [isTemporarilyExpanded, setIsTemporarilyExpanded] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Handle hover/interaction: expand and set a timer to auto-collapse
  const handleInteraction = () => {
    setIsTemporarilyExpanded(true);
    
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    // Auto-fold after 5 seconds of no new interactions
    timeoutRef.current = window.setTimeout(() => {
      setIsTemporarilyExpanded(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // The navbar is compact (folded) only if the global fold state is true
  // AND the user hasn't triggered the temporary expansion (hover).
  const isCompact = isFolded && !isTemporarilyExpanded;

  const linkStyles = "relative px-3 md:px-5 py-2 text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 font-medium tracking-wide flex items-center justify-center overflow-hidden rounded-full group hover:scale-110";

  return (
    <>
      <style>{`
        @keyframes nudge-right {
          0%, 100% { transform: translateX(0); opacity: 0.6; }
          50% { transform: translateX(3px); opacity: 1; }
        }
      `}</style>
      <header 
        className="fixed z-[100] transition-all duration-700 cubic-bezier(0.25, 0.1, 0.25, 1.0)"
        style={{
          top: isCompact ? '1.5rem' : '2rem',
          // If compact, anchor to top-left. Using a bit less margin on mobile for compact state
          left: isCompact ? '1.5rem' : '50%',
          // If compact, no translation needed. If expanded, center it.
          transform: isCompact ? 'none' : 'translateX(-50%)',
          // Width adapts: Auto when folded (circle), defined width when expanded
          width: isCompact ? 'auto' : '90%', // Slightly narrower on mobile
          maxWidth: isCompact ? 'none' : '48rem'
        }}
        onMouseEnter={handleInteraction}
        onClick={handleInteraction}
      >
        <div 
          className={`
            backdrop-blur-2xl border border-white/10 rounded-full flex justify-between items-center shadow-2xl shadow-black/50 transition-all duration-500 ease-in-out
            ${isCompact ? 'bg-black/60 p-1.5 pr-3' : 'bg-black/40 px-3 py-2 md:px-4 md:py-2'}
          `}
        >
          {/* Logo */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              handleInteraction(); 
              onScrollToHome();
            }} 
            className="flex items-center gap-3 group p-1.5 md:p-2 transition-transform duration-300 hover:scale-105" 
            aria-label="Go to top"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-500">
              <img src="https://i.ibb.co.com/21K40wqb/logo.png" className="w-full h-full object-contain" alt="ShowHub Logo" />
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                isCompact ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100'
              }`}
            >
              <span className="font-display text-white font-bold text-xl md:text-2xl hidden sm:block tracking-tight group-hover:text-violet-300 transition-colors whitespace-nowrap drop-shadow-lg">
                ShowHub
              </span>
            </div>

             {/* Arrow Indicator when folded */}
             <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                isCompact ? 'max-w-[20px] opacity-100 ml-1' : 'max-w-0 opacity-0'
              }`}
            >
              <svg 
                className="w-4 h-4 text-violet-400 animate-[nudge-right_1.5s_ease-in-out_infinite]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Navigation */}
          <nav 
            className={`flex items-center gap-1 md:gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
              isCompact ? 'max-w-0 opacity-0' : 'max-w-[500px] opacity-100'
            }`}
          >
            <button onClick={onScrollToHome} className={linkStyles}>
              <span className="relative z-10 whitespace-nowrap">Home</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button onClick={onScrollToWorks} className={linkStyles}>
              <span className="relative z-10 whitespace-nowrap">Work</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button onClick={onScrollToStudy} className={linkStyles}>
              <span className="relative z-10 whitespace-nowrap">Study</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={onScrollToContact} 
              className="ml-1 md:ml-2 px-4 md:px-6 py-2 md:py-2.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 hover:text-white hover:scale-105 transition-all duration-500 active:scale-95 shadow-lg shadow-white/5 hover:shadow-violet-500/30 whitespace-nowrap"
            >
              Hire Me
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;