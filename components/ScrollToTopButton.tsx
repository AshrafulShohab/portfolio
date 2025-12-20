
import React from 'react';

interface ScrollToTopButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ onClick, visible }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full text-white transition-all duration-300 ease-in-out backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
