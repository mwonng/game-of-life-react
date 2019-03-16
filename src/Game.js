import React from 'react';
import GameService from './func/game-service';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    let game = new GameService(7, 7);
    this.state = {
      row: 7,
      column: 7,
      life: game.board,
    }
  }

  setActive = (arr,x,y) => {
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
      life: newArr
    })
  }

  render () {
    const { life } = this.state;
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
        <button onClick={() => this.goNextState(this.state.life)}> Next </button>
      </div>
    )
  }
}


export default Game