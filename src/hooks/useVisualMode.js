import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      history.shift();
    }
    setHistory([newMode, ...history]);
  };

  const back = function() {
    if (history.length > 1) {
      history.shift();
      setMode(history[0])
    }
  };

  return { 
    mode,
    transition,
    back
  };
}