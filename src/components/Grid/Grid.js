import React, { useEffect, useState } from 'react';
import Node from '../Node/Node';
import { GridWrapper } from './style';

export default function Grid({ size, mode, setMode, reset }) {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    // set initial grid
    const initialGrid = new Array(size).fill(0).map(() => new Array(size).fill(0).map(() => ({
      gCost: 0,
      hCost: 0,
      fCost: 0,
      state: 'open',
    })));

    setGridData(initialGrid);
  }, [size, reset]);

  const resetState = state => {
    for (const row of gridData) {
      for (const node of row) {
        if (node.state === state) {
          node.state = 'open';
        }
      }
    }
  }

  const clickAction = (row, col) => {
    const node = gridData[row][col];

    switch(mode) {
      case 'placeStart':
        resetState('start');
        node.state = 'start';
        setMode('placeEnd'); 
        break;
      case 'placeEnd':
        resetState('end');
        node.state = 'end';
        setMode('placeWalls');
        break;
      case 'placeWalls':
        if (node.state === 'open') {
          node.state = 'wall';
        } else if (node.state === 'wall') {
          node.state = 'open';
        }
        break;
      default:
        break;
    }

    setGridData([...gridData]);
  };

  return (
    <GridWrapper>
      {gridData.map((row, rowIndex) => (
        <>
          {row.map((node, nodeIndex) => (
            <Node
              key={`${rowIndex}-${nodeIndex}`}
              clickAction={clickAction}
              size={gridData.length}
              index={[rowIndex, nodeIndex]}
              {...node}
            />
          ))}
        </>
      ))}
    </GridWrapper>
  );
}
