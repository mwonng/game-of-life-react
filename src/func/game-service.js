
class GameService {
  constructor(row, col) {
    this.row   = row;
    this.col   = col;
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
    this.alive = {};
    this.dead  = {};
  }

  /**
   * core func to generate next
   * @return [array] return a result of board
   */
  getNextState() {
    this.prepareChangeList();
    let activeList = this.getNextStateList();

    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));

    Object.keys(activeList).forEach(keyStr => {
      let i = parseInt(keyStr.split('_')[0], 10);
      let j = parseInt(keyStr.split('_')[1], 10);

      this.board[i][j] = 1;
    });

    this.alive = activeList;
    this.dead  = {};
    return this.board;
  }

  /**
   * get all possible neighbours, including self, max 9 in array
   * return @array [ String, String ]
   */
  getAroundKeys(keyStr) {
    let rowNum     = parseInt(keyStr.split('_')[0], 10);
    let colNum     = parseInt(keyStr.split('_')[1], 10);
    let neighbours = [];

    for (let i=rowNum-1; i<=rowNum+1 ; i++) {
      if (i < 0 || i >= this.row) continue;
      for (let j=colNum-1; j<=colNum+1 ; j++) {
        if (j < 0 || j >= this.col) continue;
        neighbours.push(`${i}_${j}`);
      }
    }
    return neighbours;
  }

  /**
   * enable cell or disable
   * @param {row} x
   * @param {column} y
   */
  switchCell(x,y) {
    this.board[x][y] = 1-this.board[x][y];

    if (Object.keys(this.alive).includes(`${x}_${y}`)) {
      delete this.alive[`${x}_${y}`];
    } else {
      this.alive[`${x}_${y}`] = -1;
    }
  }

  /**
   * reset board array
   * @param {row} x
   * @param {column} y
   */
  reset(x,y) {
    this.board = Array(x).fill().map(() => Array(y).fill(0));
    this.row   = x;
    this.col   = y;
    this.alive = {};
    this.dead  = {};
  }

  /**
   *
   * set new alive obj who might go dead or not
   * set new dead obj who might go alive or nor
   * format: { '${rowIndex}_${colIndex}': aliveNeighbourCount, ...}
   *
   */
  prepareChangeList() {
    let aliveKeys = Object.keys(this.alive);

    aliveKeys.forEach( keyStr => {
      let neighbours = this.getAroundKeys(keyStr);

      neighbours.forEach( k => {
        let row = parseInt(k.split('_')[0], 10);
        let col = parseInt(k.split('_')[1], 10);

        if (this.board[row][col] < 1) {
          if (Object.keys(this.dead).includes(k)) {
            this.dead[k] += 1;
          } else {
            this.dead[k] = 1;
          }
        } else {
          this.alive[k] += 1;
        }
      })
    })
  }

  /**
   * after prepareChangeList(), create a new array for next generation with two obj in prepareChangeList()
   * @return: [ '${rowIndex}_${colIndex}', ]
   */
  getNextStateList() {
    let result = {};

    // still alive
    let nextAlive = Object.keys(this.alive).filter( k => this.alive[k] === 2 || this.alive[k] === 3 );

    // dead to alive
    let deadToAlive = Object.keys(this.dead).filter( k => this.dead[k] === 3 );

    let nextActive = [...nextAlive, ...deadToAlive];
    nextActive.forEach(key => result[key] = -1);
    return result;
  }
}

export default GameService;