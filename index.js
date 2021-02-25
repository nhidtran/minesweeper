// You are given a 2D char matrix representing the game board.
// 'M' represents an unrevealed mine,
// 'E' represents an unrevealed empty square,
// 'B' represents a revealed blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines,
// digit ('1' to '8') represents how many mines are adjacent to this revealed square, and finally 'X' represents a revealed mine.

// Now given the next click position (row and column indices) among all the unrevealed squares ('M' or 'E'), return the board after revealing this position according to the following rules:

// If a mine ('M') is revealed, then the game is over - change it to 'X'.
// If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B') and all of its adjacent unrevealed squares should be revealed recursively.
// If an empty square ('E') with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
// Return the board when no more squares will be revealed.

// 9x9 10 mines

// create minesweeper board, you are given the 10 mines
// each cell, should indicate the number of adjacent mines it has 0 - 9

function createKey(x, y) {
  return `[${x},${y}]`;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomArbitraryCoord(min, max) {
  return [getRandomArbitrary(min, max), getRandomArbitrary(min, max)];
}

function Minesweeper(dimension, mines) {
  this.dimension = dimension; // 9x9 or 16x16
  this.grid = new Map();
  this.trackedMines = new Set();
  this.visitedCells = new Set(); // cells that have been clicked
  this.flaggedCells = new Set(); // cells that have been flagged as mines

  this.generateBoard();
  this.setMines(mines);
  this.setCells();
  return this;
}

Minesweeper.prototype = {
  generateBoard: function () {
    for (let i = 0; i < this.dimension; ++i) {
      for (let j = 0; j < this.dimension; ++j) {
        this.grid.set(createKey(i, j), { x: i, y: j, value: -1 });
      }
    }
    return this;
  },
  setCell: function (x, y, val) {
    this.grid.set(createKey(x, y), { x, y, value: val });
  },
  setMines: function (numOfMines) {
    for (let i = 1; i < numOfMines; ++i) {
      // randomly place x number of mines in the board
      let valid = false;
      while (!valid) {
        const [coorX, coorY] = getRandomArbitraryCoord(0, this.dimension);
        if (!this.trackedMines.has(createKey(coorX, coorY))) {
          valid = true;
          this.trackedMines.add(createKey(coorX, coorY));
          this.setCell(coorX, coorY, "X");
        }
      }
    }
  },
  getNeighbors: function (x, y) {
    const top = this.grid.get(createKey(x - 1, y));
    const bottom = this.grid.get(createKey(x + 1, y));
    const right = this.grid.get(createKey(x, y + 1));
    const left = this.grid.get(createKey(x, y - 1));
    const topLeft = this.grid.get(createKey(x - 1, y - 1));
    const topRight = this.grid.get(createKey(x - 1, y + 1));
    const bottomLeft = this.grid.get(createKey(x + 1, y - 1));
    const bottomRight = this.grid.get(createKey(x + 1, y + 1));
    return [
      top,
      bottom,
      right,
      left,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    ].filter((cell) => cell !== undefined && cell.value == "X");
  },
  setCells: function () {
    // per cell coordinate, calculate the number of adjacent mines a cell has (1-8)
    // if a cell has no adjacent mines - the value of that cell should remain -1
    this.grid.forEach(({ x, y, value }) => {
      const neighbors = this.getNeighbors(x, y);
      if (neighbors.length > 0) {
        this.grid.set(createKey(x, y), { x, y, value: neighbors.length });
      }
    });
  },
  flipOpenAdjacent: function () {
      // if a cell with no adjacent mines are selected, recursively set all adjacent
  }
};

const game = new Minesweeper(9, 10);
