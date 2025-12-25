
import React, { useState, useRef, memo, useEffect } from 'react';
import KeyRenderTracker from '../components/KeyRenderTracker';

// Memoized item to ensure we only re-render when props change
const KeyCircleItem = memo(({ id, index, color, mode }: { id: string, index: number, color: string, mode: 'index' | 'id' }) => {
  // We use 'index' as the trigger for index-mode to simulate position-based re-renders
  // We use 'id' for id-mode because the identity is stable; it won't re-render/increment when shifted
  const trigger = mode === 'index' ? index : id;

  return (
    <KeyRenderTracker trigger={trigger}>
      {(displayCount) => (
        <div className="flex flex-col items-center gap-1 min-w-[85px] animate-in zoom-in duration-300">
          <div className="flex flex-col items-center -space-y-0.5 mb-1">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm transition-all ${displayCount > 1 ? 'bg-rose-500 text-white border-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              Render: {displayCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Index: {index}
            </span>
          </div>
          
          <div 
            className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-white shadow-lg border-4 border-white ring-2 ring-slate-100 transition-all hover:scale-105 group relative cursor-pointer ${displayCount > 1 ? 'ring-rose-400 ring-offset-2' : ''}`}
          >
            <span className="text-[10px] font-mono font-black">{id.toUpperCase()}</span>
          </div>
        </div>
      )}
    </KeyRenderTracker>
  );
});

interface ItemData {
  id: string;
  color: string;
}

const IndexKeyDemo = () => {
  const [items, setItems] = useState<ItemData[]>([
    { id: 'A1', color: 'bg-indigo-400' },
    { id: 'B2', color: 'bg-indigo-500' },
  ]);

  const colors = ['bg-rose-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400', 'bg-fuchsia-400', 'bg-indigo-400', 'bg-orange-400'];
  
  const createItem = (): ItemData => ({
    id: Math.random().toString(36).substr(2, 2).toUpperCase(),
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const addAtStart = () => {
    setItems([createItem(), ...items]);
  };

  const addAtMiddle = () => {
    const next = [...items];
    next.splice(Math.floor(next.length / 2), 0, createItem());
    setItems(next);
  };

  const addAtEnd = () => {
    setItems([...items, createItem()]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-red-600 flex items-center gap-2">
          <span>❌</span> Using key=&#123;index&#125;
        </h4>
        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Unstable Identity</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <button onClick={addAtStart} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm">Add at Start</button>
        <button onClick={addAtMiddle} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add in Middle</button>
        <button onClick={addAtEnd} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add at End</button>
        <button onClick={() => setItems([])} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 ml-auto">Clear</button>
      </div>

      <div className="relative min-h-[180px] bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 overflow-x-auto scrollbar-hide">
        <div className="flex flex-row gap-10 pb-4 items-end min-w-max px-4">
          {items.map((item, index) => (
            // We use key={item.id} even in Index mode to ensure the component instance (and its state) 
            // follows the data. We then manually trigger the counter if the index changed, 
            // which perfectly simulates the "identity mismatch" of using index keys.
            <div key={item.id} className="relative group" onClick={() => removeItem(item.id)}>
              <KeyCircleItem id={item.id} index={index} color={item.color} mode="index" />
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer pointer-events-none">✕</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-slate-400 text-sm italic py-4">The list is empty.</div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
        <h5 className="font-bold text-red-900 mb-3 text-sm uppercase tracking-widest">The "Index" Performance Cost</h5>
        <ul className="space-y-3 text-sm text-red-800">
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-rose-600">Observation:</span>
            <span>When adding at the <strong>start</strong> or <strong>middle</strong>, notice how multiple existing items re-render! This is because their index changed, making React think the data at that "key" is new.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-green-600">Efficiency:</span>
            <span>When adding at the <strong>end</strong>, previous items stay at the same index, so they do NOT re-render (Count stays same).</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

const UniqueKeyDemo = () => {
  const [items, setItems] = useState<ItemData[]>([
    { id: 'U1', color: 'bg-emerald-400' },
    { id: 'V2', color: 'bg-emerald-500' },
  ]);

  const colors = ['bg-rose-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400', 'bg-fuchsia-400', 'bg-indigo-400', 'bg-orange-400'];
  const createItem = (): ItemData => ({
    id: Math.random().toString(36).substr(2, 2).toUpperCase(),
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const addAtStart = () => {
    setItems([createItem(), ...items]);
  };

  const addAtMiddle = () => {
    const next = [...items];
    next.splice(Math.floor(next.length / 2), 0, createItem());
    setItems(next);
  };

  const addAtEnd = () => {
    setItems([...items, createItem()]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          <span>✅</span> Using key=&#123;item.id&#125;
        </h4>
        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Persistent Identity</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <button onClick={addAtStart} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm">Add at Start</button>
        <button onClick={addAtMiddle} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add in Middle</button>
        <button onClick={addAtEnd} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all shadow-sm">Add at End</button>
        <button onClick={() => setItems([])} className="px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-50 ml-auto">Clear</button>
      </div>

      <div className="relative min-h-[180px] bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 overflow-x-auto scrollbar-hide">
        <div className="flex flex-row gap-10 pb-4 items-end min-w-max px-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative group" onClick={() => removeItem(item.id)}>
              <KeyCircleItem id={item.id} index={index} color={item.color} mode="id" />
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer pointer-events-none">✕</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-slate-400 text-sm italic py-4">The list is empty.</div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
        <h5 className="font-bold text-emerald-900 mb-3 text-sm uppercase tracking-widest">Why IDs are Superior</h5>
        <ul className="space-y-3 text-sm text-emerald-800">
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-emerald-600">The Power of Identity:</span>
            <span>No matter where you add an item, the existing items' <strong>Render Count stays at 1</strong>. React recognizes their unique IDs and knows they haven't changed!</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold shrink-0 text-indigo-600">Efficiency:</span>
            <span>This is the core of React's performance. By identifying items correctly, React avoids doing unnecessary work.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

const ReactInternals: React.FC = () => {
  const [demoValue, setDemoValue] = useState("Hello");
  const [vdomStep, setVdomStep] = useState(0); 
  const [isProcessing, setIsProcessing] = useState(false);

  const startDemo = (newValue: string) => {
    setIsProcessing(true);
    setVdomStep(1);
    setTimeout(() => setVdomStep(2), 1000);
    setTimeout(() => {
      setVdomStep(3);
      setDemoValue(newValue);
    }, 2000);
    setTimeout(() => {
      setVdomStep(0);
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. What is the DOM? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">What is the DOM?</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          The <strong>DOM (Document Object Model)</strong> is the browser's way of understanding your website. 
          Think of it as a <span className="text-indigo-600 font-bold">Tree Structure</span> where every HTML tag is a branch or a leaf.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 text-sm">HTML to DOM Tree</h4>
            <div className="flex flex-col items-center space-y-2">
              <div className="px-3 py-1 bg-indigo-100 border border-indigo-200 rounded text-xs font-mono">{'<html>'}</div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="px-3 py-1 bg-indigo-100 border border-indigo-200 rounded text-xs font-mono">{'<body>'}</div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex gap-4">
                 <div className="flex flex-col items-center">
                   <div className="px-3 py-1 bg-green-100 border border-green-200 rounded text-xs font-mono">{'<h1>'}</div>
                   <p className="text-[10px] text-slate-400 mt-1">Node</p>
                 </div>
                 <div className="flex flex-col items-center">
                   <div className="px-3 py-1 bg-green-100 border border-green-200 rounded text-xs font-mono">{'<p>'}</div>
                   <p className="text-[10px] text-slate-400 mt-1">Node</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 italic">"When you use JavaScript to change text on a page, you are telling the browser: 'Go find this specific node in the tree and update its value'."</p>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800">
              <strong>Problem:</strong> Real DOM updates are "heavy". Changing one small thing can sometimes force the browser to recalculate the entire layout of the page.
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Virtual DOM Section */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is the Virtual DOM?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          The <strong>Virtual DOM</strong> is NOT the real DOM. It is a lightweight copy of the UI kept in 
          JavaScript memory. It's like a <span className="text-indigo-600 font-bold">Sketchpad</span> where React 
          plans its moves before touching the expensive Real DOM.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">Virtual DOM</h4>
            <ul className="text-xs text-indigo-700 space-y-2 list-disc list-inside">
              <li>Lives in JavaScript Memory</li>
              <li>Super fast to update</li>
              <li>A simple object description of the UI</li>
              <li>React's private draft</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-100 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Real DOM</h4>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>Lives in the Browser</li>
              <li>Slow to update</li>
              <li>What the user actually sees</li>
              <li>The final construction</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4, 5, 7. Interactive Playground */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">The Invisible Process: Made Visible</h3>
        <p className="text-slate-600 mb-8 text-sm italic">"Let's watch what happens when you change a piece of state."</p>

        <div className="space-y-12">
           <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                 <button 
                  onClick={() => startDemo("Hello")} 
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-bold text-xs ${demoValue === "Hello" ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                 >
                   Value: "Hello"
                 </button>
                 <button 
                  onClick={() => startDemo("React")} 
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-bold text-xs ${demoValue === "React" ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                 >
                   Value: "React"
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              <div className={`p-6 rounded-2xl border-2 transition-all ${vdomStep === 1 ? 'border-indigo-500 bg-indigo-50 scale-105 shadow-xl' : 'border-slate-100 opacity-40'}`}>
                <h4 className="text-[10px] font-bold text-indigo-400 uppercase mb-4">1. Virtual DOM Update</h4>
                <div className="bg-slate-900 p-4 rounded text-[10px] font-mono text-slate-300">
                  <pre>{`{
  type: 'h1',
  props: {
    children: '${isProcessing && vdomStep < 3 ? '...' : demoValue}'
  }
}`}</pre>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border-2 transition-all ${vdomStep === 2 ? 'border-amber-500 bg-amber-50 scale-105 shadow-xl' : 'border-slate-100 opacity-40'}`}>
                <h4 className="text-[10px] font-bold text-amber-500 uppercase mb-4">2. Reconciliation</h4>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-12 bg-white rounded border border-amber-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700 italic">"Spot the difference!"</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border-2 transition-all ${vdomStep === 3 ? 'border-green-500 bg-green-50 scale-105 shadow-xl' : 'border-slate-100 opacity-40'}`}>
                <h4 className="text-[10px] font-bold text-green-500 uppercase mb-4">3. Commit to Real DOM</h4>
                <div className="h-20 bg-white rounded-xl border border-green-200 flex items-center justify-center shadow-inner">
                  <h1 className="text-2xl font-bold text-slate-900">{demoValue}</h1>
                </div>
              </div>

              <div className="hidden lg:block absolute top-1/2 left-[31%] -translate-y-1/2 text-slate-300">➜</div>
              <div className="hidden lg:block absolute top-1/2 left-[64%] -translate-y-1/2 text-slate-300">➜</div>
           </div>
        </div>
      </section>

      {/* THE KEY LAB */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">The Key Lab</h3>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Witness the performance cost of unstable keys. Watch the <span className="text-rose-600 font-bold">Render count</span> badges to see how React recalculates positions based on identity.
          </p>
        </div>

        {/* Section 1: Index based demo */}
        <div key="index-demo">
           <IndexKeyDemo />
        </div>

        {/* Section 2: Unique ID based demo */}
        <div key="id-demo">
           <UniqueKeyDemo />
        </div>

        {/* NOTE ON MUTATION vs CHANGE */}
        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                 <h5 className="text-lg font-bold text-amber-900 mb-1">A Critical Mental Model: List Changes vs. Mutation</h5>
                 <p className="text-sm text-amber-800 leading-relaxed">
                    Everything you see above happens because we are following the rule of <strong>Immutability</strong>. 
                    When we "add an item", we are providing React with a <span className="font-bold underline">completely new list object</span> (using <code>[...items, newItem]</code>).
                 </p>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 p-3 rounded-xl border border-amber-200">
                       <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">The Correct Way (Change)</p>
                       <code className="text-[11px] font-mono text-slate-800">setItems([...oldItems, newItem])</code>
                       <p className="text-[9px] text-amber-600 mt-1">React sees a NEW reference and starts the lab demos above.</p>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                       <p className="text-[10px] font-bold text-rose-700 uppercase mb-1">The Wrong Way (Mutation)</p>
                       <code className="text-[11px] font-mono text-slate-800 line-through">items.push(newItem)</code>
                       <p className="text-[9px] text-rose-600 mt-1">React sees the SAME list object. It won't detect any change and <strong>nothing</strong> will re-render!</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Summary / Key Takeaways */}
      <section className="bg-slate-900 p-8 rounded-2xl text-white text-center">
         <h4 className="text-xl font-bold mb-4">Key Takeaways</h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">VDOM</p>
               <p className="text-[10px] text-slate-400">A JavaScript "sketch" of your UI used for planning.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Reconciliation</p>
               <p className="text-[10px] text-slate-400">Comparing VDOM trees to find specific changes.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Fiber</p>
               <p className="text-[10px] text-slate-400">The task manager that handles update priorities.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
               <p className="text-indigo-400 font-bold text-xs mb-1">Keys</p>
               <p className="text-[10px] text-slate-400">Crucial for tracking identity during list updates.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ReactInternals;
