
import React, { useState, useTransition, Suspense, lazy } from 'react';

// Mocking a slow component for useTransition demo
const SlowList = ({ text }: { text: string }) => {
  const items = [];
  for (let i = 0; i < 5000; i++) {
    items.push(<div key={i} className="text-[8px] text-slate-300 inline-block mr-1">[{text}]</div>);
  }
  return <div className="mt-4 p-4 border rounded bg-slate-50 h-32 overflow-hidden opacity-50">{items}</div>;
};

const ModernReact: React.FC = () => {
  const [text, setText] = useState('');
  const [deferredText, setDeferredText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // High priority: The input field update
    setText(e.target.value);

    // Low priority: The expensive list update
    startTransition(() => {
      setDeferredText(e.target.value);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Modern React Patterns</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          React 18+ introduced <strong>Concurrent Rendering</strong>. This means React can work on multiple things at once, 
          pausing low-priority tasks to keep the UI responsive.
        </p>

        <div className="space-y-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="p-1 bg-indigo-100 text-indigo-600 rounded text-xs">New</span>
              useTransition: Responsive Inputs
            </h4>
            <p className="text-xs text-slate-500 mb-6">Type quickly below. Notice the input is smooth even though a slow list is updating behind the scenes.</p>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={text} 
                  onChange={handleChange}
                  placeholder="Type to trigger slow update..."
                  className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
                {isPending && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest text-center">
                {isPending ? '⏳ React is working on the background update...' : '✅ Background task ready'}
              </p>
              
              <SlowList text={deferredText} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl">
               <h4 className="font-bold text-slate-800 mb-2">Suspense</h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Suspense lets your component "wait" for something (like data or code) before rendering. 
                 You can show a nice fallback UI instead of a messy loading state.
               </p>
               <div className="mt-4 p-4 bg-slate-900 text-slate-300 rounded-lg font-mono text-[10px]">
                 <p>{`<Suspense fallback={<Loader />}>`}</p>
                 <p className="pl-4">{`<UserProfile />`}</p>
                 <p>{`</Suspense>`}</p>
               </div>
             </div>

             <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl">
               <h4 className="font-bold text-slate-800 mb-2">Lazy Loading</h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Don't download your whole app at once! Use <code>lazy</code> to only load components when they are actually needed.
               </p>
               <div className="mt-4 p-4 bg-slate-900 text-slate-300 rounded-lg font-mono text-[10px]">
                 <p>{`const Charts = lazy(() =>`}</p>
                 <p className="pl-4">{`import('./BigChart')`}</p>
                 <p>{`);`}</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 p-8 rounded-2xl text-white">
        <h4 className="text-xl font-bold mb-4 italic">Next Step: Architecture</h4>
        <p className="text-indigo-100 text-sm leading-relaxed">
          The best React engineers don't just know the hooks; they know how to structure their app to keep it 
          simple. Always favor <strong>Composition</strong> over complex nested components!
        </p>
      </section>
    </div>
  );
};

export default ModernReact;
