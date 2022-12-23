import React, { useState } from 'react';
import Controls from '../components/Controls/Controls';
import Grid from '../components/Grid/Grid';

export default function Game() {
  const [size, setSize] = useState(10);
  const [mode, setMode] = useState('placeStart');
  const [reset, setReset] = useState(false);


  return (
    <>
      <Grid size={size} mode={mode} setMode={setMode} reset={reset} />
      <Controls
        size={size}
        setSize={setSize}
        mode={mode}
        setMode={setMode}
        setReset={setReset}
        reset={reset}
      />
    </>
  );
}
