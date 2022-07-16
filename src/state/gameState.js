import {atom} from 'recoil';

export const gameState = atom({
  key: 'gameState',
  default: {
    gold: 0,
    wood: 0,
    rocks: 0,
    timeElapsed: 0,
  },
});
