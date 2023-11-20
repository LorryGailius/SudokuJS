class Sudoku {
  constructor(width, height, board) {
    this.width = width;
    this.height = height;
    this.startBoard = board;
    this.setBoard(this.startBoard);
  }

  setBoard(str) {
    this.board = str.split("").map((c) => {
      if (c === "x") return null;
      else return parseInt(c);
    });
  }

  reset() {
    this.setBoard(this.startBoard);
  }
}
