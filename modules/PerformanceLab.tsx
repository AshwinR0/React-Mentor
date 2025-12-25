
import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import RenderFlash from '../components/RenderFlash';
import KeyRenderTracker from '../components/KeyRenderTracker';

// --- Helper: Identity Tracker ---
const useReferenceIdentity = (val: any) => {
  const idRef = useRef(Math.random().toString(16).slice(2, 8).toUpperCase());
  const lastVal = useRef(val);

  if (val !== lastVal.current) {
    idRef.current = Math.random().toString(16).slice(2, 8).toUpperCase();
    lastVal.current = val;
  }
  return idRef.current;
};

// --- Sub-components for Visualizations ---

const RenderVsWorkDemo = () => {
  const [renders, setRenders] = useState(0);
  const [workEnabled, setWorkEnabled] = useState(false);

  // Simulated work
  if (workEnabled) {
    let i = 0;
    while (i < 10000000) i++; 
  }

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative shadow-2xl">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Render vs Work</h4>
          <p className="text-[10px] text-slate-400">Renders are usually fast. Logic is what gets slow.</p>
        </div>
        <button 
          onClick={() => setWorkEnabled(!workEnabled)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${workEnabled ? 'bg-rose-500 text-white border-2 border-rose-400' : 'bg-slate-700 text-slate-300 border-2 border-slate-600'}`}
        >
          {workEnabled ? 'Heavy Work: ENABLED' : 'Heavy Work: DISABLED'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Total Renders</p>
          <div className="text-4xl font-black text-indigo-400">{renders}</div>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Browser Thread</p>
          <div className={`text-2xl font-black transition-colors ${workEnabled ? 'text-rose-500' : 'text-emerald-400'}`}>
            {workEnabled ? '⚠️ LAGGY' : '⚡ SMOOTH'}
          </div>
        </div>
      </div>

      <button 
        onClick={() => setRenders(r => r + 1)}
        className="w-full mt-6 py-3 bg-indigo-600 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all hover:bg-indigo-500"
      >
        Click to Re-render
      </button>

      <div className="mt-4 text-center">
        <p className="text-[10px] text-slate-500 italic">
          {workEnabled 
            ? "Feel that stutter? The browser is busy doing 'Work' before it can finish the 'Render'." 
            : "Renders are instant because there is no work to block the process."}
        </p>
      </div>
    </div>
  );
};

// --- REFACTORED MEMO VISUALIZER ---

const StandardChild = ({ name, data }: { name: string, data: string }) => (
  <RenderFlash name={name}>
    <div className="p-6 bg-rose-50 border-2 border-rose-200 rounded-2xl text-center space-y-2 h-40 flex flex-col justify-center shadow-sm">
      <div className="text-2xl opacity-80">⚠️</div>
      <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Standard Child</p>
      <p className="text-xs text-rose-900 font-medium font-mono">"{data}"</p>
      <p className="text-[8px] text-rose-400 leading-tight">"I re-render every time the Parent does, even if my data is the same."</p>
    </div>
  </RenderFlash>
);

const MemoizedChild = memo(({ name, data }: { name: string, data: string }) => (
  <RenderFlash name={name}>
    <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-center space-y-2 h-40 flex flex-col justify-center shadow-md relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">🛡️</div>
      </div>
      <div className="text-2xl">🛡️</div>
      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Memoized Child</p>
      <p className="text-xs text-emerald-900 font-medium font-mono">"{data}"</p>
      <p className="text-[8px] text-emerald-400 leading-tight">"I am SHIELDED. I only re-render if the 'Prop' actually changes."</p>
    </div>
  </RenderFlash>
));

const MemoBattleDemo = () => {
  const [parentCount, setParentCount] = useState(0);
  const [childData, setChildData] = useState("Hello");
  const [pulse, setPulse] = useState(false);

  const triggerParentRender = () => {
    setParentCount(p => p + 1);
    triggerPulse();
  };

  const triggerDataUpdate = () => {
    setChildData(childData === "Hello" ? "World" : "Hello");
    triggerPulse();
  };

  const triggerPulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-8 bg-slate-50/50 border-b border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">The "Shield" Battle</h4>
            <p className="text-xs text-slate-500 max-w-sm">Watch the RENDER counters. Which one ignores the Parent's frantic clicking?</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={triggerParentRender}
              className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all hover:bg-slate-700"
            >
              Update Parent State ({parentCount})
            </button>
            <button 
              onClick={triggerDataUpdate}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all hover:bg-indigo-500"
            >
              Update Child Prop
            </button>
          </div>
        </div>

        {/* The "Parent Block" */}
        <div className="relative p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-2">
           <div className={`absolute inset-0 bg-indigo-500/10 rounded-2xl transition-opacity duration-300 pointer-events-none ${pulse ? 'opacity-100' : 'opacity-0'}`}></div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent Container</p>
           <p className="text-[11px] text-slate-500 italic">"I am re-rendering now..."</p>
        </div>
      </div>

      <div className="p-10 relative">
        {/* Connection Lines with Visual Pulse */}
        <div className="absolute top-0 left-1/4 w-px h-10 bg-slate-100"></div>
        <div className="absolute top-0 left-3/4 w-px h-10 bg-slate-100"></div>
        <div className={`absolute top-0 left-1/4 w-1 h-10 bg-indigo-400 transition-all duration-500 origin-top pointer-events-none ${pulse ? 'scale-y-100 opacity-50' : 'scale-y-0 opacity-0'}`}></div>
        <div className={`absolute top-0 left-3/4 w-1 h-10 bg-indigo-400 transition-all duration-500 origin-top pointer-events-none ${pulse ? 'scale-y-100 opacity-50' : 'scale-y-0 opacity-0'}`}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Always Renders</span>
            </div>
            <StandardChild name="Standard" data={childData} />
            <p className="text-[10px] text-center text-slate-400 leading-relaxed italic">
              "My code runs EVERY time the Parent code runs."
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shielded by memo()</span>
            </div>
            <MemoizedChild name="Memoized" data={childData} />
            <p className="text-[10px] text-center text-slate-400 leading-relaxed italic">
              "I check the incoming data. If it's the same as last time, <strong>I skip the work.</strong>"
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-indigo-900 text-white text-[11px] font-bold text-center">
        The Result: Click "Update Parent" ➜ Only the Standard child blinks. Click "Update Prop" ➜ Both blink!
      </div>
    </div>
  );
};

/**
 * --- REFACTORED USEMEMO VISUALIZER ---
 */
const HeavyThinkingVisual = ({ value, label, mode, trigger }: { value: number, label: string, mode: 'standard' | 'memo', trigger: number }) => {
  const [status, setStatus] = useState<'idle' | 'working'>('idle');
  const [logicCycles, setLogicCycles] = useState(0);
  const lastValue = useRef(value);
  const lastTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger !== lastTrigger.current) {
      const isNewValue = value !== lastValue.current;
      
      if (mode === 'standard' || isNewValue) {
        setLogicCycles(c => c + 1);
        setStatus('working');
        
        let i = 0;
        while (i < 30000000) i++; 
        
        const t = setTimeout(() => setStatus('idle'), 400);
        lastValue.current = value;
        lastTrigger.current = trigger;
        return () => clearTimeout(t);
      }
    }
    lastTrigger.current = trigger;
  }, [trigger, value, mode]);

  return (
    <div className={`relative p-6 rounded-3xl border-2 transition-all duration-500 ${mode === 'memo' ? 'bg-indigo-50 border-indigo-200 shadow-xl' : 'bg-slate-50 border-slate-200 opacity-90'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h5 className="font-black text-slate-800 text-xs uppercase tracking-tighter">{label}</h5>
          <p className="text-[9px] text-slate-400 uppercase font-bold">{mode === 'memo' ? 'With useMemo()' : 'No Memoization'}</p>
        </div>
        <div className={`px-2 py-1 rounded text-[8px] font-black uppercase ${status === 'working' ? 'bg-amber-400 text-amber-900 animate-pulse' : 'bg-emerald-100 text-emerald-600'}`}>
          {status === 'working' ? '⚙️ Thinking...' : '✅ Ready'}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${status === 'working' ? 'scale-110 bg-amber-100' : 'bg-white shadow-inner'}`}>
             {mode === 'memo' ? '🧠' : '🤖'}
          </div>
        </div>

        <div className="w-full space-y-2">
           <div className="flex justify-between text-[10px] font-mono bg-white/50 p-2 rounded-lg border border-slate-100">
              <span className="text-slate-400">External Triggers:</span>
              <span className="text-slate-900 font-bold">{trigger}</span>
           </div>
           <div className="flex justify-between text-[10px] font-mono bg-white/80 p-2 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-slate-500 font-bold">Logic Cycles:</span>
              <span className={`font-black ${mode === 'memo' ? 'text-indigo-600' : 'text-rose-500'}`}>
                {logicCycles}
              </span>
           </div>
        </div>
      </div>

      <div className="mt-4 p-2 bg-black/5 rounded-lg">
         <p className="text-[9px] text-slate-500 leading-tight text-center italic">
            {mode === 'memo' 
              ? "I only recalculate if the 'Input' changed." 
              : "I recalculate every single time I render."}
         </p>
      </div>

      {mode === 'memo' && status === 'idle' && trigger > 0 && value === lastValue.current && logicCycles > 0 && (
        <div className="absolute top-2 right-2">
           <span className="text-[8px] font-black text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full animate-bounce">CACHE HIT!</span>
        </div>
      )}
    </div>
  );
};

const MemoCacheDemo = () => {
  const [input, setInput] = useState(10);
  const [parentState, setParentState] = useState(0);
  const [triggerCount, setTriggerCount] = useState(0);

  const handleInputChange = () => {
    setInput(i => i + 1);
    setTriggerCount(t => t + 1);
  };

  const handleParentRender = () => {
    setParentState(s => s + 1);
    setTriggerCount(t => t + 1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
      <div className="space-y-2">
        <h4 className="font-bold text-slate-800">The Brain Factory</h4>
        <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
          Watch the <strong>Logic Cycles</strong> counter below. It represents how many times the browser had to actually execute the expensive math loop.
        </p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Trigger Calculation</p>
          <button onClick={handleInputChange} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">Change Input ({input})</button>
          <p className="text-[9px] text-slate-400 italic">This <strong>should</strong> increase both Logic Cycle counts because the input is new.</p>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trigger Re-render</p>
          <button onClick={handleParentRender} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all">Just Re-render ({parentState})</button>
          <p className="text-[9px] text-slate-400 italic">This <strong>should ONLY</strong> increase the Standard Processor's cycles.</p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HeavyThinkingVisual key="std-v5" value={input} label="Standard Processor" mode="standard" trigger={triggerCount} />
        <HeavyThinkingVisual key="memo-v5" value={input} label="Optimized Processor" mode="memo" trigger={triggerCount} />
      </div>

      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-4 items-start">
         <span className="text-xl">🎓</span>
         <div className="space-y-1">
            <p className="text-xs font-bold text-emerald-900 uppercase tracking-tight">The Big Lesson</p>
            <p className="text-xs text-emerald-800 leading-relaxed">
              When you click <strong>"Just Re-render"</strong>, both components receive a trigger. 
              But only the Standard Processor blinks and increments its <strong>Logic Cycles</strong>. 
              The Optimized one stays idle because its input hasn't changed!
            </p>
         </div>
      </div>
    </div>
  );
};

const IdentityVisualizer = () => {
  const [renderCount, setRenderCount] = useState(0);
  
  // Two functions
  const inlineFn = () => {};
  const memoizedFn = useCallback(() => {}, []);

  const inlineId = useReferenceIdentity(inlineFn);
  const memoId = useReferenceIdentity(memoizedFn);

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs">Function Identity</h4>
          <p className="text-[10px] text-slate-400">JavaScript creates a brand new function reference on every render.</p>
        </div>
        <button 
          onClick={() => setRenderCount(r => r + 1)}
          className="px-6 py-2 bg-white/10 rounded-full font-bold text-xs hover:bg-white/20"
        >
          Re-render Parent ({renderCount})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <p className="text-[10px] font-bold text-rose-400 uppercase">Inline Function</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 flex items-center justify-between">
            <span className="text-xs font-mono">Reference ID:</span>
            <span key={inlineId} className="text-lg font-mono font-black text-rose-500 animate-in zoom-in">{inlineId}</span>
          </div>
          <p className="text-[9px] text-slate-500 italic">"The ID changes every time because it's a 'new' piece of memory."</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <p className="text-[10px] font-bold text-green-400 uppercase">useCallback Function</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-green-500/30 flex items-center justify-between">
            <span className="text-xs font-mono">Reference ID:</span>
            <span className="text-lg font-mono font-black text-green-500">{memoId}</span>
          </div>
          <p className="text-[9px] text-slate-500 italic">"The ID is stable! React returns the exact same function from the last render."</p>
        </div>
      </div>
    </div>
  );
};

// --- Child Component for Holy Trinity Playground ---
const OptimizedChild = memo(({ data, onAction, visualCount }: { data: { text: string }, onAction: () => void, visualCount: number }) => {
  return (
    <RenderFlash name="Memoized Child" count={visualCount}>
      <div className="p-6 bg-indigo-600 rounded-2xl text-white shadow-2xl space-y-4 min-w-[240px]">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">🛡️</div>
            <p className="text-xs font-bold uppercase tracking-widest">Child Component</p>
         </div>
         <div className="p-4 bg-black/20 rounded-xl font-mono text-sm">
            Prop Value: "{data.text}"
         </div>
         <button 
           onClick={onAction}
           className="w-full py-2 bg-white text-indigo-600 rounded-lg font-bold text-xs shadow-lg active:scale-95"
         >
           Click Child Callback
         </button>
      </div>
    </RenderFlash>
  );
});

const HolyTrinityPlayground = () => {
  const [parentState, setParentState] = useState(0);
  const [childProp] = useState("Stable Data");
  
  const [useMemoProp, setUseMemoProp] = useState(false);
  const [useCallbackProp, setUseCallbackProp] = useState(false);
  const [visualChildCount, setVisualChildCount] = useState(1);

  // Stable references
  const memoizedObject = useMemo(() => ({ text: childProp }), [childProp]);
  const memoizedCallback = useCallback(() => console.log('Action!'), []);

  // Props to pass to child
  const dataObject = useMemoProp ? memoizedObject : { text: childProp };
  const handleAction = useCallbackProp ? memoizedCallback : () => console.log('Action!');

  const handleParentUpdate = () => {
    setParentState(s => s + 1);
    
    // Logic: The Child's render counter should only increment if we trigger 
    // a parent update AND the child isn't protected by memoization.
    // Memoization fails if ANY of the passed props are unstable (new objects/functions).
    if (!useMemoProp || !useCallbackProp) {
      setVisualChildCount(c => c + 1);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <h4 className="font-bold text-slate-800 mb-4">The Holy Trinity Playground</h4>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Experiment: When BOTH boxes are checked, <code>React.memo</code> will block 
          the child from re-rendering when you click the button. Try it!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setUseMemoProp(!useMemoProp)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${useMemoProp ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white opacity-60'}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${useMemoProp ? 'bg-green-500 border-green-600' : 'border-slate-300'}`}></div>
              <p className="text-[10px] font-bold text-slate-700">Stabilize Object Prop (useMemo)</p>
            </div>
          </div>
          <div 
            onClick={() => setUseCallbackProp(!useCallbackProp)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${useCallbackProp ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white opacity-60'}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${useCallbackProp ? 'bg-green-500 border-green-600' : 'border-slate-300'}`}></div>
              <p className="text-[10px] font-bold text-slate-700">Stabilize Callback Prop (useCallback)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
             <p className="text-xs font-bold text-slate-400 uppercase">Parent Component</p>
             <button 
              onClick={handleParentUpdate}
              className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all"
             >
               Change Parent State ({parentState})
             </button>
             <p className="text-[10px] text-slate-400 italic">"This triggers a Parent re-render cycle."</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Prop Status to Child</p>
             <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-500 tracking-tighter">Object Prop:</span>
                <span className={useMemoProp ? 'text-green-400 font-bold' : 'text-rose-400 underline underline-offset-2'}>{useMemoProp ? 'STABLE' : 'NEW ON RENDER'}</span>
             </div>
             <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-500 tracking-tighter">Callback Prop:</span>
                <span className={useCallbackProp ? 'text-green-400 font-bold' : 'text-rose-400 underline underline-offset-2'}>{useCallbackProp ? 'STABLE' : 'NEW ON RENDER'}</span>
             </div>
          </div>
        </div>

        <div className="flex justify-center">
           <OptimizedChild data={dataObject} onAction={handleAction} visualCount={visualChildCount} />
        </div>
      </div>

      <div className="p-4 bg-amber-50 text-amber-800 text-[11px] text-center border-t border-amber-100">
        <strong>Observation:</strong> Changing checkboxes updates the child's internal props but <em>not</em> the visual counter. The counter only grows when parent state changes <strong>and</strong> props are unstable!
      </div>
    </div>
  );
};

const ShouldIMemoHelper = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <div className="bg-indigo-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
       <div className="relative z-10 text-center space-y-8">
          <h4 className="text-xl font-bold italic">The Performance Auditor</h4>
          
          <div className="min-h-[160px] flex flex-col items-center justify-center">
             {step === 0 && (
               <div className="animate-in fade-in slide-in-from-bottom-2">
                 <p className="text-lg font-medium mb-6">Is there a <strong>visible lag</strong> when using this component?</p>
                 <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(1)} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all">YES</button>
                    <button onClick={() => setResult('skip')} className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">NO</button>
                 </div>
               </div>
             )}

             {step === 1 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Is the component's internal logic <strong>heavy</strong> (e.g. charts, long lists)?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('memo')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {step === 2 && (
               <div className="animate-in fade-in">
                  <p className="text-lg font-medium mb-6">Are the props <strong>stable</strong> (same values most of the time)?</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setResult('memo')} className="px-8 py-3 bg-indigo-500 rounded-xl font-bold">YES</button>
                    <button onClick={() => setResult('skip')} className="px-8 py-3 bg-white/10 rounded-xl font-bold">NO</button>
                 </div>
               </div>
             )}

             {result === 'skip' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🚀</div>
                  <p className="text-xl font-black text-indigo-300 uppercase tracking-tighter">Skip Optimization!</p>
                  <p className="text-sm text-indigo-100 opacity-70">React is fast. Don't add complexity unless you have a real problem.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}

             {result === 'memo' && (
               <div className="animate-in zoom-in text-center space-y-4">
                  <div className="text-4xl">🛠️</div>
                  <p className="text-xl font-black text-green-400 uppercase tracking-tighter">Optimize It!</p>
                  <p className="text-sm text-indigo-100 opacity-70">React.memo or useMemo would likely help here.</p>
                  <button onClick={reset} className="text-xs font-bold underline opacity-50">Start over</button>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

const PerformanceLab: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      
      {/* 1. INTRODUCTION */}
      <section className="bg-emerald-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg text-2xl">🚀</div>
          <h3 className="text-3xl font-black">Performance Lab</h3>
        </div>
        <p className="text-emerald-50 max-w-2xl text-lg leading-relaxed relative z-10">
          Stop guessing. Start measuring. Learn how to identify real bottlenecks 
          and use React's optimization hooks correctly.
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Performance Problem in React</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          React is designed to re-render. Usually, this is fast. The problem arises when we do <strong>unnecessary work</strong> during those renders—like recalculating a massive list or re-painting a complex chart that hasn't actually changed.
        </p>
        <RenderVsWorkDemo />
      </section>

      {/* 3. REACT.MEMO */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Component Shield: React.memo</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          <code>React.memo</code> is a Higher Order Component that skips re-rendering a component if its <strong>Props</strong> are identical to the last render.
        </p>
        <MemoBattleDemo />
      </section>

      {/* 4. USEMEMO */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Logic Cache: useMemo</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          While <code>memo</code> stops components from rendering, <code>useMemo</code> stops expensive <strong>Logic</strong> from running. It caches the result of a calculation.
        </p>
        <MemoCacheDemo />
      </section>

      {/* 5. USECALLBACK */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">The Identity Keeper: useCallback</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Every time a Parent re-renders, it creates brand new functions. To a child component, these look like "changed props," breaking its <code>React.memo</code> shield. <code>useCallback</code> keeps the function reference stable.
        </p>
        <IdentityVisualizer />
      </section>

      {/* 6. WORKING TOGETHER */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Holy Trinity</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Optimizing one part often requires optimizing others. To keep a Child component stable, you must stabilize both its <strong>Component</strong> (memo), its <strong>Objects</strong> (useMemo), and its <strong>Functions</strong> (useCallback).
        </p>
        <HolyTrinityPlayground />
      </section>

      {/* 7. DECISION AUDITOR */}
      <ShouldIMemoHelper />

      {/* 8. PITFALLS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
           <span className="text-rose-500 text-3xl">⚠️</span> Pitfalls & Disadvantages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase tracking-widest">1. The Cost of Comparison</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                React has to run a comparison check on every render to see if props changed. For very simple components, this check is often <strong>slower</strong> than just re-rendering the component!
              </p>
           </div>
           <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-4">
              <h5 className="font-bold text-rose-900 text-sm uppercase tracking-widest">2. Memory Overhead</h5>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                <code>useMemo</code> and <code>useCallback</code> require React to store old values in memory. If you memoize everything, you're trading CPU performance for Memory bloat.
              </p>
           </div>
        </div>
      </section>

      {/* 9. BEST PRACTICES */}
      <section className="bg-slate-900 p-12 rounded-3xl text-white text-center">
         <h4 className="text-3xl font-black mb-8 italic text-emerald-400">Mental Model Checklist</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
            {[
              { title: 'Measure First', icon: '📏', desc: 'Use the React Profiler. Never optimize based on vibes.' },
              { title: 'Prop Stability', icon: '🧱', desc: 'Keep props simple. Avoid creating objects/arrays in JSX if possible.' },
              { title: 'Pure Comps', icon: '💎', desc: 'Memoization only works if your component is "Pure" (same input = same output).' },
              { title: 'Don\'t Default', icon: '🚫', desc: 'Start without optimization. Add it only when you feel the lag.' }
            ].map(b => (
              <div key={b.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <p className="font-bold text-emerald-300 text-sm mb-2 uppercase">{b.title}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
         </div>

         <div className="max-w-2xl mx-auto p-8 bg-emerald-600 rounded-2xl shadow-2xl relative overflow-hidden">
            <p className="text-xl font-bold">The Golden Rule</p>
            <p className="text-emerald-50 mt-2 italic">
               "Premature optimization is the root of all evil. React is incredibly fast by default. Use these tools to solve real bottlenecks, not to follow patterns."
            </p>
         </div>
      </section>
    </div>
  );
};

export default PerformanceLab;
