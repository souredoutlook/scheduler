import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode) {
    setMode(newMode);
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