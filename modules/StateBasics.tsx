
import React, { useState, useEffect } from 'react';
import RenderFlash from '../components/RenderFlash';

const StateBasics: React.FC = () => {
  // Existing state for preserved sections
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Learner");
  
  // New state for enhanced sections
  const [mirrorValue, setMirrorValue] = useState("Type something...");
  const [lightOn, setLightOn] = useState(false);
  const [anatomyStep, setAnatomyStep] = useState<'none' | 'value' | 'setter' | 'initial'>('none');
  
  // Playground state
  const [activePlayground, setActivePlayground] = useState<'counter' | 'toggle' | 'input' | 'object' | 'array'>('counter');
  const [toggleState, setToggleState] = useState(true);
  const [userProfile, setUserProfile] = useState({ name: 'Alex', role: 'Dev' });
  const [items, setItems] = useState<string[]>(['React', 'Vite']);
  
  // Mechanics state
  const [mechanicStep, setMechanicStep] = useState(0);
  const [isMechanicRunning, setIsMechanicRunning] = useState(false);

  // Mistakes section state
  const [mistakeMode, setMistakeMode] = useState<'wrong' | 'right'>('wrong');
  const [mistakeCount, setMistakeCount] = useState(0);
  let manualMistakeCount = 0;

  const runMechanicDemo = () => {
    if (isMechanicRunning) return;
    setIsMechanicRunning(true);
    setMechanicStep(1);
    setTimeout(() => setMechanicStep(2), 1000);
    setTimeout(() => setMechanicStep(3), 2000);
    setTimeout(() => {
      setCount(prev => prev + 1);
      setMechanicStep(4);
    }, 3000);
    setTimeout(() => {
      setIsMechanicRunning(false);
      setMechanicStep(0);
    }, 4500);
  };

  // This is a normal variable for the preserved comparison section
  let normalVar = 0;
  const handleNormalClick = () => {
    normalVar += 1;
    console.log('Normal variable is now:', normalVar);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      {/* 1. What is State? (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-500 text-white p-2 rounded-lg text-xl font-bold">💡</div>
          <h3 className="text-3xl font-extrabold text-slate-900">What is State in React?</h3>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          In the real world, "state" describes a condition. A light is <strong>ON</strong> or <strong>OFF</strong>. 
          A door is <strong>OPEN</strong> or <strong>CLOSED</strong>. 
          In React, <strong>State</strong> is a component's memory—data that changes over time and affects how the UI looks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800">Analogy: The Light Switch</h4>
            <div className="flex flex-col items-center gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-500 ${lightOn ? 'bg-yellow-300 ring-4 ring-yellow-100' : 'bg-slate-800 text-slate-600'}`}>
                {lightOn ? '💡' : '🌑'}
              </div>
              <button 
                onClick={() => setLightOn(!lightOn)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${lightOn ? 'bg-slate-800 text-white' : 'bg-yellow-400 text-yellow-900'}`}
              >
                Toggle State: {lightOn ? 'OFF' : 'ON'}
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h5 className="text-xs font-bold text-slate-400 uppercase mb-4">State Mirror Demo</h5>
            <input 
              type="text" 
              onChange={(e) => setMirrorValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Change the state..."
            />
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">UI Reflection</p>
              <p className="text-xl font-bold text-indigo-900 break-all">{mirrorValue}</p>
            </div>
            <p className="mt-3 text-[10px] text-slate-400 italic">"State changed → UI updated automatically"</p>
          </div>
        </div>
      </section>

      {/* 2. Normal Variable vs React State (Preserved Existing) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Normal Variables Fail in React</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Normal JavaScript variables "forget" everything when a function finishes. 
          They don't tell React that the screen needs to change.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700">1. Normal Variable (Fails)</h4>
            <div className="p-6 bg-slate-100 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-4">This increments a standard JS variable. Watch the value...</p>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-white rounded border text-center">
                  <span className="text-xs text-slate-400 block uppercase font-bold">Value</span>
                  <span className="text-2xl font-bold font-mono">{normalVar}</span>
                </div>
                <button 
                  onClick={handleNormalClick}
                  className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Increment Variable
                </button>
                <p className="text-[10px] text-red-500 font-medium">Wait! It's increasing in the console, but the UI isn't changing!</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-indigo-700">2. React State (Works!)</h4>
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-sm text-indigo-700 mb-4">This uses <code>useState</code>. React will refresh the UI automatically.</p>
              <div className="flex flex-col gap-4">
                <RenderFlash name="Counter Component">
                  <div className="p-4 bg-white rounded border text-center shadow-sm">
                    <span className="text-xs text-indigo-400 block uppercase font-bold">State Value</span>
                    <span className="text-2xl font-bold font-mono text-indigo-600">{count}</span>
                  </div>
                </RenderFlash>
                <button 
                  onClick={() => setCount(count + 1)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Set State (count + 1)
                </button>
                <p className="text-[10px] text-green-600 font-medium">The flash indicates React re-rendering the component!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What is useState? (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">What is useState?</h3>
        <p className="text-slate-600 mb-8">
          <code>useState</code> is a <strong>Hook</strong>—a special function that lets you "hook into" React features. 
          When you call it, React gives you back a box for your data and a remote control to change it.
        </p>

        <div className="bg-slate-900 p-8 rounded-2xl text-white font-mono text-sm overflow-x-auto">
          <div className="flex gap-2 mb-8">
            <button onMouseEnter={() => setAnatomyStep('none')} className="px-2 py-1 bg-slate-800 text-xs rounded">Reset Hover</button>
          </div>
          <div className="text-xl md:text-2xl">
            <span className="text-rose-400">const</span> [
            <span 
              onMouseEnter={() => setAnatomyStep('value')} 
              className={`transition-all p-1 rounded cursor-help ${anatomyStep === 'value' ? 'bg-indigo-600 ring-2 ring-indigo-400' : ''}`}
            >count</span>, 
            <span 
              onMouseEnter={() => setAnatomyStep('setter')} 
              className={`transition-all p-1 rounded cursor-help ${anatomyStep === 'setter' ? 'bg-green-600 ring-2 ring-green-400' : ''}`}
            >setCount</span>
            ] = <span className="text-yellow-400">useState</span>(
            <span 
              onMouseEnter={() => setAnatomyStep('initial')} 
              className={`transition-all p-1 rounded cursor-help ${anatomyStep === 'initial' ? 'bg-amber-600 ring-2 ring-amber-400' : ''}`}
            >0</span>
            );
          </div>

          <div className="mt-12 h-24 flex items-center justify-center">
            {anatomyStep === 'none' && <p className="text-slate-500 animate-pulse italic">Hover over the code to learn its anatomy!</p>}
            {anatomyStep === 'value' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 text-center">
                <p className="text-indigo-400 font-bold mb-1 uppercase tracking-widest text-[10px]">Current Value</p>
                <p className="text-slate-300">The current state value. You can use this inside your JSX.</p>
              </div>
            )}
            {anatomyStep === 'setter' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 text-center">
                <p className="text-green-400 font-bold mb-1 uppercase tracking-widest text-[10px]">Setter Function</p>
                <p className="text-slate-300">The "Remote Control". Call this function to update the state.</p>
              </div>
            )}
            {anatomyStep === 'initial' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 text-center">
                <p className="text-amber-400 font-bold mb-1 uppercase tracking-widest text-[10px]">Initial Value</p>
                <p className="text-slate-300">The value state starts with when the component first appears.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Why useState? (NEW) */}
      <section className="bg-indigo-600 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6">Why was useState introduced?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-sm text-indigo-100">
              <p>Before Hooks (2019), if you wanted a component to have state, you had to write a <strong>Class Component</strong>.</p>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="font-bold text-white mb-2">Class Components were...</p>
                <ul className="list-disc list-inside space-y-1 opacity-80">
                  <li>Complex to learn ("this" keyword)</li>
                  <li>Verbous (lots of boilerplate)</li>
                  <li>Hard to share logic between components</li>
                </ul>
              </div>
              <p>Hooks like <code>useState</code> allowed us to use simple functions for everything, making code <strong>cleaner, faster, and easier to share</strong>.</p>
            </div>
            <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-500/30">
               <div className="flex flex-col items-center gap-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">Evolution of React</div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-slate-800 rounded-lg text-[10px] opacity-40">Class Component</div>
                    <div className="text-indigo-500">➜</div>
                    <div className="px-4 py-3 bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl ring-2 ring-indigo-400">Functional + Hooks</div>
                  </div>
                  <p className="text-[10px] italic text-indigo-300">Simpler code, happier developers.</p>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* 5. How useState Works (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">How useState Works (The Mechanics)</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Updating state isn't instant. React "schedules" the update and then performs a re-render. 
          Let's watch the timeline.
        </p>

        <div className="bg-slate-900 p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-10">
            <button 
              onClick={runMechanicDemo}
              disabled={isMechanicRunning}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${isMechanicRunning ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'}`}
            >
              {isMechanicRunning ? 'Running...' : 'Run Update Mechanic'}
            </button>
            <div className="text-slate-400 text-xs">Step: {mechanicStep}/4</div>
          </div>

          <div className="grid grid-cols-4 gap-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 -z-0"></div>
            
            {[
              { id: 1, label: 'Trigger', icon: '⚡', desc: 'Call setCount()' },
              { id: 2, label: 'Queue', icon: '📝', desc: 'React adds to list' },
              { id: 3, label: 'Render', icon: '🏗️', desc: 'Runs function' },
              { id: 4, label: 'Commit', icon: '✨', desc: 'Updates DOM' }
            ].map(step => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 border-4 ${mechanicStep >= step.id ? 'bg-indigo-600 border-indigo-400 text-white scale-110' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  {step.icon}
                </div>
                <div className="mt-4 text-center">
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${mechanicStep >= step.id ? 'text-indigo-400' : 'text-slate-600'}`}>{step.label}</p>
                  <p className="text-[8px] text-slate-500 mt-1 max-w-[80px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Different Uses of useState (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Different Ways We Use useState</h3>
        <p className="text-slate-600 mb-8 italic">State can be anything: numbers, booleans, strings, objects, or arrays.</p>

        <div className="flex border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
          {['counter', 'toggle', 'input', 'object', 'array'].map((tab: any) => (
            <button
              key={tab}
              onClick={() => setActivePlayground(tab)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
                activePlayground === tab ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[240px] flex items-center justify-center bg-slate-50 rounded-2xl p-8 border border-slate-200">
           {activePlayground === 'counter' && (
             <div className="text-center space-y-4 animate-in zoom-in duration-300">
               <div className="text-5xl font-black text-indigo-600">{count}</div>
               <div className="flex gap-2">
                 <button onClick={() => setCount(count - 1)} className="p-3 bg-white border rounded-xl shadow-sm hover:bg-slate-50">-</button>
                 <button onClick={() => setCount(count + 1)} className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700">+</button>
               </div>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Type: Number</p>
             </div>
           )}

           {activePlayground === 'toggle' && (
             <div className="text-center space-y-6 animate-in zoom-in duration-300">
               <div className={`w-24 h-12 rounded-full p-1 cursor-pointer transition-all duration-300 ${toggleState ? 'bg-green-500' : 'bg-slate-300'}`} onClick={() => setToggleState(!toggleState)}>
                 <div className={`w-10 h-10 bg-white rounded-full shadow-lg transition-all duration-300 ${toggleState ? 'translate-x-12' : 'translate-x-0'}`}></div>
               </div>
               <p className="text-lg font-bold text-slate-800">State is: {toggleState ? 'TRUE' : 'FALSE'}</p>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Type: Boolean</p>
             </div>
           )}

           {activePlayground === 'input' && (
             <div className="text-center space-y-4 w-full max-w-xs animate-in zoom-in duration-300">
               <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 outline-none focus:border-indigo-500 text-center text-xl font-bold text-indigo-900"
               />
               <p className="text-slate-500 text-sm">Hello, {name}!</p>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Type: String</p>
             </div>
           )}

           {activePlayground === 'object' && (
             <div className="w-full max-w-xs space-y-4 animate-in zoom-in duration-300">
               <div className="p-4 bg-white rounded-xl border shadow-sm space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400 font-bold uppercase tracking-widest">Name:</span>
                   <span className="text-slate-800 font-bold">{userProfile.name}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400 font-bold uppercase tracking-widest">Role:</span>
                   <span className="text-slate-800 font-bold">{userProfile.role}</span>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <button 
                  onClick={() => setUserProfile({...userProfile, role: 'Senior'})} 
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold"
                 >
                  Promote to Senior
                 </button>
                 <button 
                  onClick={() => setUserProfile({name: 'Alex', role: 'Dev'})} 
                  className="px-3 py-1 bg-white border text-slate-400 rounded-lg text-[10px] font-bold"
                 >
                  Reset
                 </button>
               </div>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center">Type: Object</p>
             </div>
           )}

           {activePlayground === 'array' && (
             <div className="w-full max-w-xs space-y-4 animate-in zoom-in duration-300">
                <div className="flex flex-wrap gap-2 justify-center">
                  {items.map((item, idx) => (
                    <div key={idx} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setItems([...items, 'New'])}
                    className="flex-1 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs"
                   >
                     Add Item
                   </button>
                   <button 
                    onClick={() => setItems(items.slice(0, -1))}
                    className="flex-1 py-2 bg-rose-100 text-rose-700 rounded-xl font-bold text-xs"
                   >
                     Remove Last
                   </button>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center">Type: Array</p>
             </div>
           )}
        </div>
      </section>

      {/* 7. Controlled Input Example (Preserved Existing) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Controlled Input: The Single Source of Truth</h3>
        <p className="text-slate-600 mb-6">
          In React, we don't let the browser handle form values. We "control" them via state. 
          This makes the state the <strong>Single Source of Truth</strong>.
        </p>

        <div className="max-w-md mx-auto p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col items-center">
          <RenderFlash name="Greeting Component">
            <h2 className="text-3xl font-black text-slate-800 mb-6 italic text-center">
              "Hello, <span className="text-indigo-600">{name || 'stranger'}</span>!"
            </h2>
          </RenderFlash>
          
          <div className="w-full space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type your name:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none transition-all shadow-sm text-xl"
              placeholder="Enter name..."
            />
          </div>

          <div className="mt-8 w-full p-4 bg-slate-900 rounded-xl text-[10px] font-mono text-slate-300">
            <p className="text-indigo-400">{'// Behind the scenes:'}</p>
            <p>{`const [name, setName] = useState("${name}");`}</p>
            <p className="mt-2 text-slate-500">{'// value is sync\'d to state'}</p>
            <p>{`<input value={name} onChange={...} />`}</p>
          </div>
        </div>
      </section>

      {/* 8. Common useState Mistakes (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Common useState Mistakes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex gap-4">
                 <button onClick={() => setMistakeMode('wrong')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${mistakeMode === 'wrong' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white text-slate-400'}`}>Broken Code</button>
                 <button onClick={() => setMistakeMode('right')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${mistakeMode === 'right' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white text-slate-400'}`}>Correct Code</button>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl font-mono text-xs text-slate-300 h-40 flex items-center">
                 {mistakeMode === 'wrong' ? (
                   <pre className="text-rose-300">{`// ERROR: Mutating state directly
const handleClick = () => {
  count = count + 1; 
  // ❌ Won't trigger re-render!
};`}</pre>
                 ) : (
                   <pre className="text-green-300">{`// CORRECT: Use the setter
const handleClick = () => {
  setCount(count + 1);
  // ✅ Triggers Re-render!
};`}</pre>
                 )}
              </div>
           </div>

           <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Interactive Test</p>
                <div className="text-4xl font-black text-slate-800">{mistakeMode === 'wrong' ? manualMistakeCount : mistakeCount}</div>
              </div>
              <button 
                onClick={() => {
                  if (mistakeMode === 'wrong') {
                    manualMistakeCount += 1;
                    console.log('Manual count is:', manualMistakeCount);
                    // Force refresh demo text
                    setMistakeMode('wrong'); 
                  } else {
                    setMistakeCount(mistakeCount + 1);
                  }
                }}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${mistakeMode === 'wrong' ? 'bg-rose-500 text-white' : 'bg-green-600 text-white'}`}
              >
                Click to Increment
              </button>
              <p className="text-[10px] text-center text-slate-500 italic">
                {mistakeMode === 'wrong' 
                  ? "Clicking won't update the number above because we're bypassing React's re-render system!" 
                  : "Using the setter function tells React: 'Something changed! Please update the screen!'"}
              </p>
           </div>
        </div>
      </section>

      {/* Summary / Key Takeaways */}
      <section className="bg-slate-900 p-12 rounded-3xl text-center text-white">
         <h4 className="text-3xl font-black mb-6">Key Takeaways</h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
               <div className="text-2xl mb-2">🧠</div>
               <p className="font-bold text-indigo-400 mb-2">Memory</p>
               <p className="text-xs text-slate-400 leading-relaxed">State lets components "remember" info between renders.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
               <div className="text-2xl mb-2">⚡</div>
               <p className="font-bold text-indigo-400 mb-2">Trigger</p>
               <p className="text-xs text-slate-400 leading-relaxed">Updating state always triggers a re-render of the component.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
               <div className="text-2xl mb-2">📥</div>
               <p className="font-bold text-indigo-400 mb-2">Control</p>
               <p className="text-xs text-slate-400 leading-relaxed">Forms should use state as their "single source of truth".</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default StateBasics;
