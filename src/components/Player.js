import {Box, Progress, ProgressLabel, Text} from '@chakra-ui/react';
import {playerState} from '../state/playerState';
import {useRecoilState, useRecoilValue} from 'recoil';
import {battleState} from '../state/battleState';
import {motion} from 'framer-motion';
import {useEffect} from 'react';

export function Player() {
  const [player, setPlayer] = useRecoilState(playerState);
  const battle = useRecoilValue(battleState);

  useEffect(() => {
    fetch(`/art/player.txt`)
      .then((r) => r.text())
      .then((text) => {
        setPlayer((x) => {
          let y = {...x};
          y.ascii = text;
          return y;
        });
      });
  }, []); // eslint-disable-line

  return (
    <motion.div
      color={'white'}
      initial={{scale: 1}}
      animate={{
        x: battle.playerIsAttacking ? 100 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}>
      <Box w={120} textAlign={'center'} fontSize={'xs'} position={'relative'}>
        <pre
          style={{
            textAlign: 'left',
            display: 'inline-block',
            fontSize: 'xx-small',
          }}>
          {player.ascii}
        </pre>
        <Text textAlign={'center'}>{player.name}</Text>
        <Progress
          min={0}
          max={player.hpMax}
          value={player.hp}
          height={'15px'}
          colorScheme={'red'}>
          <ProgressLabel
            style={{
              fontSize: 'x-small',
              textShadow: '1px 1px #000',
            }}>
            {player.hp}/{player.hpMax} HP
          </ProgressLabel>
        </Progress>
      </Box>
    </motion.div>
  );
}
