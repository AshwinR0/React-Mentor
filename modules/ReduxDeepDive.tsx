
import React, { useState, useReducer, useEffect, useRef } from 'react';
import RenderFlash from '../components/RenderFlash';

// --- VISUAL: Prop Drilling Nightmare (3 Levels Deep) ---
const PropDrillingVisualizer = () => {
  const [showData, setShowData] = useState(false);

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden min-h-[450px] flex flex-col border border-white/5">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div>
          <h4 className="text-rose-400 font-black text-[10px] uppercase tracking-widest">Complexity Monitor: Prop Drilling</h4>
          <p className="text-[10px] text-slate-500">Visualizing Level 0 → Level 3 travel</p>
        </div>
        <button 
          onClick={() => setShowData(!showData)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg active:scale-95 ${showData ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          {showData ? 'Hide Prop Path' : 'Trace Data Path'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center relative gap-2">
        {/* APP ROOT */}
        <div className="w-32 py-3 bg-indigo-600 rounded-xl text-center text-xs font-black shadow-2xl z-30 relative border border-indigo-400">
           App.jsx
           {showData && <div className="absolute -top-3 -right-6 bg-amber-400 text-amber-950 px-2 py-0.5 rounded text-[8px] font-black animate-bounce shadow-xl">PROP: user</div>}
        </div>
        <div className="w-px h-6 bg-slate-700"></div>

        {/* LEVEL 1 */}
        <div className="flex flex-col items-center relative">
           <div className="w-32 py-3 bg-slate-800 border border-white/10 rounded-xl text-center text-[10px] font-bold z-20 relative group">
              MainLayout
              {showData && <div className="absolute top-1/2 -right-32 text-[8px] text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity italic">"I don't need 'user' data!"</div>}
           </div>
           <div className="w-px h-6 bg-slate-700"></div>
        </div>

        {/* LEVEL 2 */}
        <div className="flex flex-col items-center relative">
           <div className="w-32 py-3 bg-slate-800 border border-white/10 rounded-xl text-center text-[10px] font-bold z-10 relative group">
              Sidebar
              {showData && <div className="absolute top-1/2 -left-32 text-[8px] text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity italic text-right">"Just passing it through..."</div>}
           </div>
           <div className="w-px h-6 bg-slate-700"></div>
        </div>

        {/* LEVEL 3 - THE CONSUMER */}
        <div className="w-32 py-3 bg-emerald-500 rounded-xl text-center text-xs font-black shadow-2xl z-30 relative border border-emerald-400 text-emerald-950">
           UserSettings
           {showData && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-emerald-400 font-bold animate-in fade-in zoom-in">DATA REACHED TARGET! ✅</div>}
        </div>

        {/* The Connection Path */}
        {showData && (
          <div className="absolute top-6 w-1 bg-amber-400/40 -z-0 h-[220px] rounded-full overflow-hidden">
             <div className="w-full h-full bg-amber-400 animate-pulse"></div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
         <p className="text-[10px] text-slate-500 leading-relaxed italic">
           "In deep trees, data has to 'touch' components that never use it. Redux fixes this by letting 'UserSettings' talk to the store directly."
         </p>
      </div>
    </div>
  );
};

// --- VISUAL: SourceOfTruth (FIXED OVERFLOW) ---
const SourceOfTruthVisual = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-12 flex flex-col items-center overflow-hidden">
      <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
        {/* The Central Store */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-indigo-600 flex flex-col items-center justify-center text-white shadow-2xl relative z-10 border-4 md:border-8 border-indigo-500/30">
           <span className="text-2xl md:text-3xl mb-1 md:mb-2">💿</span>
           <p className="font-black uppercase tracking-tighter text-[10px]">The Store</p>
           <p className="text-[7px] opacity-70">Single Source</p>
        </div>

        {/* Orbiting Components - Responsive placement */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div 
            key={deg} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] pointer-events-none"
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-indigo-200 rounded-lg flex items-center justify-center text-xs shadow-sm" style={{ transform: `rotate(-${deg}deg)` }}>
               🧩
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-[30%] bg-indigo-200/50"></div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[11px] text-slate-400 text-center max-w-sm leading-relaxed">
        Every component, no matter how deep, talks to <strong>one central store</strong>. No more passing props through Level 1, 2, and 3!
      </p>
    </div>
  );
};

// --- VISUAL: Read-Only Visual ---
const ReadOnlyVisual = () => {
  const [status, setStatus] = useState<'idle' | 'blocked' | 'success'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = (type: 'mutate' | 'dispatch') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus(type === 'mutate' ? 'blocked' : 'success');
    timerRef.current = setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-slate-300 text-xs uppercase tracking-widest">Pillar 2: State is Read-Only</h5>
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${status === 'blocked' ? 'bg-rose-500 text-white animate-shake' : status === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
          {status === 'idle' ? 'System Safe' : status === 'blocked' ? 'MUTATION BLOCKED!' : 'ACTION DISPATCHED'}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => trigger('mutate')} className="group relative p-4 bg-slate-800 border border-white/5 rounded-xl hover:bg-rose-900/20 transition-all text-left">
          <p className="text-[10px] font-bold text-rose-400 mb-1">Direct Mutation</p>
          <code className="text-xs text-slate-400 font-mono">state.val = 10;</code>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">🚫</div>
        </button>
        <button onClick={() => trigger('dispatch')} className="group relative p-4 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all text-left shadow-lg">
          <p className="text-[10px] font-bold text-indigo-200 mb-1">Official Dispatch</p>
          <code className="text-xs text-white font-mono">dispatch(update())</code>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">✉️</div>
        </button>
      </div>
    </div>
  );
};

// --- VISUAL: Pure Functions (Reducer) ---
const PureFunctionsVisual = () => {
  const [isPure, setIsPure] = useState(true);
  const [result, setResult] = useState<number | string>(0);

  const run = () => {
    if (isPure) setResult(prev => (typeof prev === 'number' ? prev + 1 : 1));
    else setResult(Math.floor(Math.random() * 100));
  };

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Pillar 3: Pure Reducers</h5>
        <button 
          onClick={() => setIsPure(!isPure)}
          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${isPure ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700 animate-pulse'}`}
        >
          {isPure ? 'Mode: Pure' : 'Mode: Impure (Random)'}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 space-y-4 w-full">
           <div className={`p-4 rounded-xl border-2 transition-all font-mono text-[10px] ${isPure ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
              <p className="mb-2 opacity-50">// {isPure ? 'Predictable' : 'Side Effects!'}</p>
              {isPure ? <pre>return state + 1;</pre> : <pre>return Math.random();</pre>}
           </div>
           <button onClick={run} className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg">Run Logic</button>
        </div>
        <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-inner overflow-hidden relative">
           <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">New State</div>
           <div key={String(result)} className="text-3xl font-black text-slate-800 animate-in zoom-in">{result}</div>
           {!isPure && <div className="absolute top-1 right-1 text-[8px] text-rose-500 font-bold uppercase rotate-12 bg-rose-50 px-1 border border-rose-200 shadow-sm">Unstable!</div>}
        </div>
      </div>
    </div>
  );
};

// --- VISUAL: Hooks Lab (useSelector & useDispatch) ---
const HooksLabVisual = () => {
  const [pulse, setPulse] = useState(false);
  const [storeVal, setStoreVal] = useState(0);

  const runDispatch = () => {
    setPulse(true);
    setTimeout(() => {
      setPulse(false);
      setStoreVal(v => v + 1);
    }, 800);
  };

  return (
    <div className="bg-white border-2 border-indigo-50 rounded-3xl p-8 space-y-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative">
        {/* Component A: The Dispatcher */}
        <div className="w-full lg:w-1/3 p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-amber-500 rounded text-white flex items-center justify-center text-[10px]">📣</div>
             <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Component 1</p>
          </div>
          <p className="text-[10px] text-amber-800 leading-tight">Sends a signal to request a change in state.</p>
          <button 
            onClick={runDispatch}
            className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold text-[10px] uppercase shadow-lg active:scale-95 transition-all"
          >
            useDispatch()
          </button>
        </div>

        {/* The Store */}
        <div className="flex flex-col items-center gap-2 relative">
           <div className={`w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-transform duration-300 ${pulse ? 'scale-110 ring-4 ring-indigo-400' : ''}`}>
              💿
           </div>
           <p className="text-[9px] font-black text-indigo-400 uppercase">Redux Store</p>
           {pulse && (
              <>
                <div className="absolute top-1/2 -left-20 w-16 h-1 bg-amber-400 rounded-full animate-in slide-in-from-left-4 fade-in"></div>
                <div className="absolute top-1/2 -right-20 w-16 h-1 bg-emerald-400 rounded-full animate-in slide-in-from-right-4 fade-in"></div>
              </>
           )}
        </div>

        {/* Component B: The Selector */}
        <div className="w-full lg:w-1/3 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-emerald-500 rounded text-white flex items-center justify-center text-[10px]">🎯</div>
             <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Component 2</p>
          </div>
          <p className="text-[10px] text-emerald-800 leading-tight">Plucks exactly what it needs and updates automatically.</p>
          <div className="p-3 bg-white border border-emerald-100 rounded-xl text-center shadow-sm">
             <div className="text-xl font-black text-emerald-600">{storeVal}</div>
             <p className="text-[9px] font-mono text-emerald-400">useSelector()</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUAL: Under the Hood (Immutability) ---
const UnderTheHoodVisual = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [val, setVal] = useState(10);

  const trigger = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setVal(v => v + 1);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-violet-400 font-bold uppercase tracking-widest text-[10px]">The Immutability Machine</h4>
        <button onClick={trigger} disabled={isProcessing} className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold shadow-lg hover:bg-indigo-500 disabled:opacity-50">Step Reducer</button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
           <div className={`w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center text-xs font-mono transition-opacity ${isProcessing ? 'opacity-30' : 'opacity-100'}`}>
              {`{val:${val}}`}
           </div>
           <p className="text-[8px] font-bold text-slate-500 uppercase">Old Object</p>
        </div>
        <div className="flex-1 h-32 bg-slate-800/50 rounded-2xl border-4 border-dashed border-slate-700 relative flex items-center justify-center">
           {isProcessing ? (
             <div className="flex flex-col items-center gap-2 animate-in fade-in">
                <div className="text-2xl animate-spin">⚙️</div>
                <p className="text-[8px] font-black text-violet-400 uppercase tracking-widest">Logic Running...</p>
             </div>
           ) : (
             <p className="text-[10px] text-slate-500 italic">"Waiting..."</p>
           )}
           <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl animate-pulse">➜</div>
           <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-emerald-400 text-xl animate-pulse">➜</div>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className={`w-20 h-20 bg-indigo-600 border-4 border-indigo-400 rounded-2xl flex items-center justify-center text-xs font-black shadow-2xl transition-all ${isProcessing ? 'scale-75 opacity-20' : 'scale-110 opacity-100'}`}>
              {`{val:${val}}`}
           </div>
           <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">Brand New Object</p>
        </div>
      </div>
      <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] text-slate-400 leading-relaxed text-center">
        <strong>Under the hood:</strong> Redux never changes the old object. It takes your data, calculates the update, and creates a <strong>completely new memory object</strong>.
      </div>
    </div>
  );
};

const ComparisonTable = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
           <tr>
              <th className="p-6 font-black text-[10px] uppercase text-slate-400 tracking-widest">Feature</th>
              <th className="p-6 font-black text-[10px] uppercase text-slate-400 tracking-widest">useContext</th>
              <th className="p-6 font-black text-[10px] uppercase text-indigo-600 tracking-widest bg-indigo-50/50">Redux (RTK)</th>
           </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
           <tr>
              <td className="p-6 font-bold text-slate-700">Primary Goal</td>
              <td className="p-6 text-slate-500">Avoiding Prop Drilling</td>
              <td className="p-6 text-slate-900 font-medium bg-indigo-50/20">Complex Global State</td>
           </tr>
           <tr>
              <td className="p-6 font-bold text-slate-700">App Scale</td>
              <td className="p-6 text-slate-500">Small to Medium</td>
              <td className="p-6 text-slate-900 font-medium bg-indigo-50/20">Large / Enterprise</td>
           </tr>
           <tr>
              <td className="p-6 font-bold text-slate-700">Debugging</td>
              <td className="p-6 text-slate-500">Limited</td>
              <td className="p-6 text-slate-900 font-medium bg-indigo-50/20">Excellent (DevTools)</td>
           </tr>
           <tr>
              <td className="p-6 font-bold text-slate-700">Performance</td>
              <td className="p-6 text-slate-500">Manual (re-renders all)</td>
              <td className="p-6 text-slate-900 font-medium bg-indigo-50/20">Highly optimized selectors</td>
           </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- NEW COMPONENT: Vanilla vs RTK Code Comparison ---
const RTKComparison = () => {
  const [mode, setMode] = useState<'vanilla' | 'rtk'>('rtk');

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex bg-slate-50 border-b border-slate-100 p-4 justify-between items-center">
        <div>
           <h4 className="font-bold text-slate-800 text-sm">Interactive Comparison</h4>
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Building a Simple Counter</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setMode('vanilla')}
             className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'vanilla' ? 'bg-slate-800 text-white shadow-md' : 'bg-white border text-slate-400'}`}
           >
             Vanilla Redux
           </button>
           <button 
             onClick={() => setMode('rtk')}
             className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'rtk' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border text-slate-400'}`}
           >
             Redux Toolkit (RTK)
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200">
        {/* Left Side: The Code */}
        <div className="bg-slate-900 p-8 font-mono text-[11px] min-h-[400px]">
           <p className="text-slate-500 mb-4">// {mode === 'vanilla' ? 'The manual, boilerplate way' : 'The modern, efficient way'}</p>
           {mode === 'vanilla' ? (
             <div className="space-y-4 animate-in fade-in duration-300">
               <div>
                 <p className="text-indigo-400">// 1. Action Types</p>
                 <p className="text-white">const INC = 'counter/inc';</p>
               </div>
               <div>
                 <p className="text-indigo-400">// 2. Action Creator</p>
                 <p className="text-white">const inc = () => ({`{ type: INC }`});</p>
               </div>
               <div>
                 <p className="text-indigo-400">// 3. Reducer (Manual Cloner)</p>
                 <p className="text-white">function reducer(state, action) {'{'}</p>
                 <p className="text-white pl-4">switch (action.type) {'{'}</p>
                 <p className="text-white pl-8">case INC: return {`{ ...state, val: state.val + 1 }`};</p>
                 <p className="text-white pl-8">default: return state;</p>
                 <p className="text-white pl-4">{'}'}</p>
                 <p className="text-white">{'}'}</p>
               </div>
             </div>
           ) : (
             <div className="space-y-4 animate-in fade-in duration-300">
               <div>
                 <p className="text-indigo-400">// 1. Create Slice (Actions + Reducers combined)</p>
                 <p className="text-white">const counterSlice = createSlice({`{`}</p>
                 <p className="text-white pl-4">name: 'counter',</p>
                 <p className="text-white pl-4">initialState: {`{ val: 0 }`},</p>
                 <p className="text-white pl-4">reducers: {`{`}</p>
                 <p className="text-emerald-400 pl-8">increment: (state) => {'{'}</p>
                 <p className="text-emerald-400 pl-12">// Safe "mutation" thanks to Immer!</p>
                 <p className="text-emerald-400 pl-12">state.val += 1;</p>
                 <p className="text-emerald-400 pl-8">{'}'}</p>
                 <p className="text-white pl-4">{`}`}</p>
                 <p className="text-white">{'}'});</p>
               </div>
               <div>
                 <p className="text-indigo-400">// 2. Auto-generated Actions</p>
                 <p className="text-white">export const {`{ increment }`} = counterSlice.actions;</p>
               </div>
             </div>
           )}
        </div>

        {/* Right Side: The Benefits Explanation */}
        <div className="bg-white p-10 flex flex-col justify-center">
           <h5 className="font-black text-slate-800 uppercase tracking-tighter mb-6">Why is {mode === 'vanilla' ? 'Vanilla' : 'RTK'} like this?</h5>
           {mode === 'vanilla' ? (
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded flex items-center justify-center shrink-0">⚖️</div>
                   <p className="text-xs text-slate-600 leading-relaxed"><strong>High Boilerplate:</strong> You have to define constants, creators, and reducers separately. 3 files for 1 feature.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded flex items-center justify-center shrink-0">🦖</div>
                   <p className="text-xs text-slate-600 leading-relaxed"><strong>Manual Immutability:</strong> You must always remember to spread <code>{`{ ...state }`}</code>. One mistake and your UI stops updating.</p>
                </div>
             </div>
           ) : (
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center shrink-0">🚀</div>
                   <p className="text-xs text-slate-600 leading-relaxed"><strong>The Modern Standard:</strong> RTK is the official, opinionated way to use Redux. It forces best practices automatically.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center shrink-0">💎</div>
                   <p className="text-xs text-slate-600 leading-relaxed"><strong>Immer Integration:</strong> You can write code that looks like it's mutating (e.g. <code>state.val++</code>). RTK translates it into a safe, immutable update for you.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center shrink-0">🛠️</div>
                   <p className="text-xs text-slate-600 leading-relaxed"><strong>Less Setup:</strong> Includes Redux DevTools, Middleware, and Thunks (for async) right out of the box.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const ReduxDeepDive: React.FC = () => {
  return (
    <div className="space-y-20 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">💿</div>
          <h3 className="text-3xl font-black tracking-tight">Redux: State at Scale</h3>
        </div>
        <p className="text-indigo-50 max-w-2xl text-lg leading-relaxed relative z-10">
          Manage your application's data with surgical precision. Learn how to coordinate state across hundreds of components without losing your mind.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* THE PROBLEM: PROP DRILLING */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem: Distributed Chaos</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          As apps grow, passing props through dozens of layers (Level 1 → Level 2 → Level 3) becomes a nightmare. We call this <strong>Prop Drilling</strong>.
        </p>
        <PropDrillingVisualizer />
      </section>

      {/* WHAT IS REDUX */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is Redux?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Redux is a central data warehouse. Instead of passing data through components, you store it in one <strong>Store</strong>. Components talk to the Store directly!
        </p>
        <SourceOfTruthVisual />
      </section>

      {/* CORE PRINCIPLES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">The 3 Pillars of Redux</h3>
        <div className="space-y-16">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg">1</span>
                <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">Single Source of Truth</h4>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Entire app state lives in <strong>one store</strong>. This makes it incredibly easy to track, undo, and keep the whole UI in sync.
             </p>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-lg">2</span>
                <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">State is Read-Only</h4>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                You never change the state object directly. You dispatch an <strong>Action</strong> (an instruction). This prevents accidental logic bugs.
             </p>
             <ReadOnlyVisual />
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-lg">3</span>
                <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">Changes with Pure Functions</h4>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Reducers are the "Brains". They take (OldState + Action) and return a brand new NewState.
             </p>
             <PureFunctionsVisual />
          </div>
        </div>
      </section>

      {/* DISPATCHER & REDUCER */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Building Blocks: Dispatcher & Reducer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">📣 The Dispatcher</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                The "Messenger." Its only job is to send <strong>Actions</strong> to the store. Components call <code>useDispatch()</code> to start a change.
              </p>
              <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-indigo-300">
                 dispatch({`{ type: 'user/update', payload: 'Bob' }`})
              </div>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">⚙️ The Reducer</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                The "Brain." It receives the action and calculates the next state. <strong>It must be pure</strong>—no API calls or random numbers here!
              </p>
              <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-emerald-400">
                 (state, action) =&gt; {`{ ...state, user: action.payload }`}
              </div>
           </div>
        </div>
      </section>

      {/* SELECTORS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">What is a Selector?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          A <strong>Selector</strong> is a "Read Filter." Instead of the component reading the whole store, it uses <code>useSelector()</code> to pluck exactly the bit it needs.
        </p>
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
           <div className="bg-slate-800 p-4 rounded-xl border border-white/5 font-mono text-[10px] w-full md:w-1/3">
              <p className="text-slate-500 mb-1">// Massive Store Object</p>
              <p>{`{ user: 'Bob', cart: [], ui: 'dark' }`}</p>
           </div>
           <div className="text-indigo-400 text-2xl rotate-90 md:rotate-0 animate-bounce">➜</div>
           <div className="p-4 bg-indigo-600 rounded-xl border border-indigo-400 shadow-xl w-full md:w-1/3 text-center">
              <p className="text-[10px] font-bold text-indigo-200 uppercase mb-2">Selector Logic</p>
              <code className="text-xs font-mono">state =&gt; state.user</code>
           </div>
           <div className="text-indigo-400 text-2xl rotate-90 md:rotate-0 animate-bounce">➜</div>
           <div className="px-6 py-2 bg-emerald-500 text-emerald-950 rounded-lg font-black text-sm">"Bob"</div>
        </div>
      </section>

      {/* NEW: REDUX TOOLKIT (RTK) SECTION */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-xs">RTK</div>
          <h3 className="text-2xl font-bold text-slate-900">Redux Toolkit: The Modern Standard</h3>
        </div>
        <p className="text-slate-600 mb-10 leading-relaxed max-w-3xl">
          Standard Redux was often criticized for having too much "Boilerplate" (writing the same code patterns over and over). 
          <strong>Redux Toolkit (RTK)</strong> was created to solve this. It is the official, recommended way to write Redux logic today.
        </p>
        <RTKComparison />
      </section>

      {/* HOOKS LAB */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">The Connector Hooks</h3>
        <p className="text-slate-600 mb-10 leading-relaxed">
           In modern React, we use two powerful Hooks to talk to the Redux store.
        </p>
        <HooksLabVisual />
      </section>

      {/* UNDER THE HOOD */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Under the Hood: How Values Update</h3>
        <UnderTheHoodVisual />
      </section>

      {/* REDUX vs USECONTEXT */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Redux vs useContext</h3>
        <p className="text-slate-600 mb-10 leading-relaxed">
          These tools solve different problems. Redux is for application <strong>Data</strong>, while Context is for environment <strong>Settings</strong>.
        </p>
        <ComparisonTable />
      </section>

      {/* PITFALLS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Pitfalls & Common Mistakes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">1. Over-Reduxing</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Putting every <code>useState</code> into Redux. Simple UI states like <code>isModalOpen</code> or <code>inputValue</code> should stay local.
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">2. Mutating State Directly</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Doing <code>state.val = 1</code> inside a reducer. Always return a brand new copy of state to ensure React detects the change.
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">3. Forgetting Selectors</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Component A reading the <em>entire</em> store. This causes Component A to re-render whenever <em>anything</em> in the app changes.
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-xs uppercase tracking-widest">4. Side Effects in Reducers</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Fetching data inside a reducer function. Reducers must be 100% predictable; logic only.
              </p>
           </div>
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-indigo-400">Mental Model Checklist</h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
            {[
              { title: 'Always use RTK', icon: '🛠️', desc: 'Redux Toolkit is the modern standard. Avoid legacy patterns.' },
              { title: 'Feature Slices', icon: '🍕', desc: 'Organize logic by feature (User, Cart) rather than type.' },
              { title: 'Use Selectors', icon: '🎯', desc: 'Pluck only the tiny bit of data your component actually needs.' },
              { title: 'Prefer Local', icon: '🏠', desc: 'If data is only used in one component, keep it in useState.' }
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
               "Actions describe WHAT happened. Reducers describe HOW state changes. Store is the ONE truth. Components are just observers."
            </p>
         </div>
      </section>
    </div>
  );
};

export default ReduxDeepDive;
