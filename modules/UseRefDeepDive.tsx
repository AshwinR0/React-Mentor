import React, { useState, useRef, useEffect, memo } from 'react';
import RenderFlash from '../components/RenderFlash';

const RefValueInspector = () => {
  const [renderCount, setRenderCount] = useState(0);
  const myRef = useRef(0);
  const [, forceUpdate] = useState({});

  return (
    <div className="bg-slate-900 p-8 rounded-2xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">The Invisible Box</h4>
          <p className="text-sm text-slate-400">Updating <code>ref.current</code> does <strong>NOT</strong> tell React to update the screen. It's like writing a note and putting it in a box—the box is updated, but the screen doesn't know.</p>
          <div className="flex gap-2">
            <button 
              onClick={() => { myRef.current += 1; }}
              className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg"
            >
              Update Ref Value (+1)
            </button>
            <button 
              onClick={() => { forceUpdate({}); setRenderCount(c => c + 1); }}
              className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-all active:scale-95"
            >
              Force Render (See changes)
            </button>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 text-center">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ref Content (Current)</p>
            <div className="text-4xl font-black text-indigo-400">{myRef.current}</div>
          </div>
          <div className="w-full h-px bg-white/10"></div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Render Count</p>
            <div className="text-2xl font-black text-white">{renderCount}</div>
            <p className="text-[10px] text-slate-500 italic">"Ref updated → No re-render"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonLab = () => {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  let normalVar = 0;

  const [trigger, setTrigger] = useState(0);
  const forceUpdate = () => setTrigger(t => t + 1);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Normal Var */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-4 text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Normal Variable</div>
          <div className="text-3xl font-black text-slate-400">{normalVar}</div>
          <button onClick={() => { normalVar += 1; console.log(normalVar); forceUpdate(); }} className="w-full py-2 bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold">Reset on Render</button>
          <p className="text-[9px] text-slate-400 leading-tight">Wiped every time the function re-runs.</p>
        </div>

        {/* React State */}
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200 flex flex-col items-center gap-4 text-center">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">React State</div>
          <div className="text-3xl font-black text-indigo-600">{stateCount}</div>
          <button onClick={() => setStateCount(s => s + 1)} className="w-full py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-bold shadow-sm">Persist + Render</button>
          <p className="text-[9px] text-indigo-400 leading-tight">Remembers value AND triggers a screen update.</p>
        </div>

        {/* useRef */}
        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col items-center gap-4 text-center">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">useRef</div>
          <div className="text-3xl font-black text-amber-600">{refCount.current}</div>
          <button onClick={() => { refCount.current += 1; forceUpdate(); }} className="w-full py-2 bg-amber-500 text-white rounded-lg text-[10px] font-bold shadow-sm">Persist + Silent</button>
          <p className="text-[9px] text-amber-600 leading-tight">Remembers value BUT stays silent (No re-render).</p>
        </div>
      </div>
    </div>
  );
};

const UseRefPlayground = () => {
  const [tab, setTab] = useState<'dom' | 'prev' | 'timer' | 'render'>('dom');
  // Added dummy state to trigger re-renders for the Render Tracker tab
  const [, setTrigger] = useState(0);

  // DOM logic
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();

  // Prev value logic
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  useEffect(() => {
    prevCountRef.current = count;
  });

  // Timer logic
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => setTimer(t => t + 1), 1000);
  };
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Render logic
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {(['dom', 'prev', 'timer', 'render'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              tab === t ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400'
            }`}
          >
            {t === 'dom' ? 'DOM Access' : t === 'prev' ? 'Prev Values' : t === 'timer' ? 'Mutable Timer' : 'Render Tracker'}
          </button>
        ))}
      </div>

      <div className="p-10 min-h-[300px] flex flex-col items-center justify-center bg-slate-50/30">
        {tab === 'dom' && (
          <div className="max-w-xs w-full space-y-4 animate-in zoom-in duration-300">
            <h5 className="text-center font-bold text-slate-800 text-sm">Direct DOM Access</h5>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Focus me with a ref!"
              className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
            <button 
              onClick={focusInput}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs"
            >
              Focus Input Programmatically
            </button>
            <p className="text-[10px] text-slate-400 text-center italic">"React normally handles UI, but sometimes we need to reach out and touch the browser directly."</p>
          </div>
        )}

        {tab === 'prev' && (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
            <h5 className="font-bold text-slate-800 text-sm">Tracking Previous State</h5>
            <div className="flex gap-8 justify-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Now</p>
                <div className="text-4xl font-black text-indigo-600">{count}</div>
              </div>
              <div className="flex items-center text-slate-300 text-2xl font-bold">←</div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Before</p>
                <div className="text-4xl font-black text-slate-300">{prevCountRef.current}</div>
              </div>
            </div>
            <button onClick={() => setCount(c => c + 1)} className="px-6 py-2 bg-slate-800 text-white rounded-full font-bold text-xs">Update Value</button>
            <p className="text-[10px] text-slate-400 max-w-xs mx-auto italic">"We update the ref in useEffect after render, effectively storing a 'snapshot' of the old value."</p>
          </div>
        )}

        {tab === 'timer' && (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
             <h5 className="font-bold text-slate-800 text-sm">Mutable Reference (Interval)</h5>
             <div className="text-5xl font-mono font-black text-indigo-600 tracking-tighter">
                {String(Math.floor(timer / 60)).padStart(2, '0')}:
                {String(timer % 60).padStart(2, '0')}
             </div>
             <div className="flex gap-2">
                <button onClick={startTimer} className="px-6 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-xs">Start</button>
                <button onClick={stopTimer} className="px-6 py-2 bg-rose-100 text-rose-700 rounded-lg font-bold text-xs">Stop</button>
                <button onClick={() => { stopTimer(); setTimer(0); }} className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs">Reset</button>
             </div>
             <p className="text-[10px] text-slate-400 max-w-xs mx-auto italic">"We store the Interval ID in a ref so it doesn't get lost when the component re-renders every second."</p>
          </div>
        )}

        {tab === 'render' && (
          <div className="text-center space-y-4 animate-in zoom-in duration-300">
             <h5 className="font-bold text-slate-800 text-sm">The "Hidden" Counter</h5>
             <div className="p-8 bg-indigo-600 text-white rounded-3xl shadow-xl">
                <p className="text-[10px] uppercase font-bold opacity-60 mb-2 tracking-widest">Times Rendered</p>
                <div className="text-6xl font-black">{renders.current}</div>
             </div>
             <button onClick={() => setTrigger(t => t + 1)} className="px-4 py-2 bg-slate-100 border text-slate-600 rounded-lg text-xs font-bold">Trigger Render</button>
             <p className="text-[10px] text-slate-400 italic">"This ref value is updated during every render but never triggers one itself."</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DecisionHelper = () => {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<boolean | null>(null);

  const reset = () => {
    setStep(0);
    setAns(null);
  };

  return (
    <div className="bg-indigo-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
       <div className="relative z-10 text-center space-y-8">
          <h4 className="text-xl font-bold">Decision Helper: State or Ref?</h4>
          
          <div className="min-h-[160px] flex flex-col items-center justify-center">
             {step === 0 && (
               <div className="animate-in fade-in slide-in-from-bottom-2">
                 <p className="text-lg font-medium mb-6">Does the <strong>UI</strong> depend on this value to change immediately?</p>
                 <div className="flex gap-4 justify-center">
                    <button onClick={() => { setAns(true); setStep(1); }} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all">YES</button>
                    <button onClick={() => { setAns(false); setStep(1); }} className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">NO</button>
                 </div>
               </div>
             )}

             {step === 1 && ans === true && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🧠</div>
                  <p className="text-xl font-black text-indigo-300">Use useState!</p>
                  <p className="text-sm text-indigo-100 opacity-70">If the visual interface needs to react, state is your only choice.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}

             {step === 1 && ans === false && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Should updating this value trigger a <strong>re-render</strong>?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setStep(3)} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {step === 2 && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🏗️</div>
                  <p className="text-xl font-black text-indigo-300">Use useState!</p>
                  <p className="text-sm text-indigo-100 opacity-70">Even if not used in JSX, if it needs to trigger logic on render, use state.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}

             {step === 3 && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🔦</div>
                  <p className="text-xl font-black text-amber-400">Use useRef!</p>
                  <p className="text-sm text-indigo-100 opacity-70">Perfect for DOM refs, timers, or simple flags.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}
          </div>
       </div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
    </div>
  );
};

const MistakeSimulator = () => {
  const [fixed, setFixed] = useState(false);
  const [count, setCount] = useState(0);
  const badRef = useRef(0);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
       <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-800">The "Reactive Ref" Trap</h4>
          <button 
            onClick={() => setFixed(!fixed)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${fixed ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}
          >
            {fixed ? 'FIXED' : 'BROKEN'}
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-slate-300">
                {fixed ? (
                  <pre className="text-green-400">{`// CORRECT: Use state for UI
const [count, setCount] = useState(0);
return <h1>{count}</h1>;`}</pre>
                ) : (
                  <pre className="text-rose-400">{`// ERROR: Expecting ref to update UI
const myRef = useRef(0);
return <h1>{myRef.current}</h1>;`}</pre>
                )}
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed italic">"Beginners often try to use refs as state to avoid 'excessive rendering', but then wonder why the screen stays empty."</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
             <div className="text-[10px] uppercase font-bold text-slate-400">Visual Output</div>
             <div className="text-5xl font-black text-slate-800">
                {fixed ? count : badRef.current}
             </div>
             <button 
              onClick={() => {
                if (fixed) setCount(c => c + 1);
                else {
                  badRef.current += 1;
                  // We need something to trigger UI or it'll never show
                  console.log('Ref is now:', badRef.current);
                }
              }}
              className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
             >
                Click to Increment
             </button>
             {!fixed && <p className="text-[10px] text-rose-500 font-bold animate-pulse">Wait! Why isn't it updating?</p>}
          </div>
       </div>
    </div>
  );
};

const UseRefDeepDive: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-amber-500 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">🔦</div>
          <h3 className="text-3xl font-black">useRef Deep Dive</h3>
        </div>
        <p className="text-amber-50 max-w-2xl text-lg leading-relaxed">
          The "Escape Hatch" of React. Learn how to persist data between renders 
          without triggering the re-rendering machine.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. WHAT IS IT? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is useRef?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          <code>useRef</code> creates a <strong>mutable container</strong> (a JavaScript object with a <code>.current</code> property). 
          Think of it as a special pocket in your component that survives re-renders, allowing you to store stuff that doesn't need to be seen immediately.
        </p>
        <RefValueInspector />
      </section>

      {/* 3. WHY WAS IT INTRODUCED? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Do We Need It?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          React functions re-run from top-to-bottom on every render. Normal variables are "lost" every time. 
          State remembers data, but it <strong>forces</strong> a re-render. <code>useRef</code> is the middle ground: <strong>Persistent but Silent.</strong>
        </p>
        <ComparisonLab />
      </section>

      {/* 4. DIFFERENT USES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Different Ways We Use useRef</h3>
        <p className="text-slate-600 mb-8 italic">From DOM access to tracking history, refs are incredibly versatile.</p>
        <UseRefPlayground />
      </section>

      {/* 5. VS STATE TABLE */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">useRef vs useState</h3>
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                 <tr>
                    <th className="px-6 py-4">Feature</th>
                    <th className="px-6 py-4">useState</th>
                    <th className="px-6 py-4 text-amber-600">useRef</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 <tr>
                    <td className="px-6 py-4 font-bold">Triggers re-render</td>
                    <td className="px-6 py-4 text-green-600">✅ Yes</td>
                    <td className="px-6 py-4 text-rose-500">❌ No</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Persists across renders</td>
                    <td className="px-6 py-4 text-green-600">✅ Yes</td>
                    <td className="px-6 py-4 text-green-600">✅ Yes</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Used for UI data</td>
                    <td className="px-6 py-4 text-green-600">✅ Yes</td>
                    <td className="px-6 py-4 text-rose-500">❌ No</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Mutable</td>
                    <td className="px-6 py-4 text-rose-500">❌ No (use setter)</td>
                    <td className="px-6 py-4 text-green-600">✅ Yes (ref.current)</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      {/* 6. COMMON PITFALLS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Common Pitfalls & Mistakes
        </h3>
        <MistakeSimulator />
      </section>

      {/* 7. DECISION HELPER */}
      <DecisionHelper />

      {/* 8. BEST PRACTICES & SUMMARY */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-amber-400">Mental Model</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left">
               <h5 className="font-bold text-amber-300 text-sm mb-2 uppercase">DO Use useRef For:</h5>
               <ul className="text-xs text-slate-400 space-y-2">
                  <li>• Focus, scroll, and text selection</li>
                  <li>• Storing Interval/Timeout IDs</li>
                  <li>• Measuring DOM elements</li>
                  <li>• Storing "prev" values for comparison</li>
               </ul>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left">
               <h5 className="font-bold text-rose-300 text-sm mb-2 uppercase">DON'T Use useRef For:</h5>
               <ul className="text-xs text-slate-400 space-y-2">
                  <li>• Showing items in a list</li>
                  <li>• Controlling form input values (usually)</li>
                  <li>• Anything the user sees change on screen</li>
                  <li>• Calculation data for your JSX</li>
               </ul>
            </div>
         </div>

         <div className="max-w-2xl mx-auto p-6 bg-amber-600 rounded-2xl shadow-2xl">
            <p className="text-lg font-bold">Key Takeaway</p>
            <p className="text-amber-50 mt-2 italic">
               "If you want React to remember something but you don't want it to 'talk back' (re-render), reaching for a Ref is the right move."
            </p>
         </div>
      </section>
    </div>
  );
};

export default UseRefDeepDive;