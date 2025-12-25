
import React, { useState, useTransition, Suspense, lazy, useEffect, useRef } from 'react';

// --- Visual Sub-Components ---

const BundleVisualizer = () => {
  const [isLazy, setIsLazy] = useState(false);

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Bundle Size Visualizer</h4>
          <p className="text-[10px] text-slate-400">How much code does the user download at the start?</p>
        </div>
        <button 
          onClick={() => setIsLazy(!isLazy)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${isLazy ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          {isLazy ? 'Code Splitting: ON' : 'Code Splitting: OFF'}
        </button>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Initial Load (First Visit)</p>
          <div className="h-12 w-full bg-slate-800 rounded-xl overflow-hidden flex border border-white/5">
            <div className={`h-full bg-indigo-500 transition-all duration-700 flex items-center justify-center text-[10px] font-black border-r border-indigo-400 ${isLazy ? 'w-[30%]' : 'w-full'}`}>
               APP CORE {!isLazy && '+ ALL PAGES'}
            </div>
            {isLazy && (
               <div className="h-full bg-slate-800 flex-1 flex items-center justify-center text-[10px] font-bold text-slate-600 italic">
                  Chunks deferred...
               </div>
            )}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
             <span>0kb</span>
             <span>{isLazy ? '~150kb' : '~950kb'}</span>
          </div>
        </div>

        {isLazy && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Deferred Chunks (Loaded on demand)</p>
            <div className="flex gap-2">
               <div className="h-8 w-1/4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center text-[8px] font-bold text-emerald-400 uppercase">Profile.js</div>
               <div className="h-8 w-1/4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center text-[8px] font-bold text-emerald-400 uppercase">Settings.js</div>
               <div className="h-8 w-1/4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center text-[8px] font-bold text-emerald-400 uppercase">Charts.js</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
         <p className="text-xs text-slate-300 leading-relaxed italic">
            {isLazy 
              ? "Great! The user only downloads the core logic. Features are fetched only when they click on them." 
              : "Problem: The user has to download the 'Settings' and 'Charts' code even if they only came to see the homepage."}
         </p>
      </div>
    </div>
  );
};

const LazySimulator = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);

  const startLoad = () => {
    if (status !== 'idle') return;
    setStatus('loading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('ready');
          return 100;
        }
        return p + 2;
      });
    }, 30);
  };

  const reset = () => {
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
      <div className="flex justify-between items-center">
         <h4 className="font-bold text-slate-800">Network Simulator</h4>
         <button onClick={reset} className="text-[10px] font-bold text-slate-400 uppercase hover:text-slate-600">Reset Demo</button>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-4 w-full">
           <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">App</div>
           <div className="flex-1 h-2 bg-slate-100 rounded-full relative overflow-hidden">
              <div 
                className={`h-full bg-indigo-400 transition-all ease-linear ${status === 'loading' ? 'opacity-100' : 'opacity-0'}`} 
                style={{ width: `${progress}%` }}
              ></div>
              {status === 'loading' && <div className="absolute top-0 w-4 h-full bg-white/50 blur-md animate-shimmer"></div>}
           </div>
           <div className={`w-32 py-3 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${status === 'ready' ? 'bg-emerald-50 border-emerald-200 scale-105' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
              <span className="text-[8px] font-black text-slate-400 uppercase mb-1">Component</span>
              {status === 'ready' ? <span className="text-emerald-600 font-bold text-xs animate-in zoom-in">LOADED!</span> : <span className="text-[10px] text-slate-300">Off-screen</span>}
           </div>
        </div>

        <div className="space-y-4 w-full max-w-sm">
           <button 
             onClick={startLoad}
             disabled={status !== 'idle'}
             className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all disabled:opacity-50"
           >
             {status === 'idle' ? 'Click to navigate to "Big Feature"' : status === 'loading' ? `Downloading Chunk... ${progress}%` : 'View Feature Now'}
           </button>
           <p className="text-[10px] text-center text-slate-400 italic">"Notice how the code for 'Big Feature' only travels through the wire AFTER you click."</p>
        </div>
      </div>
    </div>
  );
};

const SuspenseBoundaryVisualizer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
         <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-tight">Boundary Scope</h4>
            <p className="text-[10px] text-slate-500">Suspense surrounds a specific part of the UI.</p>
         </div>
         <button 
           onClick={toggle}
           className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg active:scale-95 transition-all"
         >
           Simulate Load
         </button>
      </div>

      <div className="relative border-4 border-dashed border-indigo-200 rounded-3xl p-10 bg-white">
         <div className="absolute -top-3 left-6 px-2 bg-indigo-600 text-white text-[9px] font-black uppercase rounded shadow-sm">
            Suspense Boundary
         </div>

         <div className="flex flex-col items-center justify-center min-h-[160px]">
            {isLoading ? (
               <div className="animate-in fade-in zoom-in text-center space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div>
                    <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Fallback UI</p>
                    <p className="text-[10px] text-slate-400">"Rendering this while the code is missing..."</p>
                  </div>
               </div>
            ) : (
               <div className="animate-in zoom-in text-center space-y-2">
                  <div className="text-4xl">📊</div>
                  <h5 className="font-bold text-slate-800">The Heavy Dashboard</h5>
                  <p className="text-xs text-slate-400">Finally loaded and rendered.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

const UXComparison = () => {
  const [useSuspense, setUseSuspense] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
       <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-tight">UX Battle: Hand-off</h4>
            <p className="text-[10px] text-slate-500">What happens when the code isn't ready yet?</p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={() => setUseSuspense(!useSuspense)}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${useSuspense ? 'bg-green-600 text-white shadow-md' : 'bg-rose-500 text-white shadow-md'}`}
             >
               {useSuspense ? 'Using <Suspense />' : 'Manual / No Guard'}
             </button>
             <button onClick={refresh} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">🔄</button>
          </div>
       </div>

       <div className="p-12 flex items-center justify-center min-h-[250px]">
          {isRefreshing ? (
             useSuspense ? (
               <div className="flex flex-col items-center gap-3 animate-in fade-in">
                  <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-400 animate-loading-bar"></div>
                  </div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase animate-pulse">Graceful Loading...</p>
               </div>
             ) : (
               <div className="text-rose-500 font-bold italic animate-pulse">
                  Error: Page Not Found (Loading JS Chunk failed)
                  <p className="text-[9px] text-slate-400 mt-2 font-normal">Without Suspense, the UI just "breaks" or flashes blank until the JS arrives.</p>
               </div>
             )
          ) : (
             <div className="animate-in zoom-in text-center space-y-4">
                <div className="text-4xl">✨</div>
                <p className="font-bold text-slate-800">Target Component</p>
                <p className="text-xs text-slate-400 max-w-[200px]">The component is loaded and visible to the user.</p>
             </div>
          )}
       </div>
    </div>
  );
};

const PerformanceMeters = () => {
  return (
    <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
       <h4 className="text-xl font-bold mb-8 italic">Perceived Performance Impact</h4>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="space-y-6">
             <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-indigo-400 uppercase">Standard Load</p>
                <span className="text-xs text-slate-500">"Heavy Start"</span>
             </div>
             <div className="space-y-4">
                <div>
                  <p className="text-[9px] text-slate-500 mb-1">Time to First Paint</p>
                  <div className="h-2 w-full bg-slate-800 rounded-full">
                     <div className="h-full bg-rose-500 w-[80%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 mb-1">Total Download</p>
                  <div className="h-2 w-full bg-slate-800 rounded-full">
                     <div className="h-full bg-rose-500 w-[95%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  </div>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-emerald-400 uppercase">Lazy + Suspense</p>
                <span className="text-xs text-emerald-500/50">"Smart Start"</span>
             </div>
             <div className="space-y-4">
                <div>
                  <p className="text-[9px] text-slate-500 mb-1">Time to First Paint</p>
                  <div className="h-2 w-full bg-slate-800 rounded-full">
                     <div className="h-full bg-emerald-500 w-[15%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 mb-1">Initial Download</p>
                  <div className="h-2 w-full bg-slate-800 rounded-full">
                     <div className="h-full bg-emerald-500 w-[20%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                </div>
             </div>
          </div>
       </div>

       <div className="mt-10 p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-slate-400 text-center">
          <strong>Conceptual Insight:</strong> We didn't make the code smaller, we just changed <strong>when</strong> the user pays for it. By moving chunks to later, the first impression is lightning fast.
       </div>
    </div>
  );
};

const LazyDecisionHelper = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const reset = () => { setStep(0); setResult(null); };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-3xl p-10 text-center space-y-8 shadow-sm">
       <h4 className="text-xl font-bold text-slate-800">Lazy Loading Decision Helper</h4>

       <div className="min-h-[160px] flex flex-col items-center justify-center">
          {step === 0 && (
             <div className="animate-in fade-in">
                <p className="text-lg font-medium mb-6">Is this a <strong>Route</strong> (like a separate page)?</p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => setResult('LAZY')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">YES</button>
                   <button onClick={() => setStep(1)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">NO</button>
                </div>
             </div>
          )}

          {step === 1 && (
             <div className="animate-in fade-in">
                <p className="text-lg font-medium mb-6">is the component <strong>Massive</strong> (e.g. Charting, Video Player)?</p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => setResult('LAZY')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">YES</button>
                   <button onClick={() => setStep(2)} className="px-8 py-3 bg-slate-100 rounded-xl font-bold">NO</button>
                </div>
             </div>
          )}

          {step === 2 && (
             <div className="animate-in fade-in">
                <p className="text-lg font-medium mb-6">Is it <strong>Rarely</strong> used (e.g. "Edit Profile" popup)?</p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => setResult('LAZY')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">YES</button>
                   <button onClick={() => setResult('STANDARD')} className="px-8 py-3 bg-slate-100 rounded-xl font-bold">NO</button>
                </div>
             </div>
          )}

          {result === 'LAZY' && (
             <div className="animate-in zoom-in text-center space-y-4">
                <div className="text-5xl mb-4">🚀</div>
                <p className="text-2xl font-black text-indigo-600 uppercase tracking-tighter">LAZY LOAD IT!</p>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">This is a perfect candidate for <code>React.lazy()</code>. Save those bits!</p>
                <button onClick={reset} className="text-xs font-bold underline text-slate-400">Restart Auditor</button>
             </div>
          )}

          {result === 'STANDARD' && (
             <div className="animate-in zoom-in text-center space-y-4">
                <div className="text-5xl mb-4">🏠</div>
                <p className="text-2xl font-black text-slate-800 uppercase tracking-tighter">KEEP IT STANDARD</p>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Splitting tiny components adds more overhead than it saves. Keep it in the main bundle.</p>
                <button onClick={reset} className="text-xs font-bold underline text-slate-400">Restart Auditor</button>
             </div>
          )}
       </div>
    </div>
  );
};

const ModernReact: React.FC = () => {
  return (
    <div className="space-y-20 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">✨</div>
          <h3 className="text-3xl font-black tracking-tight">Modern Architecture Patterns</h3>
        </div>
        <p className="text-indigo-50 max-w-2xl text-lg leading-relaxed relative z-10">
          React is not just about building components; it's about <strong>orchestrating the experience</strong>. 
          Learn how to make even the largest apps feel light and responsive.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem with Loading Everything at Once</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          By default, when you import a component, it gets bundled into your main JavaScript file. 
          As your app grows, that file becomes a <strong>massive wall</strong> that stops the user from seeing your site quickly.
        </p>
        <BundleVisualizer />
      </section>

      {/* 3. WHAT IS LAZY LOADING */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is Lazy Loading?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Lazy loading is the practice of <strong>delaying</strong> the initialization of an object or component until it is actually needed. 
          Instead of downloading the whole app, we download the "Chunks" as the user moves around.
        </p>
        <div className="bg-slate-900 p-6 rounded-2xl font-mono text-[11px] mb-8 text-indigo-300">
           <p className="text-slate-500 mb-2">// How to define a lazy component</p>
           <p><span className="text-rose-400">const</span> HeavyChart = <span className="text-amber-400">lazy</span>(() =&gt; <span className="text-amber-400">import</span>(<span className="text-emerald-400">'./HeavyChart'</span>));</p>
        </div>
        <LazySimulator />
      </section>

      {/* 4. WHAT IS SUSPENSE */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is Suspense?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Lazy loading creates a new problem: What does the user see <em>while</em> the code is downloading? 
          <strong>Suspense</strong> is a component that lets you show a "Fallback UI" (like a spinner or skeleton) while the children are loading.
        </p>
        <SuspenseBoundaryVisualizer />
      </section>

      {/* 5. WITHOUT SUSPENSE VS WITH */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What If We Don't Use Suspense?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          If you try to render a <code>lazy</code> component without a <code>Suspense</code> boundary, 
          React will crash! It needs instructions on what to do during the "waiting period."
        </p>
        <UXComparison />
      </section>

      {/* 6. PERFORMANCE CONCEPTUAL */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Conceptual Performance Gains</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Lazy Loading doesn't make your internet faster, it makes your app <strong>smarter</strong>. 
          It reduces the "Time to First Byte" that really matters for users.
        </p>
        <PerformanceMeters />
      </section>

      {/* 7. DECISION AUDITOR */}
      <LazyDecisionHelper />

      {/* 8. PITFALLS & MISTAKES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Common Mistakes & Pitfalls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">Over-Splitting</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Lazy loading tiny components (like a simple button) adds more overhead in network requests than it saves in bytes.
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">Waterfall Requests</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Nesting lazy components inside lazy components can cause a "waiting for a waiter" effect, making things feel slower.
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">Flash of Loading</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                If your network is too fast, a loading spinner might "flicker" for 50ms, which looks glitchy. 
              </p>
           </div>
        </div>
      </section>

      {/* 9. BEST PRACTICES */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-indigo-400">Mental Model Checklist</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
            {[
              { title: 'Route Level', icon: '🛣️', desc: 'The most common and safest place to lazy load is at the Page/Route level.' },
              { title: 'Meaninful Fallbacks', icon: '🎨', desc: 'Avoid empty spinners. Use Skeleton screens that match the final UI.' },
              { title: 'Group Chunks', icon: '📦', desc: 'Group related heavy libraries into a single shared chunk.' },
              { title: 'Test Slow 3G', icon: '📉', desc: 'Always test your Suspense boundaries with "Network Throttling" enabled.' }
            ].map(b => (
              <div key={b.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <p className="font-bold text-indigo-300 text-sm mb-2 uppercase">{b.title}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
         </div>

         <div className="max-w-2xl mx-auto p-8 bg-indigo-600 rounded-2xl shadow-2xl relative overflow-hidden">
            <p className="text-xl font-bold">The Golden Rule</p>
            <p className="text-indigo-50 mt-2 italic">
               "Lazy load for the USER, not the developer. Only split code that significantly delays the first moment the user can interact with your page."
            </p>
         </div>
      </section>
    </div>
  );
};

export default ModernReact;
