import {atom} from 'recoil';

export const enemyState = atom({
  key: 'enemyState',
  default: {
    id: 0,
    alive: true,
    name: 'the void',
    ascii: null,
    level: 1,
    hp: 100,
    hpMax: 100,
    xp: 5,
    dmgMin: 1,
    dmgMax: 3,
    crit: 1.5,
    critChance: 5,
    speed: 100,
    hitChance: 50,
    armor: 90,
    resist: 5,
  },
});
