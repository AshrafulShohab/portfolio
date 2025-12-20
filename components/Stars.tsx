import React, { useMemo } from 'react';

const Stars: React.FC = () => {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 200; i++) {
      starArray.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 5}s`,
      });
    }
    return starArray;
  }, []);

  return (
    <div
      className="absolute inset-0 ease-out"
      style={{
        // Uses CSS variables set in App.tsx
        transform: `translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * 20px))`,
        height: '300vh', /* Ensure stars cover all sections */
        willChange: 'transform',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute h-[1px] w-[1px] rounded-full bg-white animate-[twinkle_infinite_alternate]"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;