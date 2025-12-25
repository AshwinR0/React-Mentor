
import React, { useState } from 'react';

const Challenges: React.FC = () => {
  const [challenge1Status, setChallenge1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [challenge2Status, setChallenge2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [answer2, setAnswer2] = useState('');

  const checkC1 = (ans: string) => {
    if (ans === 're-render') setChallenge1Status('correct');
    else setChallenge1Status('wrong');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Knowledge Check: Practice Lab</h3>
        <p className="text-slate-600 mb-8">Let's see if you've got the mental model down!</p>

        <div className="space-y-12">
          {/* Challenge 1 */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4">1. What happens when you call a <code>setState</code> function?</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 're-render', text: "React updates the data and 're-renders' the component." },
                { id: 'nothing', text: "The variable changes but the UI stays the same." },
                { id: 'reload', text: "The whole browser page refreshes." }
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => checkC1(opt.id)}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                    challenge1Status === 'correct' && opt.id === 're-render'
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : challenge1Status === 'wrong' && opt.id !== 're-render'
                      ? 'bg-red-50 border-red-200 opacity-50'
                      : 'bg-white border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {challenge1Status === 'correct' && <p className="mt-4 text-xs font-bold text-green-600 animate-bounce">✨ Correct! You're thinking in React!</p>}
          </div>

          {/* Challenge 2 */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">2. Debug the Snippet</h4>
            <p className="text-sm text-slate-500 mb-4">In JSX, which word must we use to apply a CSS class?</p>
            <div className="bg-slate-900 p-4 rounded-lg text-xs font-mono text-slate-300 mb-4">
              <p>{`<div ???="my-header">Hello</div>`}</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
                placeholder="Enter attribute name..."
                className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={() => setChallenge2Status(answer2.toLowerCase() === 'classname' ? 'correct' : 'wrong')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Check
              </button>
            </div>
            {challenge2Status === 'correct' && <p className="mt-4 text-xs font-bold text-green-600">🎯 Spot on! It's className because 'class' is reserved in JS.</p>}
            {challenge2Status === 'wrong' && <p className="mt-4 text-xs font-bold text-red-500">❌ Try again! Hint: It starts with 'class' but follows camelCase.</p>}
          </div>

          {/* Graduation */}
          <div className="bg-indigo-600 p-10 rounded-3xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
              You've covered the basics of JSX, Components, Props, State, and Re-rendering. 
              The best way to learn now is to create something of your own!
            </p>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-3 bg-white text-indigo-600 rounded-full font-bold shadow-xl">
                Explore Official Docs
              </div>
              <div className="px-6 py-3 bg-indigo-500 text-white border border-indigo-400 rounded-full font-bold shadow-xl">
                Start a Local Project
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Challenges;
