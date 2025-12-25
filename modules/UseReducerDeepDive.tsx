
import React, { useState, useReducer, memo } from 'react';
import RenderFlash from '../components/RenderFlash';

const StateComplexityVisualizer = () => {
  const [mode, setMode] = useState<'separate' | 'unified'>('separate');

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <h4 className="text-violet-400 font-bold uppercase tracking-widest text-xs">Managing Complex State</h4>
        <div className="flex bg-white/10 p-1 rounded-full">
          <button 
            onClick={() => setMode('separate')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${mode === 'separate' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Multiple useState
          </button>
          <button 
            onClick={() => setMode('unified')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${mode === 'unified' ? 'bg-violet-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Single useReducer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-64">
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            {mode === 'separate' 
              ? "When logic is spread across many useState hooks, it's easy to forget to update one, leading to inconsistent UI bugs."
              : "With useReducer, all related state is in one object, and all logic lives in one single 'Reducer' function."}
          </p>
          <div className="bg-slate-800 p-4 rounded-xl border border-white/5 font-mono text-[10px] space-y-1">
            {mode === 'separate' ? (
              <>
                <p className="text-rose-400">const [status, setStatus] = useState('idle')</p>
                <p className="text-rose-400">const [data, setData] = useState(null)</p>
                <p className="text-rose-400">const [error, setError] = useState(null)</p>
              </>
            ) : (
              <>
                <p className="text-violet-400">const [state, dispatch] = useReducer(reducer, initialState)</p>
                <p className="text-slate-500">// {`{ status: 'loading', data: null, ... }`}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center relative">
          {mode === 'separate' ? (
            <div className="flex flex-col gap-3 w-40">
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-lg text-center text-[10px] font-bold">Status Hook</div>
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-lg text-center text-[10px] font-bold">Data Hook</div>
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-lg text-center text-[10px] font-bold">Error Hook</div>
            </div>
          ) : (
            <div className="w-48 h-48 bg-violet-600 rounded-3xl flex items-center justify-center relative shadow-2xl animate-pulse">
               <div className="text-center">
                  <div className="text-2xl mb-1">🎮</div>
                  <p className="text-xs font-black uppercase tracking-tighter">Unified Logic</p>
               </div>
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/10 rounded-full border border-white/20"></div>
               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/5 rounded-full border border-white/10"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReducerAnatomyVisual = () => {
  const [active, setActive] = useState<'state' | 'action' | 'reducer' | 'none'>('none');

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm overflow-hidden">
      <h4 className="font-bold text-slate-800 mb-8 text-center uppercase tracking-widest text-xs">The 3 Pillars of useReducer</h4>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
        {/* Action */}
        <div 
          onMouseEnter={() => setActive('action')}
          className={`group flex flex-col items-center gap-3 transition-all duration-300 cursor-help ${active === 'action' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-200">✉️</div>
          <p className="text-[10px] font-bold text-amber-600 uppercase">1. Action</p>
        </div>

        <div className="text-slate-300 font-bold rotate-90 md:rotate-0">➜</div>

        {/* Reducer */}
        <div 
          onMouseEnter={() => setActive('reducer')}
          className={`group flex flex-col items-center gap-3 transition-all duration-300 cursor-help ${active === 'reducer' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="w-20 h-20 bg-violet-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-violet-200">⚙️</div>
          <p className="text-[10px] font-bold text-violet-600 uppercase">2. Reducer</p>
        </div>

        <div className="text-slate-300 font-bold rotate-90 md:rotate-0">➜</div>

        {/* State */}
        <div 
          onMouseEnter={() => setActive('state')}
          className={`group flex flex-col items-center gap-3 transition-all duration-300 cursor-help ${active === 'state' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-200">📦</div>
          <p className="text-[10px] font-bold text-emerald-600 uppercase">3. New State</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 h-32 flex flex-col items-center justify-center text-center transition-all">
        {active === 'none' && <p className="text-slate-400 italic text-sm animate-pulse">Hover a pillar to see how it works</p>}
        {active === 'action' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h5 className="font-bold text-amber-600 mb-1">The Instruction</h5>
            <p className="text-xs text-slate-500 max-w-sm">A simple object describing <strong>what</strong> should happen. Usually has a <code>type</code> like <code>'increment'</code>.</p>
          </div>
        )}
        {active === 'reducer' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h5 className="font-bold text-violet-600 mb-1">The Brain</h5>
            <p className="text-xs text-slate-500 max-w-sm">A function that takes <strong>(current state + action)</strong> and calculates the <strong>next state</strong>.</p>
          </div>
        )}
        {active === 'state' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h5 className="font-bold text-emerald-600 mb-1">The Result</h5>
            <p className="text-xs text-slate-500 max-w-sm">The fresh data React uses to re-render your component. It replaces the old state entirely.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionFlowVisualizer = () => {
  const initialState = { count: 0, lastAction: 'None' };
  
  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'plus': return { count: state.count + 1, lastAction: 'PLUS' };
      case 'minus': return { count: state.count - 1, lastAction: 'MINUS' };
      case 'reset': return { count: 0, lastAction: 'RESET' };
      default: return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(0);

  const trigger = (type: string) => {
    setStep(1);
    setTimeout(() => setStep(2), 600);
    setTimeout(() => {
      dispatch({ type });
      setStep(3);
    }, 1200);
    setTimeout(() => setStep(0), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white">
      <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
        <div className="space-y-6 w-full md:w-1/3">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dispatch actions</p>
           <div className="grid grid-cols-1 gap-2">
              <button onClick={() => trigger('plus')} className="px-4 py-3 bg-violet-600 rounded-xl font-bold text-xs hover:bg-violet-700 transition-all">dispatch({`{type: 'plus'}`})</button>
              <button onClick={() => trigger('minus')} className="px-4 py-3 bg-slate-800 rounded-xl font-bold text-xs hover:bg-slate-700 transition-all">dispatch({`{type: 'minus'}`})</button>
              <button onClick={() => trigger('reset')} className="px-4 py-3 bg-rose-900/50 text-rose-300 rounded-xl font-bold text-xs hover:bg-rose-900 transition-all">dispatch({`{type: 'reset'}`})</button>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center relative py-10">
          <div className={`absolute top-0 w-px h-full bg-white/5 transition-all ${step > 0 ? 'bg-violet-500/50' : ''}`}></div>
          
          <div className={`mb-10 p-4 rounded-xl border transition-all duration-500 ${step === 1 ? 'bg-amber-500 border-amber-400 scale-110 shadow-lg' : 'bg-slate-800 border-white/5 opacity-40'}`}>
            <span className="text-[10px] font-bold">Action Sent</span>
          </div>

          <div className={`mb-10 p-4 rounded-xl border transition-all duration-500 ${step === 2 ? 'bg-violet-600 border-violet-400 scale-110 shadow-lg animate-pulse' : 'bg-slate-800 border-white/5 opacity-40'}`}>
            <span className="text-[10px] font-bold">Reducer Computing...</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-500 ${step === 3 ? 'bg-emerald-500 border-emerald-400 scale-110 shadow-lg' : 'bg-slate-800 border-white/5 opacity-40'}`}>
            <span className="text-[10px] font-bold">State Updated</span>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
           <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">State Object</p>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-violet-300">
                {`{ count: ${state.count}, last: "${state.lastAction}" }`}
              </div>
           </div>
           <RenderFlash name="UI Output">
              <div className="text-4xl font-black text-white">{state.count}</div>
           </RenderFlash>
        </div>
      </div>
    </div>
  );
};

const TabbedReducerPlayground = () => {
  const [tab, setTab] = useState<'form' | 'toggle' | 'history'>('form');

  // Form State Demo
  const [formState, formDispatch] = useReducer((state: any, action: any) => {
    switch(action.type) {
      case 'field': return { ...state, [action.field]: action.value };
      case 'reset': return { name: '', email: '', role: 'Junior' };
      default: return state;
    }
  }, { name: '', email: '', role: 'Junior' });

  // History Demo
  const [historyState, historyDispatch] = useReducer((state: any, action: any) => {
    switch(action.type) {
      case 'add': return { 
        current: action.val, 
        past: [...state.past, state.current].slice(-3) 
      };
      case 'undo': 
        if (state.past.length === 0) return state;
        const prev = state.past[state.past.length - 1];
        return { 
          current: prev, 
          past: state.past.slice(0, -1) 
        };
      default: return state;
    }
  }, { current: 'Initial', past: [] });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50/50">
        {(['form', 'toggle', 'history'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              tab === t ? 'border-violet-600 text-violet-600 bg-white font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t === 'form' ? 'Complex Form' : t === 'toggle' ? 'Rule Engine' : 'History (Undo)'}
          </button>
        ))}
      </div>

      <div className="p-10 min-h-[400px] flex flex-col items-center justify-center bg-slate-50/30">
        {tab === 'form' && (
          <div className="w-full max-w-md space-y-6 animate-in zoom-in duration-300">
             <div className="grid grid-cols-1 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={formState.name}
                  onChange={e => formDispatch({type: 'field', field: 'name', value: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 outline-none" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formState.email}
                  onChange={e => formDispatch({type: 'field', field: 'email', value: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 outline-none" 
                />
                <select 
                  value={formState.role}
                  onChange={e => formDispatch({type: 'field', field: 'role', value: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-slate-200"
                >
                   <option>Junior</option>
                   <option>Senior</option>
                   <option>Architect</option>
                </select>
             </div>
             <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-violet-400">
                {JSON.stringify(formState, null, 2)}
             </div>
             <button onClick={() => formDispatch({type: 'reset'})} className="w-full py-2 bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">Reset Form Action</button>
             <p className="text-[10px] text-slate-400 italic text-center">Instead of 3 state setters, we use 1 dispatch function for everything.</p>
          </div>
        )}

        {tab === 'history' && (
          <div className="w-full max-w-sm space-y-8 animate-in zoom-in duration-300 text-center">
             <div className="space-y-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Value</div>
                <div className="text-4xl font-black text-violet-600">{historyState.current}</div>
             </div>
             
             <div className="flex gap-2">
                <button onClick={() => historyDispatch({type: 'add', val: 'State ' + Math.floor(Math.random() * 100)})} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold text-xs">Update Value</button>
                <button 
                  onClick={() => historyDispatch({type: 'undo'})} 
                  disabled={historyState.past.length === 0}
                  className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold text-xs disabled:opacity-30"
                >
                  Undo Action
                </button>
             </div>

             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Action Log (Past)</p>
                <div className="flex gap-2 justify-center">
                   {historyState.past.length === 0 && <span className="text-[10px] text-slate-300">No history yet...</span>}
                   {historyState.past.map((p: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 rounded border text-[9px] text-slate-400">{p}</span>
                   ))}
                </div>
             </div>
             <p className="text-[10px] text-slate-400 italic">"useReducer makes 'undo/redo' much easier by keeping history in the state object."</p>
          </div>
        )}

        {tab === 'toggle' && (
           <div className="text-center space-y-8 animate-in zoom-in duration-300">
              <div className="flex gap-10">
                 <div className="flex flex-col items-center gap-2">
                    <p className="text-[8px] font-bold uppercase text-slate-400">Power</p>
                    <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"></div>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <p className="text-[8px] font-bold uppercase text-slate-400">Security</p>
                    <div className="w-4 h-4 rounded-full bg-rose-500 shadow-lg shadow-rose-200 animate-pulse"></div>
                 </div>
              </div>
              <p className="text-sm text-slate-600 max-w-[250px] mx-auto leading-relaxed italic">
                "Real use case: A system where you can only turn on 'A' if 'B' is off. <strong>Reducers enforce these business rules in one place.</strong>"
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

const OverkillDetector = () => {
  const [count, setCount] = useState(0);
  const [overkill, setOverkill] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-slate-800">The Overkill Detector</h4>
        <button 
          onClick={() => setOverkill(!overkill)}
          className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all ${overkill ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}`}
        >
          {overkill ? 'Show Overkill' : 'Show Simple'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
         <div className="space-y-4">
            <p className="text-xs text-slate-500">Problem: A single counter that only increments.</p>
            <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px]">
               {overkill ? (
                 <pre className="text-rose-300 leading-relaxed">
{`// ❌ OVERKILL
const reducer = (s, a) => s + 1;
const [count, dispatch] = 
  useReducer(reducer, 0);

<button onClick={() => 
  dispatch({type: 'inc'})}>`}
                 </pre>
               ) : (
                 <pre className="text-green-300 leading-relaxed">
{`// ✅ SIMPLE & CORRECT
const [count, setCount] = 
  useState(0);

<button onClick={() => 
  setCount(c => c + 1)}>`}
                 </pre>
               )}
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center space-y-4">
            <div className="text-4xl font-black text-slate-800">{count}</div>
            <button onClick={() => setCount(c => c + 1)} className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">Increment</button>
            <p className="text-[10px] text-slate-400">
               {overkill 
                ? "This is like using a rocket to go to the grocery store. It works, but it adds unnecessary complexity!" 
                : "Perfect. useState is enough for 90% of your state needs."}
            </p>
         </div>
      </div>
    </div>
  );
};

const UseReducerDeepDive: React.FC = () => {
  const [decisionStep, setDecisionStep] = useState(0);
  const [decisionResult, setDecisionResult] = useState<string | null>(null);

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-violet-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">🎛️</div>
          <h3 className="text-3xl font-black">useReducer Deep Dive</h3>
        </div>
        <p className="text-violet-50 max-w-2xl text-lg leading-relaxed">
          Master the "Flight Controller" of React state. Learn how to manage 
          complex, multi-step state transitions with surgical precision.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem with Complex State</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          When you have multiple pieces of state that depend on each other (like a fetching status, the data, and an error message), using <code>useState</code> multiple times can become "Spaghetti Code."
        </p>
        <StateComplexityVisualizer />
      </section>

      {/* 3. WHAT IS IT? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is useReducer?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          <code>useReducer</code> is a Hook for state management that separates <strong>what happened</strong> (actions) from <strong>how the state changes</strong> (the reducer).
        </p>
        <ReducerAnatomyVisual />
      </section>

      {/* 4. WHY INTRODUCED */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Why was it introduced?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                In large applications, business logic gets buried inside buttons and clicks. <code>useReducer</code> allows you to pull that logic out into a separate function, making your components <strong>cleaner</strong> and your tests <strong>easier to write</strong>.
              </p>
           </div>
           <div className="p-6 bg-slate-900 rounded-2xl text-violet-300 font-mono text-[10px]">
              <p className="text-slate-500">// Logic lives OUTSIDE the component</p>
              <p className="text-white">function myReducer(state, action) {'{'}</p>
              <p className="pl-4">if (action.type === 'win') return ...</p>
              <p className="text-white">{'}'}</p>
           </div>
        </div>
      </section>

      {/* 5. ACTION FLOW */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Data Flow</h3>
        <ActionFlowVisualizer />
      </section>

      {/* 6. PLAYGROUND */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">When Do We Use useReducer?</h3>
        <p className="text-slate-600 mb-8 italic">Ideal for complex data structures and state machines.</p>
        <TabbedReducerPlayground />
      </section>

      {/* 7. COMPARISON */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">useReducer vs useState</h3>
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                 <tr>
                    <th className="px-6 py-4">Feature</th>
                    <th className="px-6 py-4">useState</th>
                    <th className="px-6 py-4 text-violet-600">useReducer</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 <tr>
                    <td className="px-6 py-4 font-bold">State Shape</td>
                    <td className="px-6 py-4">Simple values / single objects</td>
                    <td className="px-6 py-4 text-violet-600 font-medium">Complex objects / arrays</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Logic Location</td>
                    <td className="px-6 py-4">Inside event handlers</td>
                    <td className="px-6 py-4 text-violet-600 font-medium">Inside the Reducer function</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Update Style</td>
                    <td className="px-6 py-4">Direct setter: <code>setX(val)</code></td>
                    <td className="px-6 py-4 text-violet-600 font-medium">Action-based: <code>dispatch(act)</code></td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-bold">Predictability</td>
                    <td className="px-6 py-4 text-slate-400 text-[10px]">Manual tracking</td>
                    <td className="px-6 py-4 text-violet-600 font-medium text-[10px]">High (State Machine style)</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      {/* 8. DECISION HELPER */}
      <section className="bg-violet-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
         <div className="relative z-10 text-center space-y-8">
            <h4 className="text-xl font-bold">Decision Helper: State or Reducer?</h4>
            <div className="min-h-[160px] flex flex-col items-center justify-center">
               {decisionStep === 0 && (
                 <div className="animate-in fade-in">
                   <p className="text-lg mb-6">Does your state update depend on <strong>multiple existing values</strong>?</p>
                   <div className="flex gap-4 justify-center">
                      <button onClick={() => setDecisionStep(1)} className="px-8 py-3 bg-violet-500 rounded-xl font-bold">YES</button>
                      <button onClick={() => setDecisionResult('useState')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                   </div>
                 </div>
               )}
               {decisionStep === 1 && (
                 <div className="animate-in fade-in">
                   <p className="text-lg mb-6">Are you using a <strong>complex object or array</strong> that changes often?</p>
                   <div className="flex gap-4 justify-center">
                      <button onClick={() => setDecisionResult('useReducer')} className="px-8 py-3 bg-violet-500 rounded-xl font-bold">YES</button>
                      <button onClick={() => setDecisionResult('useState')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                   </div>
                 </div>
               )}
               {decisionResult && (
                 <div className="animate-in zoom-in text-center space-y-4">
                    <p className="text-3xl font-black text-violet-300 uppercase tracking-tighter">Use {decisionResult}!</p>
                    <button onClick={() => {setDecisionStep(0); setDecisionResult(null)}} className="text-xs font-bold underline opacity-50">Start over</button>
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* 9. PITFALLS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Pitfalls & Common Mistakes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase">1. Mutating State</h5>
              <p className="text-[11px] text-rose-800 italic">"Mistake: <code>state.count++</code> instead of <code>{`{...state, count: state.count + 1}`}</code>"</p>
              <p className="text-[10px] text-rose-600 leading-relaxed">Reducers MUST be pure. Never change the 'state' object directly. Always return a brand new copy.</p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase">2. Side Effects inside Reducer</h5>
              <p className="text-[11px] text-rose-800 italic">"Mistake: Running <code>fetch()</code> or <code>console.log()</code> inside the reducer function."</p>
              <p className="text-[10px] text-rose-600 leading-relaxed">Reducers should only calculate data. Put your side effects (timers, API calls) in event handlers or useEffect.</p>
           </div>
        </div>
        <div className="mt-8">
           <OverkillDetector />
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-violet-400">Mental Model Summary</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h5 className="font-bold text-violet-300 text-sm mb-4 uppercase">Best Practices</h5>
               <ul className="text-xs text-slate-400 space-y-3">
                  <li>• Use string constants for action types (<code>ACTION_UP</code>)</li>
                  <li>• Keep the initial state flat and predictable</li>
                  <li>• Use a <code>default</code> case in switch to handle unknown actions</li>
                  <li>• Pass <code>payload</code> data inside actions for more info</li>
               </ul>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h5 className="font-bold text-amber-300 text-sm mb-4 uppercase">The "Pure" Rule</h5>
               <p className="text-xs text-slate-400 leading-relaxed">
                  A reducer is a "Pure Function". If you give it the same State and the same Action, it <strong>must</strong> always return the exact same result. It should never touch anything outside of itself.
               </p>
            </div>
         </div>

         <div className="max-w-2xl mx-auto p-8 bg-violet-600 rounded-2xl shadow-2xl relative overflow-hidden">
            <p className="text-xl font-bold">The Takeaway</p>
            <p className="text-violet-50 mt-2 italic">
               "useState is for simple interactivity. useReducer is for complex rules, history, and building systems that are bulletproof."
            </p>
         </div>
      </section>
    </div>
  );
};

export default UseReducerDeepDive;
