import React from 'react';
import { CenterInfo, CostInfo, LeftInfo, NodeWrapper, RigthInfo } from './style';

export default function Node({
  gCost,
  hCost,
  fCost,
  state,
  size,
  clickAction,
  index,
}) {
  const colors = {
    'open': '#fff',
    'closed': '#e04a24',
    'start': '#03fc84',
    'end': '#03dbfc',
    'wall': '#000',
    'path': '#03dbfc',
  };

  const lettersColors = {
    'open': '#000',
    'closed': '#fff',
    'start': '#000',
    'end': '#000',
    'wall': '#fff',
    'path': '#000',
  }

  return (
    <NodeWrapper
      style={{
        backgroundColor: colors[state],
        width: `${100 / size}%`,
        height: `${900 / size}px`,
        color: lettersColors[state],
      }}
      onClick={() => clickAction(...index)}
    >
      <CostInfo>
        <LeftInfo>{gCost}</LeftInfo>
        <RigthInfo>{hCost}</RigthInfo>
      </CostInfo>
      <CenterInfo>{fCost}</CenterInfo>
    </NodeWrapper>
  );
}
