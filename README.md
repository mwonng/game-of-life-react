## Summary
simulate [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Screebshot
![screenshot](/public/screenshot.png)

## Requirement

- node >= 10,
- npm or yarn installed

[install node](https://nodejs.org/en/download/)

## Play game

1. you can click any area of board to active a cell, one more click will deactivate it
2. click 'next generation' to see will will happen in next generation according to the rule.

*Note:* you can also change the board size and reset it.

## Algorithm

- `master` branch use traditional but not efficent.
- `another-solution` branch provide another algorithn based on user interaction.

**by my testing, if runs on 8000x8000 board, for 10 times generation, `master` branch will cost 24s or more without UI, `another-solution` branch cost 9.8s.**

so with a huge board, traditional algorithm cost much more on iterate empty(dead) cell.

## About code itself

please bear with me any typo or space error because this code are written by my right hand only because of my left elbow injured.

## How to

`npm install` or `yarn install`

and run

`npm run dev` or `yarn dev`

## Production

`npm run build` or `yarn build`

## Test

`npm run test` or `yarn test`