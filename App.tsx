
import React, { useState } from 'react';
import { LessonId } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IntroLesson from './modules/IntroLesson';
import JSXBasics from './modules/JSXBasics';
import ComponentsProps from './modules/ComponentsProps';
import StateBasics from './modules/StateBasics';
import ReRendering from './modules/ReRendering';
import EffectsLab from './modules/EffectsLab';
import UseRefDeepDive from './modules/UseRefDeepDive';
import UseContextDeepDive from './modules/UseContextDeepDive';
import UseReducerDeepDive from './modules/UseReducerDeepDive';
import Challenges from './modules/Challenges';
import ReactInternals from './modules/ReactInternals';
import FolderStructure from './modules/FolderStructure';
import HooksDeepDive from './modules/HooksDeepDive';
import CustomHooks from './modules/CustomHooks';
import PerformanceLab from './modules/PerformanceLab';
import ModernReact from './modules/ModernReact';
import ReduxDeepDive from './modules/ReduxDeepDive';

const App: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<LessonId>(LessonId.WHAT_IS_REACT);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderActiveLesson = () => {
    switch (activeLesson) {
      case LessonId.WHAT_IS_REACT: return <IntroLesson />;
      case LessonId.JSX_BASICS: return <JSXBasics />;
      case LessonId.REACT_INTERNALS: return <ReactInternals />;
      case LessonId.FOLDER_STRUCTURE: return <FolderStructure />;
      case LessonId.COMPONENTS_PROPS: return <ComponentsProps />;
      case LessonId.STATE_BASICS: return <StateBasics />;
      case LessonId.RE_RENDERING: return <ReRendering />;
      case LessonId.EFFECTS_LAB: return <EffectsLab />;
      case LessonId.USE_REF_DEEP_DIVE: return <UseRefDeepDive />;
      case LessonId.USE_CONTEXT_DEEP_DIVE: return <UseContextDeepDive />;
      case LessonId.USE_REDUCER_DEEP_DIVE: return <UseReducerDeepDive />;
      case LessonId.HOOKS_DEEP_DIVE: return <HooksDeepDive />;
      case LessonId.CUSTOM_HOOKS: return <CustomHooks />;
      case LessonId.REDUX_DEEP_DIVE: return <ReduxDeepDive />;
      case LessonId.PERFORMANCE_LAB: return <PerformanceLab />;
      case LessonId.MODERN_REACT: return <ModernReact />;
      case LessonId.CHALLENGES: return <Challenges />;
      default: return <IntroLesson />;
    }
  };

  const handleSelectLesson = (id: LessonId) => {
    setActiveLesson(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeLesson={activeLesson} 
        onSelectLesson={handleSelectLesson} 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          activeLesson={activeLesson} 
          onOpenMenu={() => setIsMenuOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#fbfcfd]">
          <div className="max-w-5xl mx-auto pb-20">
            {renderActiveLesson()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;