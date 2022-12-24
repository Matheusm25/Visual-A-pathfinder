import React from 'react';
import { Button, Checkbox, ControlsWrapper, Input, Label, SelectedButton } from './style';

export default function Controls({
  size,
  setSize,
  mode,
  setMode,
  setReset,
  reset,
  delay,
  setDelay,
  showLabels,
  setShowLabels,
  diagonal,
  setDiagonal,
}) {
  const [inputSize, setInputSize] = React.useState(size);

  return (
    <ControlsWrapper>
      <Button onClick={() => setMode('running')}>start</Button>
      {mode !== 'placeStart' ? (
        <Button onClick={() => {
          setReset(!reset);
          setMode('placeStart');
        }}>Select Start</Button>
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
        setMode('placeStart');
      }}>Reset</Button>
      <Label>
        Scale
        <Input onChange={target => {
          setInputSize(Number(target.target.value))
        }} value={inputSize} type={"number"} />
        <Button onClick={() => setSize(inputSize)}>Resize</Button>
      </Label>
      <Label>
        Delay
        <Input onChange={target => {
          setDelay(Number(target.target.value))
        }} value={delay} type={"number"} />
      </Label>
      <Label>
        Show Labels
        <Checkbox onChange={target => {
          setShowLabels(target.target.checked);
        }} value={showLabels} checked={showLabels} type={"checkbox"} />
      </Label>
      <Label>
        Use Diagonals
        <Checkbox onChange={target => {
          setDiagonal(target.target.checked);
        }} value={diagonal} checked={diagonal} type={"checkbox"} />
      </Label>
    </ControlsWrapper>
  )
}