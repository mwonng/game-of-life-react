
class GameService {
  constructor(row, col) {
    this.row   = row;
    this.col   = col;
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
  }

  getNextState() {
    const maxRowIndex    = this.row - 1;
    const maxColunmIndex = this.col - 1;

    const neighborActiveCount = (i, j) => {
      let count = 0;
      if (i > 0 && this.board[i - 1][j]) count += 1;
      if (i > 0 && j > 0 && this.board[i - 1][j - 1]) count += 1;
      if (i > 0 && j < maxColunmIndex && this.board[i - 1][j + 1]) count += 1;

      if (i < maxRowIndex && this.board[i + 1][j]) count += 1;
      if (i < maxRowIndex && j > 0 && this.board[i + 1][j - 1]) count += 1;
      if (i < maxRowIndex && j < maxColunmIndex && this.board[i + 1][j + 1]) count += 1;

      if (j > 0 && this.board[i][j - 1]) count += 1;
      if (j < maxColunmIndex && this.board[i][j + 1]) count += 1;

      return count;
    };

    const tmp = {};

    for (let i = 0; i <= maxRowIndex; i++) {
      for (let j = 0; j <= maxColunmIndex; j++) {
        const count = neighborActiveCount(i, j);
        if (this.board[i][j]) {
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
        this.board[Number(row)][Number(col)] = tmp[row][col];
      }
    }
      return this.board;
  }

  switchCell(x,y) {
    this.board[x][y] = 1 - this.board[x][y];
  }

  reset(x,y) {
    this.board = Array(x).fill().map(() => Array(y).fill(0));
    this.row   = x;
    this.col   = y;
  }
}

export default GameService;