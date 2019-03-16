
class GameService {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
    this.alive = {};
    this.dead = {};
  }

  /**
   *
   * @param {object} lifeList
   *
   */
  getNextState() {
    this.getAroundDeadlist();
    let activeList = this.getNextStateList();
    this.board = Array(this.row).fill().map(() => Array(this.col).fill(0));
    Object.keys(activeList).forEach(keyStr => {
      let i = parseInt(keyStr[0], 10);
      let j = parseInt(keyStr[1], 10);
      this.board[i][j] = 1;
    })
    this.alive = activeList;
    this.dead = {};
    return this.board;
  }

  /**
   * get all neighbours, including self
   * return @array [ String, String ]
   */
  getAroundKeys = (keyStr) => {
    let rowNum = parseInt(keyStr[0], 10);
    let colNum = parseInt(keyStr[1], 10);
    let neighbours = []
    for (let i=rowNum-1; i<=rowNum+1 ; i++) {
      if (i < 0 || i >= this.row) continue;
      for (let j=colNum-1; j<=colNum+1 ; j++) {
        if (j < 0 || j >= this.row) continue;
          neighbours.push(`${i}${j}`)
      }
    }
    return neighbours;
  }

  switchCell(x,y) {
    this.board[x][y] = 1-this.board[x][y] ;
    if (Object.keys(this.alive).includes(`${x}${y}`)) {
      delete this.alive[`${x}${y}`]
    } else {
      this.alive[`${x}${y}`] = -1;
    }
  }

  reset(x,y) {
    this.board = Array(x).fill().map(() => Array(y).fill(0));
    this.row = x;
    this.col = y;
  }

  /**
   * return new alive array
   *
   */
  getAroundDeadlist = () =>{
    let aliveKeys = Object.keys(this.alive)
    aliveKeys.map( keyStr => {
      let neighbours = this.getAroundKeys(keyStr);
      neighbours.forEach( k => {
        let row = parseInt(k[0], 10);
        let col = parseInt(k[1], 10);
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
    // return this.getNextStateList(this.alive, this.dead)
  }

    /**
   * return [ String ]
   */
  getNextStateList = () => {
    let result = {};

    // still alive
    let nextAlive = Object.keys(this.alive).filter( k => this.alive[k] === 2 || this.alive[k] ===3 )

    // dead to alive
    let deadToAlive = Object.keys(this.dead).filter( k => this.dead[k] === 3 )

    let nextActive = [...nextAlive, ...deadToAlive];
    nextActive.forEach(key => result[key]=-1);
    return result;
  }




  static addToAliveList(i,j) {

  }
}

export default GameService;