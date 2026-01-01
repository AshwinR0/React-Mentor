
import React, { useState } from 'react';

const BlueprintArchitectureSimulator = () => {
  const [color, setColor] = useState('#4f46e5');
  const [instances, setInstances] = useState([1, 2]);
  const [label, setLabel] = useState('Product Card');

  const addInstance = () => {
    if (instances.length < 5) {
      setInstances([...instances, Date.now()]);
    }
  };

  const removeInstance = (id: number) => {
    setInstances(instances.filter(i => i !== id));
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: The Blueprint */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. The Blueprint (Definition)</span>
            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">Code</span>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl h-full flex flex-col">
             <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Component Label</label>
                <input 
                  type="text" 
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Enter name..."
                />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Theme Color</label>
                <div className="flex gap-2">
                   {['#4f46e5', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                     <button 
                       key={c}
                       onClick={() => setColor(c)}
                       className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
                       style={{ backgroundColor: c }}
                     />
                   ))}
                </div>
             </div>
             <div className="pt-4 border-t border-white/5 font-mono text-[10px] flex-1">
                <p className="text-slate-500 mb-2">// Defining the Reusable logic</p>
                <p className="text-indigo-300 font-bold">function <span className="text-amber-400">MyComponent</span>() &#123;</p>
                <p className="pl-4 text-indigo-300">return (</p>
                <p className="pl-8 text-emerald-400">{`<div style={{ background: '${color}' }}>`}</p>
                <p className="pl-12 text-white">{`  { "${label}" }`}</p>
                <p className="pl-8 text-emerald-400">{`</div>`}</p>
                <p className="pl-4 text-indigo-300">);</p>
                <p className="text-indigo-300 font-bold">&#125;</p>
             </div>
          </div>
        </div>

        {/* Right: The UI */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. The Building Blocks (UI)</span>
            <button 
              onClick={addInstance}
              disabled={instances.length >= 5}
              className="text-[10px] bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-black uppercase hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg"
            >
              + Create Instance
            </button>
          </div>

          <div className="flex-1 bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 relative flex flex-col overflow-hidden">
            <div className="absolute top-2 left-2 text-[8px] font-black text-slate-300 uppercase tracking-widest">Assembly Line</div>
            
            <div className="flex-1 flex flex-wrap gap-4 items-center justify-center py-6 content-center">
               {instances.map(id => (
                 <div 
                   key={id}
                   onClick={() => removeInstance(id)}
                   className="animate-in zoom-in duration-300 p-4 rounded-xl text-white font-black text-[10px] uppercase shadow-lg border-b-4 border-black/20 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform relative group"
                   style={{ backgroundColor: color }}
                 >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">🧩</div>
                    <span className="truncate max-w-[80px]">{label || 'Empty'}</span>
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-black">✕</div>
                 </div>
               ))}
               {instances.length === 0 && (
                 <div className="text-center opacity-30 animate-pulse">
                    <div className="text-4xl mb-2">🏗️</div>
                    <p className="text-[10px] font-bold uppercase">Empty construction site</p>
                 </div>
               )}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 text-center">
               <p className="text-[10px] text-slate-500 leading-relaxed italic">
                 "Edit the blueprint label or color. Notice how <strong>all {instances.length} blocks</strong> update instantly! This is the power of code reuse in React."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropsInteractive = () => {
  const [name, setName] = useState("Alex");
  const [bgColor, setBgColor] = useState("#4f46e5"); // indigo-600
  const [pulse, setPulse] = useState(false);

  const handleUpdate = (newName: string) => {
    setName(newName);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  const handleColorUpdate = (color: string) => {
    setBgColor(color);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Parent Side */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded tracking-tighter">PARENT COMPONENT</span>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update State in Parent:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleUpdate(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-100 rounded-lg focus:border-indigo-500 outline-none text-sm font-bold transition-all"
                placeholder="Enter name..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pick Theme Color:</label>
              <div className="flex gap-3">
                {['#4f46e5', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                  <button
                    key={c}
                    onClick={() => handleColorUpdate(c)}
                    className={`w-8 h-8 rounded-full transition-all hover:scale-110 shadow-sm ${bgColor === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'opacity-60'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl font-mono text-[10px] text-indigo-300 relative overflow-hidden">
             <p className="text-slate-500 mb-2">// Passing data via attributes</p>
             <div className="space-y-0.5">
               <p>{`<UserCard`}</p>
               <p className="pl-4 text-emerald-400">userName="<span className="text-amber-300">{name}</span>"</p>
               <p className="pl-4 text-emerald-400">color="<span className="text-amber-300">{bgColor}</span>"</p>
               <p>{`/>`}</p>
             </div>
             {pulse && <div className="absolute inset-0 bg-indigo-400/10 animate-pulse pointer-events-none"></div>}
          </div>
        </div>

        {/* Connector & Child Side */}
        <div className="flex flex-col items-center gap-6">
           <div className="flex flex-col items-center gap-1">
              <div className={`text-2xl transition-all duration-300 ${pulse ? 'translate-y-2 text-indigo-600 scale-125' : 'text-slate-300'}`}>↓</div>
              <div className={`text-[9px] font-black uppercase tracking-widest transition-all ${pulse ? 'text-indigo-600 opacity-100' : 'text-slate-400 opacity-40'}`}>
                {pulse ? 'Data flowing...' : 'Ready to pass props'}
              </div>
           </div>

           <div className="w-full flex justify-center">
              <div className="w-full max-w-[260px] space-y-4">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded tracking-tighter">CHILD COMPONENT</span>
                 </div>
                 <div
                   className="p-8 rounded-3xl text-white shadow-2xl transition-all duration-500 flex flex-col items-center gap-4 text-center border-4 border-white/20"
                   style={{ backgroundColor: bgColor }}
                 >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner animate-in zoom-in">
                      {name.toLowerCase().includes('react') ? '⚛️' : '👤'}
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Received Props:</p>
                       <h5 className="text-2xl font-black truncate max-w-[180px]">{name}</h5>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <p className="text-[11px] text-slate-700 font-bold">The "Dumb" Component:</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      "I don't manage any state. I simply receive an 'envelope' (props) and render the UI accordingly."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="p-4 bg-slate-900 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
         <p className="text-[11px] text-slate-400">
           <span className="text-amber-400 font-bold uppercase tracking-tighter mr-2 underline decoration-amber-800 underline-offset-4">Mental Model:</span> 
           Props are <strong>Arguments</strong> for components.
         </p>
         <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
         <p className="text-[11px] text-slate-400">
           <span className="text-rose-400 font-bold uppercase tracking-tighter mr-2 underline decoration-rose-800 underline-offset-4">Golden Rule:</span> 
           Props are <strong>Read-Only</strong> (Immutable).
         </p>
      </div>
    </div>
  );
};

const OneWayFlowInteractive = () => {
  const [parentData, setParentData] = useState("Original Data");
  const [pulseKey, setPulseKey] = useState(0);
  const [showError, setShowError] = useState<number | null>(null);

  const handleUpdate = (val: string) => {
    setParentData(val);
    setPulseKey(prev => prev + 1);
  };

  const tryToMutate = (id: number) => {
    setShowError(id);
    setTimeout(() => setShowError(null), 2000);
  };

  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl overflow-hidden shadow-sm p-6 md:p-10">
      <div className="flex flex-col items-center gap-8">
        
        {/* The Parent Node */}
        <div className="w-full max-w-sm p-6 bg-white border-2 border-indigo-200 rounded-2xl shadow-md text-center space-y-4 font-bold z-20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded uppercase">Data Source (Parent)</span>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          </div>
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Parent State:</label>
            <input 
              type="text" 
              value={parentData} 
              onChange={(e) => handleUpdate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none text-sm font-bold text-indigo-900"
            />
          </div>
        </div>

        {/* Animated Connectors */}
        <div className="relative w-full h-24 flex justify-around">
          {/* Central Pillar */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200"></div>
          
          {/* Data Packets (Children A & B paths) */}
          <div className="w-full flex justify-around items-start">
            {[1, 2].map(i => (
              <div key={i} className="relative w-1/3 flex flex-col items-center">
                 <div className="h-24 w-px bg-slate-200 relative">
                   {pulseKey > 0 && (
                     <div 
                       key={`${i}-${pulseKey}`}
                       className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)] animate-flow-down"
                     ></div>
                   )}
                 </div>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-indigo-100 shadow-sm">
             <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Props Flow Down</span>
          </div>
        </div>

        {/* The Child Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
          {[1, 2].map(i => (
            <div key={i} className="space-y-4">
              <div className={`p-6 bg-white border-2 transition-all duration-300 rounded-2xl shadow-sm relative overflow-hidden ${showError === i ? 'border-rose-400 ring-4 ring-rose-100' : 'border-emerald-200'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded uppercase">Child {i === 1 ? 'A' : 'B'}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Prop Consumer</span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Incoming Prop Value:</p>
                   <p className="text-sm font-mono font-bold text-slate-800 break-all">"{parentData}"</p>
                </div>

                <div className="mt-6 flex flex-col items-center gap-2">
                   <button 
                    onClick={() => tryToMutate(i)}
                    className="w-full py-2 bg-slate-800 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 active:scale-95 transition-all"
                   >
                     Try to Change Prop
                   </button>
                   {showError === i && (
                     <div className="absolute inset-0 bg-rose-600/90 flex flex-col items-center justify-center p-6 text-white text-center animate-in fade-in zoom-in duration-300 backdrop-blur-sm">
                        <div className="text-3xl mb-2">🚫</div>
                        <p className="text-xs font-black uppercase mb-1">Access Denied</p>
                        <p className="text-[10px] font-medium leading-relaxed">Props are <strong>read-only</strong>. A child cannot "reach back up" to change the parent's source of truth!</p>
                     </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flow-down {
          0% { top: 0; opacity: 0; transform: translate(-50%, 0) scale(0.5); }
          20% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          80% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { top: 100%; opacity: 0; transform: translate(-50%, 0) scale(0.5); }
        }
        .animate-flow-down {
          animation: flow-down 1s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

const ComponentsProps: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. What are Components? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">What are Components?</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          Components are the building blocks of React. Think of them as <strong>Reusable LEGO blocks</strong> or <strong>Blueprints</strong>. 
          Instead of building a massive, messy website, you build small, independent pieces and snap them together.
        </p>

        <BlueprintArchitectureSimulator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold shrink-0">⚛️</div>
              <div>
                <h4 className="font-bold text-indigo-900 text-sm mb-1">Function = UI</h4>
                <p className="text-xs text-indigo-700 leading-relaxed">In modern React, a component is just a <strong>JavaScript Function</strong> that returns UI (JSX). It's simple logic with a visual result.</p>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">Aa</div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm mb-1">The Golden Rule: Capitalize!</h4>
                <p className="text-xs text-amber-700 leading-relaxed">Component names <strong>MUST</strong> start with a capital letter (e.g., <code>Header</code>, not <code>header</code>). This tells React: "This is a component, not a standard HTML tag."</p>
              </div>
            </div>
        </div>
      </section>

      {/* 2. Class vs Functional Components */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Class vs. Functional Components</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          React has evolved over the years. You might see two different ways of writing components:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 opacity-60">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-slate-200 rounded text-slate-500 uppercase">Legacy</span>
              Class Components
            </h4>
            <div className="bg-slate-900 p-4 rounded-lg text-[10px] font-mono text-slate-300 h-32 overflow-hidden">
              <pre>{`class Welcome extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}`}</pre>
            </div>
            <p className="mt-3 text-[10px] text-slate-500">Older style. Uses classes and "this" keyword. Harder to read.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200 ring-2 ring-indigo-500 ring-offset-2">
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-indigo-600 rounded text-white uppercase font-bold">Modern Standard</span>
              Functional Components
            </h4>
            <div className="bg-slate-900 p-4 rounded-lg text-[10px] font-mono text-indigo-300 h-32 overflow-hidden">
              <pre>{`function Welcome() {
  return <h1>Hello!</h1>;
}`}</pre>
            </div>
            <p className="mt-3 text-[10px] text-indigo-700 font-medium italic">Today, we use Functional Components + Hooks. It's the faster, cleaner way.</p>
          </div>
        </div>
      </section>

      {/* 3. Different Ways Components Appear */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Different Ways Components Appear</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          How you write a component in JSX matters. Here is the difference:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
             <code className="block mb-2 text-indigo-600 font-bold">{'{Title}'}</code>
             <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">A Reference</p>
             <p className="text-[10px] text-slate-400 leading-relaxed">This is just a variable name. It won't render the component.</p>
          </div>
          <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
             <code className="block mb-2 text-indigo-600 font-bold">{'<Title />'}</code>
             <p className="text-[10px] text-indigo-600 font-bold uppercase mb-2">Self-Closing Tag</p>
             <p className="text-[10px] text-indigo-500 leading-relaxed font-medium">The standard way to render a component that has no children.</p>
          </div>
          <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
             <code className="block mb-2 text-indigo-600 font-bold">{'<Title>...</Title>'}</code>
             <p className="text-[10px] text-indigo-600 font-bold uppercase mb-2">Open/Close Tag</p>
             <p className="text-[10px] text-indigo-500 leading-relaxed font-medium">Used when you want to pass other components or text inside (as children).</p>
          </div>
        </div>
      </section>

      {/* 4. What are Props? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What are Props?</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          If components are functions, <strong>Props</strong> are the <strong>Arguments</strong>. 
          They allow you to pass data from a <strong>Parent</strong> down to a <strong>Child</strong>.
        </p>
        
        <PropsInteractive />
      </section>

      {/* 5. Ways of Passing Props */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">How Can We Pass Props?</h3>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 text-sm">1. Direct Values</h4>
            <div className="bg-slate-900 p-4 rounded-lg text-[11px] font-mono text-slate-300 mb-4">
              <p>{`<Avatar size={50} name="Alice" isOnline={true} />`}</p>
            </div>
            <p className="text-xs text-slate-500 italic">Pass strings in quotes, and numbers/booleans in curly braces.</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 text-sm">2. Passing Children (Special Prop)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded-lg text-[10px] font-mono text-slate-300">
                <p className="text-indigo-400">{'// Inside Parent'}</p>
                <p>{`<Card>`}</p>
                <p className="pl-4 text-green-400">{`<h1>I am a child</h1>`}</p>
                <p>{`</Card>`}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg text-[10px] font-mono text-slate-300">
                <p className="text-indigo-400">{'// Inside Card Component'}</p>
                <p>{`function Card(props) {`}</p>
                <p className="pl-4">{`return <div>{props.children}</div>;`}</p>
                <p>{`}`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. One-Way Data Flow */}
      <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">Important Rule: Props Flow One-Way</h3>
        <p className="text-indigo-800 mb-8 leading-relaxed">
          In React, data travels <strong>Top-to-Bottom</strong>. This is called "One-Way Data Binding." 
          It makes your code easier to debug because you always know exactly where data is coming from.
        </p>

        <OneWayFlowInteractive />

        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-xl border border-indigo-100 text-xs text-indigo-800 italic text-center shadow-sm">
           "A child can see its props, but it can never change them. If you want a child to change something, the parent must pass down a function as a prop!"
        </div>
      </section>

      {/* 7. Common Beginner Mistakes */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Common Beginner Mistakes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-2 text-sm">1. Mutating Props</h4>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Trying to do <code>props.user = 'New'</code>. Props are <strong>Immutable</strong> (read-only). If you need to change data, you need <strong>State</strong>.
              </p>
           </div>
           <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-2 text-sm">2. Lowercase Components</h4>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Writing <code>{'<myButton />'}</code>. React will treat this like a standard HTML tag and fail to find your component.
              </p>
           </div>
           <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-2 text-sm">3. Forgetting Braces</h4>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Writing <code>age="25"</code> when you meant to pass a number. Without braces, React treats <strong>everything</strong> like a string.
              </p>
           </div>
           <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-2 text-sm">4. Too Many Props</h4>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Passing 20 different props to one component. If a component gets too crowded, it's usually time to split it into smaller pieces!
              </p>
           </div>
        </div>
      </section>

      {/* Footer / Summary */}
      <section className="bg-slate-900 p-10 rounded-3xl text-white text-center">
         <h4 className="text-xl font-bold mb-4">Summary</h4>
         <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold">Components = LEGOs</span>
            <span className="px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold">Props = Inputs</span>
            <span className="px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold">Data flows DOWN</span>
            <span className="px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold">Capitalized names ONLY</span>
         </div>
      </section>
    </div>
  );
};

export default ComponentsProps;
