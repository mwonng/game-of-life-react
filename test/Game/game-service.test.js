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
  let keys = game.getAroundKeys('0_0');
  t.deepEqual(keys, ['0_0','0_1','1_0','1_1'], "getAroundKeys in corner is wrong");
  let keysInMid = game.getAroundKeys('1_2');
  t.deepEqual(keysInMid, ['0_1','0_2','0_3','1_1','1_2','1_3','2_1','2_2','2_3'], "getAroundKeys in middle is wrong");
  let keysInSide = game.getAroundKeys('3_3');
  t.deepEqual(keysInSide, ['2_2','2_3','3_2','3_3','4_2','4_3'], "getAroundKeys in sidebar is wrong");
});

test('reset()', t => {
  let game = new GameService(8,4);
  game.switchCell(1,3);
  game.getNextState();
  game.reset(6,6);

  t.deepEqual(game.board, [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ], "reset action");
  t.deepEqual(game.alive, {});
  t.deepEqual(game.dead, {});
});
