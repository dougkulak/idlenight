import {Box, Progress, ProgressLabel, Text} from '@chakra-ui/react';
import React from 'react';
import {motion} from 'framer-motion';
import {enemyState} from '../state/enemyState';
import {useRecoilValue} from 'recoil';
import {battleState} from '../state/battleState';

export function Enemy() {
  const enemy = useRecoilValue(enemyState);
  const battle = useRecoilValue(battleState);

  return (
    <motion.div
      color={'white'}
      initial={{scale: 1}}
      animate={{
        x: battle.enemyIsAttacking ? -100 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}>
      <Box w={120} textAlign={'center'} fontSize={'xs'} position={'relative'}>
        <pre
          style={{
            fontSize: 'xx-small',
            textAlign: 'left',
            display: 'inline-block',
          }}>
          {enemy.ascii}
        </pre>
        <Text textAlign={'center'}>{enemy.name}</Text>
        <Progress
          min={0}
          max={enemy.hpMax}
          value={enemy.hp}
          height={'15px'}
          colorScheme={'red'}>
          <ProgressLabel
            style={{
              fontSize: 'x-small',
              textShadow: '1px 1px #000',
            }}>
            {enemy.hp <= 0 && 'DEAD!!!'}
            {enemy.hp > 0 && `${enemy.hp}/${enemy.hpMax} HP`}
          </ProgressLabel>
        </Progress>
      </Box>
    </motion.div>
  );
}
