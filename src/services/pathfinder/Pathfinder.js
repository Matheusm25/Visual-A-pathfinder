function delayByMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function instantiateStartAndEnd(startNode, endNode) {
  for (const node of [startNode, endNode]) {
    node.gCost = calcGCost(node, startNode);
    node.hCost = calcHCost(node, endNode);
    node.fCost = node.gCost + node.hCost;
  }
} 

export async function findPathWithoutDiagonal({
  delay,
  gridData,
  setGridData,
}) {
  const startNode = gridData.flat().find(node => node.state === 'start');
  const endNode = gridData.flat().find(node => node.state === 'end');
  instantiateStartAndEnd(startNode, endNode);
  const openSet = [];
  const closedSet = [];

  let currentNode = startNode;
  currentNode.state = 'tested';

  const neighbors = getNeighbors(currentNode, gridData);

  for (const neighbor of neighbors) {
    neighbor.gCost = calcGCost(neighbor, startNode);
    neighbor.hCost = calcHCost(neighbor, endNode);
    neighbor.fCost = neighbor.gCost + neighbor.hCost;
    neighbor.parent = currentNode;
    neighbor.state = 'option';
    openSet.push(neighbor);
  }

  let pathFind =false;

  startNode.state = 'tested';
  while (openSet.length > 0 && !pathFind) {
    await delayByMs(delay);

    openSet.sort((a, b) => a.fCost - b.fCost || a.hCost - b.hCost);
    currentNode = openSet.shift();
    currentNode.state = 'tested';

    if (currentNode === endNode) {
      const alreadySetPath = [];

      while (!alreadySetPath.includes(currentNode.parent)) {
        currentNode.state = 'path';
        currentNode = currentNode.parent;
        alreadySetPath.push(currentNode);
      }
      pathFind = true;
      break;
    }

    const neighbors = getNeighbors(currentNode, gridData);

    for (const neighbor of neighbors) {
        neighbor.gCost = calcGCost(neighbor, startNode);
        neighbor.parent = currentNode;
        neighbor.hCost = calcHCost(neighbor, endNode);
        neighbor.fCost = neighbor.gCost + neighbor.hCost;

        if (!openSet.includes(neighbor)) {
          neighbor.state = 'option';
          openSet.push(neighbor);
        } else {
          const index = openSet.findIndex(node => node === neighbor);
          openSet[index] = neighbor;
        }
    }

    closedSet.push(currentNode);
    currentNode.state = 'closed';
    setGridData([...gridData]);
  }
  startNode.state = 'path';

  setGridData([...gridData]);
}

export async function findPath({
  delay,
  gridData,
  setGridData,
}) {
  const startNode = gridData.flat().find(node => node.state === 'start');
  const endNode = gridData.flat().find(node => node.state === 'end');
  instantiateStartAndEnd(startNode, endNode);

  const openSet = [];
  const closedSet = [];

  let currentNode = startNode;

  const neighbors = getNeighbors(currentNode, gridData);
  const diagonalNeighbors = getDiagonalNeighbors(currentNode, gridData);

  for (const neighbor of neighbors) {
    neighbor.gCost = currentNode.gCost + 10;
    neighbor.hCost = calcLinearCost(neighbor, endNode);
    neighbor.fCost = neighbor.gCost + neighbor.hCost;
    neighbor.parent = currentNode;
    neighbor.state = 'option';
    openSet.push(neighbor);
  }

  for (const neighbor of diagonalNeighbors) {
    neighbor.gCost = currentNode.gCost + 14;
    neighbor.hCost = calcDiagonalCost(neighbor, endNode);
    neighbor.fCost = neighbor.gCost + neighbor.hCost;
    neighbor.parent = currentNode;
    neighbor.state = 'option';
    openSet.push(neighbor);
  }

  let pathFind =false;

  startNode.state = 'tested';
  while (openSet.length > 0 && !pathFind) {
    await delayByMs(delay);

    openSet.sort((a, b) => a.fCost - b.fCost || a.hCost - b.hCost);
    currentNode = openSet.shift();
    currentNode.state = 'tested';

    if (currentNode === endNode) {
      const alreadySetPath = [];

      while (!alreadySetPath.includes(currentNode.parent)) {
        currentNode.state = 'path';
        currentNode = currentNode.parent;
        alreadySetPath.push(currentNode);
      }
      pathFind = true;
      break;
    }

    const neighbors = getNeighbors(currentNode, gridData);
    const diagonalNeighbors = getDiagonalNeighbors(currentNode, gridData);

    for (const neighbor of neighbors) {
      if (neighbor !== startNode) {
        neighbor.gCost = currentNode.gCost + 10;
        neighbor.hCost = calcLinearCost(neighbor, endNode);
        neighbor.fCost = neighbor.gCost + neighbor.hCost;
      }
      
      neighbor.parent = currentNode;
      

      if (!openSet.includes(neighbor)) {
        neighbor.state = 'option';
        openSet.push(neighbor);
      } else {
        const index = openSet.findIndex(node => node === neighbor);
        openSet[index] = neighbor;
      }
    }
  
    for (const neighbor of diagonalNeighbors) {
      if (neighbor !== startNode) {
        neighbor.gCost = currentNode.gCost + 14;
        neighbor.hCost = Math.round(calcLinearCost(neighbor, endNode));
        neighbor.fCost = neighbor.gCost + neighbor.hCost;
      }
      neighbor.parent = currentNode;

      if (!openSet.includes(neighbor)) {
        neighbor.state = 'option';
        openSet.push(neighbor);
      } else {
        const index = openSet.findIndex(node => node === neighbor);
        openSet[index] = neighbor;
      }
    }

    closedSet.push(currentNode);
    currentNode.state = 'closed';
    setGridData([...gridData]);
  }
  startNode.state = 'path';

  setGridData([...gridData]);
}

function calcDiagonalCost(node, checkNode) {
  const [row, col] = node.index;
  const [checkRow, checkCol] = checkNode.index;

  const dMax = Math.max(Math.abs(row - checkRow), Math.abs(col - checkCol));
  const dMin = Math.min(Math.abs(row - checkRow), Math.abs(col - checkCol));

  return Math.abs(14 + (10 * (dMax - dMin))) * 4;
  
}

function calcLinearCost(node, checkNode) {
  const [row, col] = node.index;
  const [checkRow, checkCol] = checkNode.index;

  return (Math.abs(row - checkRow) + Math.abs(col - checkCol)) * 10;
}

function getNeighbors(node, gridData) {
  const neighbors = [];
  const [row, col] = node.index;

  if (row > 0) {
    neighbors.push(gridData[row - 1][col]);
  }
  if (row < gridData.length - 1) {
    neighbors.push(gridData[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(gridData[row][col - 1]);
  }
  if (col < gridData.length - 1) {
    neighbors.push(gridData[row][col + 1]);
  }

  return neighbors.filter(neighbor => !['closed', 'start', 'wall'].includes(neighbor.state))
}

function getDiagonalNeighbors(node, gridData) {
  const neighbors = [];
  const [row, col] = node.index;

  if (row > 0 && col > 0) {
    neighbors.push(gridData[row - 1][col - 1]);
  }
  if (row > 0 && col < gridData.length - 1) {
    neighbors.push(gridData[row - 1][col + 1]);
  }
  if (row < gridData.length - 1 && col > 0) {
    neighbors.push(gridData[row + 1][col - 1]);
  }
  if (row < gridData.length - 1 && col < gridData.length - 1) {
    neighbors.push(gridData[row + 1][col + 1]);
  }

  return neighbors.filter(neighbor => !['closed', 'start', 'wall'].includes(neighbor.state))
}

function calcGCost(node, startNode) {
  const [row, col] = node.index;
  const [startRow, startCol] = startNode.index;

  return (Math.abs(row - startRow) + Math.abs(col - startCol)) * 10;
}

function calcHCost(node, endNode) {
  const [row, col] = node.index;
  const [endRow, endCol] = endNode.index;

  return (Math.abs(row - endRow) + Math.abs(col - endCol)) * 10;
}