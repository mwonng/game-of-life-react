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


  render () {
    return (
      <div>
        <h1>Game</h1>
        <table>
        </table>
      </div>
    )
  }
}


export default Game