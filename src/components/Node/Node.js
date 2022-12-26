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
  showLabels,
}) {
  const colors = {
    'open': '#fff',
    'closed': '#e04a24',
    'start': '#03fc84',
    'option': '#03fc84',
    'end': '#03dbfc',
    'wall': '#000',
    'path': '#03dbfc',
    'tested': '#91a6c7',
  };

  const lettersColors = {
    'open': '#000',
    'closed': '#fff',
    'start': '#000',
    'option': '#000',
    'end': '#000',
    'wall': '#fff',
    'path': '#000',
    'tested': '#000',
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
      {showLabels === true ? (
        <>
          <CostInfo>
            <LeftInfo>{gCost}</LeftInfo>
            <RigthInfo>{hCost}</RigthInfo>
          </CostInfo>
          <CenterInfo>{fCost}</CenterInfo>
        </>
      ) : (<></>)}
    </NodeWrapper>
  );
}
