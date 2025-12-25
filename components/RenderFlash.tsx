
import React, { useState, useEffect, useRef } from 'react';

interface RenderFlashProps {
  children: React.ReactNode;
  name: string;
  count?: number; // Optional: let the parent control the count
}

const RenderFlash: React.FC<RenderFlashProps> = ({ children, name, count }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [internalCount, setInternalCount] = useState(1);
  const lastChildren = useRef(children);
  const lastManualCount = useRef(count);

  const displayCount = count !== undefined ? count : internalCount;

  useEffect(() => {
    let shouldUpdate = false;

    if (count !== undefined) {
      // If manual count is provided, only flash if it actually incremented
      if (count !== lastManualCount.current) {
        shouldUpdate = true;
        lastManualCount.current = count;
      }
    } else if (children !== lastChildren.current) {
      // Standard behavior: flash if the JSX children object is new
      setInternalCount(prev => prev + 1);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      lastChildren.current = children;
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [children, count]);

  return (
    <div className="relative w-full">
      <div 
        className={`transition-all duration-300 rounded-xl p-1 ${
          isFlashing ? 'bg-rose-50 ring-4 ring-rose-400/50' : ''
        }`}
      >
        {children}
      </div>
      
      <div className="absolute -top-3 -right-1 z-50 pointer-events-none flex flex-col items-end gap-1">
        <span className={`px-2 py-0.5 rounded shadow-sm text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
          isFlashing ? 'bg-rose-600 text-white border-rose-700 scale-110 shadow-lg' : 'bg-slate-800 text-slate-300 border-slate-700'
        }`}>
          {name}
        </span>
        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold border transition-all ${
           isFlashing ? 'bg-white text-rose-600 border-rose-200 shadow-sm' : 'bg-white text-slate-500 border-slate-100'
        }`}>
          Renders: {displayCount}
        </span>
      </div>
    </div>
  );
};

export default RenderFlash;
