import React, { useState, useMemo, useEffect } from 'react';
import Footer from './Footer';

// Mock Data Structure
interface StudyFile {
  id: string;
  title: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'English' | 'Science' | 'Others';
  classLevel: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  size: string;
  date: string;
  driveLink: string;
}

const mockFiles: StudyFile[] = [
  { id: '1', title: 'Algebraic Expressions Advanced', subject: 'Mathematics', classLevel: 'Class 10', size: '2.4 MB', date: 'Oct 12, 2023', driveLink: 'https://drive.google.com/' },
  { id: '2', title: 'Laws of Motion & Force', subject: 'Physics', classLevel: 'Class 9', size: '1.8 MB', date: 'Nov 05, 2023', driveLink: 'https://drive.google.com/' },
  { id: '3', title: 'Periodic Table Mastery', subject: 'Chemistry', classLevel: 'Class 10', size: '3.1 MB', date: 'Sep 28, 2023', driveLink: 'https://drive.google.com/' },
  { id: '4', title: 'Cell Structure & Functions', subject: 'Biology', classLevel: 'Class 9', size: '5.2 MB', date: 'Dec 10, 2023', driveLink: 'https://drive.google.com/' },
  { id: '5', title: 'Shakespeare: The Merchant of Venice', subject: 'English', classLevel: 'Class 10', size: '1.1 MB', date: 'Jan 15, 2024', driveLink: 'https://drive.google.com/' },
  { id: '6', title: 'Introduction to Integers', subject: 'Mathematics', classLevel: 'Class 6', size: '0.9 MB', date: 'Feb 02, 2024', driveLink: 'https://drive.google.com/' },
  { id: '7', title: 'Matter in Our Surroundings', subject: 'Science', classLevel: 'Class 9', size: '2.2 MB', date: 'Mar 10, 2024', driveLink: 'https://drive.google.com/' },
  { id: '8', title: 'Light: Reflection & Refraction', subject: 'Physics', classLevel: 'Class 10', size: '4.5 MB', date: 'Apr 05, 2024', driveLink: 'https://drive.google.com/' },
  { id: '9', title: 'Crop Production Management', subject: 'Science', classLevel: 'Class 8', size: '1.5 MB', date: 'May 20, 2024', driveLink: 'https://drive.google.com/' },
  { id: '10', title: 'Linear Equations', subject: 'Mathematics', classLevel: 'Class 8', size: '1.3 MB', date: 'Jun 12, 2024', driveLink: 'https://drive.google.com/' },
  { id: '11', title: 'Nutrition in Plants', subject: 'Science', classLevel: 'Class 7', size: '1.7 MB', date: 'Jul 01, 2024', driveLink: 'https://drive.google.com/' },
  { id: '12', title: 'Trigonometry Formulas Sheet', subject: 'Mathematics', classLevel: 'Class 10', size: '0.5 MB', date: 'Aug 14, 2024', driveLink: 'https://drive.google.com/' },
];

const classes = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science', 'English', 'Others'];

// Icon Components
const PDFIcon = () => (
  <svg className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const OpenIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-12 h-12 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UnlockIcon = () => (
  <svg className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface StudyResourcesSectionProps {
  revealRef: (node: HTMLElement | null) => void;
}

const StudyResourcesSection = React.forwardRef<HTMLElement, StudyResourcesSectionProps>(({ revealRef }, ref) => {
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<StudyFile | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredFiles = useMemo(() => {
    return mockFiles.filter(file => {
      const classMatch = selectedClass === 'All' || file.classLevel === selectedClass;
      const subjectMatch = selectedSubject === 'All' || file.subject === selectedSubject;
      return classMatch && subjectMatch;
    });
  }, [selectedClass, selectedSubject]);

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'Physics': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'Chemistry': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Biology': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'English': return 'text-pink-400 border-pink-400/30 bg-pink-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const handleOpenClick = (file: StudyFile) => {
    setCurrentFile(file);
    setPassword('');
    setError('');
    setIsUnlocked(false);
    setIsLoading(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCurrentFile(null);
      setPassword('');
      setError('');
      setIsUnlocked(false);
    }, 300);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay for realism
    setTimeout(() => {
        if (password === '10998') {
            setIsUnlocked(true);
            setError('');
            setIsLoading(false);
            
            // Redirect to Google Drive link after animation
            setTimeout(() => {
                if (currentFile?.driveLink) {
                    window.open(currentFile.driveLink, '_blank');
                }
                handleCloseModal();
            }, 1000);
        } else {
            setError('Incorrect password. Access denied.');
            setIsLoading(false);
        }
    }, 600);
  };

  return (
    <section ref={ref} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between pt-32 md:pt-40">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 md:px-6 pb-20">
        
        {/* Header */}
        <div ref={revealRef} className="reveal text-center mb-12">
          <span className="font-tech text-emerald-400 tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block">
            Knowledge Base
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
            Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Resources</span>
          </h2>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto font-light">
            Access a curated library of academic materials, notes, and research papers designed to accelerate your learning curve.
          </p>
        </div>

        {/* Filters */}
        <div ref={revealRef} className="reveal delay-150 w-full flex flex-col gap-6 mb-12">
            {/* Class Filter */}
            <div className="flex flex-wrap justify-center gap-2">
                {classes.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border ${
                            selectedClass === cls 
                            ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                            : 'bg-white/5 border-white/10 text-white hover:text-emerald-300 hover:border-white/30'
                        }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            {/* Subject Filter */}
            <div className="flex flex-wrap justify-center gap-2">
                 {subjects.map(sub => (
                    <button
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border ${
                            selectedSubject === sub 
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                            : 'bg-transparent border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {sub}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                    <div 
                        key={file.id}
                        ref={revealRef}
                        className={`reveal group relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col overflow-hidden`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <PDFIcon />
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border ${getSubjectColor(file.subject)}`}>
                                {file.subject}
                            </span>
                        </div>

                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-emerald-300 transition-colors relative z-10">
                            {file.title}
                        </h3>
                        
                        <div className="flex items-center gap-3 text-gray-300 text-xs mb-6 relative z-10 font-tech">
                             <span>{file.classLevel}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-500" />
                             <span>{file.size}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-500" />
                             <span>{file.date}</span>
                        </div>

                        <div className="mt-auto relative z-10">
                            <button 
                                onClick={() => handleOpenClick(file)}
                                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-gray-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                            >
                                <span>Open File</span>
                                <div className="group-hover/btn:translate-x-1 transition-transform duration-300">
                                    <OpenIcon />
                                </div>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                 <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center">
                    <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl">No resources found for this filter.</p>
                 </div>
            )}
        </div>
      </div>
      
      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
                onClick={handleCloseModal}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden animate-[scaleIn_0.3s_ease-out]">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500" />
                <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

                <button 
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <CloseIcon />
                </button>

                <div className="relative z-10 text-center">
                    {isUnlocked ? (
                         <div className="py-8">
                            <UnlockIcon />
                            <h3 className="text-2xl font-bold text-white mb-2">Access Granted</h3>
                            <p className="text-emerald-400">Opening Google Drive...</p>
                         </div>
                    ) : (
                        <form onSubmit={handlePasswordSubmit}>
                            <LockIcon />
                            <h3 className="text-xl font-bold text-white mb-2">Protected File</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Enter the password to access <br/> 
                                <span className="text-white font-semibold">"{currentFile?.title}"</span>
                            </p>
                            
                            <div className="mb-4 text-left">
                                <div className="relative group">
                                    <div className={`
                                        relative w-full h-12 bg-black/50 rounded-xl border transition-all duration-300 flex items-center px-4
                                        ${error ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 focus-within:border-emerald-500 focus-within:shadow-[0_0_10px_rgba(16,185,129,0.2)]'}
                                    `}>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setError('');
                                            }}
                                            placeholder="Enter Password"
                                            className="w-full bg-transparent text-white placeholder-gray-600 outline-none font-tech tracking-widest text-lg"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-xs mt-2 pl-1 animate-[shake_0.3s_ease-in-out]">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300
                                    ${isLoading 
                                        ? 'bg-emerald-900/50 text-emerald-500/50 cursor-not-allowed' 
                                        : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]'
                                    }
                                `}
                            >
                                {isLoading ? 'Verifying...' : 'Unlock File'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}

      <Footer />

      {/* Styles for simple animations if not in global css */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes shake { 
            0%, 100% { transform: translateX(0); } 
            25% { transform: translateX(-5px); } 
            75% { transform: translateX(5px); } 
        }
      `}</style>
    </section>
  );
});

export default StudyResourcesSection;