import { useState } from 'react';

// Function that transitions between different modes:
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      const replaceLastItem = [...history];
      replaceLastItem[replaceLastItem.length - 1] = newMode;
      setHistory(replaceLastItem);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // Function that returns to the previous mode in the history:
  const back = () => {
    if (history.length > 1) {
      let popped = [...history];
      popped.pop();
      setHistory(popped);
      setMode(popped[popped.length - 1]);
    }
  };
  return { mode, transition, back };
};

export default useVisualMode;
