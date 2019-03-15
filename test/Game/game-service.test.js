import test from 'ava';
import GameService from '../../src/func/game-service';

test('initService', t => {
  let board = new GameService(6,4).board;
  let row = board.length;
  let col = board[0].length;

  t.is(row, 6, "row is wrong");
  t.is(col, 4, "col is wrong");
});


test('getNextState()', t => {
  t.pass();
});