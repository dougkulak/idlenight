import {atom} from 'recoil';

export const battleState = atom({
  key: 'battleState',
  default: {
    isActive: false,
    playerIsAttacking: false,
    enemyIsAttacking: false,
    playerAttackDuration: 500,
    playerAttackCooldown: 2000,
    delayBetweenBattles: 2000,
  },
});
