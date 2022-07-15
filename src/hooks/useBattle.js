import {battleState} from '../state/battleState';
import {useRecoilState} from 'recoil';
import {playerState} from '../state/playerState';
import {enemyState} from '../state/enemyState';
import {getRandomInt} from '../utils/number';
import enemyDb from '../enemies.json';
import {useMessage} from './useMessage';
import {getDamageLevelByAmount} from '../utils/message';
import {useCallback, useEffect} from 'react';

export const useBattle = () => {
  const message = useMessage();

  const [player, setPlayer] = useRecoilState(playerState);
  const [enemy, setEnemy] = useRecoilState(enemyState);
  const [battle, setBattle] = useRecoilState(battleState);

  const rollPlayerDamage = useCallback(() => {
    return getRandomInt(player.dmgMin, player.dmgMax + 1);
  }, [player.dmgMin, player.dmgMax]);

  const damageEnemy = useCallback(() => {
    console.log('damageEnemy()');
    const playerDmg = rollPlayerDamage();

    message.add(
      `You ${
        getDamageLevelByAmount(playerDmg)[0]
      } ${enemy.name.toLowerCase()} for ${playerDmg}`,
      null,
      null,
      'green.300'
    );

    setEnemy((x) => {
      let y = {...x};
      y.hp -= playerDmg;
      if (y.hp < 0) y.hp = 0;
      if (y.hp <= 0) {
        y.alive = false;
      }
      return y;
    });
  }, [enemy.name, message, rollPlayerDamage, setEnemy]);

  const nextEnemy = useCallback(() => {
    console.log('nextEnemy()');
    const myEnemy = enemyDb[getRandomInt(0, enemyDb.length)];

    fetch(`/art/${myEnemy.ascii}`)
      .then((r) => r.text())
      .then((text) => {
        setEnemy((x) => {
          let y = {...x, ...myEnemy};
          y.hpMax = y.hp;
          y.ascii = text;
          y.alive = true;
          return y;
        });
      });
  }, [setEnemy]);

  const doEnemyDead = useCallback(() => {
    console.log('doEnemyDead()');
    setBattle((x) => ({...x, isActive: false}));

    let xp = getRandomInt(enemy.level * 2, enemy.level * 3);

    message.add(`${enemy.name} is DEAD!!`, null, null, 'red.500');
    message.add(`You gained ${xp} experience.`, null, null, 'cyan.500');

    setTimeout(nextEnemy, 5000);
  }, [enemy.level, enemy.name, message, setBattle, nextEnemy]);

  const doPlayerAttack = useCallback(() => {
    console.log('doPlayerAttack()');
    if (!battle.isActive) return;

    setBattle((x) => {
      let y = {...x};
      y.playerIsAttacking = true;
      return y;
    });

    damageEnemy();

    setTimeout(() => {
      setBattle((x) => {
        let y = {...x};
        y.playerIsAttacking = false;
        return y;
      });
      setTimeout(() => {
        doPlayerAttack();
      }, battle.playerAttackCooldown * (100 / player.speed));
    }, battle.playerAttackDuration * (100 / player.speed));
  }, [
    battle.isActive,
    battle.playerAttackCooldown,
    battle.playerAttackDuration,
    player.speed,
    setBattle,
    damageEnemy,
  ]);

  const startBattle = useCallback(() => {
    console.log('startBattle()');

    fetch(`/art/player.txt`)
      .then((r) => r.text())
      .then((text) => {
        setPlayer((x) => {
          let y = {...x};
          y.ascii = text;
          return y;
        });
      });

    setBattle((x) => ({...x, isActive: true}));

    nextEnemy();
    setTimeout(doPlayerAttack, 2000);
  }, [doPlayerAttack, nextEnemy, setBattle, setPlayer]);

  useEffect(() => {
    startBattle();
  });

  useEffect(() => {
    battle.isActive && doPlayerAttack();
  }, [battle.isActive, doPlayerAttack]);

  useEffect(() => {
    if (!enemy.alive) {
      doEnemyDead();
    }
  }, [enemy.alive, doEnemyDead]);

  return {
    startBattle,
    doEnemyDead,
    doPlayerAttack,
    damageEnemy,
  };
};
