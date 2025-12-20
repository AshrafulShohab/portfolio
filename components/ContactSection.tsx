import React, { useState, useImperativeHandle, useRef } from 'react';
import Footer from './Footer';
import ProfileCard from './ProfileCard';
import ContactForm from './ContactForm';

interface ContactSectionProps {
  onScrollToHome: () => void;
  onScrollToWorks: () => void;
  revealRef: (node: HTMLElement | null) => void;
}

export interface ContactSectionHandle {
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
  triggerFormFocus: () => void;
}

const ContactSection = React.forwardRef<ContactSectionHandle, ContactSectionProps>(({ onScrollToHome, onScrollToWorks, revealRef }, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focusTrigger, setFocusTrigger] = useState(0);

  // Expose methods to parent (App.tsx)
  useImperativeHandle(ref, () => ({
    scrollIntoView: (options) => {
      sectionRef.current?.scrollIntoView(options);
    },
    triggerFormFocus: () => {
      setFocusTrigger(prev => prev + 1);
    }
  }));

  const handleHireMeClick = () => {
    // Focus the form when "Hire Me" is clicked on the Profile Card
    setFocusTrigger(prev => prev + 1);
  };

  return (
    <section ref={sectionRef} className="snap-section relative z-10 w-full flex flex-col min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
          <div ref={revealRef} className="reveal text-center lg:text-left">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6 drop-shadow-lg text-white">
              Let's craft your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500 drop-shadow-sm">next masterpiece.</span>
            </h2>
            <p className="text-gray-200 text-base md:text-xl font-light max-w-md mx-auto lg:mx-0 drop-shadow-md">
              Available for full-time roles and high-impact freelance projects. Let's build something unforgettable.
            </p>
          </div>

          <div ref={revealRef} className="reveal delay-300">
            <ContactForm focusTrigger={focusTrigger} />
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
           <div ref={revealRef} className="reveal delay-500 w-full max-w-[300px] md:max-w-sm">
              <ProfileCard 
                avatarUrl="https://i.ibb.co.com/dsd9VnTH/profile.png"
                name="Ashraful Shohab"
                title="Designer, Teacher, Observer"
                handle="shohab_design"
                status="Available for Projects"
                behindGlowColor="rgba(139, 92, 246, 0.4)"
                className="scale-100" // Handled by media queries in CSS mostly, keeping default scale 100
                onContactClick={handleHireMeClick}
              />
           </div>
        </div>
      </div>
      <Footer />
    </section>
  );
});

export default ContactSection;