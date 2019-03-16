import React from 'react';
import GameService from './func/game-service';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    var game = new GameService(12, 12);
    this.game = game;
    this.state = {
      row: this.game.row,
      column: this.game.col,
      life: game.board,
    }
  }

  getAroundDeadlist = (list) =>{
    let {life, alive} = this.state;
    let aliveKeys = Object.keys(list)
    let dead={}

    aliveKeys.map( keyStr => {
      let neighbours = this.game.getAroundKeys(keyStr);

      neighbours.forEach( k => {
        let row = parseInt(k[0], 10);
        let col = parseInt(k[1], 10);
        if (life[row][col] < 1) {
          if (Object.keys(dead).includes(k)) {
            dead[k]=dead[k]+1;
          } else {
            dead[k] = 1;
          }
        } else {
          alive[k]=alive[k]+1;
        }
      })
    })
    this.setState({
      alive,
      dead
    })

    return this.getNextStateList(alive,dead)
  }

  setActive = (x,y) => {
    this.game.switchCell(x,y);
    // console.log("alive in se",this.game.alive);

    this.setState({
      // alive,
      life: this.game.board
    },);
  }

  goNextState = () => {
    let board = this.game.getNextState();

    this.setState({
      life: board,
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  reset = () => {
    const { row, column } = this.state;

    this.game.reset(parseInt(row,10), parseInt(column, 10));

    this.setState({
      life: this.game.board,
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
        <button onClick={() => this.goNextState(this.state.alive)}> Next </button>
        {/* <button onClick={() => this.getAroundDeadlist(this.state.alive)}> get dead list</button> */}
      </div>
    )
  }
}


export default Game