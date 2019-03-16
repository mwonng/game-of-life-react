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
  let game = new GameService(6,6);
  game.switchCell(1,2);
  game.switchCell(2,3);
  game.switchCell(3,1);
  game.switchCell(3,2);
  game.switchCell(3,3);
  game.getNextState();
  t.deepEqual(game.board, [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,1,0,1,0,0],
    [0,0,1,1,0,0],
    [0,0,1,0,0,0],
    [0,0,0,0,0,0],
  ]);
  game.getNextState();
  t.deepEqual(game.board, [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,1,0,1,0,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
  ]);
  game.getNextState();
  t.deepEqual(game.board, [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,1,0,0,0],
    [0,0,0,1,1,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
  ]);
  game.getNextState();
  t.deepEqual(game.board, [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,0,0,0,1,0],
    [0,0,1,1,1,0],
    [0,0,0,0,0,0],
  ]);
});

test('switchCell()', t => {
  let game = new GameService(6,4);
  game.switchCell(1,3);
  t.is(game.board[1][3], 1,  "enable cell");
  game.switchCell(1,3);
  t.is(game.board[1][3], 0,  "disenable cell");
});

test('getAroundKeys()', t => {
  let game = new GameService(6,4);
  let keys = game.getAroundKeys('00');
  t.deepEqual(keys, ['00','01','10','11'], "getAroundKeys in coener is wrong");
  let keysInMid = game.getAroundKeys('12');
  t.deepEqual(keysInMid, ['01','02','03','11','12','13','21','22','23'], "getAroundKeys in middle is wrong");
  let keysInSide = game.getAroundKeys('33');
  t.deepEqual(keysInSide, ['22','23','32','33','42','43'], "getAroundKeys in sidebar is wrong");
});
