import {Box, Progress, ProgressLabel, VStack} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {playerState} from '../state/playerState';

function HealthBar({val, max}) {
  return (
    <Progress
      min={0}
      max={max}
      value={val}
      height={'26px'}
      width={'100%'}
      size={'lg'}
      colorScheme={'red'}>
      <ProgressLabel
        style={{
          fontSize: 'x-small',
          textShadow: '1px 1px #000',
        }}>
        {val}/{max} HP
      </ProgressLabel>
    </Progress>
  );
}

function ManaBar({val, max}) {
  return (
    <Progress
      min={0}
      max={max}
      value={val}
      height={'26px'}
      width={'100%'}
      size={'lg'}
      colorScheme={'blue'}>
      <ProgressLabel
        style={{
          fontSize: 'x-small',
          textShadow: '1px 1px #000',
        }}>
        {val}/{max} MP
      </ProgressLabel>
    </Progress>
  );
}

function XpBar({val, max}) {
  return (
    <Progress
      min={0}
      max={max}
      value={val}
      height={'26px'}
      width={'100%'}
      size={'lg'}
      colorScheme={'purple'}>
      <ProgressLabel
        style={{
          fontSize: 'x-small',
          textShadow: '1px 1px #000',
        }}>
        {val}/{max} XP
      </ProgressLabel>
    </Progress>
  );
}

export function Status() {
  const player = useRecoilValue(playerState);

  return (
    <Box flex={1} p={1}>
      <VStack spacing={1}>
        <HealthBar val={player.hp} max={player.hpMax} />
        <ManaBar val={player.hp} max={player.hpMax} />
        <XpBar val={player.xp} max={player.xpMax} />
      </VStack>
    </Box>
  );
}
