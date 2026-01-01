
import React, { useState, useRef, memo, useEffect } from 'react';
import KeyRenderTracker from '../components/KeyRenderTracker';

// --- Interactive Simulation Component ---

const VirtualDomVsRealDomSimulator = () => {
  const [text, setText] = useState("React is Fast");
  const [vdomUpdates, setVdomUpdates] = useState(0);
  const [realDomUpdates, setRealDomUpdates] = useState(0);
  const [isPainting, setIsPainting] = useState(false);

  const handleInput = (val: string) => {
    setText(val);
    setVdomUpdates(prev => prev + 1);
    
    // Simulate the "Commit" phase being a distinct, deliberate step after reconciliation
    setIsPainting(true);
    const timer = setTimeout(() => {
      setRealDomUpdates(prev => prev + 1);
      setIsPainting(false);
    }, 150);
    return () => clearTimeout(timer);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Interaction Trigger</label>
            <p className="text-xs text-slate-500">Type below to see the "Double Update" behavior</p>
          </div>
          <input 
            type="text" 
            value={text}
            onChange={(e) => handleInput(e.target.value)}
            className="flex-1 max-w-md px-6 py-3 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none shadow-sm transition-all text-sm font-bold"
            placeholder="Change the state..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Virtual DOM Side */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-white/5 flex flex-col h-full shadow-2xl relative overflow-hidden">
           {/* Speed Lines Decoration */}
           <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse opacity-20"></div>
           
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
                <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest">Virtual DOM (Sketchpad)</h4>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                 <span className="text-[9px] text-slate-500 font-bold uppercase">JS Updates:</span>
                 <span className="text-indigo-400 font-mono text-xs font-black" key={vdomUpdates}>{vdomUpdates}</span>
              </div>
           </div>
           
           <div className="flex-1 bg-slate-950 p-6 rounded-2xl border border-white/5 font-mono text-[11px] text-indigo-300 shadow-inner relative overflow-hidden group min-h-[160px]">
              <div className="absolute top-2 right-2 text-[8px] font-black text-white/5 uppercase">Object Memory</div>
              <p className="text-slate-500 mb-2">{'// Lightweight JS Reference'}</p>
              <div className="space-y-1">
                <p>{`{`}</p>
                <p className="pl-4">type: <span className="text-emerald-400">'h1'</span>,</p>
                <p className="pl-4">props: &#123;</p>
                <p className="pl-8">children: <span className="text-amber-400">"${text}"</span>,</p>
                <p className="pl-8">id: <span className="text-emerald-400">'header'</span></p>
                <p className="pl-4">&#125;</p>
                <p>{`}`}</p>
              </div>
              <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none"></div>
           </div>

           <div className="mt-6 p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/20">
              <ul className="text-[10px] text-indigo-200 space-y-2 font-medium">
                 <li className="flex items-start gap-2"><span className="text-indigo-400 font-bold">✓</span> Lives in JavaScript Memory</li>
                 <li className="flex items-start gap-2"><span className="text-indigo-400 font-bold">✓</span> Super fast to update</li>
                 <li className="flex items-start gap-2"><span className="text-indigo-400 font-bold">✓</span> A simple object description of the UI</li>
                 <li className="flex items-start gap-2"><span className="text-indigo-400 font-bold">✓</span> React's private draft</li>
              </ul>
           </div>
        </div>

        {/* Real DOM Side */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col h-full shadow-lg relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPainting ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                <h4 className="text-slate-800 font-black text-xs uppercase tracking-widest">Real DOM (The Browser)</h4>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                 <span className="text-[9px] text-slate-500 font-bold uppercase">Paint Cycles:</span>
                 <span className={`font-mono text-xs font-black transition-colors ${isPainting ? 'text-rose-600' : 'text-slate-400'}`}>{realDomUpdates}</span>
              </div>
           </div>

           <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center p-10 relative overflow-hidden min-h-[160px]">
              <div className="text-center space-y-4">
                 <div className={`p-6 bg-white border-2 rounded-2xl shadow-xl transition-all duration-300 ${isPainting ? 'ring-8 ring-rose-400/20 scale-105 border-rose-200' : 'border-slate-100'}`}>
                    <p className="text-[9px] font-black text-slate-300 uppercase mb-3 tracking-widest">Real UI Node</p>
                    <div className="text-2xl font-black text-slate-900 break-all leading-tight">{text}</div>
                 </div>
                 {isPainting && (
                   <div className="absolute inset-0 flex items-center justify-center bg-rose-50/40 backdrop-blur-[1px] animate-in fade-in duration-100">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Browser Reflow</p>
                      </div>
                   </div>
                 )}
              </div>
           </div>

           <div className="mt-6 p-4 bg-slate-100 rounded-xl border border-slate-200">
              <ul className="text-[10px] text-slate-600 space-y-2 font-medium">
                 <li className="flex items-start gap-2"><span className="text-slate-400 font-bold">✓</span> Lives in the Browser</li>
                 <li className="flex items-start gap-2"><span className="text-slate-400 font-bold">✓</span> Slow to update (Heavy)</li>
                 <li className="flex items-start gap-2"><span className="text-slate-400 font-bold">✓</span> What the user actually sees</li>
                 <li className="flex items-start gap-2"><span className="text-slate-400 font-bold">✓</span> The final construction</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Reconciliation Visualizer Component ---

const ReconciliationVisualizer = () => {
  // previousConfig shows the change immediately on click, currentConfig waits for diffing to finish.
  const [previousConfig, setPreviousConfig] = useState({ text: 'Hello', color: 'text-indigo-600', showIcon: true });
  const [currentConfig, setCurrentConfig] = useState({ text: 'Hello', color: 'text-indigo-600', showIcon: true });
  
  const [isDiffing, setIsDiffing] = useState(false);
  const [diffResult, setDiffResult] = useState<string[]>([]);

  const handleUpdate = (newConfig: any) => {
    if (isDiffing) return;
    
    setIsDiffing(true);
    setDiffResult([]);
    
    // First reflect on Snapshot (Previous) section while the diffing engine is loading
    setPreviousConfig(newConfig);
    
    // Determine differences compared to what is currently rendered on the right
    const changes: string[] = [];
    if (newConfig.text !== currentConfig.text) changes.push("Text Content Diff Detected");
    if (newConfig.color !== currentConfig.color) changes.push("Style Attribute Diff Detected");
    if (newConfig.showIcon !== currentConfig.showIcon) changes.push("Node Hierarchy Diff Detected");
    
    setTimeout(() => {
      setDiffResult(changes);
      // After it is finished loading only update the new Virtual Dom value
      setCurrentConfig(newConfig);
      setIsDiffing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
       <div className="flex flex-wrap gap-3 justify-center">
          <button 
            onClick={() => handleUpdate({...previousConfig, text: previousConfig.text === 'Hello' ? 'React' : 'Hello'})} 
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            disabled={isDiffing}
          >
            Change Text
          </button>
          <button 
            onClick={() => handleUpdate({...previousConfig, color: previousConfig.color === 'text-indigo-600' ? 'text-rose-600' : 'text-indigo-600'})} 
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            disabled={isDiffing}
          >
            Change Styles
          </button>
          <button 
            onClick={() => handleUpdate({...previousConfig, showIcon: !previousConfig.showIcon})} 
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            disabled={isDiffing}
          >
            {previousConfig.showIcon ? 'Remove Node' : 'Add Node'}
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch relative">
          {/* Old Tree (Snapshot) - Updates immediately to show incoming blueprint */}
          <div className={`bg-slate-900 border border-white/5 rounded-3xl p-6 flex flex-col gap-4 transition-all ${isDiffing ? 'ring-2 ring-indigo-500 scale-100 opacity-100 shadow-2xl' : 'opacity-40 scale-95'}`}>
             <div className="flex flex-col items-center gap-1">
                <div className="px-4 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-[10px] font-mono text-slate-300">{'<div>'}</div>
                <div className="w-px h-6 bg-slate-700"></div>
                <div className="flex gap-4">
                   <div className="flex flex-col items-center">
                      <div className={`px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-[9px] font-mono ${previousConfig.color}`}>{'<h1>'}</div>
                      <p className="text-[7px] text-slate-500 mt-1 uppercase font-bold">{previousConfig.text}</p>
                   </div>
                   {previousConfig.showIcon && (
                     <div className="flex flex-col items-center">
                        <div className="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-[9px] font-mono text-indigo-400">{'<span>'}</div>
                        <p className="text-[7px] text-slate-500 mt-1 uppercase font-bold">✨</p>
                     </div>
                   )}
                </div>
             </div>
             <div className="mt-auto pt-4 border-t border-white/5 text-center">
               <p className={`text-[9px] font-black uppercase tracking-widest ${isDiffing ? 'text-indigo-400' : 'text-slate-500'}`}>Snapshot (Incoming)</p>
             </div>
          </div>

          {/* Diffing Engine */}
          <div className="flex flex-col items-center justify-center p-8 bg-indigo-950 rounded-3xl shadow-2xl relative overflow-hidden min-h-[220px] border border-indigo-500/20">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
             
             {isDiffing ? (
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 z-10">
                   <div className="relative">
                      <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs">🔍</div>
                   </div>
                   <div className="text-center">
                      <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">Scanning Snapshot</p>
                      <p className="text-[8px] text-slate-500 mt-1">Comparing to Current VDOM...</p>
                   </div>
                </div>
             ) : (
                <div className="text-center space-y-4 z-10">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/10 mx-auto">🧠</div>
                   <h5 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Diffing Logic</h5>
                   {diffResult.length > 0 ? (
                      <div className="bg-black/30 p-4 rounded-xl space-y-1 text-left border border-white/5">
                         {diffResult.map(r => (
                           <div key={r} className="flex items-center gap-2 animate-in slide-in-from-left-1">
                              <span className="text-emerald-400 text-[10px]">●</span>
                              <p className="text-[9px] text-indigo-100 font-bold">{r}</p>
                           </div>
                         ))}
                      </div>
                   ) : (
                     <p className="text-[9px] text-slate-500 italic max-w-[120px] mx-auto">Click a change to start reconciliation</p>
                   )}
                </div>
             )}

             {/* Scanning Line Animation */}
             {isDiffing && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400/30 blur-sm animate-scan-slow"></div>}
          </div>

          {/* New Tree - Updates only after diffing finishes */}
          <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 flex flex-col gap-4 shadow-xl transition-all relative">
             <div className="flex flex-col items-center gap-1">
                <div className="px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-[10px] font-mono text-indigo-900">{'<div>'}</div>
                <div className="w-px h-6 bg-indigo-200"></div>
                <div className="flex gap-4">
                   <div className="flex flex-col items-center">
                      <div className={`px-3 py-1.5 bg-indigo-50 border-2 rounded-lg text-[9px] font-mono transition-all duration-700 ${configStyles(currentConfig.color)}`}>{'<h1>'}</div>
                      <p className="text-[7px] text-indigo-900 mt-1 uppercase font-black">{currentConfig.text}</p>
                   </div>
                   {currentConfig.showIcon && (
                     <div className="flex flex-col items-center animate-in zoom-in">
                        <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-[9px] font-mono text-indigo-600">{'<span>'}</div>
                        <p className="text-[7px] text-indigo-900 mt-1 uppercase font-black">✨</p>
                     </div>
                   )}
                </div>
             </div>
             <div className="mt-auto pt-4 border-t border-slate-100 text-center">
               <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">New Virtual DOM (Committing)</p>
             </div>
             {isDiffing && <div className="absolute inset-0 bg-indigo-50/50 backdrop-blur-[1px] rounded-3xl flex items-center justify-center"><span className="text-[10px] font-bold text-indigo-400 animate-pulse">RECONCILING...</span></div>}
          </div>
       </div>

       <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-center">
          <p className="text-[11px] text-slate-400 italic">
            "We first receive a <strong>New Snapshot</strong>. React compares this to the <strong>Current VDOM</strong> to calculate exactly what needs to update on the final screen."
          </p>
       </div>
       <style>{`
         @keyframes scan-slow {
           0% { top: 0; }
           100% { top: 100%; }
         }
         .animate-scan-slow {
           animation: scan-slow 1.2s infinite ease-in-out;
         }
       `}</style>
    </div>
  );
};

// --- React Fiber Visualizer Component ---

const FiberSchedulerSimulator = () => {
  const [mode, setMode] = useState<'stack' | 'fiber'>('stack');
  const [isWorking, setIsWorking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isJanked, setIsJanked] = useState(false);

  const startWork = async () => {
    if (isWorking) return;
    setIsWorking(true);
    setProgress(0);

    if (mode === 'stack') {
      // Simulation of blocking work (Stack Reconciler)
      // We use a loop that updates progress in chunks but disables interaction visuals
      setIsJanked(true);
      for (let i = 1; i <= 10; i++) {
        await new Promise(r => setTimeout(r, 300)); // Simulate heavy work chunk
        setProgress(i * 10);
      }
      setIsJanked(false);
    } else {
      // Simulation of yielding work (Fiber Reconciler)
      for (let i = 1; i <= 10; i++) {
        // Between each chunk, Fiber yields control to the browser
        await new Promise(r => setTimeout(r, 300));
        setProgress(i * 10);
      }
    }
    setIsWorking(false);
  };

  const handleInteraction = () => {
    if (isJanked) return;
    setInteractionCount(c => c + 1);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex bg-white/5 p-1 rounded-xl">
          <button 
            onClick={() => { setMode('stack'); setProgress(0); setIsWorking(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'stack' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
          >
            Stack (Sync)
          </button>
          <button 
            onClick={() => { setMode('fiber'); setProgress(0); setIsWorking(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'fiber' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Fiber (Concurrent)
          </button>
        </div>
        <button 
          onClick={startWork}
          disabled={isWorking}
          className="px-6 py-2 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
        >
          {isWorking ? 'Processing UI...' : 'Start Heavy Render'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Thread Status */}
        <div className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Thread Capacity</span>
              <span className={`text-[10px] font-black uppercase ${isJanked ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                {isJanked ? 'Thread Blocked' : 'Thread Available'}
              </span>
           </div>
           <div className="h-12 bg-slate-950 rounded-2xl border border-white/5 relative overflow-hidden flex items-center px-4">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${isJanked ? 'bg-rose-500 w-full animate-pulse' : 'bg-emerald-500 w-1/4'}`}
              ></div>
              {isWorking && mode === 'fiber' && (
                <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center">
                   <p className="text-[9px] font-bold text-indigo-400 uppercase italic">Yielding to Interaction...</p>
                </div>
              )}
           </div>
           
           <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase px-1">Try to Interact:</p>
              <button 
                onClick={handleInteraction}
                className={`w-full py-4 rounded-2xl border-2 font-black transition-all ${isJanked ? 'bg-slate-800 border-rose-900/50 text-slate-600 cursor-not-allowed scale-95' : 'bg-emerald-500 border-emerald-400 text-white shadow-lg active:scale-95'}`}
              >
                {isJanked ? '❌ LAG!' : interactionCount === 0 ? 'Click to Test Response' : `Count: ${interactionCount}`}
              </button>
           </div>
        </div>

        {/* Progress Logic */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[200px] relative overflow-hidden">
           <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Render Pipeline</p>
              <div className="text-4xl font-black text-indigo-400">{progress}%</div>
           </div>
           <div className="w-full h-3 bg-slate-900 rounded-full border border-white/5 p-0.5 overflow-hidden">
              <div 
                className={`h-full bg-indigo-500 rounded-full transition-all duration-300 ${isWorking ? 'animate-shimmer' : ''}`}
                style={{ width: `${progress}%` }}
              ></div>
           </div>
           <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${progress > (i * 10) ? 'bg-indigo-400 scale-125' : 'bg-slate-800 opacity-30'}`}
                ></div>
              ))}
           </div>
           {interactionCount > 0 && mode === 'fiber' && isWorking && (
              <div className="absolute top-2 right-4 animate-bounce">
                <span className="text-[8px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full">PRIORITY EVENT!</span>
              </div>
           )}
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
        <p className="text-[11px] text-slate-400 italic">
          {mode === 'stack' 
            ? "In Stack mode, a large render 'locks' the browser. The 'Click Me' button won't react until the 100% mark." 
            : "In Fiber mode, React works in chunks. Even during a large render, it periodically 'yields' to let the 'Click Me' button work!"}
        </p>
      </div>
    </div>
  );
};

// Helper for cleaning up color classes in visualizer
const configStyles = (color: string) => {
  return `border-indigo-200 ${color}`;
};

// --- Main Lesson Component ---

const KeyCircleItem = memo(({ id, index, color, mode }: { id: string, index: number, color: string, mode: 'index' | 'id' }) => {
  const trigger = mode === 'index' ? index : id;

  return (
    <KeyRenderTracker trigger={trigger}>
      {(displayCount) => (
        <div className="flex flex-col items-center gap-1 min-w-[85px] animate-in zoom-in duration-300">
          <div className="flex flex-col items-center -space-y-0.5 mb-1">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm transition-all ${displayCount > 1 ? 'bg-rose-500 text-white border-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              Render: {displayCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Index: {index}
            </span>
          </div>
          
          <div 
            className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-white shadow-lg border-4 border-white ring-2 ring-slate-100 transition-all hover:scale-105 group relative cursor-pointer ${displayCount > 1 ? 'ring-rose-400 ring-offset-2' : ''}`}
          >
            <span className="text-[10px] font-mono font-black">{id.toUpperCase()}</span>
          </div>
        </div>
      )}
    </KeyRenderTracker>
  );
});

interface ItemData {
  id: string;
  color: string;
}

const IndexKeyDemo = () => {
  const [items, setItems] = useState<ItemData[]>([
    { id: 'A1', color: 'bg-indigo-400' },
    { id: 'B2', color: 'bg-indigo-500' },
  ]);

  const colors = ['bg-rose-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400', 'bg-fuchsia-400', 'bg-indigo-400', 'bg-orange-400'];
  
  const createItem = (): ItemData => ({
    id: Math.random().toString(36).substr(2, 2).toUpperCase(),
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const addAtStart = () => {
    setItems([createItem(), ...items]);
  };

  const addAtMiddle = () => {
    const next = [...items];
    next.splice(Math.floor(next.length / 2), 0, createItem());
    setItems(next);
  };

  const addAtEnd = () => {
    setItems([...items, createItem()]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-red-600 flex items-center gap-2">
          <span>❌</span> Using key=&#123;index&#125;
        </h4>
        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Unstable Identity</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <button onClick={addAtStart} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm">Add at Start</button>
        <button onClick={addAtMiddle} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add in Middle</button>
        <button onClick={addAtEnd} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add at End</button>
        <button onClick={() => setItems([])} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 ml-auto">Clear</button>
      </div>

      <div className="relative min-h-[180px] bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 overflow-x-auto scrollbar-hide">
        <div className="flex flex-row gap-10 pb-4 items-end min-w-max px-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative group" onClick={() => removeItem(item.id)}>
              <KeyCircleItem id={item.id} index={index} color={item.color} mode="index" />
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer pointer-events-none">✕</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-slate-400 text-sm italic py-4">The list is empty.</div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
        <h5 className="font-bold text-red-900 mb-3 text-sm uppercase tracking-widest">The "Index" Performance Cost</h5>
        <ul className="space-y-3 text-sm text-red-800">
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-rose-600">Observation:</span>
            <span>When adding at the <strong>start</strong> or <strong>middle</strong>, notice how multiple existing items re-render! This is because their index changed, making React think the data at that "key" is new.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-green-600">Efficiency:</span>
            <span>When adding at the <strong>end</strong>, previous items stay at the same index, so they do NOT re-render (Count stays same).</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

const UniqueKeyDemo = () => {
  const [items, setItems] = useState<ItemData[]>([
    { id: 'U1', color: 'bg-emerald-400' },
    { id: 'V2', color: 'bg-emerald-500' },
  ]);

  const colors = ['bg-rose-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400', 'bg-fuchsia-400', 'bg-indigo-400', 'bg-orange-400'];
  const createItem = (): ItemData => ({
    id: Math.random().toString(36).substr(2, 2).toUpperCase(),
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const addAtStart = () => {
    setItems([createItem(), ...items]);
  };

  const addAtMiddle = () => {
    const next = [...items];
    next.splice(Math.floor(next.length / 2), 0, createItem());
    setItems(next);
  };

  const addAtEnd = () => {
    setItems([...items, createItem()]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          <span>✅</span> Using key=&#123;item.id&#125;
        </h4>
        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Persistent Identity</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <button onClick={addAtStart} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm">Add at Start</button>
        <button onClick={addAtMiddle} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add in Middle</button>
        <button onClick={addAtEnd} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add at End</button>
        <button onClick={() => setItems([])} className="px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-50 ml-auto">Clear</button>
      </div>

      <div className="relative min-h-[180px] bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 overflow-x-auto scrollbar-hide">
        <div className="flex flex-row gap-10 pb-4 items-end min-w-max px-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative group" onClick={() => removeItem(item.id)}>
              <KeyCircleItem id={item.id} index={index} color={item.color} mode="id" />
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer pointer-events-none">✕</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-slate-400 text-sm italic py-4">The list is empty.</div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
        <h5 className="font-bold text-emerald-900 mb-3 text-sm uppercase tracking-widest">Why IDs are Superior</h5>
        <ul className="space-y-3 text-sm text-emerald-800">
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-emerald-600">The Power of Identity:</span>
            <span>No matter where you add an item, the existing items' <strong>Render Count stays at 1</strong>. React recognizes their unique IDs and knows they haven't changed!</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-indigo-600">Efficiency:</span>
            <span>This is the core of React's performance. By identifying items correctly, React avoids doing unnecessary work.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

const ReactInternals: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* 1. What is the DOM? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">What is the DOM?</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          The <strong>DOM (Document Object Model)</strong> is the browser's way of understanding your website. 
          Think of it as a <span className="text-indigo-600 font-bold">Tree Structure</span> where every HTML tag is a branch or a leaf.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 text-sm">HTML to DOM Tree</h4>
            <div className="flex flex-col items-center space-y-2">
              <div className="px-3 py-1 bg-indigo-100 border border-indigo-200 rounded text-xs font-mono">{'<html>'}</div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="px-3 py-1 bg-indigo-100 border border-indigo-200 rounded text-xs font-mono">{'<body>'}</div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex gap-4">
                 <div className="flex flex-col items-center">
                   <div className="px-3 py-1 bg-green-100 border border-green-200 rounded text-xs font-mono">{'<h1>'}</div>
                   <p className="text-[10px] text-slate-400 mt-1">Node</p>
                 </div>
                 <div className="flex flex-col items-center">
                   <div className="px-3 py-1 bg-green-100 border border-green-200 rounded text-xs font-mono">{'<p>'}</div>
                   <p className="text-[10px] text-slate-400 mt-1">Node</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 italic">"When you use JavaScript to change text on a page, you are telling the browser: 'Go find this specific node in the tree and update its value'."</p>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800">
              <strong>Problem:</strong> Real DOM updates are "heavy". Changing one small thing can sometimes force the browser to recalculate the entire layout of the page.
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Virtual DOM Section */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is the Virtual DOM?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          The <strong>Virtual DOM</strong> is NOT the real DOM. It is a lightweight copy of the UI kept in 
          JavaScript memory. It's like a <span className="text-indigo-600 font-bold">Sketchpad</span> where React 
          plans its moves before touching the expensive Real DOM.
        </p>

        <VirtualDomVsRealDomSimulator />
      </section>

      {/* 4. Reconciliation */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Reconciliation: The Diffing Algorithm</h3>
        <div className="space-y-4 mb-10">
          <p className="text-slate-600 leading-relaxed">
            Reconciliation is React's "Smart Engine". When a component's state changes, React doesn't immediately touch the browser. Instead, it follows this highly efficient process:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
               <h5 className="font-bold text-indigo-900 text-sm mb-1 uppercase tracking-tighter">1. Tree Generation</h5>
               <p className="text-xs text-indigo-800 leading-relaxed">React generates a completely new Virtual DOM tree representing the updated UI state.</p>
            </div>
            <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
               <h5 className="font-bold text-amber-900 text-sm mb-1 uppercase tracking-tighter">2. Diffing (Comparison)</h5>
               <p className="text-xs text-amber-800 leading-relaxed">It compares this new tree with the previous one to find exactly what changed using a "Diffing" algorithm.</p>
            </div>
            <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
               <h5 className="font-bold text-emerald-900 text-sm mb-1 uppercase tracking-tighter">3. Selective Update</h5>
               <p className="text-xs text-emerald-800 leading-relaxed">It calculates the <strong>minimum</strong> set of instructions needed to update the real browser DOM.</p>
            </div>
            <div className="p-5 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl">
               <h5 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tighter">4. Commit</h5>
               <p className="text-xs text-slate-800 leading-relaxed">It batches those instructions and applies them to the screen in one fast "paint" operation.</p>
            </div>
          </div>
        </div>

        <ReconciliationVisualizer />
      </section>

      {/* 5. React Fiber (NEW SECTION) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">React Fiber: The Virtual Thread</h3>
        <div className="space-y-6 mb-10">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-indigo-600">What is React Fiber?</h4>
            <p className="text-slate-600 leading-relaxed">
              React Fiber is the reimplementation of React's core algorithm. It is essentially a <strong>re-engineered Virtual Stack</strong> specifically for React components. While the previous engine (Stack Reconciler) processed work synchronously, Fiber is designed to handle updates <strong>asynchronously</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest">The Problem it Solved</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Before Fiber, React used a <strong>Stack Reconciler</strong>. Like a standard function stack, once it started rendering, it couldn't stop. If you had a complex UI update, the browser's "Main Thread" would be locked until it finished. This caused <strong>jank</strong>—users couldn't click buttons or type because the browser was too busy rendering.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-widest">What Makes it Special?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fiber introduces <strong>Concurrency</strong>. It breaks rendering work into small units called "Fibers". React can now:
              </p>
              <ul className="text-[10px] space-y-1.5 text-indigo-700 font-medium list-disc pl-4">
                <li><strong>Pause</strong> work and come back to it later.</li>
                <li><strong>Prioritize</strong> urgent work (like typing) over non-urgent work (like list rendering).</li>
                <li><strong>Reuse</strong> previously completed work.</li>
              </ul>
            </div>
          </div>
        </div>

        <FiberSchedulerSimulator />

        <div className="mt-8 p-6 bg-indigo-900 rounded-3xl text-white relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <h5 className="font-black text-lg mb-2 uppercase tracking-tighter">The "Coordinator" Analogy</h5>
              <p className="text-sm text-indigo-200 leading-relaxed">
                Imagine a chef (React) cooking a 5-course meal. 
                <br /><br />
                <strong>The Stack Reconciler</strong> is a chef who cooks the whole meal without looking up. Even if a fire starts in the kitchen, they won't stop until the dessert is plated.
                <br /><br />
                <strong>The Fiber Reconciler</strong> is a chef who checks the kitchen every few seconds. If a waiter brings an urgent order (User Input), the chef pauses the current dish, handles the order, and then resumes where they left off.
              </p>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
        </div>
      </section>

      {/* THE KEY LAB */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">The Key Lab</h3>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Witness the performance cost of unstable keys. Watch the <span className="text-rose-600 font-bold">Render count</span> badges to see how React recalculates positions based on identity.
          </p>
        </div>

        {/* Section 1: Index based demo */}
        <div key="index-demo">
           <IndexKeyDemo />
        </div>

        {/* Section 2: Unique ID based demo */}
        <div key="id-demo">
           <UniqueKeyDemo />
        </div>

        {/* NOTE ON MUTATION vs CHANGE */}
        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                 <h5 className="text-lg font-bold text-amber-900 mb-1">A Critical Mental Model: List Changes vs. Mutation</h5>
                 <p className="text-sm text-amber-800 leading-relaxed">
                    Everything you see above happens because we are following the rule of <strong>Immutability</strong>. 
                    When we "add an item", we are providing React with a <span className="font-bold underline">completely new list object</span> (using <code>[...items, newItem]</code>).
                 </p>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 p-3 rounded-xl border border-amber-200">
                       <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">The Correct Way (Change)</p>
                       <code className="text-[11px] font-mono text-slate-800">setItems([...oldItems, newItem])</code>
                       <p className="text-[9px] text-amber-600 mt-1">React sees a NEW reference and starts the lab demos above.</p>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                       <p className="text-[10px] font-bold text-rose-700 uppercase mb-1">The Wrong Way (Mutation)</p>
                       <code className="text-[11px] font-mono text-slate-800 line-through">items.push(newItem)</code>
                       <p className="text-[9px] text-rose-600 mt-1">React sees the SAME list object. It won't detect any change and <strong>nothing</strong> will re-render!</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Summary / Key Takeaways */}
      <section className="bg-slate-900 p-8 rounded-2xl text-white text-center">
         <h4 className="text-xl font-bold mb-4">Key Takeaways</h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">VDOM</p>
               <p className="text-[10px] text-slate-400">A JavaScript "sketch" of your UI used for planning.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Reconciliation</p>
               <p className="text-[10px] text-slate-400">Comparing VDOM trees to find specific changes.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Fiber</p>
               <p className="text-[10px] text-slate-400">The task manager that handles update priorities.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Keys</p>
               <p className="text-[10px] text-slate-400">Crucial for tracking identity during list updates.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ReactInternals;
