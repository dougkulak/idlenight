import {Box, HStack} from '@chakra-ui/react';
import bg from '../assets/bg/forest.jpg';
import {Player} from './Player';
import {Enemy} from './Enemy';
import {useRecoilState} from 'recoil';
import {battleState} from '../state/battleState';
import {useCallback, useEffect, useState} from 'react';
import {enemyState} from '../state/enemyState';
import {playerState} from '../state/playerState';
import {useMessage} from '../hooks/useMessage';
import enemyDb from '../enemies.json';
import {getRandomInt} from '../utils/number';
import {getDamageLevelByAmount} from '../utils/message';

const xpToLevel = [
  10, 20, 50, 100, 200, 500, 1000, 2500, 5000, 10000, 20000, 40000, 100000,
  200000, 500000, 1000000, 2000000, 5000000,
];

export function BattleScene() {
  const message = useMessage();

  const [battle, setBattle] = useRecoilState(battleState);
  const [enemy, setEnemy] = useRecoilState(enemyState);
  const [player, setPlayer] = useRecoilState(playerState);

  const [hpGain, setHpGain] = useState(0);
  const [mpGain, setMpGain] = useState(0);

  const startEncounter = () => {
    console.log('startEncounter()');
    setBattle((x) => ({...x, isActive: true}));
  };

  const loadNextEnemy = useCallback(() => {
    console.log('loadNextEnemy()');

    const myEnemy = enemyDb[getRandomInt(0, enemyDb.length)];

    fetch(`/art/${myEnemy.ascii}`)
      .then((r) => r.text())
      .then((text) => {
        setEnemy((x) => {
          let y = {...x, ...myEnemy};
          y.id += 1;
          y.hpMax = y.hp;
          y.ascii = text;
          y.alive = true;
          return y;
        });
      });
  }, [setEnemy]);

  const rollPlayerDamage = useCallback(() => {
    return getRandomInt(player.dmgMin, player.dmgMax + 1);
  }, [player.dmgMin, player.dmgMax]);

  const doPlayerAttack = useCallback(() => {
    console.log('doPlayerAttack()');

    setBattle((x) => {
      let y = {...x};
      y.playerIsAttacking = true;
      return y;
    });

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
      if (y.hp === 0) {
        y.alive = false;
      }
      return y;
    });

    setTimeout(() => {
      setBattle((x) => {
        let y = {...x};
        y.playerIsAttacking = false;
        return y;
      });
    }, battle.playerAttackDuration * (100 / player.speed));
    //eslint-disable-next-line
  }, [
    enemy.name,
    rollPlayerDamage,
    setEnemy,
    setBattle,
    battle.playerAttackDuration,
    player.speed,
  ]);

  const doEnemyDead = useCallback(() => {
    console.log('doEnemyDead()');
    let xp = getRandomInt(enemy.level * 2, enemy.level * 3);

    message.add(`${enemy.name} is DEAD!!`, null, null, 'red.500');
    message.add(`You gained ${xp} experience.`, null, null, 'cyan.500');

    setPlayer((x) => ({...x, xp: x.xp + xp}));
  }, [enemy.level, enemy.name, setBattle, setPlayer]); //eslint-disable-line

  const doPlayerLeveled = useCallback(() => {
    let newHp = getRandomInt(player.level * 2, player.level * 3);
    let newMp = getRandomInt(player.level * 1, player.level * 2);

    setHpGain(newHp);
    setMpGain(newMp);

    setTimeout(() => {
      setPlayer((x) => {
        let y = {...x};
        y.level += 1;
        y.hpMax += newHp;
        y.hp = y.hpMax;
        y.mpMax += newMp;
        y.mp = y.mpMax;
        y.xpMax = xpToLevel[y.level - 1];
        y.xp = 0;
        y.avail += 5;

        return y;
      });
    }, 1);
  }, [player.level, setPlayer, setHpGain, setMpGain]);

  useEffect(() => {
    if (player.level === 1) return;
    message.add(
      `* * * CONGRATULATIONS! You are now level ${player.level}! * * *`,
      null,
      null,
      'purple.400'
    );
    message.add(`You gained ${hpGain} max HP.`, null, null, 'yellow.400');
    message.add(`You gained ${mpGain} max MP.`, null, null, 'yellow.400');
  }, [player.level]); //eslint-disable-line

  useEffect(() => {
    if (player.xp >= player.xpMax) {
      doPlayerLeveled();
    }
  }, [player.xp, player.xpMax, doPlayerLeveled]);

  useEffect(() => {
    let interval = null;

    if (enemy.alive) {
      interval = setInterval(
        doPlayerAttack,
        battle.playerAttackCooldown * (100 / player.speed)
      );
    } else {
      doEnemyDead();
      setTimeout(loadNextEnemy, battle.delayBetweenBattles);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    enemy.alive,
    doPlayerAttack,
    doEnemyDead,
    loadNextEnemy,
    battle.playerAttackCooldown,
    player.speed,
    battle.delayBetweenBattles,
  ]);

  useEffect(() => {
    if (enemy.id > 0) {
      message.add(`${enemy.name} appears!`, null, null, 'gray.50');
    }
  }, [enemy.id]); //eslint-disable-line

  useEffect(() => {
    if (battle.isActive) {
      loadNextEnemy();
    }
  }, [battle.isActive, loadNextEnemy]);

  useEffect(() => {
    startEncounter();
  }, []); //eslint-disable-line

  return (
    <>
      <Box p={1} bg={'black'} borderRadius={'md'}>
        <Box
          borderRadius={'md'}
          sx={{
            backgroundImage: bg,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            minHeight: 250,
            width: '100%',
          }}>
          <Box
            padding={4}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <HStack
              spacing={2}
              justifyContent={'space-between'}
              style={{
                width: '100%',
              }}>
              <Player />
              <Enemy />
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
