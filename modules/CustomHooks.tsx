
import React, { useState, useEffect } from 'react';

const LogicDuplicationVisualizer = () => {
  const [refactored, setRefactored] = useState(false);

  const repeatedLogicCode = `useEffect(() => {
  const handler = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);`;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-8 overflow-hidden relative">
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">Logic Duplication Visualizer</h4>
          <p className="text-[10px] text-slate-400">Comparing components before and after refactoring</p>
        </div>
        <button 
          onClick={() => setRefactored(!refactored)}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${refactored ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}
        >
          {refactored ? 'Reset to Messy' : 'Refactor to Custom Hook'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Component A */}
        <div className={`p-6 rounded-2xl border-2 transition-all duration-700 ${refactored ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
          <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-tighter">Navbar.jsx</p>
          <div className="space-y-3">
             <div className="h-4 bg-slate-800 rounded-md w-3/4 opacity-50"></div>
             {!refactored ? (
               <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 overflow-hidden">
                 <pre className="text-[9px] font-mono text-rose-300 whitespace-pre-wrap break-words">{repeatedLogicCode}</pre>
               </div>
             ) : (
               <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-in zoom-in overflow-hidden">
                 <code className="text-[10px] font-mono text-emerald-300 font-bold whitespace-pre-wrap break-words">const width = useWindowSize();</code>
               </div>
             )}
             <div className="h-4 bg-slate-800 rounded-md w-1/2 opacity-50"></div>
          </div>
        </div>

        {/* Component B */}
        <div className={`p-6 rounded-2xl border-2 transition-all duration-700 ${refactored ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
          <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-tighter">Sidebar.jsx</p>
          <div className="space-y-3">
             <div className="h-4 bg-slate-800 rounded-md w-2/3 opacity-50"></div>
             {!refactored ? (
               <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 overflow-hidden">
                 <pre className="text-[9px] font-mono text-rose-300 whitespace-pre-wrap break-words">{repeatedLogicCode}</pre>
               </div>
             ) : (
               <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-in zoom-in overflow-hidden">
                 <code className="text-[10px] font-mono text-emerald-300 font-bold whitespace-pre-wrap break-words">const width = useWindowSize();</code>
               </div>
             )}
             <div className="h-4 bg-slate-800 rounded-md w-full opacity-50"></div>
          </div>
        </div>
      </div>

      <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 italic text-[11px] text-slate-400">
        {refactored 
          ? "✅ Clean: The messy logic lives in ONE file now. Components just ask for the result." 
          : "❌ Messy: Notice how the exact same 5 lines of code are copied into every component that needs window size."}
      </div>
    </div>
  );
};

const AnatomyVisualizer = () => {
  const [activePart, setActivePart] = useState<'none' | 'input' | 'logic' | 'output'>('none');

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <h4 className="font-bold text-slate-800 mb-8 text-center uppercase tracking-widest text-xs">Anatomy of a Custom Hook</h4>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
        <div 
          onMouseEnter={() => setActivePart('input')}
          className={`flex flex-col items-center gap-2 transition-all cursor-help ${activePart === 'input' ? 'scale-110 opacity-100' : 'opacity-40'}`}
        >
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-amber-200">📥</div>
          <p className="text-[10px] font-black uppercase text-amber-600">Inputs</p>
        </div>

        <div className="text-slate-300 font-bold rotate-90 lg:rotate-0">➜</div>

        <div 
          onMouseEnter={() => setActivePart('logic')}
          className={`flex flex-col items-center gap-2 transition-all cursor-help ${activePart === 'logic' ? 'scale-110 opacity-100' : 'opacity-40'}`}
        >
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-3xl shadow-xl">⚙️</div>
          <p className="text-[10px] font-black uppercase text-indigo-600 mt-1">Hook Logic</p>
        </div>

        <div className="text-slate-300 font-bold rotate-90 lg:rotate-0">➜</div>

        <div 
          onMouseEnter={() => setActivePart('output')}
          className={`flex flex-col items-center gap-2 transition-all cursor-help ${activePart === 'output' ? 'scale-110 opacity-100' : 'opacity-40'}`}
        >
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-emerald-200">📤</div>
          <p className="text-[10px] font-black uppercase text-emerald-600">Outputs</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 h-36 flex flex-col items-center justify-center text-center font-mono">
        {activePart === 'none' && <p className="text-slate-500 animate-pulse text-sm">Hover a part to see the definition</p>}
        {activePart === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-amber-400 text-xs mb-2 tracking-widest uppercase font-bold">Parameters</p>
            <p className="text-slate-300 text-[11px] leading-relaxed">Values the hook needs to work. Just like a normal function's arguments.</p>
          </div>
        )}
        {activePart === 'logic' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-indigo-400 text-xs mb-2 tracking-widest uppercase font-bold">Built-in Hooks</p>
            <p className="text-slate-300 text-[11px] leading-relaxed">This is where you use <code>useState</code>, <code>useEffect</code>, or <code>useRef</code> to do the heavy lifting.</p>
          </div>
        )}
        {activePart === 'output' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-emerald-400 text-xs mb-2 tracking-widest uppercase font-bold">Return Values</p>
            <p className="text-slate-300 text-[11px] leading-relaxed">The data or functions your component needs. Usually an object <code>{`{ data, loading }`}</code> or array <code>[val, setter]</code>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DecisionHelper = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const reset = () => { setStep(0); setResult(null); };

  return (
    <div className="bg-indigo-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
       <div className="relative z-10 text-center space-y-8">
          <h4 className="text-xl font-bold italic">Should This Be a Custom Hook?</h4>
          
          <div className="min-h-[160px] flex flex-col items-center justify-center">
             {step === 0 && (
               <div className="animate-in fade-in">
                 <p className="text-lg font-medium mb-6">Is this logic used (or will it be used) in <strong>multiple components</strong>?</p>
                 <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(1)} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-lg active:scale-95">YES</button>
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95">NO</button>
                 </div>
               </div>
             )}

             {step === 1 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Does the logic make the <strong>component hard to read</strong> or clutter its focus?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('YES_HOOK')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setStep(3)} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {step === 2 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Is the logic <strong>complex enough</strong> to merit being tested in isolation?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('YES_HOOK')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setResult('NO_HOOK')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {step === 3 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Is the logic <strong>completely separate</strong> from the UI layout code?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('YES_HOOK')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setResult('NO_HOOK')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {result === 'YES_HOOK' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-5xl mb-4">🎨</div>
                  <p className="text-2xl font-black text-indigo-300 uppercase tracking-tighter">Build a Custom Hook!</p>
                  <p className="text-sm text-indigo-100 opacity-70">This will make your components cleaner and your logic reusable.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Restart Helper</button>
               </div>
             )}

             {result === 'NO_HOOK' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-5xl mb-4">🏠</div>
                  <p className="text-2xl font-black text-slate-300 uppercase tracking-tighter">Keep it Local</p>
                  <p className="text-sm text-indigo-100 opacity-70">Don't over-abstract too early. Keeping simple logic in the component is often clearer.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Restart Helper</button>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

const CustomHooks: React.FC = () => {
  const [fixChallenge, setFixChallenge] = useState<'broken' | 'fixed'>('broken');

  return (
    <div className="space-y-20 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">🎨</div>
          <h3 className="text-3xl font-black tracking-tight">Custom Hooks: The Architect's Tool</h3>
        </div>
        <p className="text-indigo-50 max-w-2xl text-lg leading-relaxed relative z-10">
          Tired of writing the same logic over and over? Custom hooks let you extract and organize logic into neat, reusable packages.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem: Repeated Logic in Components</h3>
        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
          As apps grow, you'll find yourself needing the same functionality in different places—like fetching data, tracking online status, or measuring the window. 
          <br /><br />
          The problem isn't repeating UI (that's what components are for)—the problem is <strong>repeating logic</strong>. It makes code harder to fix, harder to test, and messy to read.
        </p>
        <LogicDuplicationVisualizer />
      </section>

      {/* 3. WHAT IS A CUSTOM HOOK */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is a Custom Hook?</h3>
        <p className="text-slate-600 mb-10 leading-relaxed">
          A custom hook is a regular <strong>JavaScript Function</strong> that uses React's built-in hooks (like <code>useState</code> or <code>useEffect</code>). 
          By convention, its name <strong>must</strong> start with <code>use</code>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200">
           <div className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                 Shared Logic, NOT Shared State
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                 This is the most important concept: when two components use the same hook, they <strong>do not share data</strong>. Each component gets its own fresh instance of the logic and state inside the hook.
              </p>
           </div>
           <div className="flex justify-center">
              <div className="relative group">
                 <div className="w-32 h-32 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10">
                    <div className="text-center">
                       <p className="text-[10px] font-black uppercase">Logic</p>
                       <p className="text-xl font-bold">useHook()</p>
                    </div>
                 </div>
                 <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400 rounded-3xl animate-ping opacity-20"></div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. WHY WERE THEY INTRODUCED */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Were Custom Hooks Introduced?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
          Before hooks (2019), sharing logic was <strong>awkward</strong>. Developers used patterns like "Higher-Order Components" or "Render Props" which led to "Wrapper Hell"—nested components that were hard to understand.
          <br /><br />
          Custom hooks exist because hooks exist. They allow us to <strong>compose</strong> logic as easily as we compose UI components.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl mb-2">🧱</div>
              <p className="text-xs font-bold text-slate-800 uppercase mb-1">Logic Duplication</p>
              <p className="text-[10px] text-slate-500">Custom hooks consolidate logic in one place.</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl mb-2">🧪</div>
              <p className="text-xs font-bold text-slate-800 uppercase mb-1">Testing difficulty</p>
              <p className="text-[10px] text-slate-500">You can test a hook's logic without a complex browser setup.</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-xs font-bold text-slate-800 uppercase mb-1">Complexity</p>
              <p className="text-[10px] text-slate-500">They hide complexity behind a simple function name.</p>
           </div>
        </div>
      </section>

      {/* 5. ANATOMY */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Anatomy of a Custom Hook</h3>
        <AnatomyVisualizer />
      </section>

      {/* 6. WHEN TO CREATE */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">When Should You Create a Custom Hook?</h3>
        <p className="text-slate-600 mb-10 italic">Valid reasons to extract logic...</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-emerald-900 text-sm uppercase tracking-widest">✅ Valid Reasons</h5>
              <ul className="text-xs text-emerald-800 space-y-2">
                 <li className="flex gap-2"><span>✔</span> Logic is repeated in 2+ components</li>
                 <li className="flex gap-2"><span>✔</span> Component exceeds 150+ lines</li>
                 <li className="flex gap-2"><span>✔</span> Logic is self-contained (e.g. Form Handling)</li>
                 <li className="flex gap-2"><span>✔</span> Logic is tricky (e.g. WebSockets)</li>
              </ul>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase tracking-widest">❌ Over-abstraction</h5>
              <ul className="text-xs text-rose-800 space-y-2">
                 <li className="flex gap-2"><span>✖</span> Logic used in only 1 component (usually)</li>
                 <li className="flex gap-2"><span>✖</span> Hook is just 1 or 2 lines of code</li>
                 <li className="flex gap-2"><span>✖</span> Logic is tightly coupled to specific UI elements</li>
                 <li className="flex gap-2"><span>✖</span> Naming is generic (e.g. useStuff)</li>
              </ul>
           </div>
        </div>
      </section>

      {/* 7. DECISION HELPER */}
      <DecisionHelper />

      {/* 8. COMMON MISTAKES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Common Mistakes & Pitfalls
        </h3>
        
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
              <div className="p-4 bg-slate-800 flex justify-between items-center border-b border-white/5">
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setFixChallenge('broken')} 
                      className={`px-3 py-1 rounded text-[10px] font-bold ${fixChallenge === 'broken' ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400'}`}
                    >
                      Broken Implementation
                    </button>
                    <button 
                      onClick={() => setFixChallenge('fixed')} 
                      className={`px-3 py-1 rounded text-[10px] font-bold ${fixChallenge === 'fixed' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'}`}
                    >
                      Correct Implementation
                    </button>
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Challenge</span>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[300px]">
                 <div className="space-y-4">
                    <h5 className="font-bold text-slate-300 text-sm">Mistake: {fixChallenge === 'broken' ? 'Adding UI to Hooks' : 'Pure Logic'}</h5>
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300">
                       {fixChallenge === 'broken' ? (
                         <pre className="text-rose-300 whitespace-pre-wrap break-words">{`function useModal() {
  const [open, setOpen] = useState();
  
  // ❌ WRONG: Don't return JSX!
  const Modal = () => <div>...</div>;
  
  return { open, setOpen, Modal };
}`}</pre>
                       ) : (
                         <pre className="text-emerald-300 whitespace-pre-wrap break-words">{`function useModal() {
  const [open, setOpen] = useState();
  
  // ✅ RIGHT: Only return data
  // and logic functions.
  
  return { open, setOpen };
}`}</pre>
                       )}
                    </div>
                 </div>

                 <div className="bg-white/5 rounded-2xl p-6 text-center space-y-4 border border-white/10">
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                       {fixChallenge === 'broken' 
                        ? "Hiding UI inside a hook makes it impossible to reuse the logic with a different layout. Hooks should be 'Visual-less'." 
                        : "Components are for UI. Hooks are for Logic. Keep them separate for maximum flexibility!"}
                    </p>
                    <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 9. BEST PRACTICES */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-indigo-400">Master Craftsman Checklist</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
            {[
              { title: 'One Concern', icon: '📏', desc: 'A hook should do one thing well (e.g. only Auth, not Auth + Theme).' },
              { title: 'Contract-First', icon: '📜', desc: 'Define exactly what comes in and what goes out before writing code.' },
              { title: 'Strict Naming', icon: '🏷️', desc: 'Always start with "use". It tells React to apply Hook rules.' },
              { title: 'Composition', icon: '🧱', desc: 'Use other hooks inside your custom hook. They are meant to be combined!' }
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
               "If you extract it, make it worth it. Custom hooks are an architecture choice to improve readability and reusability, not a performance optimization."
            </p>
         </div>
      </section>
    </div>
  );
};

export default CustomHooks;
