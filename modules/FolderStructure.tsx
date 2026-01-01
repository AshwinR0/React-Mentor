
import React, { useState, useEffect } from 'react';

const ModuleSystemInteractive = () => {
  const [exportType, setExportType] = useState<'default' | 'named'>('default');
  const [pulse, setPulse] = useState(false);

  const runPulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 1000);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
        
        {/* Source File */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source: component.js</span>
            <div className="flex bg-slate-200 p-0.5 rounded-lg">
               <button 
                onClick={() => setExportType('default')}
                className={`px-3 py-1 rounded-md text-[9px] font-bold transition-all ${exportType === 'default' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
               >
                Default
               </button>
               <button 
                onClick={() => setExportType('named')}
                className={`px-3 py-1 rounded-md text-[9px] font-bold transition-all ${exportType === 'named' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
               >
                Named
               </button>
            </div>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-[11px] h-32 flex flex-col justify-center shadow-inner">
             <p className="text-slate-500 mb-2">// How we ship code</p>
             {exportType === 'default' ? (
               <p className="text-emerald-400"><span className="text-rose-400">export default</span> Button;</p>
             ) : (
               <p className="text-emerald-400"><span className="text-rose-400">export const</span> Button = ...</p>
             )}
          </div>
          
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-[10px] text-amber-800 leading-relaxed italic">
             {exportType === 'default' 
               ? "Default: A file can only have ONE default export. Think of it as the main 'gift' from the file." 
               : "Named: A file can have many named exports. Think of it as a 'box of tools'."}
          </div>
        </div>

        {/* The Connection */}
        <div className="flex flex-col items-center justify-center gap-2">
           <button 
            onClick={runPulse}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-[10px] uppercase shadow-lg active:scale-95 transition-all"
           >
             Simulate Import
           </button>
           <div className="relative w-full h-10 flex items-center justify-center">
              <div className="h-px w-full bg-slate-200"></div>
              {pulse && (
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full blur-sm animate-flow-right shadow-lg shadow-indigo-500/50"></div>
              )}
           </div>
        </div>

        {/* Consumer File */}
        <div className="space-y-4">
          <div className="px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consumer: App.js</span>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-[11px] h-32 flex flex-col justify-center shadow-inner relative overflow-hidden">
             <div className="absolute top-2 right-2 text-[8px] font-bold text-indigo-400 uppercase opacity-30">The Taker</div>
             <p className="text-slate-500 mb-2">// How we receive code</p>
             {exportType === 'default' ? (
               <p className="text-indigo-300">
                 <span className="text-rose-400">import</span> Button <span className="text-rose-400">from</span> <span className="text-emerald-400">'./Button'</span>;
               </p>
             ) : (
               <p className="text-indigo-300">
                 <span className="text-rose-400">import</span> <span className="text-white">{`{ Button }`}</span> <span className="text-rose-400">from</span> <span className="text-emerald-400">'./Button'</span>;
               </p>
             )}
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] text-indigo-800 leading-relaxed italic">
             {exportType === 'default' 
               ? "No curly braces needed! You can even rename it: import MyBtn from './Button'." 
               : "Curly braces are MANDATORY! The name must match exactly what was exported."}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow-right {
          0% { left: 0; opacity: 0; transform: translateY(-50%) scale(0.5); }
          50% { opacity: 1; transform: translateY(-50%) scale(1); }
          100% { left: 100%; opacity: 0; transform: translateY(-50%) scale(0.5); }
        }
        .animate-flow-right {
          animation: flow-right 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

const PackageComparisonInteractive = () => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [rangeType, setRangeType] = useState<'caret' | 'tilde' | 'exact'>('caret');
  const [hasLocked, setHasLocked] = useState(false);

  const getRange = () => {
    if (rangeType === 'caret') return '^18.2.0';
    if (rangeType === 'tilde') return '~18.2.0';
    return '18.2.0';
  };

  const getResolved = () => {
    if (rangeType === 'caret') return '18.3.1'; // Latest minor/patch
    if (rangeType === 'tilde') return '18.2.9'; // Latest patch only
    return '18.2.0'; // Exactly what was requested
  };

  const runInstall = () => {
    setIsInstalling(true);
    setHasLocked(false);
    setTimeout(() => {
      setIsInstalling(false);
      setHasLocked(true);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Analogy Box */}
      <div className="p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
        <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <span>☕</span> The Coffee Analogy
        </h4>
        <p className="text-amber-800 text-sm leading-relaxed">
          Imagine writing "Any Bag of Coffee" on your shopping list (<strong>package.json</strong>). You're okay with anything that fits that description. 
          The store receipt (<strong>package-lock.json</strong>) records that you bought "Organic Sumatran Dark Roast, 12oz, Batch #881". 
          To make sure your teammate drinks the <em>exact same</em> cup of coffee tomorrow, they need your <strong>receipt</strong>, not just your list.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Interactive Registry Resolver</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => setRangeType('caret')}
                className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${rangeType === 'caret' ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Caret (^)
              </button>
              <button 
                onClick={() => setRangeType('tilde')}
                className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${rangeType === 'tilde' ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Tilde (~)
              </button>
              <button 
                onClick={() => setRangeType('exact')}
                className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${rangeType === 'exact' ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Exact
              </button>
            </div>
          </div>
          <button 
            onClick={runInstall}
            disabled={isInstalling}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isInstalling ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {isInstalling ? 'Running npm install...' : 'Run npm install'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 relative">
          {/* Left: package.json */}
          <div className="bg-white p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-indigo-600">📄</span>
              <h5 className="font-bold text-slate-800 text-sm">package.json</h5>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl font-mono text-xs text-indigo-300 shadow-inner min-h-[160px] flex flex-col justify-center">
              <p className="text-slate-500 mb-2">{"// The Wishlist"}</p>
              <div className="space-y-1">
                <p>"{`dependencies`}" : &#123;</p>
                <p className="pl-4">
                  "react": "<span className="text-amber-300 font-bold underline decoration-amber-500 underline-offset-4">{getRange()}</span>"
                </p>
                <p>&#125;</p>
              </div>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] text-indigo-700 leading-relaxed italic">
              {rangeType === 'caret' && "Caret (^) allows new minor versions (e.g., 18.3.0, 18.4.0) but not major ones (19.0.0)."}
              {rangeType === 'tilde' && "Tilde (~) allows only patch versions (e.g., 18.2.1, 18.2.2). Very conservative."}
              {rangeType === 'exact' && "Exact versions disable all automatic updates. Safest but requires manual work."}
            </div>
          </div>

          {/* Right: package-lock.json */}
          <div className="bg-slate-900 p-8 space-y-4 relative">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">🔒</span>
              <h5 className="font-bold text-slate-300 text-sm">package-lock.json</h5>
            </div>
            <div className={`transition-all duration-700 min-h-[160px] flex flex-col justify-center ${isInstalling ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
              {hasLocked ? (
                <div className="bg-slate-950 p-6 rounded-2xl font-mono text-xs text-emerald-400 shadow-inner border border-emerald-500/20 animate-in zoom-in-95">
                  <p className="text-slate-500 mb-2">{"// The Detailed Receipt"}</p>
                  <div className="space-y-1">
                    <p>"react": &#123;</p>
                    <p className="pl-4">"version": "<span className="font-black underline decoration-emerald-500 underline-offset-4">{getResolved()}</span>",</p>
                    <p className="pl-4 opacity-50">"resolved": "https://registry.npmjs.org/...",</p>
                    <p className="pl-4 opacity-50">"integrity": "sha512-..."</p>
                    <p>&#125;</p>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 text-[10px] uppercase font-bold tracking-widest italic">
                  Run install to generate lock
                </div>
              )}
            </div>
            {hasLocked && (
               <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] text-emerald-400 leading-relaxed italic animate-in fade-in">
                "Regardless of the range in package.json, everyone on your team will now install exactly <strong>{getResolved()}</strong>."
              </div>
            )}
            
            {/* Visual Arrow for Handoff */}
            {isInstalling && (
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-50 text-indigo-400 text-4xl animate-bounce">➜</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReactVsDomInteractive = () => {
  const [step, setStep] = useState<'idle' | 'architect' | 'contractor'>('idle');
  const [uiValue, setUiValue] = useState('Hello World');

  const runSimulation = () => {
    setStep('architect');
    setTimeout(() => setStep('contractor'), 1500);
    setTimeout(() => setStep('idle'), 3500);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Left: Design Studio (React) */}
        <div className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-500 relative ${step === 'architect' ? 'border-indigo-500 bg-white shadow-xl scale-105 z-20' : 'border-slate-200 bg-slate-50/50 opacity-60'}`}>
          <div className="absolute -top-3 left-4 px-2 bg-indigo-600 text-white text-[9px] font-black uppercase rounded">The Architect (React)</div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="text-2xl">⚛️</div>
               <div>
                  <p className="text-xs font-bold text-slate-800 uppercase">Package: "react"</p>
                  <p className="text-[10px] text-slate-400 font-medium">Responsibility: Logic & Blueprints</p>
               </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-indigo-300">
               <p className="text-slate-500 mb-1">// 1. Handles state logic</p>
               <p className="text-white">const [text, setText] = useState(...)</p>
               <p className="text-slate-500 my-1">// 2. Creates the "Blueprint"</p>
               <p className="text-emerald-400">{`return <h1>{text}</h1>`}</p>
            </div>

            {step === 'architect' && (
              <div className="animate-in slide-in-from-bottom-2 fade-in p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
                 <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Blueprint Generated</p>
                 <div className="h-10 w-full border-2 border-dashed border-indigo-300 rounded flex items-center justify-center text-[10px] text-indigo-400 italic">
                    Virtual DOM: "{uiValue}"
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Hand-off */}
        <div className="flex flex-col items-center justify-center py-4">
           <div className={`text-2xl transition-all duration-500 ${step === 'contractor' ? 'text-indigo-600 scale-125' : 'text-slate-200'}`}>➜</div>
           <div className={`text-[8px] font-black uppercase transition-all whitespace-nowrap ${step === 'contractor' ? 'text-indigo-600' : 'text-slate-300'}`}>Handoff</div>
        </div>

        {/* Right: Construction Site (ReactDOM) */}
        <div className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-500 relative ${step === 'contractor' ? 'border-green-500 bg-white shadow-xl scale-105 z-20' : 'border-slate-200 bg-slate-50/50 opacity-60'}`}>
          <div className="absolute -top-3 left-4 px-2 bg-green-600 text-white text-[9px] font-black uppercase rounded">The Contractor (ReactDOM)</div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="text-2xl">🛠️</div>
               <div>
                  <p className="text-xs font-bold text-slate-800 uppercase">Package: "react-dom"</p>
                  <p className="text-[10px] text-slate-400 font-medium">Responsibility: Building in Browser</p>
               </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 font-mono text-[10px] text-slate-600">
               <p className="mb-1 opacity-60 italic">{"// 3. Takes blueprint & builds it"}</p>
               <p><span className="text-green-600 font-bold">root.render</span>(blueprint)</p>
            </div>

            <div className="relative h-20 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-white/5 shadow-inner">
               <span className="absolute top-1 left-2 text-[8px] font-black text-white/20 uppercase tracking-tighter">Real Browser DOM</span>
               {step === 'contractor' ? (
                 <div className="text-white font-black text-sm animate-in zoom-in-50 bg-indigo-600 px-3 py-1 rounded shadow-lg border-b-2 border-indigo-700">
                    {uiValue}
                 </div>
               ) : (
                 <div className="text-slate-700 text-[10px] italic">Construction Site Empty</div>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-6">
        <div className="flex-1 space-y-1">
           <p className="text-[11px] text-slate-500 leading-relaxed italic">
             "Notice how the <strong>Architect (React)</strong> doesn't know what a Browser is. It just makes plans. 
             The <strong>Contractor (ReactDOM)</strong> knows how to use a hammer and nails (DOM APIs) to build those plans on the web."
           </p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={uiValue}
            onChange={(e) => setUiValue(e.target.value)}
            disabled={step !== 'idle'}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none w-32 disabled:opacity-50"
            placeholder="Change UI..."
          />
          <button 
            onClick={runSimulation}
            disabled={step !== 'idle'}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            Start UI Update
          </button>
        </div>
      </div>
    </div>
  );
};

const FolderStructure: React.FC = () => {
  // 1. React vs ReactDOM Toggle (Legacy - Kept for reference but simulator replaced)
  const [reactStage, setReactStage] = useState<'react' | 'dom'>('react');

  // 2. Platform Switcher
  const [platform, setPlatform] = useState<'web' | 'mobile'>('web');

  // 3. Script Loading
  const [scriptType, setScriptType] = useState<'async' | 'defer'>('async');
  const [isPlaying, setIsPlaying] = useState(false);

  // 5. Bundler
  const [bundler, setBundler] = useState<'Vite' | 'Webpack' | 'Parcel'>('Vite');

  // 6. Bundler Concepts
  const [treeShaking, setTreeShaking] = useState(false);
  const [hmrEnabled, setHmrEnabled] = useState(true);

  // 8. Drag & Drop Mock
  const [dependencies, setDependencies] = useState<any[]>([
    { name: 'react', category: null, correct: 'dep' },
    { name: 'eslint', category: null, correct: 'dev' },
    { name: 'vite', category: null, correct: 'dev' },
  ]);

  // 10. ES6 Mapper
  const [es6Feature, setEs6Feature] = useState<'arrow' | 'destruct'>('arrow');

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      {/* HEADER SECTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">React Folder Structure & Tooling</h2>
        <p className="text-indigo-100 max-w-2xl text-lg">
          Let's demystify the ecosystem. React isn't just a single file; it's a team of tools working together to build your app.
        </p>
      </section>

      {/* 1. React vs ReactDOM (REFACTORED INTERACTIVE) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">React vs ReactDOM — What’s the Difference?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl">
          It's common to think they are the same, but they are separate packages for a reason. 
          React is the <strong>Brain</strong> that handles logic, while ReactDOM is the <strong>Hands</strong> that actually touch the browser.
        </p>

        <ReactVsDomInteractive />
      </section>

      {/* 2. Why are they separate? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Why Separate Packages?</h3>
        <p className="text-slate-600 mb-8">Because React can build more than just websites. The "Brain" (React) is the same, but the "Translator" (Renderer) changes.</p>

        <div className="max-w-md mx-auto p-8 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setPlatform('web')} className={`px-4 py-2 rounded-lg font-bold text-xs ${platform === 'web' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border'}`}>Web</button>
            <button onClick={() => setPlatform('mobile')} className={`px-4 py-2 rounded-lg font-bold text-xs ${platform === 'mobile' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-400 border'}`}>Mobile</button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="p-4 bg-indigo-600 text-white rounded-xl w-32 text-center font-bold text-sm shadow-lg">React Code</div>
            <div className="text-slate-300">↓</div>
            <div className={`p-4 rounded-xl w-40 text-center font-bold text-xs transition-all shadow-md ${platform === 'web' ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' : 'bg-purple-100 text-purple-700 border-2 border-purple-500'}`}>
              {platform === 'web' ? 'react-dom renderer' : 'react-native renderer'}
            </div>
            <div className="text-slate-300">↓</div>
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
              {platform === 'web' ? (
                <div className="text-4xl">🌐</div>
              ) : (
                <div className="text-4xl">📱</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. async vs defer */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">How Scripts Load: async vs defer</h3>
        <p className="text-slate-600 mb-8">Modern React apps use <code>defer</code> (or module scripts) to ensure the HTML loads before the JavaScript runs.</p>

        <div className="bg-slate-900 p-8 rounded-2xl">
          <div className="flex gap-4 mb-10">
            <button onClick={() => {setScriptType('async'); setIsPlaying(true)}} className={`px-3 py-1.5 rounded text-xs font-bold ${scriptType === 'async' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>Test ASYNC</button>
            <button onClick={() => {setScriptType('defer'); setIsPlaying(true)}} className={`px-3 py-1.5 rounded text-xs font-bold ${scriptType === 'defer' ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400'}`}>Test DEFER</button>
            <button onClick={() => setIsPlaying(false)} className="ml-auto text-slate-500 text-xs">Reset</button>
          </div>

          <div className="space-y-6 relative h-32">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-500 w-16">HTML Parsing</span>
              <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden relative">
                <div className={`h-full bg-slate-600 transition-all duration-[3000ms] ease-linear ${isPlaying ? 'w-full' : 'w-0'}`}></div>
                {isPlaying && scriptType === 'async' && (
                  <div className="absolute left-[30%] top-0 bottom-0 w-2 bg-red-900 animate-pulse"></div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-500 w-16">JS Loading</span>
              <div className="flex-1 h-4 bg-slate-800 rounded-full relative overflow-hidden">
                <div className={`h-full absolute transition-all duration-[1000ms] ease-linear ${isPlaying ? 'bg-indigo-500 left-[20%] w-[30%]' : 'w-0'}`}></div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-500 w-16">JS Executing</span>
              <div className="flex-1 h-4 bg-slate-800 rounded-full relative overflow-hidden">
                <div className={`h-full absolute transition-all ease-linear ${isPlaying ? (scriptType === 'async' ? 'bg-red-500 left-[50%] w-[20%] duration-[500ms]' : 'bg-green-500 left-[100%] -translate-x-full w-[20%] duration-[500ms]') : 'w-0'}`}></div>
              </div>
            </div>

            {isPlaying && scriptType === 'async' && (
              <div className="absolute top-0 bottom-0 left-[50%] flex flex-col items-center">
                <div className="h-full w-px bg-red-500/30"></div>
                <span className="text-[8px] text-red-400 font-bold bg-red-950 px-1 rounded absolute -top-4">BLOCKING!</span>
              </div>
            )}
          </div>
          <p className="mt-8 text-[10px] text-slate-400 italic text-center">
            {scriptType === 'async' ? "Async runs as soon as it's downloaded, often stopping the page from loading." : "Defer waits until the HTML is fully parsed before running."}
          </p>
        </div>
      </section>

      {/* 4. What is NPM? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">npm</div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">NPM: The App Store for Code</h3>
            <p className="text-sm text-slate-500">Node Package Manager handles your libraries and tools.</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
           <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Dependency Explorer</h4>
           <div className="bg-white rounded-xl p-4 border shadow-inner font-mono text-xs">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                 <span>📁</span> <strong>node_modules</strong>
              </div>
              <div className="pl-6 space-y-1">
                 <details open className="cursor-pointer group">
                    <summary className="flex items-center gap-2 hover:bg-slate-50 rounded px-1 transition-colors">
                       <span className="text-indigo-400 group-open:rotate-90 transition-transform">▸</span>
                       <span className="text-slate-800 font-bold">react</span>
                       <span className="text-[10px] text-slate-400">v18.3.1</span>
                    </summary>
                    <div className="pl-6 py-1 text-slate-400 text-[10px] space-y-1">
                       <p>📄 index.js</p>
                       <p>📄 package.json</p>
                       <p>📁 cjs</p>
                    </div>
                 </details>
                 <div className="flex items-center gap-2 pl-4 text-slate-500">
                    <span>▸</span> <strong>react-dom</strong>
                 </div>
                 <div className="flex items-center gap-2 pl-4 text-slate-500">
                    <span>▸</span> <strong>scheduler</strong>
                 </div>
              </div>
           </div>
           <p className="mt-4 text-xs text-slate-500 italic">"When you run <code>npm install</code>, you are telling NPM to download these folders into your project."</p>
        </div>
      </section>

      {/* 5. Bundlers */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Module Bundlers</h3>
        <p className="text-slate-600 mb-8 italic">Browsers can't read JSX or multiple modern files easily. Bundlers "pack" them together.</p>

        <div className="flex justify-center gap-2 mb-10">
          {['Vite', 'Webpack', 'Parcel'].map(b => (
            <button 
              key={b} 
              onClick={() => setBundler(b as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${bundler === b ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400'}`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 justify-center py-10">
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-white border rounded shadow-sm text-[10px] font-mono">App.jsx</div>
            <div className="p-3 bg-white border rounded shadow-sm text-[10px] font-mono">Header.jsx</div>
            <div className="p-3 bg-white border rounded shadow-sm text-[10px] font-mono">style.css</div>
          </div>
          <div className="text-indigo-300 animate-pulse text-2xl">➜</div>
          <div className="w-32 h-32 bg-indigo-600 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl relative">
            <span className="text-xl font-black">{bundler}</span>
            <span className="text-[8px] uppercase font-bold opacity-70">Bundler</span>
            {/* Spinning particles around bundler */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow"></div>
          </div>
          <div className="text-green-300 text-2xl">➜</div>
          <div className="flex flex-col gap-2">
            <div className="p-4 bg-green-500 text-white rounded-lg shadow-lg text-[10px] font-mono text-center">
              bundle.js
              <div className="text-[8px] opacity-70 mt-1">Ready for Browser</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bundler Concepts */}
      <section className="bg-slate-900 p-10 rounded-3xl text-white">
        <h3 className="text-2xl font-bold mb-8">Bundler Superpowers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className={`p-6 rounded-2xl border-2 transition-all ${treeShaking ? 'bg-indigo-500/20 border-indigo-400' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center justify-between mb-4">
                 <h4 className="font-bold text-indigo-300">Tree Shaking</h4>
                 <button onClick={() => setTreeShaking(!treeShaking)} className={`px-2 py-1 rounded text-[10px] font-bold ${treeShaking ? 'bg-indigo-400 text-white' : 'bg-white/10 text-white'}`}>
                    {treeShaking ? 'ON' : 'OFF'}
                 </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Automatically removes unused code from your final bundle.</p>
              <div className="flex gap-1 flex-wrap">
                 <div className="h-4 w-4 bg-indigo-400 rounded"></div>
                 <div className="h-4 w-4 bg-indigo-400 rounded"></div>
                 <div className={`h-4 w-4 rounded transition-all duration-500 ${treeShaking ? 'opacity-0 scale-0' : 'bg-slate-600'}`}></div>
                 <div className={`h-4 w-4 rounded transition-all duration-500 ${treeShaking ? 'opacity-0 scale-0' : 'bg-slate-600'}`}></div>
              </div>
           </div>

           <div className={`p-6 rounded-2xl border-2 transition-all ${hmrEnabled ? 'bg-green-500/20 border-green-400' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center justify-between mb-4">
                 <h4 className="font-bold text-green-300">HMR (Hot Refresh)</h4>
                 <button onClick={() => setHmrEnabled(!hmrEnabled)} className={`px-2 py-1 rounded text-[10px] font-bold ${hmrEnabled ? 'bg-green-400 text-white' : 'bg-white/10 text-white'}`}>
                    {hmrEnabled ? 'ON' : 'OFF'}
                 </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Updates only the changed module without refreshing the whole page.</p>
              <div className="flex items-center gap-2">
                 <div className="text-xs font-mono text-slate-500">Save File...</div>
                 {hmrEnabled && <div className="text-[10px] font-bold text-green-400 animate-pulse">⚡ Updated UI instantly</div>}
              </div>
           </div>
        </div>
      </section>

      {/* 7. What is npx? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">npx: Run directly</h3>
        <p className="text-slate-600 mb-8">NPM installs, but <strong>npx</strong> executes packages without installing them permanently.</p>

        <div className="bg-slate-900 p-6 rounded-xl font-mono text-sm overflow-hidden relative group">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-500 ml-2">Terminal</span>
           </div>
           <div className="text-slate-300">
              <span className="text-green-500">$</span> npx create-react-app my-app
           </div>
           <div className="mt-4 space-y-1 text-[10px] text-slate-500">
              <p className="animate-pulse">Creating a new React app in /path/to/my-app...</p>
              <p className="opacity-60 delay-100">Installing packages. This might take a couple of minutes...</p>
           </div>
           <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white font-bold">npx runs the installer once and leaves!</span>
           </div>
        </div>
      </section>

      {/* 8. dep vs devDep */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Dependencies vs DevDependencies</h3>
        <p className="text-slate-600 mb-8">Analogy: One is the <strong>engine</strong> in the car, the other is the <strong>wrench</strong> in the garage.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase">Sort these tools:</p>
              <div className="flex flex-col gap-2">
                 {dependencies.map((dep, idx) => (
                    <div key={dep.name} className="flex items-center gap-2 bg-slate-50 p-2 rounded border">
                       <span className="text-xs font-mono font-bold flex-1">{dep.name}</span>
                       <button 
                        onClick={() => {
                          const next = [...dependencies];
                          next[idx].category = 'dep';
                          setDependencies(next);
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${dep.category === 'dep' ? (dep.correct === 'dep' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white border text-slate-400'}`}
                       >
                         Runtime
                       </button>
                       <button 
                        onClick={() => {
                          const next = [...dependencies];
                          next[idx].category = 'dev';
                          setDependencies(next);
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${dep.category === 'dev' ? (dep.correct === 'dev' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white border text-slate-400'}`}
                       >
                         Build Time
                       </button>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <h4 className="font-bold text-indigo-300 text-sm mb-4">package.json View</h4>
              <pre className="text-[10px] font-mono leading-relaxed">
{`{
  "dependencies": {
    "react": "^18.3.1"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "vite": "^5.0.0"
  }
}`}
              </pre>
           </div>
        </div>
      </section>

      {/* 9. package.json vs package-lock.json */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">package.json vs package-lock.json</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          These two files work together to manage your dependencies. <code>package.json</code> defines the <strong>Intent</strong> (what you want), while <code>package-lock.json</code> defines the <strong>Reality</strong> (what exactly was installed).
        </p>

        <PackageComparisonInteractive />
      </section>

      {/* 10. ES6 Mapper */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Modern JS (ES6) for React</h3>
        <p className="text-slate-600 mb-8">React code looks the way it does because of modern JavaScript features.</p>

        <div className="flex gap-4 mb-8">
           <button onClick={() => setEs6Feature('arrow')} className={`px-4 py-2 rounded-lg font-bold text-xs ${es6Feature === 'arrow' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>Arrow Functions</button>
           <button onClick={() => setEs6Feature('destruct')} className={`px-4 py-2 rounded-lg font-bold text-xs ${es6Feature === 'destruct' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>Destructuring</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-slate-900 rounded-xl">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4">Old Way</h4>
              <div className="bg-slate-800 p-4 rounded text-xs font-mono text-slate-300">
                 {es6Feature === 'arrow' ? (
                    <pre>{`function Hello() {
  return <h1>Hi</h1>;
}`}</pre>
                 ) : (
                    <pre>{`const name = props.name;
const age = props.age;`}</pre>
                 )}
              </div>
           </div>
           <div className="p-6 bg-indigo-900 rounded-xl relative group">
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase mb-4">React Way (ES6)</h4>
              <div className="bg-slate-800 p-4 rounded text-xs font-mono text-indigo-300">
                 {es6Feature === 'arrow' ? (
                    <pre>{`const Hello = () => (
  <h1>Hi</h1>
);`}</pre>
                 ) : (
                    <pre>{`const { name, age } = props;`}</pre>
                 )}
              </div>
              <div className="absolute inset-0 bg-indigo-600/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center text-white text-xs font-bold rounded-xl">
                 {es6Feature === 'arrow' ? 'Arrow functions are cleaner and "return" implicitly when written in one line.' : 'Destructuring "pulls" variables out of objects automatically.'}
              </div>
           </div>
        </div>
      </section>

      {/* 11. Modules (UPDATED) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Imports & Exports</h3>
        <p className="text-slate-600 mb-8 italic">Modules let us split our app into many small, manageable files. There are two main ways to share code.</p>

        <ModuleSystemInteractive />
      </section>

      {/* FINAL TAKEAWAY */}
      <section className="bg-slate-900 p-12 rounded-3xl text-center text-white">
         <h4 className="text-2xl font-bold mb-4">Mental Model Checkpoint</h4>
         <p className="text-slate-400 mb-10 max-w-xl mx-auto italic">"I write JSX and modern JS, the bundler transforms and combines it, and ReactDOM puts it on the screen."</p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="text-xl mb-2">📦</div>
               <p className="text-[10px] font-bold text-indigo-300 uppercase">npm</p>
               <p className="text-[8px] text-slate-500">The Supplier</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="text-xl mb-2">🛠️</div>
               <p className="text-[10px] font-bold text-indigo-300 uppercase">Vite</p>
               <p className="text-[8px] text-slate-500">The Assembler</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="text-xl mb-2">⚛️</div>
               <p className="text-[10px] font-bold text-indigo-300 uppercase">React</p>
               <p className="text-[8px] text-slate-500">The Brain</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="text-xl mb-2">🏗️</div>
               <p className="text-[10px] font-bold text-indigo-300 uppercase">ReactDOM</p>
               <p className="text-[8px] text-slate-500">The Builder</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default FolderStructure;
