import React, { useState } from 'react';
import Controls from '../components/Controls/Controls';
import Grid from '../components/Grid/Grid';

export default function Game() {
  const [size, setSize] = useState(10);
  const [delay, setDelay] = useState(50);
  const [mode, setMode] = useState('placeStart');
  const [reset, setReset] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [diagonal, setDiagonal] = useState(true);


  return (
    <>
      <Grid
        size={size}
        mode={mode}
        setMode={setMode}
        reset={reset}
        delay={delay}
        showLabels={showLabels}
        diagonal={diagonal}
      />
      <Controls
        size={size}
        setSize={setSize}
        mode={mode}
        setMode={setMode}
        setReset={setReset}
        reset={reset}
        delay={delay}
        setDelay={setDelay}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        diagonal={diagonal}
        setDiagonal={setDiagonal}
      />
    </>
  );
}
