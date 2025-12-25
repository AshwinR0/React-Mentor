
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import RenderFlash from '../components/RenderFlash';

// --- Sub-components for Visualizations ---

const LifecycleTimeline = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsRunning(true);
    setStep(1); // Render
    setTimeout(() => setStep(2), 1000); // Paint
    setTimeout(() => setStep(3), 2000); // useEffect
    setTimeout(() => {
      setStep(0);
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <button 
          onClick={start}
          disabled={isRunning}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg active:scale-95"
        >
          {isRunning ? 'Rendering...' : 'Trigger State Change'}
        </button>
        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">The Performance Order</div>
      </div>

      <div className="relative flex justify-between items-start">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-800"></div>
        
        {[
          { id: 1, label: 'Render', icon: '🏗️', desc: 'React runs your function' },
          { id: 2, label: 'Paint', icon: '🖼️', desc: 'Browser shows the UI' },
          { id: 3, label: 'Effect', icon: '⚡', desc: 'useEffect runs now' }
        ].map(s => (
          <div key={s.id} className="relative z-10 flex flex-col items-center text-center w-1/3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 transition-all duration-500 ${step >= s.id ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-lg shadow-indigo-500/20' : 'bg-slate-800 border-slate-700 opacity-30'}`}>
              {s.icon}
            </div>
            <div className={`mt-4 space-y-1 transition-all duration-500 ${step >= s.id ? 'opacity-100' : 'opacity-20'}`}>
              <p className="text-xs font-black text-white uppercase tracking-widest">{s.label}</p>
              <p className="text-[9px] text-slate-500 max-w-[90px] mx-auto leading-tight">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[11px] text-indigo-400 italic">
        "Crucial: useEffect is <strong>asynchronous</strong>. It doesn't block the browser from painting!"
      </p>
    </div>
  );
};

const AnatomyVisual = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
      <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 font-mono text-sm md:text-xl relative z-10">
        <div className="space-y-2">
          <p>
            <span 
              onMouseEnter={() => setHovered('hook')} 
              onMouseLeave={() => setHovered(null)}
              className={`transition-all rounded p-1 cursor-help ${hovered === 'hook' ? 'bg-indigo-600 text-white' : 'text-indigo-400'}`}
            >useEffect</span>
            (() =&gt; &#123;
          </p>
          <div 
            onMouseEnter={() => setHovered('logic')} 
            onMouseLeave={() => setHovered(null)}
            className={`pl-8 transition-all rounded p-1 cursor-help ${hovered === 'logic' ? 'bg-green-600/20 ring-1 ring-green-500/50' : ''}`}
          >
            <p className="text-slate-500">{'// Your logic here'}</p>
            <p className="text-green-400">doSomething();</p>
          </div>
          <p>
            &#125;, 
            [<span 
              onMouseEnter={() => setHovered('deps')} 
              onMouseLeave={() => setHovered(null)}
              className={`transition-all rounded p-1 cursor-help ${hovered === 'deps' ? 'bg-rose-600 text-white' : 'text-rose-400'}`}
            >dependency</span>]
            );
          </p>
        </div>

        <div className="mt-12 h-20 flex items-center justify-center text-center">
          {!hovered && <p className="text-slate-500 animate-pulse text-sm">Hover parts to see what they do!</p>}
          {hovered === 'hook' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <p className="text-indigo-400 font-bold uppercase text-[10px] mb-1">The Hook</p>
              <p className="text-slate-300 text-xs">Standard hook that tells React: "Do this after rendering".</p>
            </div>
          )}
          {hovered === 'logic' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <p className="text-green-400 font-bold uppercase text-[10px] mb-1">Effect Function</p>
              <p className="text-slate-300 text-xs">The code that interacts with the outside world (DOM, API, etc).</p>
            </div>
          )}
          {hovered === 'deps' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <p className="text-rose-400 font-bold uppercase text-[10px] mb-1">Dependency Array</p>
              <p className="text-slate-300 text-xs">An array of values. The effect only re-runs if these values change.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DependencyToggleSimulator = () => {
  const [mode, setMode] = useState<'none' | 'empty' | 'prop'>('none');
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);
  const [lastReason, setLastReason] = useState('Mount');

  useEffect(() => {
    if (mode === 'none') {
      setEffectRuns(r => r + 1);
      setLastReason('Every Render');
    }
  }, [count, otherState, mode]);

  useEffect(() => {
    if (mode === 'empty') {
      setEffectRuns(r => r + 1);
      setLastReason('Initial Mount Only');
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'prop') {
      setEffectRuns(r => r + 1);
      setLastReason('Count Changed');
    }
  }, [count]);

  const reset = () => {
    setEffectRuns(0);
    setCount(0);
    setOtherState(0);
    setLastReason('Reset');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50/50">
        {(['none', 'empty', 'prop'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setEffectRuns(0); }}
            className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              mode === m ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {m === 'none' ? 'No Array' : m === 'empty' ? 'Empty []' : '[count] Array'}
          </button>
        ))}
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-slate-50/20">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setCount(c => c + 1)} className="p-4 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">Update count ({count})</button>
            <button onClick={() => setOtherState(s => s + 1)} className="p-4 bg-slate-800 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">Other Render ({otherState})</button>
          </div>
          
          <div className="p-6 bg-slate-900 rounded-2xl font-mono text-[11px] border border-slate-800 shadow-inner">
            <p className="text-slate-500 mb-2">// Current Setup</p>
            {mode === 'none' && <pre className="text-indigo-400">useEffect(() =&gt; &#123; ... &#125;)</pre>}
            {mode === 'empty' && <pre className="text-green-400">useEffect(() =&gt; &#123; ... &#125;, [])</pre>}
            {mode === 'prop' && <pre className="text-amber-400">useEffect(() =&gt; &#123; ... &#125;, [count])</pre>}
            <p className="text-slate-500 mt-4">// Status</p>
            <p className="text-white">Effect runs on: <span className="text-indigo-300">
              {mode === 'none' ? 'Everything' : mode === 'empty' ? 'Mounting only' : 'count changes'}
            </span></p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl p-8 relative group">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Effect Execution Count</div>
           <div className="text-6xl font-black text-indigo-600 animate-in zoom-in key={effectRuns}">{effectRuns}</div>
           <p className="mt-4 text-[10px] font-bold text-indigo-400 italic bg-indigo-50 px-3 py-1 rounded-full">{lastReason}</p>
           <button onClick={reset} className="absolute bottom-4 right-4 text-[9px] font-bold text-slate-300 hover:text-slate-600">Reset Counter</button>
        </div>
      </div>
    </div>
  );
};

const CleanupVisualizer = () => {
  const [mounted, setMounted] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [events, setEvents] = useState<{type: 'effect' | 'cleanup', msg: string, id: number}[]>([]);

  const addEvent = (type: 'effect' | 'cleanup', msg: string) => {
    setEvents(prev => [{type, msg, id: Date.now()}, ...prev].slice(0, 5));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2">
          <button 
            onClick={() => setMounted(!mounted)} 
            className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${mounted ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'}`}
          >
            {mounted ? 'Unmount' : 'Mount'}
          </button>
          <button 
            onClick={() => mounted && setUpdateCount(c => c + 1)} 
            disabled={!mounted}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-xs shadow-md disabled:opacity-20"
          >
            Update
          </button>
        </div>
        <div className="text-slate-400 text-[10px] font-mono">Mount → Update → Unmount</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl relative flex items-center justify-center overflow-hidden">
          {mounted ? (
            <div className="animate-in zoom-in text-center">
              <div className="text-4xl animate-pulse">📡</div>
              <p className="text-xs font-bold text-slate-800 mt-2">Active Connection</p>
              <p className="text-[10px] text-slate-400">Updates: {updateCount}</p>
              <CleanupTracker updateTrigger={updateCount} onEffect={() => addEvent('effect', 'Connect!')} onCleanup={() => addEvent('cleanup', 'Disconnect!')} />
            </div>
          ) : (
             <p className="text-slate-300 text-xs italic">Disconnected</p>
          )}
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[10px] h-48 overflow-y-auto space-y-2 border border-slate-800">
          <p className="text-slate-500 mb-2">// Timeline Logs</p>
          {events.map(e => (
            <div key={e.id} className={`flex gap-3 animate-in slide-in-from-left-2 ${e.type === 'effect' ? 'text-green-400' : 'text-amber-400'}`}>
              <span className="shrink-0">{e.type === 'effect' ? '➜' : '🧹'}</span>
              <span>{e.msg}</span>
            </div>
          ))}
          {events.length === 0 && <p className="text-slate-700">Waiting for actions...</p>}
        </div>
      </div>
    </div>
  );
};

const CleanupTracker = ({ onEffect, onCleanup, updateTrigger }: { onEffect: () => void, onCleanup: () => void, updateTrigger: number }) => {
  useEffect(() => {
    onEffect();
    return () => onCleanup();
  }, [updateTrigger]);
  return null;
};

const PitfallPlayground = () => {
  const [mode, setMode] = useState<'loop' | 'stale' | 'fixed'>('loop');
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  // Simulation of an infinite loop (safely throttled)
  useEffect(() => {
    if (mode === 'loop') {
      const timer = setTimeout(() => {
        setCount(c => c + 1);
        setLog(prev => [`Render ${count + 1}: State updated inside effect with no deps!`, ...prev].slice(0, 3));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count, mode]);

  // Simulation of stale closure
  useEffect(() => {
    if (mode === 'stale') {
      setLog(prev => [`Effect running with ID: ${id}`, ...prev].slice(0, 3));
    }
  }, [mode]); // intentionally missing [id]

  const reset = (newMode: typeof mode) => {
    setMode(newMode);
    setCount(0);
    setId(1);
    setLog([]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        {(['loop', 'stale', 'fixed'] as const).map(m => (
          <button
            key={m}
            onClick={() => reset(m)}
            className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              mode === m ? 'border-rose-500 text-rose-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {m === 'loop' ? 'Infinite Loop' : m === 'stale' ? 'Stale Data' : 'Fixed Solution'}
          </button>
        ))}
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl font-mono text-[10px] border border-slate-800 shadow-xl overflow-x-auto">
            {mode === 'loop' && (
              <pre className="text-rose-400">{`useEffect(() => {
  setCount(count + 1);
}, []); // ❌ Forgot count in deps?
// React will keep re-rendering!`}</pre>
            )}
            {mode === 'stale' && (
              <pre className="text-amber-400">{`useEffect(() => {
  fetchData(id);
}, []); // ❌ Missing [id]
// Won't update when ID changes!`}</pre>
            )}
            {mode === 'fixed' && (
              <pre className="text-green-400">{`useEffect(() => {
  // Only runs when 'id' actually changes
  fetchData(id);
}, [id]); // ✅ Correct`}</pre>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setId(i => i + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-md">Change ID ({id})</button>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-48 overflow-y-auto">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Behavior Logs</p>
          <div className="space-y-2">
            {log.map((l, i) => <p key={i} className="text-[11px] text-slate-600 font-mono bg-white p-2 border rounded shadow-sm">➜ {l}</p>)}
            {log.length === 0 && <p className="text-slate-300 text-xs italic">Watching for bugs...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const EffectsLab: React.FC = () => {
  // Existing state for the preserved data fetching section
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // Preserved Data Fetching Effect (DO NOT MODIFY)
  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      const responses = [
        { id: 1, text: "React is awesome!", author: "Vince" },
        { id: 2, text: "Keep coding every day.", author: "Sensei" },
        { id: 3, text: "Bugs are just hidden features.", author: "Anon" }
      ];
      if (active) {
        setData(responses[Math.floor(Math.random() * responses.length)]);
        setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [trigger]);

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">🌐</div>
          <h3 className="text-3xl font-black">useEffect Mastery</h3>
        </div>
        <p className="text-indigo-100 max-w-2xl text-lg leading-relaxed relative z-10">
          Synchronization is the heart of complex React apps. Learn to manage side effects without fear.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-40"></div>
      </section>

      {/* 2. PRESERVED SECTION: Side Effects: useEffect */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Side Effects: useEffect</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Sometimes a component needs to do things <em>outside</em> of React, like fetching data, 
          setting timers, or talking to a database. We call these <strong>Side Effects</strong>.
        </p>

        <div className="bg-slate-900 p-6 rounded-xl text-xs font-mono text-slate-300 mb-8">
          <p className="text-indigo-400">{'// This runs AFTER the component renders'}</p>
          <p>{`useEffect(() => {`}</p>
          <p className="pl-4 text-green-400">{'  console.log("Component appeared!");'}</p>
          <p className="pl-4 text-green-400">{'  fetchData();'}</p>
          <p>{`}, [dependency]); // Only runs when 'dependency' changes`}</p>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="max-w-md mx-auto space-y-6">
            <h4 className="text-center text-sm font-bold text-slate-500 uppercase">Data Fetcher Demo</h4>
            
            <RenderFlash name="Data Display">
              <div className="min-h-[120px] bg-white rounded-xl border p-6 shadow-sm flex flex-col items-center justify-center text-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-bold text-slate-400 animate-pulse">FETCHING...</p>
                  </div>
                ) : data ? (
                  <div className="animate-in zoom-in duration-300">
                    <p className="text-lg font-medium text-slate-800 italic">"{data.text}"</p>
                    <p className="text-xs text-indigo-500 font-bold mt-2">— {data.author}</p>
                  </div>
                ) : (
                  <p className="text-slate-400">Click to fetch data</p>
                )}
              </div>
            </RenderFlash>

            <button 
              onClick={() => setTrigger(t => t + 1)}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Trigger Effect (Refetch)
            </button>
            
            <p className="text-center text-[10px] text-slate-400">
              Check the code: Notice the <code>[trigger]</code> in the dependency array. 
              Changing it forces the effect to run again!
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY DO WE NEED IT? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Do We Need useEffect?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          In React, the "Render" phase must be pure. You shouldn't start timers or fetch data while React is calculating what the UI looks like. 
          <code>useEffect</code> runs after the render is finished and the browser has "painted" the screen.
        </p>
        <LifecycleTimeline />
      </section>

      {/* 4. WHAT IS IT? (ANATOMY) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">What Is useEffect? (Anatomy)</h3>
        <AnatomyVisual />
      </section>

      {/* 5. WHEN DOES IT RUN? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">When Does useEffect Run?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          By default, an effect runs after every render. However, you can control exactly when it fires using the <strong>Dependency Array</strong>.
        </p>
        <DependencyToggleSimulator />
      </section>

      {/* 6. CLEANUP FUNCTION */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Cleanup Function</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          If you start a subscription or a timer, you must stop it when the component goes away. 
          The function you <code>return</code> from an effect is the <strong>Cleanup</strong>.
        </p>
        <CleanupVisualizer />
      </section>

      {/* 7. COMMON PITFALLS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500">⚠️</span> Common Pitfalls & Mistakes
        </h3>
        <PitfallPlayground />
      </section>

      {/* 8. BEST PRACTICES */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-indigo-400">Best Practices</h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'One Concern', icon: '📏', desc: 'Keep effects small. Use multiple useEffects for different tasks.' },
              { title: 'Event First', icon: '🚀', desc: 'If code runs on a click, use an event handler, not an effect.' },
              { title: 'Exhaustive Deps', icon: '📥', desc: 'Always include every variable you use inside the dependency array.' },
              { title: 'Avoid Derived', icon: '🚫', desc: 'Do not use effects to calculate values you can get from props/state.' }
            ].map(b => (
              <div key={b.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <p className="font-bold text-indigo-300 text-sm mb-2 uppercase">{b.title}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
         </div>
         
         <div className="max-w-2xl mx-auto p-8 bg-indigo-600 rounded-2xl shadow-2xl relative overflow-hidden">
            <h5 className="text-xl font-bold mb-2 relative z-10">Mental Model Summary</h5>
            <p className="text-indigo-100 italic relative z-10">
              "useEffect is an escape hatch. It allows you to synchronize your component with systems outside of React, after the user has seen the UI."
            </p>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
         </div>
      </section>
    </div>
  );
};

export default EffectsLab;
