
class GameService {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
  }

  static getNextState(board) {
    const maxRowIndex = board.length - 1;
    const maxColunmIndex = board[0].length - 1;

    const round = (i, j) => {
      let count = 0;
      if (i > 0 && board[i - 1][j]) count += 1;
      if (i > 0 && j > 0 && board[i - 1][j - 1]) count += 1;
      if (i > 0 && j < maxColunmIndex && board[i - 1][j + 1]) count += 1;

      if (i < maxRowIndex && board[i + 1][j]) count += 1;
      if (i < maxRowIndex && j > 0 && board[i + 1][j - 1]) count += 1;
      if (i < maxRowIndex && j < maxColunmIndex && board[i + 1][j + 1]) count += 1;

      if (j > 0 && board[i][j - 1]) count += 1;
      if (j < maxColunmIndex && board[i][j + 1]) count += 1;

      return count;
    };

    const tmp = {};

    for (let i = 0; i <= maxRowIndex; i += 1) {
      for (let j = 0; j <= maxColunmIndex; j += 1) {
        const count = round(i, j);
        if (board[i][j]) {
          if (count !== 2 && count !== 3) {
            if (!tmp[i]) tmp[i] = {};
            tmp[i][j] = 0;
          }
        } else if (count === 3) {
          if (!tmp[i]) tmp[i] = {};
          tmp[i][j] = 1;
        }
      }
    }

    for (const row of Object.keys(tmp)) {
      for (const col of Object.keys(tmp[row])) {
        board[Number(row)][Number(col)] = tmp[row][col];
      }
    }
      return board;
  }
}

export default GameService;