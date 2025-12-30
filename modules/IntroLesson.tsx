
import React, { useState, useEffect } from 'react';

const WorkflowSimulator = () => {
  const [mode, setMode] = useState<'manual' | 'react'>('manual');
  const [isLiked, setIsLiked] = useState(false);
  const [manualStep, setManualStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const reset = () => {
    setIsLiked(false);
    setManualStep(0);
    setIsProcessing(false);
  };

  const runManualProcess = () => {
    if (isProcessing || isLiked) return;
    setIsProcessing(true);
    
    // Step 1: Find Icon
    setManualStep(1);
    setTimeout(() => {
      // Step 2: Change Color
      setManualStep(2);
      setTimeout(() => {
        // Step 3: Update Text
        setManualStep(3);
        setIsLiked(true);
        setIsProcessing(false);
      }, 1000);
    }, 1000);
  };

  const runReactProcess = () => {
    if (isLiked) {
      setIsLiked(false);
      return;
    }
    // In React, we just set the data. The UI follows.
    setIsLiked(true);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 bg-white">
        <button 
          onClick={() => { setMode('manual'); reset(); }}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'manual' ? 'text-rose-600 bg-rose-50/50 border-b-2 border-rose-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Manual Workflow (Legacy)
        </button>
        <button 
          onClick={() => { setMode('react'); reset(); }}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'react' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          React Workflow (Modern)
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: The "App Screen" */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Browser Output</p>
            <div className="p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4 transition-all duration-500">
               <div className={`text-6xl transition-all duration-500 ${isLiked ? 'scale-110' : 'grayscale opacity-20'}`}>
                 ❤️
               </div>
               <div className="text-2xl font-black text-slate-800">
                 {isLiked ? '1,001 Likes' : '1,000 Likes'}
               </div>
               <button 
                 onClick={mode === 'manual' ? runManualProcess : runReactProcess}
                 disabled={isProcessing}
                 className={`w-full py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 ${isLiked && mode === 'react' ? 'bg-slate-100 text-slate-500' : 'bg-rose-500 text-white hover:bg-rose-600'} disabled:opacity-50`}
               >
                 {mode === 'manual' 
                   ? (isProcessing ? 'Processing Steps...' : (isLiked ? 'Liked (Refresh to reset)' : 'Click to Like'))
                   : (isLiked ? 'Unlike' : 'Click to Like')
                 }
               </button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[10px]">
            <p className="text-slate-500 mb-2">// Developer Focus</p>
            {mode === 'manual' ? (
              <pre className="text-rose-300 leading-relaxed">
{`// 1. Find the elements
const btn = document.querySelector('.btn');
const count = document.querySelector('.count');

// 2. Add event listener
btn.addEventListener('click', () => {
  btn.style.color = 'red';      // Manual step 1
  count.innerText = '1,001';    // Manual step 2
});`}
              </pre>
            ) : (
              <pre className="text-indigo-300 leading-relaxed">
{`// 1. Define the piece of data
const [liked, setLiked] = useState(false);

// 2. Just update the data!
<button onClick={() => setLiked(true)}>
  {liked ? '1,001' : '1,000'}
</button>`}
              </pre>
            )}
          </div>
        </div>

        {/* Right Side: The Execution Timeline */}
        <div className="space-y-6">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            {mode === 'manual' ? '🐢 Step-by-Step Execution' : '⚡ Declarative Sync'}
          </h4>
          
          <div className="space-y-4 relative">
            {mode === 'manual' ? (
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${manualStep >= 1 ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-white opacity-40'}`}>
                  <p className="text-xs font-bold text-rose-700 uppercase mb-1">Step 1: Finding</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Searching the entire DOM for the heart icon and text node...</p>
                </div>
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${manualStep >= 2 ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-white opacity-40'}`}>
                  <p className="text-xs font-bold text-rose-700 uppercase mb-1">Step 2: Coloring</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Manually reaching into the browser and changing CSS styles.</p>
                </div>
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${manualStep >= 3 ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-white opacity-40'}`}>
                  <p className="text-xs font-bold text-rose-700 uppercase mb-1">Step 3: Text Swap</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Replacing the inner content of the text node.</p>
                </div>
                {manualStep === 0 && !isLiked && (
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center h-32">
                    <p className="text-[10px] text-slate-400 font-medium italic">Click the heart to see the steps...</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${isLiked ? 'border-indigo-500 bg-indigo-600 text-white shadow-xl scale-105' : 'border-slate-100 bg-white'}`}>
                   <div className="flex items-center justify-between mb-2">
                     <p className="text-xs font-bold uppercase tracking-widest">App State</p>
                     <div className={`w-3 h-3 rounded-full ${isLiked ? 'bg-green-400' : 'bg-slate-200'}`}></div>
                   </div>
                   <div className="bg-black/20 p-3 rounded-lg font-mono text-sm">
                      {`liked: ${isLiked}`}
                   </div>
                </div>

                <div className="flex flex-col items-center">
                   <div className={`text-2xl transition-all duration-700 ${isLiked ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>👇</div>
                   <div className={`text-[10px] font-black uppercase text-indigo-400 mt-1 transition-all ${isLiked ? 'opacity-100' : 'opacity-0'}`}>Automatic Render</div>
                </div>

                <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${isLiked ? 'border-green-500 bg-green-50 opacity-100 translate-y-0' : 'border-slate-100 bg-white opacity-40 translate-y-4'}`}>
                   <p className="text-xs font-bold text-green-700 uppercase mb-1">Updated UI</p>
                   <p className="text-[10px] text-green-600 leading-tight">React detected the state changed and updated the screen automatically.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-900 text-center">
         <p className="text-[11px] text-slate-400 italic">
           {mode === 'manual' 
            ? "Notice how you have to micro-manage every single detail? One mistake and the UI is out of sync." 
            : "In React, you only worry about the DATA. React ensures the UI matches the data perfectly."}
         </p>
         <button onClick={reset} className="mt-2 text-[9px] font-bold text-indigo-400 uppercase tracking-widest underline decoration-indigo-800">Reset Simulator</button>
      </div>
    </div>
  );
};

const IntroLesson: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. Improved Definition */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-600 text-white p-2 rounded-lg text-xl font-bold">⚛️</div>
          <h3 className="text-3xl font-extrabold text-slate-900">What is React?</h3>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          React is a <span className="text-indigo-600 font-bold">JavaScript library</span> created by Facebook for building 
          <span className="text-slate-900 font-semibold"> User Interfaces (UIs)</span>. 
          Think of it as a tool that helps you build everything you see on a screen—from buttons and text to complex dashboards—in a way that is organized, fast, and easy to maintain.
        </p>
        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
          <p className="text-indigo-800 text-sm">
            <strong>In short:</strong> React handles the "View" layer of your web applications. It lets you describe 
            <em> what</em> you want to see, and it handles the heavy lifting of making it appear on the screen.
          </p>
        </div>
      </section>

      {/* 2. Why React Was Introduced */}
      <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">⏳</span> The "Dark Ages" Before React
        </h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Before React, developers used "Plain JavaScript" (Vanilla JS) or libraries like jQuery to build sites. 
          As websites grew into complex apps, a few major problems appeared:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-sm">Manual DOM Pain</h4>
            <p className="text-xs text-slate-500">To change text, you had to find the exact HTML tag in the "DOM" and update it manually. It was error-prone and slow.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-sm">State Management</h4>
            <p className="text-xs text-slate-500">Keeping the UI in sync with your data was a nightmare. If the user's name changed, you had to remember to update it in 10 different places.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-sm">Spaghetti Code</h4>
            <p className="text-xs text-slate-500">Logic was scattered everywhere. There was no standard way to build reusable pieces of the interface.</p>
          </div>
        </div>
      </section>

      {/* 3. The Workflow Shift (INTERACTIVE REPLACEMENT) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Workflow Shift</h3>
        <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
          The biggest difference between modern React and legacy coding is <strong>Declarative vs. Imperative</strong>. 
          In legacy code, you tell the browser exactly <em>how</em> to change every pixel. In React, you just update your <em>data</em>.
        </p>
        
        <WorkflowSimulator />
      </section>

      {/* 4. Why Developers Prefer React */}
      <section className="bg-indigo-900 p-10 rounded-3xl text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-8">Why do developers prefer React?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 className="font-bold text-lg">Reusable Components</h4>
                  <p className="text-sm text-indigo-200">Build a button once, use it everywhere. Like Lego bricks, you can combine components to create complex screens quickly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 className="font-bold text-lg">Declarative UI</h4>
                  <p className="text-sm text-indigo-200">You describe how the UI should look for a specific state, and React ensures the screen matches that description perfectly.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 className="font-bold text-lg">Predictable Updates</h4>
                  <p className="text-sm text-indigo-200">Because data flows in one direction (Top-to-Bottom), debugging is much easier. You always know where an update started.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-xs">4</div>
                <div>
                  <h4 className="font-bold text-lg">Huge Ecosystem</h4>
                  <p className="text-sm text-indigo-200">React is the most popular UI library. This means thousands of free tutorials, libraries, and a massive job market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-700 rounded-full blur-2xl -ml-24 -mb-24 opacity-30"></div>
      </section>

      {/* Blueprint section retained for continuity */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-4">The Blueprint Analogy</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Imagine building a house. Instead of telling builders where every single brick goes, you provide a 
          <strong> Blueprint</strong>. When you want to change a wall, you just update the blueprint and the 
          builders (React) figure out exactly which bricks to move.
        </p>
        
        <div className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-xl">
          <div className="w-full max-w-sm p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="h-4 w-2/3 bg-slate-100 rounded mb-4"></div>
            <div className="flex gap-2">
              <div className="h-8 flex-1 bg-indigo-100 border border-indigo-200 rounded flex items-center justify-center text-[10px] text-indigo-700 font-bold uppercase tracking-widest">Component Block</div>
              <div className="h-8 flex-1 bg-indigo-100 border border-indigo-200 rounded flex items-center justify-center text-[10px] text-indigo-700 font-bold uppercase tracking-widest">Component Block</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-2">Thinking in Components: [ App [ Nav, [ Item, Item ] ] ]</p>
        </div>
      </section>
    </div>
  );
};

export default IntroLesson;
