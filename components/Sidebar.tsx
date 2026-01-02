
import React from 'react';
import { LessonId } from '../types';

interface SidebarProps {
  activeLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
  isOpen: boolean;
  onClose: () => void;
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
      // { id: LessonId.HOOKS_DEEP_DIVE, title: 'Hooks Deep Dive', icon: '🪝' },
    ]
  },
  {
    label: 'Architecture',
    lessons: [
      { id: LessonId.CUSTOM_HOOKS, title: 'Custom Hooks', icon: '🎨' },
      { id: LessonId.PERFORMANCE_LAB, title: 'Performance Lab', icon: '🚀' },
      { id: LessonId.MODERN_REACT, title: 'Modern Patterns', icon: '✨' },
      { id: LessonId.REDUX_DEEP_DIVE, title: 'Redux State', icon: '💿' },
      // { id: LessonId.CHALLENGES, title: 'Practice Lab', icon: '🏆' },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ activeLesson, onSelectLesson, isOpen, onClose }) => {
  const [logoSrc, setLogoSrc] = React.useState('/favicon.svg');
  const [logoError, setLogoError] = React.useState(false);
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-full
      `}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
              {!logoError ? (
                <img
                  src={logoSrc}
                  alt="ReactTutor logo"
                  className="w-8 h-8 rounded-md object-cover p-1"
                  onError={() => {
                    // Try fallback to favicon, then show emoji
                    if (logoSrc !== '/favicon.svg') {
                      setLogoSrc('/favicon.svg');
                    } else {
                      setLogoError(true);
                    }
                  }}
                />
              ) : (
                <span className="text-2xl">⚛️</span>
              )}
              ReactTutor
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Senior Path</p>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg"
            aria-label="Close Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
    </>
  );
};

export default Sidebar;