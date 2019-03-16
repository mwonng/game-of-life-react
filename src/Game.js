import React from 'react';
import GameService from './func/game-service';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    var game = new GameService(12, 12);
    this.game = game;
    this.state = {
      row: game.row,
      column: game.col,
      life: game.board,
    };
  }

  setActivity = (x,y) => {
    this.game.switchCell(x,y);
    this.setState({
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
    });
  }

  reset = () => {
    const { row, column } = this.state;
    this.game.reset(parseInt(row,10), parseInt(column, 10));

    this.setState({
      life: this.game.board,
    });
  }

  render () {
    const { life } = this.state;
    let rows = life.map((row, i)=>
      <tr key={i}>
        {row.map((col, j)=>
          <td
            key={j}
            className={col > 0 ? "active" : ""}
            onClick={()=> this.setActivity(i, j)}
          ></td>
        )}
      </tr>
    )

    return (
      <div>
        <h1>Game of Life</h1>
        <p>Please click any cell to active cell</p>
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
        <button onClick={() => this.goNextState(this.state.alive)}> Next generation</button>
      </div>
    )
  }
}

export default Game