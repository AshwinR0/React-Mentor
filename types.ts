
export enum LessonId {
  WHAT_IS_REACT = 'what-is-react',
  JSX_BASICS = 'jsx-basics',
  REACT_INTERNALS = 'react-internals',
  FOLDER_STRUCTURE = 'folder-structure',
  COMPONENTS_PROPS = 'components-props',
  STATE_BASICS = 'state-basics',
  RE_RENDERING = 're-rendering',
  CUSTOM_HOOKS = 'custom-hooks',
  PERFORMANCE_LAB = 'performance-lab',
  EFFECTS_LAB = 'effects-lab',
  USE_REF_DEEP_DIVE = 'use-ref-deep-dive',
  USE_CONTEXT_DEEP_DIVE = 'use-context-deep-dive',
  USE_REDUCER_DEEP_DIVE = 'use-reducer-deep-dive',
  // HOOKS_DEEP_DIVE = 'hooks-deep-dive',
  REDUX_DEEP_DIVE = 'redux-deep-dive',
  MODERN_REACT = 'modern-react',
  // CHALLENGES = 'challenges'
}

export interface Lesson {
  id: LessonId;
  title: string;
  description: string;
  icon: string;
}