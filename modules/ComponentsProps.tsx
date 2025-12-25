
import React from 'react';

const ComponentsProps: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. What are Components? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">What are Components?</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          Components are the building blocks of React. Think of them as <strong>Reusable LEGO blocks</strong>. 
          Instead of building a massive, messy website, you build small, independent pieces and snap them together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 text-sm mb-1">Function = UI</h4>
              <p className="text-xs text-indigo-700">In modern React, a component is just a <strong>JavaScript Function</strong> that returns UI (JSX).</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <h4 className="font-bold text-amber-900 text-sm mb-1">The Golden Rule: Capitalize!</h4>
              <p className="text-xs text-amber-700">Component names <strong>MUST</strong> start with a capital letter (e.g., <code>Header</code>, not <code>header</code>). This tells React: "This is a component, not a standard HTML tag."</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center">
             <div className="w-full max-w-[200px] space-y-2">
                <div className="h-8 bg-indigo-500 rounded-t-lg flex items-center justify-center text-[10px] text-white font-bold uppercase tracking-widest">Navbar</div>
                <div className="flex gap-2">
                  <div className="h-20 flex-1 bg-slate-200 rounded-bl-lg flex items-center justify-center text-[8px] text-slate-400 font-bold uppercase text-center p-2">Sidebar Component</div>
                  <div className="h-20 flex-[2] bg-white border border-slate-200 rounded-br-lg flex items-center justify-center text-[8px] text-slate-400 font-bold uppercase">Main Feed</div>
                </div>
             </div>
             <p className="mt-4 text-[10px] text-slate-400 font-medium">Example: One App, Three Components</p>
          </div>
        </div>
      </section>

      {/* 2. Class vs Functional Components (NEW) */}
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

      {/* 3. Different Ways Components Appear (NEW) */}
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
        
        <div className="bg-indigo-600 p-6 rounded-2xl text-white flex flex-col md:flex-row items-center gap-6">
           <div className="flex-1 space-y-2">
             <h4 className="font-bold">The Mail Analogy</h4>
             <p className="text-sm text-indigo-100">Props are like mail sent from the Parent component. The Child receives the envelope and uses the information inside to decide what to show.</p>
           </div>
           <div className="bg-white/10 p-4 rounded-xl border border-white/20 font-mono text-xs">
              <span className="text-indigo-200">{'// Props are READ-ONLY!'}</span><br/>
              props.name = "New Name"; <span className="text-red-300">{'// ❌ ERROR'}</span>
           </div>
        </div>
      </section>

      {/* 5. Ways of Passing Props (NEW) */}
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

      {/* 6. One-Way Data Flow (NEW) */}
      <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">Important Rule: Props Flow One-Way</h3>
        <p className="text-indigo-800 mb-8 leading-relaxed">
          In React, data travels <strong>Top-to-Bottom</strong>. This is called "One-Way Data Binding."
        </p>

        <div className="flex flex-col items-center gap-4 py-8">
           <div className="w-48 p-4 bg-indigo-600 text-white rounded-lg text-center font-bold shadow-lg">Parent Component</div>
           <div className="text-indigo-300 animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
           </div>
           <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Props (Data)</div>
           <div className="flex gap-4">
              <div className="w-32 p-3 bg-white border-2 border-indigo-200 rounded-lg text-center text-xs font-bold text-indigo-600 shadow-sm">Child A</div>
              <div className="w-32 p-3 bg-white border-2 border-indigo-200 rounded-lg text-center text-xs font-bold text-indigo-600 shadow-sm">Child B</div>
           </div>
        </div>

        <div className="max-w-md mx-auto p-4 bg-white rounded-xl border border-indigo-100 text-xs text-indigo-800 italic text-center">
           "A child can see its props, but it can never reach up and change them in the parent. To change things, we use events!"
        </div>
      </section>

      {/* 7. Common Beginner Mistakes (NEW) */}
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
