
import React from 'react';

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

      {/* 3 & 4. The Transformation & Tooling (Babel / SWC / Vite) */}
      <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <span>⚙️</span> The Transformation Process
        </h3>
        <p className="text-indigo-800 mb-8">
          Browsers don't know what <code>&lt;div&gt;</code> means inside a JavaScript file. 
          Your JSX must be <strong>transformed</strong> into standard JavaScript at <strong>build time</strong>.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex-1 p-4 bg-white rounded-lg border border-indigo-200 text-center shadow-sm">
            <p className="font-bold text-indigo-600 text-xs">JSX Code</p>
            <p className="text-[10px] text-slate-400">Written by you</p>
          </div>
          <div className="text-indigo-300 font-bold rotate-90 md:rotate-0">➜</div>
          <div className="flex-1 p-4 bg-indigo-600 rounded-lg text-center shadow-lg">
            <p className="font-bold text-white text-xs">Babel / SWC</p>
            <p className="text-[10px] text-indigo-200 uppercase">The Translators</p>
          </div>
          <div className="text-indigo-300 font-bold rotate-90 md:rotate-0">➜</div>
          <div className="flex-1 p-4 bg-white rounded-lg border border-indigo-200 text-center shadow-sm">
            <p className="font-bold text-indigo-600 text-xs">Plain JS</p>
            <p className="text-[10px] text-slate-400">Ready for Browser</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="bg-slate-900 p-6 rounded-xl text-xs font-mono text-slate-300 mb-6">
          <p className="text-indigo-400">{'// index.js'}</p>
          <p>{`const root = ReactDOM.createRoot(document.getElementById('root'));`}</p>
          <p className="text-green-400">{`root.render(<App />); `}<span className="text-slate-500">{'// This starts the whole UI!'}</span></p>
        </div>

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
