
class GameService {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
  }

  static getNextState(board) {

  }
}

export default GameService