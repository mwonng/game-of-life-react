import React from 'react';
import GameService from './func/game-service';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    var game = new GameService(7, 7);
    this.state = {
      row: 7,
      column: 7,
      life: game.board,
      alive: {},
      dead: {}
    }
  }

  getAroundDeadlist = (list) =>{
    let {life} = this.state;
    let aliveKeys = Object.keys(list)
    let dead={}
    aliveKeys.map( keyStr => {
      let row = parseInt(keyStr[0], 10);
      let col = parseInt(keyStr[1], 10);

      for (let i=row-1; i<=row+1 && i >= 0 && i < this.state.row; i++) {
        for (let j=col-1; j<=col+1 && j >= 0 && j < this.state.column; j++) {
          if (life[i][j] < 1) {
            if (Object.keys(dead).includes(`${i}${j}`)) {
              dead[`${i}${j}`]=dead[`${i}${j}`]+1;
            } else {
              dead[`${i}${j}`] = 1;
            }
          }
        }
      }
      this.setState({
        dead
      })
    })
  }


  setActive = (arr,x,y) => {
    var {alive, dead} = this.state;

    if (arr[x][y] === 0) {
      this.setState({
        alive: {[`${x}${y}`]:null, ...alive}
      });
    } else {
      delete alive[`${x}${y}`]
      this.setState({
        alive: {...alive}
      });
    }

    arr[x][y] = Math.abs(1-arr[x][y]) ;
    this.setState({
      life: arr
    })
  }

  goNextState = (arr) => {
    let next = GameService.getNextState(arr)
    this.setState({
      life: next,
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  reset = () => {
    const { row, column } = this.state;
    let game = new GameService(parseInt(row,10), parseInt(column, 10));
    let newArr = game.board;

    this.setState({
      life: newArr,
      alive: {},
      dead: {}
    })
  }

  render () {
    const { life, alive, dead } = this.state;
    let rows = life.map((row, i)=>
      <tr key={i}>
        {row.map((col, j)=>
          <td
            key={j}
            className={col > 0 ? "active" : ""}
            onClick={()=> this.setActive(life, i, j)}
            ></td>
        )}
      </tr>
    )
    console.log("alive", alive);
    console.log("dead", dead);
    return (
      <div>
        <h1>Game of Life</h1>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div className="reset">
          <label htmlFor="row">Rows:
            <input type="number" name="row" value={this.state.row} onChange={(e)=>this.onChange(e)}/>
          </label>
          <label htmlFor="column">Column:
            <input type="number" name="column" value={this.state.column} onChange={(e)=>this.onChange(e)} />
          </label>
          <button onClick={() => this.reset()}> Set & Reset </button>
        </div>
        <button onClick={() => this.goNextState(this.state.life)}> Next </button>
        <button onClick={() => this.getAroundDeadlist(this.state.alive)}> get dead list</button>
      </div>
    )
  }
}


export default Game