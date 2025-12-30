
import React, { useState, createContext, useContext, memo } from 'react';
import RenderFlash from '../components/RenderFlash';

const PropDrillingVisualizer = () => {
  const [mode, setMode] = useState<'drilling' | 'context'>('drilling');

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Prop Drilling vs Context</h4>
        <div className="flex bg-white/10 p-1 rounded-full">
          <button 
            onClick={() => setMode('drilling')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${mode === 'drilling' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Prop Drilling
          </button>
          <button 
            onClick={() => setMode('context')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${mode === 'context' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Context
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 relative h-80">
        {/* App Component */}
        <div className="w-40 py-3 bg-indigo-600 rounded-xl text-center font-bold text-xs shadow-xl relative z-10">
          App (Data Root)
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>

        {/* Lines */}
        <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-px bg-white/10"></div>

        {/* Middle Components */}
        <div className="flex gap-12 mt-4 relative z-10">
          <div className={`w-24 py-2 border-2 rounded-lg text-center text-[10px] font-bold transition-all ${mode === 'drilling' ? 'border-rose-400/50 bg-rose-400/10 text-rose-300' : 'border-white/10 text-slate-500'}`}>
            Navbar
            {mode === 'drilling' && <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-400 text-lg">↓</div>}
          </div>
          <div className="w-24 py-2 border-2 border-white/10 rounded-lg text-center text-[10px] font-bold text-slate-500">
            Sidebar
          </div>
        </div>

        {/* Deep Components */}
        <div className="flex flex-col items-center gap-4 mt-4 relative z-10">
          <div className={`w-24 py-2 border-2 rounded-lg text-center text-[10px] font-bold transition-all ${mode === 'drilling' ? 'border-rose-400/50 bg-rose-400/10 text-rose-300' : 'border-white/10 text-slate-500'}`}>
            UserMenu
            {mode === 'drilling' && <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-400 text-lg">↓</div>}
          </div>
          <div className={`w-32 py-3 bg-white rounded-xl text-center text-[10px] font-bold text-slate-900 shadow-xl transition-all ${mode === 'context' ? 'ring-4 ring-indigo-500 ring-offset-4 ring-offset-slate-900' : ''}`}>
            Avatar Component
            {mode === 'drilling' && <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-400 text-lg">↓</div>}
          </div>
        </div>

        {/* Context Leap Animation */}
        {mode === 'context' && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-in fade-in slide-in-from-top-4">
            <div className="w-1 h-32 bg-gradient-to-b from-amber-400 to-indigo-500/0 opacity-50"></div>
            <div className="text-amber-400 text-xs font-black uppercase tracking-widest mt-2 animate-bounce">Wireless Leap!</div>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-[11px] text-slate-400 italic max-w-sm mx-auto">
        {mode === 'drilling' 
          ? "The Avatar needs data from the App, but we have to pass it through Navbar and UserMenu even though they don't care about it." 
          : "Context allows the Avatar to 'teleport' the data directly from the App, skipping the middle-man components."}
      </p>
    </div>
  );
};

const ContextReadDemo = () => {
  const [providerValue, setProviderValue] = useState('Happy 😊');
  const [renders, setRenders] = useState(0);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
           <div className="space-y-2">
             <h4 className="font-bold text-slate-800">The Notice Board (Provider)</h4>
             <p className="text-xs text-slate-500">Change the value at the top and see who notices.</p>
           </div>
           <div className="flex gap-2">
             <button onClick={() => {setProviderValue('Happy 😊'); setRenders(r => r + 1)}} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">Happy</button>
             <button onClick={() => {setProviderValue('Coding 💻'); setRenders(r => r + 1)}} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">Coding</button>
             <button onClick={() => {setProviderValue('Tired 😴'); setRenders(r => r + 1)}} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">Tired</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-4">
             <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Code Implementation</div>
             <div className="bg-slate-800 p-4 rounded-xl font-mono text-[11px] space-y-2">
                <p><span className="text-rose-400">const</span> MoodContext = <span className="text-amber-400">createContext</span>();</p>
                <br />
                <p>{`<MoodContext.Provider value="${providerValue}">`}</p>
                <p className="pl-4">{`<ChildComponent />`}</p>
                <p>{`</MoodContext.Provider>`}</p>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200">
             <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Child Component Reads:</div>
             <div key={renders} className="text-4xl font-black text-indigo-900 animate-in zoom-in">
                {providerValue}
             </div>
             <div className="mt-4 bg-white px-3 py-1 rounded-full text-[9px] font-bold text-indigo-500 shadow-sm">
                useContext(MoodContext)
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReRenderImpactDemo = () => {
  // Fix for TS error: Being explicit with state type
  const [updateCount, setUpdateCount] = useState<number>(0);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h4 className="font-bold text-slate-800">The Cost of Convenience</h4>
           <p className="text-xs text-slate-500">Every component that "consumes" context re-renders when the value changes.</p>
        </div>
        <button 
          onClick={() => setUpdateCount(c => c + 1)}
          className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold text-xs shadow-lg active:scale-95 transition-all"
        >
          Update Context Value
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <ConsumerCard key={i} id={i} updateTrigger={updateCount} />
        ))}
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
        <span className="text-xl">⚠️</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Notice:</strong> All 5 components re-rendered! In a massive app, putting frequently changing data (like a timer or scroll position) into context can kill performance.
        </p>
      </div>
    </div>
  );
};

// Fix for TS error: Typed as React.FC to allow 'key' prop and resolve assignability issues
const ConsumerCard: React.FC<{ id: number, updateTrigger: number }> = ({ id, updateTrigger }) => {
  const [renders, setRenders] = useState(1);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setRenders(r => r + 1);
  }, [updateTrigger]);

  return (
    <div className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${updateTrigger > 0 ? 'border-rose-400 bg-rose-50' : 'border-slate-100 bg-slate-50'}`}>
       <div className="text-[10px] font-bold text-slate-400 uppercase">Consumer {id}</div>
       <div className={`text-xl font-black ${updateTrigger > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
          {renders}
       </div>
       <div className="text-[8px] font-bold text-slate-400 uppercase">Renders</div>
       {updateTrigger > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>}
    </div>
  );
};

const TabbedContextPlayground = () => {
  const [tab, setTab] = useState<'theme' | 'auth' | 'lang'>('theme');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<{name: string} | null>(null);
  const [lang, setLang] = useState<'EN' | 'ES' | 'FR'>('EN');

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50/50">
        {(['theme', 'auth', 'lang'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              tab === t ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t === 'theme' ? 'Theme Context' : t === 'auth' ? 'Auth Context' : 'Lang Context'}
          </button>
        ))}
      </div>

      <div className="p-10 min-h-[350px] flex flex-col items-center justify-center bg-slate-50/30">
        {tab === 'theme' && (
          <div className="space-y-6 text-center animate-in zoom-in duration-300">
             <div className={`w-48 h-32 rounded-3xl shadow-xl transition-all duration-500 border-4 flex flex-col items-center justify-center gap-2 ${theme === 'light' ? 'bg-white border-slate-100 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'}`}>
                <span className="text-4xl">{theme === 'light' ? '☀️' : '🌙'}</span>
                <p className="font-black text-sm uppercase tracking-widest">{theme} Mode</p>
             </div>
             <button 
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-xs"
             >
                Toggle Theme Provider
             </button>
             <p className="text-[10px] text-slate-400 italic">"The theme is shared by a Provider at the very top of your app."</p>
          </div>
        )}

        {tab === 'auth' && (
          <div className="space-y-6 text-center animate-in zoom-in duration-300">
             <div className="w-64 p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-xl flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl overflow-hidden">
                   {user ? '👤' : '❓'}
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Current User</p>
                   <p className="text-lg font-black text-slate-900">{user ? user.name : 'Guest Account'}</p>
                </div>
             </div>
             <button 
              onClick={() => setUser(user ? null : {name: 'React Master'})}
              className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${user ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'}`}
             >
                {user ? 'Logout (Clear Context)' : 'Login (Set Context)'}
             </button>
             <p className="text-[10px] text-slate-400 italic italic max-w-[240px] mx-auto">"Instead of passing user data to every page, we use AuthContext."</p>
          </div>
        )}

        {tab === 'lang' && (
          <div className="space-y-6 text-center animate-in zoom-in duration-300">
             <div className="text-4xl font-black text-slate-900 h-20 flex items-center justify-center">
                {lang === 'EN' && 'Hello, World! 👋'}
                {lang === 'ES' && '¡Hola, Mundo! 👋'}
                {lang === 'FR' && 'Bonjour, le Monde! 👋'}
             </div>
             <div className="flex gap-2">
                {(['EN', 'ES', 'FR'] as const).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${lang === l ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
                  >
                    {l}
                  </button>
                ))}
             </div>
             <p className="text-[10px] text-slate-400 italic">"Changing language in context updates every text element in the app."</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DecisionTreeHelper = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
       <div className="relative z-10 text-center space-y-8">
          <h4 className="text-xl font-bold">Context Decision Tree</h4>
          
          <div className="min-h-[160px] flex flex-col items-center justify-center">
             {step === 0 && (
               <div className="animate-in fade-in slide-in-from-bottom-2">
                 <p className="text-lg font-medium mb-6">Is the data used by <strong>many components</strong> across the app?</p>
                 <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(1)} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all">YES</button>
                    <button onClick={() => setResult('props')} className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">NO</button>
                 </div>
               </div>
             )}

             {step === 1 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Is the data deeply nested (3+ levels down)?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setResult('props')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {step === 2 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Does the data change <strong>very frequently</strong> (e.g. cursor pos)?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('state')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setResult('context')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {result === 'props' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🧱</div>
                  <p className="text-xl font-black text-indigo-300">Stick with Props!</p>
                  <p className="text-sm text-indigo-100 opacity-70">Keep it simple. Props make data flow predictable and easy to trace.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}

             {result === 'state' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🧠</div>
                  <p className="text-xl font-black text-amber-400">Keep it in Local State!</p>
                  <p className="text-sm text-indigo-100 opacity-70">Putting frequently changing data in Context causes too many re-renders. Use local state or a specialized store.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}

             {result === 'context' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">📡</div>
                  <p className="text-xl font-black text-green-400">Perfect for Context!</p>
                  <p className="text-sm text-indigo-100 opacity-70">Theme, Auth, and Language are the "big 3" use cases for useContext.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

const UseContextDeepDive: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">📡</div>
          <h3 className="text-3xl font-black">useContext Deep Dive</h3>
        </div>
        <p className="text-indigo-50 max-w-2xl text-lg leading-relaxed">
          Say goodbye to "Prop Drilling". Learn how to share data across your entire 
          component tree without passing props manually at every level.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem: Prop Drilling</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Passing props from a parent to a child, then to its child, then to its child... is called <strong>Prop Drilling</strong>. 
          It makes your code messy and components receive data they don't even use.
        </p>
        <PropDrillingVisualizer />
      </section>

      {/* 3. WHAT IS IT? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is useContext?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          <code>useContext</code> is a Hook that allows any component to access data from a <strong>Context Provider</strong>, 
          no matter how deep it is in the tree. Think of it as a "Wireless Connection" for data.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-8 rounded-3xl">
           <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Analogy: The Notice Board</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Imagine a school office with a notice board. Every classroom (component) can read the news (context) directly from the board without the teacher (parent) having to walk to every room and repeat the message.
              </p>
           </div>
           <div className="flex justify-center">
              <div className="w-40 h-40 bg-white border-8 border-amber-800 rounded-lg shadow-xl relative flex items-center justify-center">
                 <div className="absolute -top-6 -left-6 bg-amber-400 p-2 rounded shadow text-xl">📌</div>
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">Shared Info</p>
                    <p className="text-xs font-black text-slate-900 underline decoration-indigo-500 decoration-2 underline-offset-4">useContext</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. READ DEMO */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">How it Works (Read Demo)</h3>
        <ContextReadDemo />
      </section>

      {/* 5. PLAYGROUND */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">When Do We Use useContext?</h3>
        <p className="text-slate-600 mb-8 italic">Context is perfect for "Global" data that affects the whole app.</p>
        <TabbedContextPlayground />
      </section>

      {/* 6. COMPARISON TABLE */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Context vs Props vs State</h3>
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                 <tr>
                    <th className="px-6 py-4">Feature</th>
                    <th className="px-6 py-4">Props</th>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4 text-indigo-600">Context</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 <tr>
                    <td className="px-6 py-4 font-bold">Scope</td>
                    <td className="px-6 py-4">Parent → Child</td>
                    <td className="px-6 py-4">Component</td>
                    <td className="px-6 py-4 text-indigo-600">App Tree</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Triggers Re-render</td>
                    <td className="px-6 py-4">✅ Yes</td>
                    <td className="px-6 py-4">✅ Yes</td>
                    <td className="px-6 py-4">✅ Yes</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Best For</td>
                    <td className="px-6 py-4 text-[10px] leading-tight text-slate-500 font-medium">Unique data for specific components</td>
                    <td className="px-6 py-4 text-[10px] leading-tight text-slate-500 font-medium">Interactive data for current screen</td>
                    <td className="px-6 py-4 text-[10px] leading-tight text-indigo-500 font-bold uppercase">Shared settings & global config</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      {/* 7. RE-RENDER IMPACT */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Pitfalls & Performance</h3>
        <ReRenderImpactDemo />
      </section>

      {/* 8. COMMON MISTAKES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Common Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase tracking-widest">1. The "Global State" Trap</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                <strong>Mistake:</strong> Putting all your application state into one giant Context object.
                <br /><br />
                <strong>Why:</strong> When <em>any</em> small part of that object changes, <em>every</em> component using that context re-renders!
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase tracking-widest">2. Overusing Context</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                <strong>Mistake:</strong> Using context to avoid passing props just 1 or 2 levels down.
                <br /><br />
                <strong>Why:</strong> It makes components harder to reuse in other parts of the app because they become "tied" to that context.
              </p>
           </div>
        </div>
      </section>

      {/* 9. DECISION HELPER */}
      <DecisionTreeHelper />

      {/* 10. SUMMARY */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-indigo-400">Mental Model</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h5 className="font-bold text-indigo-300 text-sm mb-2 uppercase">Best Practices Checklist</h5>
               <ul className="text-xs text-slate-400 space-y-2">
                  <li>• Use separate Contexts for separate concerns (e.g. Theme vs Auth)</li>
                  <li>• Keep Context values as small and stable as possible</li>
                  <li>• Prefer props for simple parent-to-child communication</li>
                  <li>• Provide default values for when a component is used without a Provider</li>
               </ul>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h5 className="font-bold text-amber-300 text-sm mb-2 uppercase">The 3-Step Flow</h5>
               <ol className="text-xs text-slate-400 space-y-2">
                  <li><strong>1. Create:</strong> const MyCtx = createContext();</li>
                  <li><strong>2. Provide:</strong> &lt;MyCtx.Provider value=... &gt;</li>
                  <li><strong>3. Consume:</strong> const data = useContext(MyCtx);</li>
               </ol>
            </div>
         </div>

         <div className="max-w-2xl mx-auto p-8 bg-indigo-600 rounded-2xl shadow-2xl relative overflow-hidden">
            <p className="text-xl font-bold">The Takeaway</p>
            <p className="text-indigo-50 mt-2 italic">
               "useContext is for data that describes the ENVIRONMENT (theme, user, language), while props are for data that describes the COMPONENT (items, labels, titles)."
            </p>
         </div>
      </section>
    </div>
  );
};

export default UseContextDeepDive;
