import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 ease-out opacity-60 pointer-events-none"
      style={{
        // Use CSS variables updated by App.tsx for parallax
        transform: `translate(calc(var(--mouse-x, 0) * 60px), calc(var(--mouse-y, 0) * 40px)) scale(1.1)`,
        willChange: 'transform',
        transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)' 
      }}
    >
      {/* Huge mesh gradient style blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-600/30 rounded-full blur-[120px] animate-[float_20s_infinite_ease-in-out]" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[140px] animate-[float_25s_infinite_ease-in-out_reverse]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[40vw] bg-indigo-900/40 rounded-full blur-[160px] animate-[float_30s_infinite_ease-in-out]" />
      
      {/* Subtle shifting lights */}
      <div className="absolute top-[20%] left-[40%] w-[20vw] h-[20vw] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[30%] right-[30%] w-[25vw] h-[25vw] bg-violet-400/10 rounded-full blur-[100px] animate-pulse delay-700" />
    </div>
  );
};

export default AnimatedBackground;