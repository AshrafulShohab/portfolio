import React from 'react';

const ForegroundBlobs: React.FC = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-[5]"
      style={{
        transform: `translate(calc(var(--mouse-x, 0) * 150px), calc(var(--mouse-y, 0) * 90px))`,
        willChange: 'transform',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {/* Section 1 Blobs */}
      <div
        className="absolute top-[15vh] left-[65%] h-40 w-40 md:h-64 md:w-64 animate-[move-blob-3_24s_ease-in-out_infinite]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-yellow-700 opacity-90 rounded-full animate-[morph-blob_8s_ease-in-out_infinite]"></div>
      </div>
      <div className="absolute top-[55vh] left-[10%] h-20 w-20 md:h-32 md:w-32 animate-[move-blob-2_20s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-800 opacity-90 rounded-full animate-[morph-blob_10s_ease-in-out_infinite_reverse]"></div>
      </div>
      <div
        className="absolute top-[70vh] left-[80%] h-24 w-24 md:h-40 md:w-40 animate-[move-blob-4_28s_ease-in-out_infinite_reverse]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 opacity-90 rounded-full animate-[morph-blob_12s_ease-in-out_infinite]"></div>
      </div>
      <div className="absolute top-[85vh] left-[40%] h-16 w-16 md:h-24 md:w-24 animate-[move-blob-1_30s_ease-in-out_infinite]">
         <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-900 opacity-70 rounded-full animate-[morph-blob_7s_ease-in-out_infinite]"></div>
      </div>

      {/* Section 2 Blobs */}
      <div className="absolute top-[115vh] left-[70%] h-40 w-40 md:h-64 md:w-64 animate-[move-blob-3_26s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-700 opacity-90 rounded-full animate-[morph-blob_9s_ease-in-out_infinite]"></div>
      </div>
      <div className="absolute top-[155vh] left-[15%] h-20 w-20 md:h-32 md:w-32 animate-[move-blob-2_22s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-800 opacity-90 rounded-full animate-[morph-blob_11s_ease-in-out_infinite_reverse]"></div>
      </div>
      <div className="absolute top-[170vh] left-[85%] h-24 w-24 md:h-40 md:w-40 animate-[move-blob-4_30s_ease-in-out_infinite_reverse]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-blue-500 opacity-90 rounded-full animate-[morph-blob_13s_ease-in-out_infinite]"></div>
      </div>

      {/* Section 3 Blobs (Contact) */}
      <div className="absolute top-[215vh] left-[70%] h-40 w-40 md:h-64 md:w-64 animate-[move-blob-1_26s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00b5ff] via-[#005c87] to-[#003470] opacity-90 rounded-full animate-[morph-blob_9s_ease-in-out_infinite]"></div>
      </div>
      <div className="absolute top-[255vh] left-[15%] h-20 w-20 md:h-32 md:w-32 animate-[move-blob-4_22s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003470] to-[#00b5ff] opacity-90 rounded-full animate-[morph-blob_11s_ease-in-out_infinite_reverse]"></div>
      </div>
      <div className="absolute top-[270vh] left-[85%] h-24 w-24 md:h-40 md:w-40 animate-[move-blob-2_30s_ease-in-out_infinite_reverse]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a1e0] to-[#00b5ff] opacity-90 rounded-full animate-[morph-blob_13s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default ForegroundBlobs;