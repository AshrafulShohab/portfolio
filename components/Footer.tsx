import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full z-50 p-6 mt-auto backdrop-blur-lg bg-black/20 border-t border-white/10">
      <div className="container mx-auto text-center">
        <p className="font-tech text-base tracking-wider text-white/90">
          ShowHub &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm text-white/60 mt-1">
          Designed by <b>Ashraful Shohab</b> 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
