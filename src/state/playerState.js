import {atom} from 'recoil';

export const playerState = atom({
  key: 'playerState',
  default: {
    name: 'M.Night',
    ascii: null,
    level: 1,
    hp: 30,
    hpMax: 30,
    mp: 10,
    mpMax: 10,
    xp: 0,
    xpMax: 10,
    str: 5,
    dex: 5,
    int: 5,
    vit: 5,
    avail: 5,
    dmgMin: 10,
    dmgMax: 30,
    crit: 1.5,
    critChance: 5,
    speed: 100,
    hitChance: 50,
    armor: 90,
    resist: 5,
  },
});
