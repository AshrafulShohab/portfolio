import React, { useState, useEffect, useRef } from 'react';

// Icons (Simple SVG paths)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

// Social Icons
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.696v1.275h4.508l-.54 3.667h-3.968v7.98H9.101Z" />
  </svg>
);

const XIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);

const WhatsAppIcon = () => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
);

interface FormInputProps {
  type?: string;
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  icon?: React.ReactNode;
  inputRef?: React.RefObject<any>;
}

const FormInput: React.FC<FormInputProps> = ({ type = "text", name, label, rows, required, icon, inputRef }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full h-full group">
       {/* Input Background with Inset Look */}
       <div className={`
         relative w-full h-full bg-[#0F0F0F] rounded-2xl border border-white/5
         shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.03)]
         transition-all duration-300
         ${focused ? 'border-white/10 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.9),inset_-1px_-1px_2px_rgba(255,255,255,0.08)]' : ''}
       `}>
          
          {/* Icon */}
          <div className={`absolute left-5 top-5 md:top-1/2 md:-translate-y-1/2 text-gray-500 transition-colors duration-300 pointer-events-none ${focused ? 'text-emerald-400' : ''} ${rows ? '!top-6' : ''}`}>
            {icon}
          </div>

          {/* Field */}
           {rows ? (
                <textarea
                ref={inputRef}
                name={name}
                rows={rows}
                required={required}
                className="w-full h-full bg-transparent text-gray-200 pl-14 pr-4 pt-6 pb-2 outline-none resize-none font-medium text-base z-10 relative placeholder-transparent"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                />
            ) : (
                <input
                ref={inputRef}
                type={type}
                name={name}
                required={required}
                className="w-full h-full bg-transparent text-gray-200 pl-14 pr-4 pt-6 pb-2 outline-none font-medium text-base z-10 relative placeholder-transparent"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                />
            )}

           {/* Floating Label */}
            <label 
                className={`absolute left-14 transition-all duration-300 pointer-events-none font-medium z-0 truncate max-w-[calc(100%-4rem)]
                ${isActive 
                    ? 'top-2.5 text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-widest uppercase' 
                    : 'top-1/2 -translate-y-1/2 text-gray-500 text-sm group-hover:text-gray-400'
                }
                ${rows && !isActive ? '!top-6 !translate-y-0' : ''}
                `}
            >
                {label}
            </label>
       </div>
    </div>
  );
};

const SocialLink = ({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`
      flex items-center justify-center w-14 h-14 rounded-xl bg-[#0F0F0F] text-gray-500 transition-all duration-300
      border border-white/5
      shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.8),-6px_-6px_10px_-1px_rgba(255,255,255,0.05)]
      hover:shadow-[inset_4px_4px_6px_-1px_rgba(0,0,0,0.8),inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.05)]
      hover:translate-y-[2px]
      group
      ${color}
    `}
  >
    <div className="transform transition-transform duration-300 group-hover:scale-90">
      {icon}
    </div>
  </a>
);

interface ContactFormProps {
  focusTrigger?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ focusTrigger = 0 }) => {
  // ---------------------------------------------------------
  // REPLACE THIS URL WITH YOUR OWN FORMSPREE ENDPOINT
  // ---------------------------------------------------------
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkaakrw"; 

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (focusTrigger > 0) {
      // Focus Name Input
      nameInputRef.current?.focus();
      
      // Visual Feedback
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [focusTrigger]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
    <style>{`
      @keyframes attention-pulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); transform: scale(1); }
        50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); transform: scale(1.02); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); transform: scale(1); }
      }
    `}</style>
    <div className={`
      relative group p-[3px] rounded-3xl transition-all duration-500
      ${isHighlighted 
        ? 'bg-gradient-to-r from-emerald-400 via-white to-cyan-400 shadow-[0_0_80px_rgba(16,185,129,0.6)] scale-[1.02] z-50' 
        : 'bg-gradient-to-b from-emerald-400 via-emerald-900 to-blue-600 shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.4)]'
      }
    `}>
        {/* Highlight Overlay */}
        <div className={`absolute inset-0 bg-white/20 rounded-3xl pointer-events-none transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />

        <div className="w-full bg-[#080808] rounded-[21px] p-6 md:p-8 space-y-6 relative z-10 min-h-[460px] flex flex-col justify-center">
            
            {status === 'success' ? (
                 <div className="text-center py-10 animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="mt-8 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors border border-white/10"
                    >
                        Send another message
                    </button>
                 </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    <h3 className="text-3xl font-display font-medium text-center text-white mb-2 drop-shadow-md">Get in Touch</h3>
                    
                    <div className="space-y-4">
                        <div className="h-16">
                            <FormInput inputRef={nameInputRef} name="name" label="Full Name" icon={<UserIcon />} required />
                        </div>
                        <div className="h-16">
                            <FormInput name="email" type="email" label="Email Address" icon={<AtIcon />} required />
                        </div>
                        <div className="h-32">
                            <FormInput name="message" label="How can I help you?" rows={4} icon={<MessageIcon />} required />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className={`
                                w-full relative py-4 rounded-xl 
                                font-bold text-sm tracking-widest uppercase transition-all duration-300 border 
                                shadow-lg active:scale-[0.98]
                                ${status === 'submitting' 
                                    ? 'bg-[#1a1a1a] text-gray-500 border-white/5 cursor-wait' 
                                    : 'bg-[#151515] hover:bg-[#1a1a1a] text-gray-400 hover:text-white border-white/5 hover:border-white/10 hover:shadow-emerald-500/10'
                                }
                            `}
                        >
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'error' && (
                            <p className="text-red-400 text-xs text-center mt-3">
                                Something went wrong. Please try again or email me directly.
                            </p>
                        )}
                    </div>
                </form>
            )}

            <div className="pt-4 border-t border-white/5 mt-auto">
                <div className="relative -top-7 flex justify-center">
                    <span className="bg-[#080808] px-2 text-sm text-gray-500">Connect with me</span>
                </div>

                <div className="flex justify-center gap-4 mt-2">
                    <SocialLink href="#" icon={<FacebookIcon />} color="hover:text-[#3b5998]" />
                    <SocialLink href="#" icon={<XIcon />} color="hover:text-white" />
                    <SocialLink href="#" icon={<InstagramIcon />} color="hover:text-[#f14843]" />
                    <SocialLink href="#" icon={<WhatsAppIcon />} color="hover:text-[#25D366]" />
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ContactForm;