
import React, { useState, useMemo, useCallback, memo } from 'react';
import RenderFlash from '../components/RenderFlash';

// --- Shared Sub-components ---

const SimpleChild = ({ name, icon = '👶' }: { name: string, icon?: string }) => (
  <div className="h-32 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-center">
    <span className="text-2xl mb-2">{icon}</span>
    <p className="text-xs font-bold text-slate-400 uppercase">{name}</p>
    <p className="text-[10px] text-slate-400">I render when my parent does.</p>
  </div>
);

const PropChild = ({ value }: { value: number }) => (
  <div className="h-32 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center p-4 text-center">
    <span className="text-2xl mb-1">📦</span>
    <p className="text-xs font-bold text-indigo-400 uppercase">Prop Child</p>
    <p className="text-lg font-black text-indigo-600">{value}</p>
    <p className="text-[10px] text-indigo-400">My prop changed!</p>
  </div>
);

const MemoChild = memo(({ name }: { name: string }) => (
  <div className="h-32 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center justify-center p-4 text-center">
    <span className="text-2xl mb-2">🛡️</span>
    <p className="text-xs font-bold text-green-600 uppercase">Memo Child</p>
    <p className="text-[10px] text-green-500">I only render if my props change.</p>
  </div>
));

const CallbackChild = memo(({ onClick }: { onClick: () => void }) => (
  <div className="h-32 bg-amber-50 border border-amber-200 rounded-xl flex flex-col items-center justify-center p-4 text-center">
    <span className="text-2xl mb-1">🔗</span>
    <p className="text-xs font-bold text-amber-600 uppercase">Callback Child</p>
    <button 
      onClick={onClick}
      className="mt-2 px-3 py-1 bg-white border border-amber-200 rounded text-[10px] font-bold text-amber-600"
    >
      Run Callback
    </button>
  </div>
));

// --- Specific Lab Wrappers to Ensure Correct Re-render Scoping ---

const Lab1 = () => {
  const [count, setCount] = useState(0);
  return (
    <RenderFlash name="Parent">
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-800">Parent Component</h4>
          <button onClick={() => setCount(p => p + 1)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold transition-transform active:scale-95">Update Parent ({count})</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <RenderFlash name="Child A"><SimpleChild name="Child A" /></RenderFlash>
          <RenderFlash name="Child B"><SimpleChild name="Child B" /></RenderFlash>
        </div>
      </div>
    </RenderFlash>
  );
};

const Lab2 = () => {
  return (
    <RenderFlash name="Parent">
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-6">
        <h4 className="font-bold text-slate-800">Parent Component (Static)</h4>
        <div className="grid grid-cols-2 gap-4">
          <ChildWithState name="Child A" />
          <RenderFlash name="Child B"><SimpleChild name="Child B" icon="😴" /></RenderFlash>
        </div>
      </div>
    </RenderFlash>
  );
};

const ChildWithState = ({ name }: { name: string }) => {
  const [count, setCount] = useState(0);
  return (
    <RenderFlash name={name}>
      <div className="h-32 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center p-4 text-center">
        <p className="text-xs font-bold text-indigo-400 uppercase mb-2">{name} (Stateful)</p>
        <button onClick={() => setCount(p => p + 1)} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold">Update Me ({count})</button>
      </div>
    </RenderFlash>
  );
};

const Lab3 = () => {
  const [val, setVal] = useState(0);
  return (
    <RenderFlash name="Parent">
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-800">Parent (Data Source)</h4>
          <button onClick={() => setVal(p => p + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">Send New Prop</button>
        </div>
        <RenderFlash name="Prop Child"><PropChild value={val} /></RenderFlash>
      </div>
    </RenderFlash>
  );
};

const Lab4 = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setCount(p => p + 1)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">Update Parent ({count})</button>
      </div>
      <RenderFlash name="Parent">
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <RenderFlash name="Standard Child"><SimpleChild name="Standard" /></RenderFlash>
            <RenderFlash name="Memoized Child"><MemoChild name="Memoized" /></RenderFlash>
          </div>
        </div>
      </RenderFlash>
    </div>
  );
};

const Lab5 = () => {
  const [count, setCount] = useState(0);
  const stableCallback = useCallback(() => alert("Stable!"), []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <button onClick={() => setCount(p => p + 1)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">Render Parent ({count})</button>
      </div>
      <RenderFlash name="Parent">
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-rose-500 uppercase text-center">Inline Function</p>
            <RenderFlash name="Inline Child"><CallbackChild onClick={() => alert('Hi')} /></RenderFlash>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-green-500 uppercase text-center">useCallback</p>
            <RenderFlash name="Stable Child"><CallbackChild onClick={stableCallback} /></RenderFlash>
          </div>
        </div>
      </RenderFlash>
    </div>
  );
};

const Lab6 = () => {
  const [val, setVal] = useState(10);
  return (
    <div className="max-w-xs mx-auto space-y-6">
      <RenderFlash name="State Tester">
        <div className="p-8 bg-white border-2 border-slate-200 rounded-3xl text-center space-y-4">
          <p className="text-3xl font-black text-slate-800">{val}</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setVal(10)} className="px-3 py-2 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-xl text-[10px] font-bold">Set to 10 Again</button>
            <button onClick={() => setVal(Math.floor(Math.random() * 100))} className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold">Set Random</button>
          </div>
        </div>
      </RenderFlash>
    </div>
  );
};

const Lab7 = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="max-w-xs mx-auto space-y-6 text-center">
      <RenderFlash name="Batch Tester">
        <div className="p-8 bg-white border-2 border-slate-200 rounded-3xl space-y-4">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Update Count: {count}</p>
          <button 
            onClick={() => {
              setCount(b => b + 1);
              setCount(b => b + 1);
              setCount(b => b + 1);
            }}
            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs"
          >
            Trigger 3 Updates At Once
          </button>
        </div>
      </RenderFlash>
    </div>
  );
};

const ReRendering: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: "Parent -> Child (The Default)",
      desc: "When a parent re-renders, React re-renders all its children by default. Both Child A and B will increment their render counts.",
      component: <Lab1 />
    },
    {
      title: "Sibling Independence",
      desc: "If a sibling updates its own local state, the parent and other siblings are unaffected. Only the updating child increments its count.",
      component: <Lab2 />
    },
    {
      title: "Props Change -> Re-Render",
      desc: "Passing a new piece of data through props triggers a render in the child component.",
      component: <Lab3 />
    },
    {
      title: "React.memo Optimization",
      desc: "React.memo skips rendering a component if its props haven't changed.",
      component: <Lab4 />
    },
    {
      title: "The Callback Trap",
      desc: "Even with React.memo, a child re-renders if you pass it an 'inline function' because it's a new reference every time.",
      component: <Lab5 />
    },
    {
      title: "Same State = Render Cycle?",
      desc: "React bails out and skips the render if you set state to the EXACT same value.",
      component: <Lab6 />
    },
    {
      title: "Render Batching",
      desc: "React groups multiple state updates in one event into a single render.",
      component: <Lab7 />
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Visualizing the Render Cycle</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          One of the biggest React mysteries is <strong>when</strong> a component refreshes. 
          Use these interactive labs to build an intuition for how React's "Magic Mirror" works.
        </p>

        {/* Demo Navigator */}
        <div className="flex border-b border-slate-100 mb-10 overflow-x-auto scrollbar-hide">
          {demos.map((demo, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDemo(idx)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeDemo === idx ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Lab {idx + 1}: {demo.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Active Demo Area */}
        <div className="space-y-8">
           <div className="bg-slate-50/50 p-8 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="mb-8 max-w-2xl">
                 <h4 className="text-xl font-black text-slate-800 mb-2">{demos[activeDemo].title}</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">{demos[activeDemo].desc}</p>
              </div>
              <div className="min-h-[350px] flex items-center justify-center">
                 {/* key={activeDemo} ensures all render counts reset when switching labs */}
                 <div key={activeDemo} className="w-full">
                    {demos[activeDemo].component}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold text-xs">?</div>
                 <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">Why did this happen?</p>
                    <p className="text-xs text-slate-500">
                      {activeDemo === 0 && "In Lab 1, Parent's state change causes it and all its children to re-render by default."}
                      {activeDemo === 1 && "In Lab 2, the state is inside Child A. Updating it only affects that specific component branch."}
                      {activeDemo === 2 && "Changing props passed to a child forces it to update its output UI."}
                      {activeDemo === 3 && "React.memo compares props. Since Parent's update didn't change 'name', Memo Child skipped the render."}
                      {activeDemo === 4 && "JavaScript creates a brand new function object on every render. To 'memo', this looks like a prop change."}
                      {activeDemo === 5 && "React performs a 'bailout' if the value hasn't actually changed, saving work."}
                      {activeDemo === 6 && "React 18 automatically batches updates together. 3 state calls = 1 render."}
                    </p>
                 </div>
              </div>
              <div className="p-5 bg-slate-900 rounded-xl flex items-center gap-4 text-white">
                 <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">💡</div>
                 <div>
                    <p className="font-bold text-indigo-300 text-xs mb-1">Key Takeaway</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
                      {activeDemo === 0 && "Renders flow down the tree."}
                      {activeDemo === 1 && "Local state is isolated."}
                      {activeDemo === 2 && "New Props = Mandatory Render."}
                      {activeDemo === 3 && "memo prevents redundant work."}
                      {activeDemo === 4 && "Stability matters for optimization."}
                      {activeDemo === 5 && "Identical state bails out."}
                      {activeDemo === 6 && "Batching is for performance."}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ReRendering;
