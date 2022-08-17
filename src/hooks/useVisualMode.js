import { useState } from '@storybook/addons';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode) => {
    return (
      setMode(mode)
    );
  }
  const back = () => {
    if (history.length > 1 ) {
      setHistory((prev) => prev.pop());
    }
 
  }
  return { mode: mode, transition, back };
};

export default useVisualMode;
