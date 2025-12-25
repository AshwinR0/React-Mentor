
import React from 'react';

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

      {/* 3. Before React vs With React Comparison */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">The Workflow Shift</h3>
        
        <div className="space-y-12">
          {/* Before React Flow */}
          <div className="relative">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Before React (Manual)</h4>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 p-4 bg-slate-100 border border-slate-200 rounded-lg text-center">
                <p className="text-xs font-bold text-slate-700">User Clicks "Like"</p>
              </div>
              <div className="text-slate-300">➜</div>
              <div className="flex-1 p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                <p className="text-xs font-bold text-red-700 italic">"Go find the Heart icon..."</p>
              </div>
              <div className="text-slate-300">➜</div>
              <div className="flex-1 p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                <p className="text-xs font-bold text-red-700 italic">"Change color to Red"</p>
              </div>
              <div className="text-slate-300">➜</div>
              <div className="flex-1 p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                <p className="text-xs font-bold text-red-700 italic">"Find text, add +1"</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] text-slate-400 text-center italic">One missed step = A broken or buggy interface.</p>
          </div>

          <div className="border-t border-dashed border-slate-200"></div>

          {/* With React Flow */}
          <div className="relative">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">With React (Automated)</h4>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-center">
                <p className="text-xs font-bold text-indigo-700">User Action</p>
                <p className="text-[10px] text-indigo-400">(Clicks Button)</p>
              </div>
              <div className="text-indigo-200">➜</div>
              <div className="flex-1 p-4 bg-indigo-600 text-white rounded-lg text-center shadow-lg">
                <p className="text-xs font-bold">Update Data</p>
                <p className="text-[10px] opacity-80">(State: liked = true)</p>
              </div>
              <div className="text-indigo-200">➜</div>
              <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-xs font-bold text-green-700">React Updates UI</p>
                <p className="text-[10px] text-green-500 italic">(Automatically!)</p>
              </div>
            </div>
            <div className="mt-6 bg-slate-900 text-indigo-300 p-4 rounded-xl text-xs font-mono">
               <span className="text-white">{'// You only worry about the DATA'}</span><br/>
               setLiked(true); <span className="text-slate-500">{'// React handles the rest!'}</span>
            </div>
          </div>
        </div>
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
