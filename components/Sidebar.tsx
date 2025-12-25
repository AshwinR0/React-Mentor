
import React from 'react';
import { LessonId } from '../types';

interface SidebarProps {
  activeLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
}

const sections = [
  {
    label: 'Foundation',
    lessons: [
      { id: LessonId.WHAT_IS_REACT, title: 'What is React?', icon: '👋' },
      { id: LessonId.JSX_BASICS, title: 'JSX & Transformation', icon: '📝' },
      { id: LessonId.COMPONENTS_PROPS, title: 'Components & Props', icon: '🧩' },
    ]
  },
  {
    label: 'The Mental Model',
    lessons: [
      { id: LessonId.REACT_INTERNALS, title: 'Internals: Virtual DOM', icon: '🏗️' },
      { id: LessonId.FOLDER_STRUCTURE, title: 'Project & Tooling', icon: '📁' },
      { id: LessonId.STATE_BASICS, title: 'State Basics', icon: '🧠' },
      { id: LessonId.RE_RENDERING, title: 'Visualizing Renders', icon: '⚡' },
    ]
  },
  {
    label: 'Hooks Mastery',
    lessons: [
      { id: LessonId.EFFECTS_LAB, title: 'useEffect Mastery', icon: '🌐' },
      { id: LessonId.USE_REF_DEEP_DIVE, title: 'useRef Deep Dive', icon: '🔦' },
      { id: LessonId.USE_CONTEXT_DEEP_DIVE, title: 'useContext Deep Dive', icon: '📡' },
      { id: LessonId.USE_REDUCER_DEEP_DIVE, title: 'useReducer Deep Dive', icon: '🎛️' },
      { id: LessonId.HOOKS_DEEP_DIVE, title: 'Hooks Deep Dive', icon: '🪝' },
    ]
  },
  {
    label: 'Architecture',
    lessons: [
      { id: LessonId.PERFORMANCE_LAB, title: 'Performance Lab', icon: '🚀' },
      { id: LessonId.MODERN_REACT, title: 'Modern Patterns', icon: '✨' },
      { id: LessonId.CHALLENGES, title: 'Practice Lab', icon: '🏆' },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ activeLesson, onSelectLesson }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <span className="text-2xl">⚛️</span> ReactTutor
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Senior Path</p>
      </div>
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto pb-10">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.label}</p>
            <div className="space-y-1">
              {section.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeLesson === lesson.id
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{lesson.icon}</span>
                  {lesson.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-500 shadow-sm">
          <p className="font-semibold text-slate-700">Pro Tip:</p>
          <p>Understanding the tooling is 50% of becoming a React expert!</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
