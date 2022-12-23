import React from 'react';
import { Button, ControlsWrapper, Input, Label, SelectedButton } from './style';

export default function Controls({ size, setSize, mode, setMode, setReset, reset }) {
  const [inputSize, setInputSize] = React.useState(size);

  return (
    <ControlsWrapper>
      <Button onClick={() => setMode('running')}>start</Button>
      {mode !== 'placeStart' ? (
        <Button onClick={() => setMode('placeStart')}>Select Start</Button>
      ): (
        <SelectedButton>Select Start</SelectedButton>
      )}
      {mode !== 'placeEnd' ? (
        <Button onClick={() => setMode('placeEnd')}>Select End</Button>
      ): (
        <SelectedButton>Select End</SelectedButton>
      )}
      <Button onClick={() => {
        setReset(!reset);
      }}>Reset</Button>
      <Label>
        Scale
        <Input onChange={target => {
          setInputSize(Number(target.target.value))
        }} value={inputSize} type={"number"} />
        <Button onClick={() => setSize(inputSize)}>Resize</Button>
      </Label>
    </ControlsWrapper>
  )
}