
import React from 'react';
import { LessonId } from '../types';

interface HeaderProps {
  activeLesson: LessonId;
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeLesson, onOpenMenu }) => {
  const getTitle = () => {
    switch (activeLesson) {
      case LessonId.WHAT_IS_REACT: return 'Hello, World!';
      case LessonId.JSX_BASICS: return 'Learning the Language';
      case LessonId.COMPONENTS_PROPS: return 'Legos for Web';
      case LessonId.STATE_BASICS: return 'The Component Brain';
      case LessonId.RE_RENDERING: return 'The Magic Mirror';
      case LessonId.CUSTOM_HOOKS: return 'The Master Craftsman';
      case LessonId.EFFECTS_LAB: return 'Syncing with the World';
      case LessonId.USE_REF_DEEP_DIVE: return 'The Secret Storage';
      case LessonId.USE_CONTEXT_DEEP_DIVE: return 'The Wireless Connection';
      case LessonId.USE_REDUCER_DEEP_DIVE: return 'The Flight Controller';
      case LessonId.REDUX_DEEP_DIVE: return 'Redux: State at Scale';
      case LessonId.CHALLENGES: return 'Ready for Takeoff';
      default: return 'React Visual Tutor';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 sticky top-0 z-10">
      <button 
        onClick={onOpenMenu}
        className="md:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label="Open Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <h2 className="text-sm md:text-lg font-semibold text-slate-800 truncate">{getTitle()}</h2>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs font-medium text-slate-500">Learning Mode: Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;