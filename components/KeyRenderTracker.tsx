
import React, { useState, useEffect, useRef } from 'react';

interface KeyRenderTrackerProps {
  children: (count: number) => React.ReactNode;
  trigger: any;
}

const KeyRenderTracker: React.FC<KeyRenderTrackerProps> = ({ children, trigger }) => {
  const [count, setCount] = useState(1);
  const lastTrigger = useRef(trigger);

  useEffect(() => {
    // If the data (trigger) for this component instance changes, 
    // it means React is patching an existing instance with new data.
    if (trigger !== lastTrigger.current) {
      setCount(prev => prev + 1);
      lastTrigger.current = trigger;
    }
  }, [trigger]);

  return <>{children(count)}</>;
};

export default KeyRenderTracker;
