class Sudoku {
  constructor(width, height, board, solution) {
    this.width = width;
    this.height = height;
    this.startBoard = board.flat();
    this.setBoard(this.startBoard);
    this.solution = solution.flat();
  }

  setBoard(data) {
    this.board = data.flat().map((x) => (x == 0 ? null : x));
  }

  reset() {
    this.setBoard(this.startBoard);
  }

  getIndex(row, col) {
    return row * this.width + col;
  }

  validSudoku() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const value = this.board[this.getIndex(i, j)];
        if (value !== null) {
          if (
            !this.validRow(i, j, value) ||
            !this.validColumn(i, j, value) ||
            !this.validBox(i, j, value)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  validRow(row, col, value) {
    for (let j = 0; j < this.width; j++) {
      if (j !== col) {
        if (this.board[this.getIndex(row, j)] === value) {
          return false;
        }
      }
    }

    return true;
  }

  validColumn(row, col, value) {
    for (let i = 0; i < this.height; i++) {
      if (i !== row) {
        if (this.board[this.getIndex(i, col)] === value) {
          return false;
        }
      }
    }

    return true;
  }

  validBox(row, col, value) {
    const startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row || j !== col) {
          if (this.board[this.getIndex(i, j)] === value) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
