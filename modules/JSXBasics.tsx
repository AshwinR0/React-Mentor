
import React, { useState } from 'react';

const BabelTransformer = () => {
  const [activeExample, setActiveExample] = useState('simple');
  const [isCompiling, setIsCompiling] = useState(false);

  const examples: Record<string, { jsx: string, js: string, title: string }> = {
    simple: {
      title: 'Simple Tag',
      jsx: `<h1>Hello World</h1>`,
      js: `React.createElement(\n  'h1', \n  null, \n  'Hello World'\n);`
    },
    props: {
      title: 'With Props',
      jsx: `<button className="blue" onClick={handleClick}>\n  Click Me\n</button>`,
      js: `React.createElement(\n  'button', \n  { \n    className: 'blue', \n    onClick: handleClick \n  }, \n  'Click Me'\n);`
    },
    nested: {
      title: 'Nested Tags',
      jsx: `<div>\n  <p>Inside</p>\n</div>`,
      js: `React.createElement(\n  'div', \n  null, \n  React.createElement(\n    'p', \n    null, \n    'Inside'\n  )\n);`
    }
  };

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => setIsCompiling(false), 800);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-1">Babel Compiler Simulator</h4>
          <p className="text-slate-400 text-[10px]">See how JSX is desugared into raw JavaScript</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl">
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              onClick={() => { setActiveExample(key); handleCompile(); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeExample === key ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {examples[key].title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Input Pane */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Your Code (JSX)</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          </div>
          <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 font-mono text-xs text-indigo-300 h-48 flex items-center overflow-auto">
            <pre className="w-full"><code>{examples[activeExample].jsx}</code></pre>
          </div>
        </div>

        {/* Central Transformer Icon (Desktop Only) */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className={`w-12 h-12 rounded-full bg-indigo-600 border-4 border-slate-900 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isCompiling ? 'rotate-180 scale-125 bg-emerald-500' : ''}`}>
            {isCompiling ? '⚡' : '⚙️'}
          </div>
        </div>

        {/* Output Pane */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Babel Output (Plain JS)</span>
            {isCompiling && <span className="text-[9px] font-black text-emerald-400 uppercase animate-pulse">Transforming...</span>}
          </div>
          <div className={`bg-slate-950 p-6 rounded-2xl border transition-all duration-500 font-mono text-xs h-48 flex items-center overflow-auto ${isCompiling ? 'border-emerald-500/50 bg-emerald-500/5 opacity-50' : 'border-white/5 text-emerald-400'}`}>
            <pre className="w-full"><code>{examples[activeExample].js}</code></pre>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center gap-4 max-w-md">
          <div className="text-2xl shrink-0">🎓</div>
          <p className="text-[11px] text-indigo-200 leading-relaxed">
            <strong>Mental Model:</strong> JSX isn't magic. It's just a <strong>shorthand</strong>. Every tag you write becomes a function call that creates a "Virtual DOM" object.
          </p>
        </div>
        {/* <button 
          onClick={handleCompile}
          className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all active:scale-95"
        >
          Run Transformation
        </button> */}
      </div>
    </div>
  );
};

const RenderFlowSimulator = () => {
  const [stage, setStage] = useState<'idle' | 'finding' | 'rendering' | 'complete'>('idle');

  const runRender = () => {
    setStage('finding');
    setTimeout(() => setStage('rendering'), 1000);
    setTimeout(() => setStage('complete'), 2500);
  };

  const reset = () => setStage('idle');

  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border-2 border-dashed border-slate-200 mb-8">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-slate-800 font-black text-[10px] uppercase tracking-widest">Execution Flow: The Entry Point</h4>
        <button 
          onClick={stage === 'complete' ? reset : runRender}
          disabled={stage === 'finding' || stage === 'rendering'}
          className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all shadow-lg active:scale-95 ${stage === 'complete' ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white disabled:opacity-50'}`}
        >
          {stage === 'idle' && 'Execute root.render()'}
          {stage === 'finding' && 'Locating #root...'}
          {stage === 'rendering' && 'Building DOM nodes...'}
          {stage === 'complete' && 'Reset Simulator'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: JavaScript Context */}
        <div className="flex flex-col">
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden border border-white/5 flex-1">
             <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-slate-500 font-mono ml-2">index.js</span>
             </div>
             <div className="font-mono text-[11px] space-y-4">
                <div>
                   <p className="text-slate-500 italic mb-1">{'// 1. Find the mounting point'}</p>
                   <p className={`transition-all duration-500 p-1 rounded ${stage === 'finding' ? 'bg-indigo-500/30 text-white' : 'text-indigo-300'}`}>
                     const rootEl = document.<span className="text-amber-300">getElementById</span>(<span className="text-emerald-400">'root'</span>);
                   </p>
                </div>
                <div>
                   <p className="text-slate-500 italic mb-1">{'// 2. Create React root'}</p>
                   <p className="text-indigo-300 p-1">
                      const root = ReactDOM.<span className="text-amber-300">createRoot</span>(rootEl);
                   </p>
                </div>
                <div>
                   <p className="text-slate-500 italic mb-1">{'// 3. Connect JSX to DOM'}</p>
                   <p className={`transition-all duration-500 p-1 rounded ${stage === 'rendering' ? 'bg-indigo-500/30 text-white' : 'text-indigo-300'}`}>
                      root.<span className="text-amber-300">render</span>(<span className="text-green-400">&lt;App /&gt;</span>);
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: The Browser DOM */}
        <div className="relative">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full min-h-[280px] flex flex-col">
             <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
             </div>
             <div className="flex-1 p-6 font-mono text-[10px] text-slate-400 relative overflow-hidden">
                <p className="mb-1">{'<!DOCTYPE html>'}</p>
                <p className="mb-1">{'<html>'}</p>
                <p className="mb-1 pl-4">{'<body>'}</p>
                <div className={`transition-all duration-500 p-4 rounded-xl border-2 border-dashed mx-4 my-2 flex flex-col items-center justify-center min-h-[120px] relative ${stage === 'finding' ? 'border-indigo-500 bg-indigo-50 shadow-inner' : 'border-slate-200'}`}>
                   <span className="absolute top-1 left-2 text-[8px] font-black uppercase text-slate-300 tracking-tighter">Container</span>
                   <code className="text-slate-900 font-bold text-xs">{`<div id="root">`}</code>
                   
                   {/* UI Injection Point */}
                   <div className="w-full py-2">
                      {stage === 'rendering' && (
                        <div className="space-y-2 py-2">
                           <div className="h-2 bg-indigo-200 rounded w-3/4 mx-auto animate-pulse"></div>
                           <div className="h-2 bg-indigo-200 rounded w-1/2 mx-auto animate-pulse"></div>
                        </div>
                      )}
                      {stage === 'complete' && (
                        <div className="animate-in zoom-in bg-indigo-600 text-white p-4 rounded-xl text-center font-bold shadow-xl border-t-4 border-indigo-400">
                           <div className="text-xl mb-1">🚀</div>
                           <p className="text-[10px] uppercase tracking-widest">App Component</p>
                           <p className="text-[8px] font-normal opacity-70">UI is live on screen</p>
                        </div>
                      )}
                      {stage === 'idle' && (
                        <div className="py-4 text-center text-[9px] text-slate-300 italic">Empty root container</div>
                      )}
                   </div>

                   <code className="text-slate-900 font-bold text-xs">{`</div>`}</code>
                   
                   {stage === 'finding' && (
                     <div className="absolute inset-0 bg-indigo-500/10 animate-pulse rounded-xl"></div>
                   )}
                </div>
                <p className="mb-1 pl-4">{'</body>'}</p>
                <p>{'</html>'}</p>

                {/* Animated Connection Particle */}
                {stage === 'rendering' && (
                   <div className="absolute top-1/2 left-0 w-2 h-2 bg-indigo-500 rounded-full animate-flow-particle shadow-lg shadow-indigo-400"></div>
                )}
             </div>
          </div>
          
          <div className="absolute -bottom-2 right-4 bg-slate-800 text-white px-3 py-1 rounded-full text-[8px] font-black tracking-widest shadow-lg">
             REAL BROWSER DOM
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes flow-particle {
          0% { left: -10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 50%; opacity: 0; }
        }
        .animate-flow-particle {
          animation: flow-particle 1.2s infinite ease-in;
        }
      `}</style>
    </div>
  );
};

const JSXBasics: React.FC = () => {
  const exampleName = "React Master";
  const colors = ['Red', 'Blue', 'Green'];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. Improved Definition */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">JSX: HTML in JavaScript?</h3>
        
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-xl">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <span>⚠️</span> Looks like HTML, but it's not!
          </h4>
          <p className="text-amber-800 leading-relaxed">
            JSX stands for <strong>JavaScript XML</strong>. It is a "syntax extension" for JavaScript. 
            While it looks like you're writing HTML tags inside your code, you're actually writing a shorthand for creating <strong>JavaScript Objects</strong>.
          </p>
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed">
          In plain HTML, tags are just text instructions for the browser. In JSX, every "tag" is a powerful piece of logic that can handle data, events, and styling all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-sm text-indigo-300">
            <span className="text-slate-500">// This is JSX</span><br/>
            const element = <span className="text-green-400">&lt;h1&gt;</span>Hello!<span className="text-green-400">&lt;/h1&gt;</span>;
          </div>
          <div className="text-slate-500 text-sm italic">
            "We use JSX because it's easier to visualize the UI structure than writing raw JavaScript functions."
          </div>
        </div>
      </section>

      {/* 2. JSX vs React.createElement (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">JSX vs React.createElement</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Before your code runs in a browser, every JSX tag is converted into a <code>React.createElement()</code> function call. 
          Developers rarely write this manually because it's harder to read as the UI gets bigger.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">The JSX Way (What you write)</p>
            <div className="bg-slate-900 p-6 rounded-xl text-xs font-mono text-slate-300 h-full border border-slate-800">
              <pre>{`const button = (
  <button className="blue">
    Click Me
  </button>
);`}</pre>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">The createElement Way (What React sees)</p>
            <div className="bg-slate-900 p-6 rounded-xl text-xs font-mono text-indigo-300 h-full border border-indigo-900">
              <pre>{`const button = React.createElement(
  'button', 
  { className: 'blue' }, 
  'Click Me'
);`}</pre>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500 italic">JSX is the "syntactic sugar" that makes our lives easier!</p>
      </section>

      {/* 3 & 4. The Transformation Process (INTERACTIVE UPGRADE) */}
      <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 overflow-hidden">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <span>⚙️</span> The Transformation Process
        </h3>
        <p className="text-indigo-800 mb-8 max-w-2xl">
          Browsers don't know what <code>&lt;div&gt;</code> means inside a JavaScript file. 
          Your JSX must be <strong>transformed</strong> into standard JavaScript at <strong>build time</strong> by a tool like Babel.
        </p>

        <BabelTransformer />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-5 bg-white rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2 text-sm">Babel & SWC</h4>
            <p className="text-xs text-indigo-700 leading-relaxed">
              These are "Compilers." They act like translators, turning your modern JSX and ES6 code into a version of JavaScript that every browser understands.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2 text-sm">Vite & Parcel</h4>
            <p className="text-xs text-indigo-700 leading-relaxed">
              These are "Bundlers." They act like managers. They run Babel for you, combine all your files into one package, and refresh your browser as you type.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Expressions in Curly Braces */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">JS Mode: Curly Braces</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Inside JSX, curly braces <code>{'{ }'}</code> are like a portal to "JavaScript Land." 
          Anything inside them is evaluated as a <strong>JavaScript Expression</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-green-600 text-sm flex items-center gap-2">
              <span className="bg-green-100 p-1 rounded">✅</span> What works: Expressions
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              <li>Variable names: <code>{'{userName}'}</code></li>
              <li>Math: <code>{'{2 + 2}'}</code></li>
              <li>Function calls: <code>{'{calculateTotal()}'}</code></li>
              <li>Ternary operators: <code>{'{isLoggedIn ? "Hi" : "Login"}'}</code></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-red-500 text-sm flex items-center gap-2">
              <span className="bg-red-100 p-1 rounded">❌</span> What fails: Statements
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              <li>IF statements: <code>{'{if (x) { ... }}'}</code></li>
              <li>FOR loops: <code>{'{for (let i...) { ... }}'}</code></li>
              <li>Variable declarations: <code>{'{const x = 5}'}</code></li>
            </ul>
            <p className="text-[10px] text-slate-400 italic">Rule of thumb: If it results in a single value, it can go in braces.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
          <div className="text-center">
             <div className="text-3xl font-bold text-indigo-600 mb-2">Hello, {exampleName}!</div>
             <p className="text-sm text-slate-500">Result of <code>{'{exampleName}'}</code></p>
          </div>
        </div>
      </section>

      {/* 6 & 7. Rendering Lists & Keys */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Rendering Lists & The Key Rule</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          In UI development, we often need to repeat the same block for every item in a list (like users, messages, or products). 
          React uses the <code>.map()</code> function to transform data into JSX.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-900 p-6 rounded-xl text-xs font-mono text-slate-300">
              <p className="text-indigo-400">{'// Repeating JSX elements'}</p>
              <p>{`{colors.map(color => (`}</p>
              <p className="pl-4 text-green-400 font-bold">{`<li key={color}>{color}</li>`}</p>
              <p>{`))}`}</p>
            </div>
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <h5 className="font-bold text-indigo-900 text-sm mb-1">Why keys?</h5>
              <p className="text-[11px] text-indigo-700 leading-relaxed">
                Keys help React identify which items have changed, been added, or been removed. 
                Without a unique key, React has to re-render the <strong>entire list</strong> every time one item changes!
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Visual Output</p>
            <ul className="space-y-2 w-full">
              {colors.map(color => (
                <li key={color} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                  <span className="font-bold text-slate-700">{color}</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-100 rounded text-slate-400 font-mono">key="{color}"</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. React.Fragment & <> </> (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Single Parent Rule & Fragments</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Every React component must return <strong>one single parent element</strong>. 
          If you want to return two things side-by-side, you'd usually have to wrap them in a <code>&lt;div&gt;</code>, which can clutter your HTML.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-50 border border-red-100 rounded-xl">
             <h4 className="font-bold text-red-900 mb-2 text-sm">The "Div Soup" Problem</h4>
             <div className="bg-slate-900 p-4 rounded text-[10px] font-mono text-slate-300">
               <pre>{`return (
  <div> // Extra tag in DOM
    <h1>Title</h1>
    <p>Body</p>
  </div>
);`}</pre>
             </div>
          </div>
          <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
             <h4 className="font-bold text-green-900 mb-2 text-sm">The Fragment Solution</h4>
             <div className="bg-slate-900 p-4 rounded text-[10px] font-mono text-slate-300">
               <pre>{`return (
  <> // Invisible wrapper
    <h1>Title</h1>
    <p>Body</p>
  </>
);`}</pre>
             </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          <strong>Fragments</strong> (<code>&lt;&gt;...&lt;/&gt;</code>) allow you to group elements without adding extra nodes to the Real DOM.
        </p>
      </section>

      {/* 8. Benefits of JSX (NEW) */}
      <section className="bg-slate-900 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <h3 className="text-2xl font-bold mb-6">Why do we use JSX?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="flex items-start gap-3">
            <span className="text-indigo-400 font-bold">✓</span>
            <div>
              <p className="font-bold text-indigo-300 text-sm">Better Readability</p>
              <p className="text-xs text-slate-400">It's much easier to see what the UI looks like compared to nested function calls.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-400 font-bold">✓</span>
            <div>
              <p className="font-bold text-indigo-300 text-sm">Logic & UI Together</p>
              <p className="text-xs text-slate-400">No need to jump between separate HTML and JS files. Everything related to a component is in one spot.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-400 font-bold">✓</span>
            <div>
              <p className="font-bold text-indigo-300 text-sm">Fewer Bugs</p>
              <p className="text-xs text-slate-400">React can show you errors in your markup during development, rather than letting the browser fail silently.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-400 font-bold">✓</span>
            <div>
              <p className="font-bold text-indigo-300 text-sm">Type Safety</p>
              <p className="text-xs text-slate-400">Tools like TypeScript can check your JSX to ensure you aren't passing the wrong data to your tags.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* 10. How JSX Connects to Rendering (NEW) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Connecting JSX to the Screen</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          The final piece of the puzzle is how React takes your JSX descriptions and puts them on the page. 
          This is handled by <code>ReactDOM.createRoot()</code>.
        </p>

        <RenderFlowSimulator />

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-600 font-bold">!</div>
          <p className="text-xs text-slate-500 italic">
            <strong>Mental Model:</strong> JSX creates the blueprint, <code>createRoot</code> is the building site, and <code>render()</code> is the construction worker that makes it real.
          </p>
        </div>
      </section>
    </div>
  );
};

export default JSXBasics;
