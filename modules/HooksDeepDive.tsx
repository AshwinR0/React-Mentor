
import React, { useState, useReducer, useRef, useContext, createContext } from 'react';
import RenderFlash from '../components/RenderFlash';

// -- Context Example --
const ThemeContext = createContext<{theme: string, toggle: () => void}>({theme: 'light', toggle: () => {}});

const DeepHookSection: React.FC<{title: string, desc: string, children: React.ReactNode}> = ({title, desc, children}) => (
  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 mb-6">{desc}</p>
    {children}
  </div>
);

const HooksDeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reducer' | 'ref' | 'context' | 'custom'>('reducer');

  // useReducer logic
  const [state, dispatch] = useReducer((s: any, a: any) => {
    switch(a.type) {
      case 'inc': return { count: s.count + 1 };
      case 'dec': return { count: s.count - 1 };
      default: return s;
    }
  }, { count: 0 });

  // useRef logic
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Context Mock State
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Beyond useState: Hooks Deep Dive</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Hooks allow you to "hook into" React features from functional components. 
          While <code>useState</code> handles simple data, these hooks handle complex logic, DOM access, and global state.
        </p>

        <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
          {['reducer', 'ref', 'context', 'custom'].map((t: any) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeTab === t ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {t === 'reducer' ? 'useReducer' : t === 'ref' ? 'useRef' : t === 'context' ? 'useContext' : 'Custom Hooks'}
            </button>
          ))}
        </div>

        {activeTab === 'reducer' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <DeepHookSection 
              title="State Management for Complexity" 
              desc="When your state has many parts or complex transitions, useReducer is like a mini-Redux inside your component."
            >
              <div className="flex flex-col items-center gap-6 p-8 bg-white border border-slate-200 rounded-xl shadow-inner">
                <div className="text-3xl font-mono font-bold text-indigo-600">{state.count}</div>
                <div className="flex gap-4">
                  <button onClick={() => dispatch({type: 'dec'})} className="px-6 py-2 bg-slate-100 border border-slate-200 rounded-lg font-bold hover:bg-slate-200 transition-colors">-</button>
                  <button onClick={() => dispatch({type: 'inc'})} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors">+</button>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg w-full text-[10px] font-mono">
                  <p className="text-indigo-400">{'// Dispatch an "Action"'}</p>
                  <p>{`dispatch({ type: 'inc' });`}</p>
                </div>
              </div>
            </DeepHookSection>
          </div>
        )}

        {activeTab === 'ref' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <DeepHookSection 
              title="Escaping React to touch the DOM" 
              desc="useRef is like a storage box that stays the same between renders. It's often used to focus inputs or control videos."
            >
              <div className="space-y-4 max-w-sm mx-auto p-8 bg-white border border-slate-200 rounded-xl shadow-inner">
                <input ref={inputRef} type="text" placeholder="I'm a normal input" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                <button 
                  onClick={() => inputRef.current?.focus()}
                  className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-bold"
                >
                  Click to Force Focus
                </button>
                <p className="text-[10px] text-slate-400 text-center">React doesn't re-render when a Ref changes!</p>
              </div>
            </DeepHookSection>
          </div>
        )}

        {activeTab === 'context' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <DeepHookSection 
              title="Global State: Skipping the Prop Drill" 
              desc="Context lets you pass data (like user profiles or themes) through the component tree without passing props manually at every level."
            >
              <div className={`p-8 rounded-xl border-2 transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-inner'}`}>
                 <ThemeContext.Provider value={{theme, toggle: toggleTheme}}>
                    <div className="space-y-4 text-center">
                      <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Current Theme: {theme}</p>
                      <button onClick={toggleTheme} className="px-4 py-2 bg-indigo-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">Toggle via Context</button>
                      <div className="mt-4 p-4 border border-dashed border-slate-400/30 rounded text-[10px] text-slate-500">
                        This button is deep inside the tree, but it doesn't receive "theme" as a prop!
                      </div>
                    </div>
                 </ThemeContext.Provider>
              </div>
            </DeepHookSection>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <DeepHookSection 
              title="Custom Hooks: Reusable Logic" 
              desc="If you find yourself using the same state/effect combo in multiple places, wrap them in a function starting with 'use'!"
            >
              <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-xs">
                <p className="text-indigo-400">{'// Example: useWindowSize()'}</p>
                <p>{`function useWindowSize() {`}</p>
                <p className="pl-4">{`const [size, setSize] = useState(window.innerWidth);`}</p>
                <p className="pl-4">{`useEffect(() => { /* add listener */ }, []);`}</p>
                <p className="pl-4">{`return size;`}</p>
                <p>{`}`}</p>
                <br />
                <p className="text-indigo-400">{'// Now use it anywhere!'}</p>
                <p>{`const width = useWindowSize();`}</p>
              </div>
            </DeepHookSection>
          </div>
        )}
      </section>
    </div>
  );
};

export default HooksDeepDive;
